const Doctor = require('../models/doctor.model')
const Hospital = require('../models/hospital.model')
const hashPassword = require('../helpers/hashPassword')
const generateToken = require('../helpers/generateToken')
const passwordValidator = require('../helpers/passwordValidator')
const nameValidator = require('../helpers/nameValidator')

// Get all doctors
async function getAllDoctors(req, res, next) {
   try {
      const doctors = await Doctor.find().select('-password')
      res.status(200).json(doctors)
   } catch (error) {
      next(error)
   }
}

// Get a single doctor by ID
async function getDoctorById(req, res, next) {
   const { id } = req.params
   try {
      const doctor = await Doctor.findById(id).select('-password')
      if (!doctor) return next({ message: 'Not Found', status: 404 })
      res.json(doctor)
   } catch (error) {
      next(error)
   }
}

// Create a new doctor
async function createDoctor(req, res, next) {
   const { name, email, specialty, password } = req.body
   const hashedPassword = await hashPassword(password)

   if (!specialty) return next({ message: 'Bad Request', status: 400 })

   try {
      const hospital = await Hospital.findById(req.userId)
      if (!hospital) return next({ message: 'Bad Request', status: 400 })
      const doctor = new Doctor({
         name,
         email,
         specialty,
         password: hashedPassword,
         hospital: hospital._id,
      })
      await doctor.save()
      const token = await generateToken({ id: doctor._id })
      res.status(201).json({ token, doctor })
   } catch (error) {
      next(error)
   }
}

// Update a doctor by ID
async function updateDoctor(req, res, next) {
   const { name, password, specialty } = req.body

   const update = {}
   let nameErrors = []
   let passwordErrors = []

   if (password) {
      passwordErrors = passwordValidator(password)
      update.password = await hashPassword(password)
   }
   if (name) {
      nameErrors = nameValidator(name)
      update.name = name
   }
   if (name) update.name = name
   if (specialty) update.specialty = specialty

   const errors = [...nameErrors, ...passwordErrors]
   if (errors.length > 0)
      return next({ errors, message: 'Bad Request', status: 400 })

   try {
      const doctor = await Doctor.findByIdAndUpdate(req.userId, update)
      if (!doctor) {
         const error = new Error('doctor not found')
         error.status = 404
         throw error
      }
      res.status(201).json({ message: 'update successful', status: 201 })
   } catch (error) {
      next(error)
   }
}

// Delete own doctor account
async function deleteDoctor(req, res, next) {
   try {
      const doctor = await Doctor.findByIdAndDelete(req.userId)
      if (!doctor) {
         const error = new Error('doctor not found')
         error.status = 404
         return next(error)
      }
      res.sendStatus(204)
   } catch (error) {
      next(error)
   }
}

// Delete doctor account for hospital
async function deleteDoctorById(req, res, next) {
   if (req.accType !== 'hospital')
      return next({ message: 'Forbidden', status: 403 })

   const { id } = req.params
   try {
      const doctor = await Doctor.findOneAndDelete({ hospital: id })
      if (!doctor) return next({ message: 'Not Found', status: 404 })
      res.sendStatus(204)
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getAllDoctors,
   getDoctorById,
   createDoctor,
   updateDoctor,
   deleteDoctor,
   deleteDoctorById,
}
