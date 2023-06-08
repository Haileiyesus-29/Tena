const express = require('express')
const router = express.Router()
const validateForm = require('../validations/validateForm')
const authenticate = require('../middlewares/authenticate')
const checkEmailInUse = require('../middlewares/checkEmailInUse')
const {
   getAllDoctors,
   getDoctorById,
   createDoctor,
   updateDoctor,
   deleteDoctor,
} = require('../controllers/doctor.controller')

// GET all doctors
router.get('/', getAllDoctors)

// GET a single doctor by ID
router.get('/:id', getDoctorById)

// CREATE a new doctor
router.post('/', validateForm, checkEmailInUse, authenticate, createDoctor)

// UPDATE a doctor by ID
router.put('/me', authenticate, updateDoctor)

// DELETE a doctor by ID
router.delete('/me', authenticate, deleteDoctor)

module.exports = router
