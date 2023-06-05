const Hospital = require('../models/hospital.model')
const hashPassword = require('../helpers/hashUserPassword')
const generateToken = require('../helpers/generateToken')
const bcrypt = require('bcrypt');

// Get all hospitals
async function getAllHospitals(req, res, next) {
   try {
      const hospitals = await Hospital.find()
      res.json(hospitals)
   } catch (error) {
      next(error)
   }
}

// Get a single hospital by ID
async function getHospitalById(req, res, next) {
   const { id } = req.params
   try {
      const hospital = await Hospital.findById(id)
      if (!hospital) {
         const error = new Error('Hospital not found')
         error.status = 404
         throw error
      }
      res.json(hospital)
   } catch (error) {
      next(error)
   }
}

// Create a new hospital
async function createHospital(req, res, next) {
   const { name, email, password, address, contactNumber } = req.body
   const hashedPassword = await bcrypt.hash(password, 10);
   try {
      const hospital = await Hospital.create({
         name,
         email,
         password: hashedPassword,
         address,
         contactNumber,
      })
      res.status(201).json(hospital)
   } catch (error) {
      next(error);
      return res.status(500).json({ message: 'Error creating hospital account' });
   }
}

// Update a hospital by ID
async function updateHospitalById(req, res, next) {
   const { id } = req.params
   const { name, email, password, address, contactNumber } = req.body
   try {
      const hospital = await Hospital.findByIdAndUpdate(
         id,
         { name, email, password, address, contactNumber },
         { new: true }
      )
      if (!hospital) {
         const error = new Error('Hospital not found')
         error.status = 404
         throw error
      }
      res.json(hospital)
   } catch (error) {
      next(error)
   }
}

// Delete a hospital by ID
async function deleteHospitalById(req, res, next) {
   const { id } = req.params
   try {
      const hospital = await Hospital.findByIdAndDelete(id)
      if (!hospital) {
         const error = new Error('Hospital not found')
         error.status = 404
         throw error
      }
      res.sendStatus(204)
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getAllHospitals,
   getHospitalById,
   createHospital,
   updateHospitalById,
   deleteHospitalById,
}
