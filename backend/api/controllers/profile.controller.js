const User = require('../models/user.model')
const Hospital = require('../models/hospital.model')
const Doctor = require('../models/doctor.model')

async function saveProfile(req, res, next) {
   const { accType } = req
   console.log(req.File)
   if (accType === 'user') {
      const user = User.findByIdAndUpdate(req.userId, {})
   }
   res.sendStatus(201)
}

module.exports = { saveProfile }
