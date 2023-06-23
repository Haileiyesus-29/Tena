const Hospital = require('../models/hospital.model')
const hashPassword = require('../helpers/hashPassword')
const generateToken = require('../helpers/generateToken')
const passwordValidator = require('../helpers/passwordValidator')
const nameValidator = require('../helpers/nameValidator')

// Get all hospitals
async function getAllHospitals(req, res, next) {
   const hospitals = await Hospital.find().select('-password')
   res.status(200).json(hospitals)
}

// Get a single hospital by ID
async function getHospitalById(req, res, next) {
   const { id } = req.params
   const hospital = await Hospital.findById(id).select('-password')
   if (!hospital) return next({ status: 404 })
   res.status(200).json(hospital)
}

// Create a new hospital
async function createHospital(req, res, next) {
   const { name, email, address, contactNumber, password } = req.body
   const errors = []
   if (!address) errors.push('address is required')
   if (!contactNumber) errors.push('contact is required')

   if (errors.length) return next({ status: 400, errors })

   const hashedPassword = await hashPassword(password)
   if (!hashedPassword) return next({ status: 500 })

   const hospital = new Hospital({
      name,
      email,
      address,
      contactNumber,
      password: hashedPassword,
   })

   await hospital.save()
   if (!hospital) return next({ status: 500 })

   const token = await generateToken({ id: hospital._id })
   if (!token) return next({ status: 500 })

   hospital.password = undefined
   res.status(201).json({ token })
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
   if (errors.length > 0) return next({ errors, status: 400 })

   const hospital = await Hospital.findByIdAndUpdate(req.userId, update)
   if (!hospital) return next({ status: 500 })
   res.status(201).json({ message: 'update successful' })
}

// Delete a hospital by ID
async function deleteHospital(req, res, next) {
   const hospital = await Hospital.findByIdAndDelete(req.userId)
   if (!hospital) return next({ status: 404 })
   res.sendStatus(204)
}

module.exports = {
   getAllHospitals,
   getHospitalById,
   createHospital,
   updateHospital,
   deleteHospital,
}
