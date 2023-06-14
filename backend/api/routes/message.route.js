const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')

const {
   getAllMessages,
   createMessage,
   getMessageThread,
} = require('../controllers/message.controller')

// GET message thread
router.get('/:id', authenticate, getMessageThread)

// GET all messages
router.get('/', authenticate, getAllMessages)

// POST a new message
router.post('/:id', authenticate, createMessage)

module.exports = router
