// controllers/donorController.js
// This file contains controller functions for donor registration and login.

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Donor = require("../models/Donor");

/**
 * Helper to generate a JWT token for a donor.
 */
const generateToken = (donorId) => {
  return jwt.sign({ id: donorId, role: "donor" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * @desc    Register a new donor
 * @route   POST /api/donors/register
 * @access  Public
 */
const registerDonor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email and password are required" });
    }

    // Check if donor already exists with same email
    const existingDonor = await Donor.findOne({ email: email.toLowerCase() });
    if (existingDonor) {
      return res
        .status(400)
        .json({ success: false, message: "Donor with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create donor
    const donor = await Donor.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Optionally generate token on registration as well
    const token = generateToken(donor._id);

    return res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      data: {
        _id: donor._id,
        name: donor.name,
        email: donor.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in registerDonor:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while registering donor" });
  }
};

/**
 * @desc    Login donor
 * @route   POST /api/donors/login
 * @access  Public
 */
const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const donor = await Donor.findOne({ email: email.toLowerCase() });

    if (!donor) {
      // Specific message requested by requirements
      return res.status(404).json({
        success: false,
        message: "Registration not done. Please register first.",
      });
    }

    const isMatch = await bcrypt.compare(password, donor.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(donor._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: donor._id,
        name: donor.name,
        email: donor.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in loginDonor:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while logging in donor" });
  }
};

module.exports = {
  registerDonor,
  loginDonor,
};