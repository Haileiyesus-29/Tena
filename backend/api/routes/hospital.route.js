const express = require('express')
const router = express.Router()
const validateForm = require('../validations/validateForm')
const authenticate = require('../middlewares/authenticate')

const {
   getAllHospitals,
   getHospitalById,
   createHospital,
   updateHospital,
   deleteHospital,
} = require('../controllers/hospital.controller')

// GET all hospitals
router.get('/', getAllHospitals)

// GET a single hospital by ID
router.get('/:id', getHospitalById)

// CREATE a new hospital
router.post('/', validateForm, createHospital)

// UPDATE a hospital by ID
router.put('/me', authenticate, updateHospital)

// DELETE a hospital by ID
router.delete('/me', authenticate, deleteHospital)

module.exports = router
