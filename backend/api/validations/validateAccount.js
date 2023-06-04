const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const Hospital = require('../models/hospital.model')
const Doctor = require('../models/doctor.model')
const generateToken = require('../helpers/generateToken')

async function validateAccount(req, res, next) {
   const { email, password } = req.body

   // Check if email and password are provided
   if (!email || !password) {
      const error = new Error('Email and password are required')
      return next(error)
   }

   const userPromises = [
      User.findOne({ email }),
      Hospital.findOne({ email }),
      Doctor.findOne({ email }),
   ]

   const [user, hospital, doctor] = await Promise.all(userPromises)

   let account
   let accountType
   if (user) {
      account = user
      accountType = 'user'
   } else if (hospital) {
      account = hospital
      accountType = 'hospital'
   } else if (doctor) {
      account = doctor
      accountType = 'doctor'
   } else {
      return next('Invalid username or password')
   }

   const hasCorrectCredential = await bcrypt.compare(password, account.password)
   account.password = undefined
   if (!hasCorrectCredential) return next('Invalid username or password')

   const token = await generateToken({ id: account._id, accountType })
   res.json({
      message: 'successfullly logged in',
      account,
      accountType,
      token,
   })
}

module.exports = validateAccount
