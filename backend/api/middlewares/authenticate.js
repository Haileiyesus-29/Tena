const jwt = require('jsonwebtoken')

async function authenticate(req, res, next) {
   const token = req.header('Authorization')?.split(' ')[1]
   if (!token) {
      const error = new Error('Authorization token is missing')
      return next(error)
   }

   try {
      const decoded = await jwt.verify(
         token,
         process.env.JWT_TOKEN_KEY,
         (err, data) => {
            if (err) return
            return data
         }
      )

      if (!decoded.id) return next('Invalid token provided')
      req.userId = decoded.id
      req.accountType = decoded?.accountType
      next()
   } catch (err) {
      return next('Invalid token')
   }
}

module.exports = authenticate
