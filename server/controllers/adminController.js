// controllers/adminController.js
// This file contains controller functions for admin registration, login,
// and a protected dashboard example.

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

/**
 * Helper to generate a JWT token for an admin.
 */
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * @desc    Register a new admin
 * @route   POST /api/admin/register
 * @access  Public (should be restricted in real-world apps)
 */
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Name, email and password are required" });
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while registering admin" });
  }
};

/**
 * @desc    Login admin
 * @route   POST /api/admin/login
 * @access  Public
 */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(admin._id);

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while logging in admin" });
  }
};

/**
 * @desc    Example protected admin dashboard route
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin only)
 */
const getAdminDashboard = async (req, res) => {
  try {
    // `req.user` is populated by the auth middleware
    return res.status(200).json({
      success: true,
      message: "Welcome to the admin dashboard",
      data: {
        adminId: req.user.id,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error("Error in getAdminDashboard:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while loading dashboard" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminDashboard,
};