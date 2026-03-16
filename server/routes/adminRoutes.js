// routes/adminRoutes.js
// This file defines all admin-related API routes.

const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAdminDashboard,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/admin/register
// @desc    Admin registration
router.post("/register", registerAdmin);

// @route   POST /api/admin/login
// @desc    Admin login
router.post("/login", loginAdmin);

// @route   GET /api/admin/dashboard
// @desc    Protected dashboard route (admin only)
router.get("/dashboard", authMiddleware, getAdminDashboard);

module.exports = router;