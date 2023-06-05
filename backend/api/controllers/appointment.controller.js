const Appointment = require('../models/appointment.model')

// Create a new appointment
const createAppointment = async (req, res, next) => {
   try {
      const { doctor, date, time } = req.body

      // Create a new appointment instance
      const appointment = new Appointment({
         doctor: doctor,
         user: req.userId,
         hospital: req.hospitalId,
         bill: req.paymentId,
         date,
         time,
      })

      // Save the appointment to the database
      await appointment.save()

      res.status(201).json({
         message: 'Appointment created successfully',
         appointment,
      })
   } catch (error) {
      next(error)
   }
}

// Get all appointments
const getAllAppointments = async (req, res, next) => {
   let populates = ['doctor', 'user', 'hospital']
   let populateString = populates
      .filter(p => p != [req.accountType])
      .join(' ')
      .trim()

   try {
      const appointments = await Appointment.find({
         [req.accountType]: req.userId,
      })
         .select('date time status')
         .populate(populateString, 'name')

      const formattedAppointments = appointments.map(appointment => {
         return {
            id: appointment._id,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            user_name: appointment?.user?.name,
            doctor_name: appointment?.doctor?.name,
            hospital_name: appointment?.hospital?.name,
         }
      })

      res.status(200).json(formattedAppointments)
   } catch (error) {
      next(error)
   }
}

// Get appointment by ID
const getAppointmentById = async (req, res, next) => {
   let populates = ['doctor', 'user', 'hospital']
   let populateString = populates
      .filter(p => p != [req.accountType])
      .join(' ')
      .trim()

   try {
      const appointmentId = req.params.id
      const appointment = await Appointment.findOne({
         _id: appointmentId,
         [req.accountType]: req.userId,
      }).populate(populateString, '_id name')

      if (!appointment) {
         return res.status(404).json({ message: 'Appointment not found' })
      }

      const formattedAppointments = {
         appointment_id: appointment._id,
         date: appointment.date,
         time: appointment.time,
         bill: appointment.bill,
         status: appointment.status,
         doctor_id: appointment?.doctor?._id,
         doctor_name: appointment?.doctor?.name,
         hospital_id: appointment?.hospital?._id,
         hospital_name: appointment?.hospital?.name,
         user_id: appointment?.user?._id,
         user_name: appointment?.user?.name,
      }

      res.status(200).json(formattedAppointments)
   } catch (error) {
      next(error)
   }
}

// Delete appointment by ID
const deleteAppointmentById = async (req, res, next) => {
   try {
      const appointmentId = req.params.id
      const appointment = await Appointment.findOneAndDelete({
         _id: appointmentId,
         user: req.userId,
      })

      if (!appointment) {
         return res.status(404).json({ message: 'Appointment not found' })
      }

      res.status(200).json({ message: 'Appointment deleted successfully' })
   } catch (error) {
      next(error)
   }
}

module.exports = {
   createAppointment,
   getAllAppointments,
   getAppointmentById,
   deleteAppointmentById,
}
