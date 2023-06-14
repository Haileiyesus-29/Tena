const jwt = require('jsonwebtoken')
const findAccount = require('../helpers/findAccount')

async function authenticate(req, res, next) {
   const token = req.header('Authorization')?.split(' ')[1]
   if (!token) return next({ message: 'Bad Request', status: 400 })

   try {
      const decoded = await jwt.verify(
         token,
         process.env.JWT_TOKEN_KEY,
         (err, data) => {
            if (err) return
            return data
         }
      )
      if (!decoded.id) return next({ message: 'Bad Request', status: 400 })
      const {
         account: { _id: userId },
         accType,
      } = await findAccount({ _id: decoded.id })

      if (!account) return next({ message: 'Not Found', status: 404 })
      req.userId = userId
      req.accType = accType
      next()
   } catch (err) {
      return next({ message: 'Bad Request', status: 400 })
   }
}

module.exports = authenticate
