const Hospital = require('../models/hospital.model')
const hashPassword = require('../helpers/hashPassword')
const generateToken = require('../helpers/generateToken')
const passwordValidator = require('../helpers/passwordValidator')
const nameValidator = require('../helpers/nameValidator')

// Get all hospitals
async function getAllHospitals(req, res, next) {
   try {
      const hospitals = await Hospital.find().select('-password')
      res.json(hospitals)
   } catch (error) {
      next(error)
   }
}

// Get a single hospital by ID
async function getHospitalById(req, res, next) {
   const { id } = req.params
   try {
      const hospital = await Hospital.findById(id).select('-password')
      if (!hospital) {
         const error = new Error('Hospital not found')
         error.status = 404
         throw error
      }
      res.json(hospital)
   } catch (error) {
      next(error)
   }
}

// Create a new hospital
async function createHospital(req, res, next) {
   const { name, email, address, contactNumber, password } = req.body
   const hashedPassword = await hashPassword(password)

   try {
      const hospital = new Hospital({
         name,
         email,
         address,
         contactNumber,
         password: hashedPassword,
      })
      await hospital.save()
      const token = await generateToken({ id: hospital._id })
      hospital.password = undefined
      res.status(201).json({ token })
   } catch (error) {
      next(error)
   }
}

// Update a hospital by ID
async function updateHospital(req, res, next) {
   const { name, password, address, contactNumber } = req.body

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
   if (address) update.address = address
   if (contactNumber) update.contactNumber = contactNumber

   const errors = [...nameErrors, ...passwordErrors]
   if (errors.length > 0)
      return next({ errors, message: 'Bad Request', status: 400 })

   try {
      const hospital = await Hospital.findByIdAndUpdate(req.userId, update)
      if (!hospital) {
         const error = new Error('Hospital not found')
         error.status = 404
         throw error
      }
      res.status(201).json({ message: 'update successful', status: 201 })
   } catch (error) {
      next(error)
   }
}

// Delete a hospital by ID
async function deleteHospital(req, res, next) {
   try {
      const hospital = await Hospital.findByIdAndDelete(req.userId)
      if (!hospital) {
         const error = new Error('Hospital not found')
         error.status = 404
         return next(error)
      }
      res.sendStatus(204)
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getAllHospitals,
   getHospitalById,
   createHospital,
   updateHospital,
   deleteHospital,
}
