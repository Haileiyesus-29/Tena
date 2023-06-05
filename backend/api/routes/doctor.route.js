const express = require("express");
const router = express.Router();
const isAuthorized = require('../middlewares/isAuthorized');
const authDoctor = require('../middlewares/authDoctor')
const hashPassword = require('../helpers/hashUserPassword')
const generateToken = require('../helpers/generateToken')

const {
  createDoctor,
  getDoctor,
  deleteDoctor,
  updateDoctor,
} = require("../controllers/doctor.controller");

router.post("/", createDoctor);
router.patch("/:id", updateDoctor);
router.get("/:id", getDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;

