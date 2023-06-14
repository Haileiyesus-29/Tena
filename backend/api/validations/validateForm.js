const findAccount = require('../helpers/findAccount')
const emailValidator = require('../helpers/emailValidator')
const nameValidator = require('../helpers/nameValidator')
const passwordValidator = require('../helpers/passwordValidator')

async function validateForm(req, res, next) {
   const { name, email, password } = req.body

   // Validation checks
   const nameErrors = nameValidator(name)
   const passwordErrors = passwordValidator(password)
   const emailErrors = emailValidator(email)

   const errors = [...nameErrors, ...passwordErrors, ...emailErrors]
   const { account } = await findAccount({ email })
   if (account) errors.push('this email is taken')

   // Check if there are any errors
   if (errors.length > 0) {
      const error = new Error()
      error.errors = errors
      return next(error)
   }
   // Validation passed
   next()
}

module.exports = validateForm
