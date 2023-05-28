const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

async function authenticateUser(req, res, next) {
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

      if (!decoded) return next('Invalid token provided')

      // Extract the user ID from the decoded token
      const userId = decoded?.id

      // Load the user from the database based on the user ID
      const user = await User.findById(userId).select('email, name')
      if (!user) return next('Not found')
      req.user = user
      next()
   } catch (err) {
      return next('Invalid token')
   }
}

module.exports = authenticateUser
