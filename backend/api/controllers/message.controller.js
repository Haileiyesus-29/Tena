const Message = require('../models/message.model')
const User = require('../models/user.model')

// GET a list of message threads
const getAllMessages = async (req, res, next) => {
   const skip = +req.query?.skip || 0
   const limit = +req.query?.limit || 5

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
}

// GET all message thread with user
const getMessageThread = async (req, res, next) => {
   const skip = req.query.skip || 0
   const limit = req.query.limit || 10

   const chatHistory = await Message.find({
      $or: [
         { sender: req.user._id, receiver: req.params?.id },
         { sender: req.params?.id, receiver: req.user._id },
      ],
   })
      .sort({ timestamp: 1 })
      .skip(skip)
      .limit(limit)

   if (!chatHistory) return next({ status: 404 })
   res.status(200).json(chatHistory)
}

// POST a new message
const createMessage = async (req, res, next) => {
   const receiver = await User.findById(req.params.id)
   if (!receiver) return next({ status: 404 })

   const message = new Message({
      sender: req.user._id,
      receiver,
      content: req.body.content,
   })
   await message.save()
   if (!message) return next({ status: 500 })
   res.status(201).json(message)
}

module.exports = {
   getAllMessages,
   createMessage,
   getMessageThread,
}
