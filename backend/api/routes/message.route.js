const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const {
   getAllMessages,
   createMessage,
   getMessageThread,
} = require('../controllers/message.controller')

/**
 * @route  GET /api/messages/:receiverId
 * @description Get message thread with a specific receiver
 * @param  {string} receiverId - The ID of the message receiver
 * @header  {string} Authorization - User's JWT token
 */
router.get('/:receiverId', authenticate, getMessageThread)

/**
 * @route  GET /api/messages
 * @description Get all messages
 * @header  {string} Authorization - User's JWT token
 */
router.get('/', authenticate, getAllMessages)

/**
 * @route  POST /api/messages/:receiverId
 * @description Create a new message
 * @param  {string} receiverId - The ID of the message receiver
 * @param  {string} content - The content of the message
 * @header  {string} Authorization - User's JWT token
 */
router.post('/:receiverId', authenticate, createMessage)

module.exports = router
