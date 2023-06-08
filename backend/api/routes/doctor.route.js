const express = require("express");
const router = express.Router();
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
