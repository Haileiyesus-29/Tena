const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: 3,
         maxlength: 30,
         validate: {
            validator: function (value) {
               const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/
               return !specialCharsRegex.test(value)
            },
            message: 'Name must not contain special characters',
         },
      },
      email: {
         type: String,
         required: true,
         unique: true,
         validate: {
            validator: function (value) {
               // Regular expression for email validation
               const emailRegex =
                  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
               return emailRegex.test(value)
            },
            message: 'Invalid email format',
         },
      },
      password: {
         type: String,
         required: true,
         minlengh: 8,
         validate: {
            validator: function (value) {
               const uppercaseRegex = /[A-Z]/
               const lowercaseRegex = /[a-z]/
               const numberRegex = /[0-9]/
               const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/

               return (
                  uppercaseRegex.test(value) &&
                  lowercaseRegex.test(value) &&
                  numberRegex.test(value) &&
                  specialCharsRegex.test(value)
               )
            },
            message:
               'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
         },
      },
      created_at: {
         type: Date,
         default: () => Date.now(),
      },
   },
   { versionKey: false } // Set versionKey option to false
)

const User = mongoose.model('User', userSchema)

module.exports = User
