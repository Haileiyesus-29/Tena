const express = require('express')
const router = express.Router()
const {
   getAllHospitals,
   getHospitalById,
   createHospital,
   updateHospitalById,
   deleteHospitalById,
} = require('../controllers/hospital.controller')

// GET all hospitals
router.get('/', getAllHospitals)

// GET a single hospital by ID
router.get('/:id', getHospitalById)

// CREATE a new hospital
router.post('/', createHospital)

// UPDATE a hospital by ID
router.put('/:id', updateHospitalById)

// DELETE a hospital by ID
router.delete('/:id', deleteHospitalById)

module.exports = router
