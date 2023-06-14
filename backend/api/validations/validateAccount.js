const bcrypt = require('bcryptjs')
const generateToken = require('../helpers/generateToken')
const findAccount = require('../helpers/findAccount')

async function validateAccount(req, res, next) {
   const { email, password } = req.body

   // Check if email and password are provided
   if (!email || !password) {
      const error = new Error('Email and password are required')
      return next(error)
   }

   const { account, accType } = await findAccount({ email })
   if (!account) return next({ message: 'Bad Request', status: 400 })
   const hasCorrectCredential = await bcrypt.compare(password, account.password)
   if (!hasCorrectCredential)
      return next({ message: 'Bad Request', status: 400 })

   const token = await generateToken({ id: account._id })
   res.status(200).json({ account, accType, token })
}

module.exports = validateAccount
