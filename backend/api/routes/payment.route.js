const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')

const {
   getAllPayments,
   getPaymentById,
} = require('../controllers/payment.controller')

// Get all Payments
router.get('/', authenticate, getAllPayments)

// Get Payment by ID
router.get('/:id', authenticate, getPaymentById)

module.exports = router
