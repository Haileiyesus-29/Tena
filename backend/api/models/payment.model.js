const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
   {
      patient_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      hospital_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Hospital',
         required: true,
      },
      payment_amount: {
         type: Number,
         required: true,
      },
      payment_method: {
         type: String,
         required: true,
      },
      payment_timestamp: {
         type: Date,
         default: Date.now,
      },
   },
   { versionKey: false }
)

module.exports = mongoose.model('Payment', paymentSchema)
