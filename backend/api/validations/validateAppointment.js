const Doctor = require('../models/doctor.model')

const validateAppointment = async (req, res, next) => {
   const { doctor: doctorId, date, time } = req.body

   try {
      // Check if the doctor is valid
      const doctor = await Doctor.findById(doctorId)
      if (!doctor) {
         return res.status(404).json({ error: 'Invalid doctor' })
      }

      // Check if the date and time are provided
      if (!date || !time) {
         return res.status(400).json({ error: 'Date and time are required' })
      }

      // Check if the date and time are not behind the current date and time
      const appointmentDateTime = new Date(`${date}T${time}`)
      if (isNaN(appointmentDateTime) || appointmentDateTime < new Date()) {
         return res.status(400).json({ error: 'Invalid date or time' })
      }

      // Check if the appointment time is between 8:00 a.m. and 5:00 p.m.
      const startTime = new Date(`${date}T08:00`)
      const endTime = new Date(`${date}T17:00`)

      if (appointmentDateTime < startTime || appointmentDateTime > endTime) {
         return res.status(400).json({
            error: 'Appointment time must be between 8:00 a.m. and 5:00 p.m.',
         })
      }

      req.hospitalId = doctor.hospital_id

      next()
   } catch (error) {
      next(error)
   }
}

module.exports = validateAppointment
