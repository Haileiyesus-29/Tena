const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const validateMessageReceiver = require('../validations/validateMessage')

const {
   getAllMessages,
   createMessage,
   getMessageThread,
} = require('../controllers/message.controller')

// GET message thread
router.get('/:id', authenticate, validateMessageReceiver, getMessageThread)

// GET all messages
router.get('/', authenticate, getAllMessages)

// POST a new message
router.post('/:id', authenticate, validateMessageReceiver, createMessage)

module.exports = router
