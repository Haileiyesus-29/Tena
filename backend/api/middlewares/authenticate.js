const jwt = require('jsonwebtoken')
const findAccount = require('../helpers/findAccount')

async function authenticate(req, res, next) {
   const token = req.header('Authorization')?.split(' ')[1]
   if (!token) return next({ status: 400, errors: ['token is required'] })

   const decoded = await jwt.verify(
      token,
      process.env.JWT_TOKEN_KEY,
      (err, data) => {
         if (err) return
         return data
      }
   )
   if (!decoded?.id) return next({ status: 400, errors: ['invalid token'] })
   const {
      account: { _id: userId },
      accType,
   } = await findAccount({ _id: decoded.id })

   if (!accType) return next({ status: 404 })
   req.userId = userId
   req.accType = accType
   next()
}

module.exports = authenticate
