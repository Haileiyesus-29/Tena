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
