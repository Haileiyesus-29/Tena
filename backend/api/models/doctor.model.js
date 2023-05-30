const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: 3,
         maxlength: 30,
      },
      specialty: {
         type: String,
         required: true,
      },
      hospital_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Hospital',
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         match: /^\S+@\S+\.\S+$/,
         trim: true,
      },
      password: {
         type: String,
         required: true,
         minlength: 8,
         maxlength: 100,
      },
   },
   { versionKey: false }
)

module.exports = mongoose.model('Doctor', doctorSchema)
