const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema(
   {
      patient_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      doctor_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Doctor',
         required: true,
      },
      hospital_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Hospital',
         required: true,
      },
      appointment_date: {
         type: Date,
         required: true,
      },
      appointment_time: {
         type: String,
         required: true,
      },
   },
   { versionKey: false }
)

module.exports = mongoose.model('Appointment', appointmentSchema)
