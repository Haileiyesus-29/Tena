const mongoose = require('mongoose');
const Appointment = require('../models/appointment.model');

const createAppointment = async (req, res) => {
  const { user_id, hospital_id, doctor_id, date } = req.body;

  try {
    // Create a new appointment
    const appointment = new Appointment({ user_id, hospital_id, doctor_id, date });
    await appointment.save();
    return res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating appointment', error });
  }
};

const updateAppointment = async (req, res) => {
  const { user_id, hospital_id, doctor_id, date } = req.body;
  const { id } = req.params;

  try {
    // Update the appointment with the given ID
    const appointment = await Appointment.findByIdAndUpdate(id, { user_id, hospital_id, doctor_id, date }, { new: true });
    return res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating appointment', error });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the appointment with the given ID
    await Appointment.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting appointment', error });
  }
};

const getAppointmentsForHospital = async (req, res) => {
  const { id } = req.params;

  try {
    // Find all appointments for the given hospital
    const appointments = await Appointment.find({ hospital_id: id });
    return res.status(200).json({ appointments });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting appointments', error });
  }
};

module.exports = { createAppointment, updateAppointment, deleteAppointment, getAppointmentsForHospital };
