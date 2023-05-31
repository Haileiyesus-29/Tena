const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
   {
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      receiver: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Doctor',
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      timestamp: {
         type: Date,
         default: () => Date.now(),
      },
   },
   { versionKey: false }
)

messageSchema.set('toJSON', {
   transform: (_, obj) => {
      obj.id = obj._id
      delete obj._id
   },
})
module.exports = mongoose.model('Message', messageSchema)
