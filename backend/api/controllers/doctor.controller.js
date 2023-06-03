const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctor.model");


// Create doctor profile
const createDoctor = asyncHandler(async (req, res) => {
  const { name,speciality, hospital_id, email, password} = req.body;

  //   Validation
  if (!name || !speciality || !hospital_id || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }
  // Create doctor account
  const Doctor = await Doctor.create({
    user: req.user.id,
    name,
    speciality,
    hospital_id,
    email,
    password,
    //image: fileData,
  });

  res.status(201).json(product);
});

// Get all the doctors
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({ hospital: req.hospital.id }).sort("-createdAt");
  res.status(200).json(products);
});

// Get one doctor
const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  // if doctor doesnt exist
  if (!doctor) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Match doctor to its hospital
  if (doctor.hospital.toString() !== req.hospital.id) {
    res.status(401);
    throw new Error("Hospital not authorized");
  }
  res.status(200).json(doctor);
});

// Delete Doctor
const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  // if doctor doesnt exist
  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }
  // Match doctor to its hospital
  if (doctor.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Hospital not authorized");
  }
  await doctor.remove();
  res.status(200).json({ message: "Doctor account deleted." });
});

// Update doctor account
const updateDoctor = asyncHandler(async (req, res) => {
  const { name,speciality, hospital_id, email, password} = req.body;
  const { id } = req.params;

  const doctor = await Doctor.findById(id);

  // if doctor doesnt exist
  if (!doctor) {
    res.status(404);
    throw new Error("doctor not found");
  }
  // Match doctor to its hospital
  if (doctor.hospital.toString() !== req.hospital.id) {
    res.status(401);
    throw new Error("Hospital not authorized");
  }

  // Update Doctor
  const updateDoctor = await doctor.findByIdAndUpdate(
    { _id: id },
    {
        name,
        speciality, 
        hospital_id, 
        email, 
        password
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updateDoctor);
});


module.exports = {
  createDoctor,
  getDoctor,
  getDoctor,
  deleteDoctor,
  updateDoctor,
};
