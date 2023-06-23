const Doctor = require('../models/doctor.model')
const Hospital = require('../models/hospital.model')
const hashPassword = require('../helpers/hashPassword')
const generateToken = require('../helpers/generateToken')
const passwordValidator = require('../helpers/passwordValidator')
const nameValidator = require('../helpers/nameValidator')

// Get all doctors
async function getAllDoctors(req, res, next) {
   const doctors = await Doctor.find().select('-password')
   res.status(200).json(doctors)
}

// Get a single doctor by ID
async function getDoctorById(req, res, next) {
   const { id } = req.params
   const doctor = await Doctor.findById(id).select('-password')
   if (!doctor) return next({ status: 404 })
   res.status(200).json(doctor)
}

// Create a new doctor
async function createDoctor(req, res, next) {
   const { name, email, specialty, password } = req.body
   if (!specialty)
      return next({ status: 400, errors: ['speciality is required'] })

   const hashedPassword = await hashPassword(password)
   if (!hashedPassword) return next({ status: 500 })

   const hospital = await Hospital.findById(req.userId)
   if (!hospital) return next({ status: 404 })
   const doctor = new Doctor({
      name,
      email,
      specialty,
      password: hashedPassword,
      hospital: hospital._id,
   })
   await doctor.save()
   if (!doctor) return next({ status: 500 })
   const token = await generateToken({ id: doctor._id })
   res.status(201).json({ token })
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
   if (errors.length > 0) return next({ errors, status: 400 })

   const doctor = await Doctor.findByIdAndUpdate(req.userId, update)
   if (!doctor) return next({ status: 500 })

   res.status(201).json({ message: 'update successful' })
}

// Delete own doctor account
async function deleteDoctor(req, res, next) {
   const doctor = await Doctor.findByIdAndDelete(req.userId)
   if (!doctor) return next({ status: 404 })
   res.sendStatus(204)
}

// Delete doctor account for hospital
async function deleteDoctorById(req, res, next) {
   if (req.accType !== 'hospital') return next({ status: 403 })

   const { id } = req.params

   const doctor = await Doctor.findOneAndDelete({ hospital: id })
   if (!doctor) return next({ status: 404 })
   res.sendStatus(204)
}

module.exports = {
   getAllDoctors,
   getDoctorById,
   createDoctor,
   updateDoctor,
   deleteDoctor,
   deleteDoctorById,
}
