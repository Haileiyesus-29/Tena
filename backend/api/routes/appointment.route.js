const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const validateAppointment = require('../validations/validateAppointment')
const makePayment = require('../middlewares/makePayment')
const {
   createAppointment,
   getAllAppointments,
   getAppointmentById,
   deleteAppointmentById,
} = require('../controllers/appointment.controller')

// Create a new appointment
router.post(
   '/',
   authenticate,
   validateAppointment,
   makePayment,
   createAppointment
)

// Get all appointments
router.get('/', authenticate, getAllAppointments)

// Get appointment by ID
router.get('/:id', authenticate, getAppointmentById)

// Delete appointment by ID
router.delete('/:id', authenticate, deleteAppointmentById)

module.exports = router
