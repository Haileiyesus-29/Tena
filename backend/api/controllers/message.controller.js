const Message = require('../models/message.model')
const User = require('../models/user.model')

// GET a list of message threads
const getAllMessages = async (req, res, next) => {
   try {
      // Logic to retrieve all messages
      // ...

      res.status(200).json(/* Retrieved messages */)
   } catch (error) {
      next(error)
   }
}

// GET all message thread with user
const getMessageThread = async (req, res, next) => {
   try {
      const messages = await Message.aggregate([
         {
            $match: {
               $or: [
                  { sender: req.user._id, receiver: req.params.id },
                  { sender: req.params.id, receiver: req.user._id },
               ],
            },
         },
      ])
      res.status(200).json(messages)
   } catch (error) {
      next(error)
   }
}

// POST a new message
const createMessage = async (req, res, next) => {
   try {
      const receiver = await User.findById(req.params.id)
      if (!receiver) return next({ message: 'Not found', status: 404 })

      const message = new Message({
         sender: req.user._id,
         receiver,
         content: req.body.content,
      })
      await message.save()
      res.status(201).json(message)
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getAllMessages,
   createMessage,
   getMessageThread,
}
