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

/**
 * @route  GET /api/hospitals
 * @description Get all hospitals
 */
router.get('/', getAllHospitals)

/**
 * @route  GET /api/hospitals/:id
 * @description Get a single hospital by ID
 * @param  {string} id - The ID of the hospital
 */
router.get('/:id', getHospitalById)

/**
 * @route  POST /api/hospitals
 * @description Create a new hospital
 * @param  {string} contactNumber - The contact number of the hospital
 * @param  {string} name - The name of the hospital
 * @param  {string} email - The email of the hospital
 * @param  {string} address - The address of the hospital
 * @param  {string} password - The password of the hospital
 */
router.post('/', validateForm, createHospital)

/**
 * @route  PUT /api/hospitals/me
 * @description Update a hospital by ID
 * @param  {string} contactNumber - The updated contact number of the hospital
 * @param  {string} name - The updated name of the hospital
 * @param  {string} address - The updated address of the hospital
 * @param  {string} password - The updated password of the hospital
 * @header  {string} Authorization - Hospital's JWT token
 */
router.put('/me', authenticate, updateHospital)

/**
 * @route  DELETE /api/hospitals/me
 * @description Delete a hospital by ID
 * @header  {string} Authorization - Hospital's JWT token
 */
router.delete('/me', authenticate, deleteHospital)

module.exports = router
