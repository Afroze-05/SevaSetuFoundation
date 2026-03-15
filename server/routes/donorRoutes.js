// routes/donorRoutes.js
// This file defines all donor-related API routes.

const express = require("express");
const { registerDonor, loginDonor } = require("../controllers/donorController");

const router = express.Router();

// @route   POST /api/donors/register
// @desc    Donor registration
router.post("/register", registerDonor);

// @route   POST /api/donors/login
// @desc    Donor login
router.post("/login", loginDonor);

module.exports = router;


