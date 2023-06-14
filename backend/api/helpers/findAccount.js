const User = require('../models/user.model')
const Hospital = require('../models/hospital.model')
const Doctor = require('../models/doctor.model')

async function findAccount(match) {
   const userPromises = [
      User.findOne(match).select('-password -created_at'),
      Hospital.findOne(match).select('-password -created_at'),
      Doctor.findOne(match).select('-password -created_at'),
   ]

   const [user, hospital, doctor] = await Promise.all(userPromises)

   if (user) {
      return { account: user, accType: 'user' }
   }
   if (hospital) {
      return { account: hospital, accType: 'hospital' }
   }
   if (doctor) {
      return { account: doctor, accType: 'doctor' }
   }
}

module.exports = findAccount
