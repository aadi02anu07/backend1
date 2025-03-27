const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Staff = require("../models/Staff");
const Patient = require("../models/Patient");

// ✅ Staff Signup (One-time setup to add doctors/nurses)
router.post("/staff/signup", async (req, res) => {
  try {
    console.log("🟢 Staff Signup Data:", req.body); // Debugging log
    
    const { staffID, name, role, password } = req.body;
    if (!staffID || !name || !role || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new Staff({ staffID, name, role, password: hashedPassword });
    await newStaff.save();
    res.status(201).json({ message: "Staff registered successfully!" });
  } catch (error) {
    console.error("❌ Error Registering Staff:", error);
    res.status(500).json({ error: "Error registering staff" });
  }
});

// ✅ Staff Login
router.post("/staff/login", async (req, res) => {
  try {
    console.log("🟢 Staff Login Attempt:", req.body); // Debugging log
    
    const { staffID, password } = req.body;
    const staff = await Staff.findOne({ staffID });
    if (!staff || !(await bcrypt.compare(password, staff.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", staff });
  } catch (error) {
    console.error("❌ Error Logging In Staff:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// ✅ Patient Signup
router.post("/signup", async (req, res) => {
  try {
    console.log("🟢 Patient Signup Data:", req.body); // Debugging log
    
    const { name, age, bp, sugar, heartRate, patientID, password } = req.body;
    if (!name || !age || !bp || !sugar || !heartRate || !patientID || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = new Patient({ name, age, bp, sugar, heartRate, patientID, password: hashedPassword });
    await newPatient.save();
    res.status(201).json({ message: "Patient registered successfully!" });
  } catch (error) {
    console.error("❌ Error Registering Patient:", error);
    res.status(500).json({ error: "Error registering patient" });
  }
});

// ✅ Patient Login
router.post("/patient/login", async (req, res) => {
  try {
    console.log("🟢 Patient Login Attempt:", req.body); // Debugging log
    
    const { patientID, password } = req.body;
    const patient = await Patient.findOne({ patientID });
    if (!patient || !(await bcrypt.compare(password, patient.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", patient });
  } catch (error) {
    console.error("❌ Error Logging In Patient:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
