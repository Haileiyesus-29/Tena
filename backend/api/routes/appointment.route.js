const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { validateUserId, validateHospitalId, validateDoctorId, checkDoctorScheduleConflict } = require('../middlewares/appointmentsMiddlewares');
const { checkUserAuth } = require('../middlewares/checkUserAuth');

// Create a new appointment
router.post('/create', validateUserId, validateHospitalId, validateDoctorId, checkDoctorScheduleConflict, appointmentController.createAppointment);

// Update an existing appointment
router.put('/update/:id', validateUserId, validateHospitalId, validateDoctorId, checkDoctorScheduleConflict, checkUserAuth, appointmentController.updateAppointment);

// Delete an appointment
router.delete('/delete/:id', appointmentController.deleteAppointment);

// Get all appointments for a hospital
router.get('/hospital/:id', appointmentController.getAppointmentsForHospital);

module.exports = router;
