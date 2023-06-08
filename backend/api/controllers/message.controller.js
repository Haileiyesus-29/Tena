const Message = require('../models/message.model')
const User = require('../models/user.model')

// GET a list of message threads
const getAllMessages = async (req, res, next) => {
   const skip = +req.query?.skip || 0
   const limit = +req.query?.limit || 5

   try {
      const messages = await Message.aggregate([
         {
            $match: {
               $or: [{ sender: req.user._id }, { receiver: req.user._id }],
            },
         },
         {
            $sort: { timestamp: 1 }, // Sort by timestamp in descending order
         },
         {
            $lookup: {
               from: 'users',
               let: { sender: '$sender', receiver: '$receiver' },
               pipeline: [
                  {
                     $match: {
                        $expr: {
                           $or: [
                              { $eq: ['$_id', '$$sender'] },
                              { $eq: ['$_id', '$$receiver'] },
                           ],
                        },
                     },
                  },
               ],
               as: 'chattedAccounts',
            },
         },
         {
            $unwind: '$chattedAccounts',
         },
         {
            $group: {
               _id: '$chattedAccounts._id',
               accountName: { $first: '$chattedAccounts.name' },
               accountEmail: { $first: '$chattedAccounts.email' },
            },
         },
         { $skip: skip },
         { $limit: limit },
      ])

      res.status(200).json(messages)
   } catch (error) {
      next(error)
   }
}

// GET all message thread with user
const getMessageThread = async (req, res, next) => {
   const skip = req.query.skip || 0
   const limit = req.query.limit || 10
   const id = req.params.id
   try {
      const chatHistory = await Message.find({
         $or: [
            { sender: req.user._id, receiver: id },
            { sender: id, receiver: req.user._id },
         ],
      })
         .sort({ timestamp: 1 })
         .skip(skip)
         .limit(limit)
      res.status(200).json(chatHistory)
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
