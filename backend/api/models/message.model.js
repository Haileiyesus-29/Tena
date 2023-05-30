const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
   {
      sender_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      receiver_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Doctor',
         required: true,
      },
      message_content: {
         type: String,
         required: true,
      },
      timestamp: {
         type: Date,
         default: Date.now,
      },
   },
   { versionKey: false }
)

module.exports = mongoose.model('Message', messageSchema)
