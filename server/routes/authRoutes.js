const express = require("express");
const {
  registerDonor,
  loginDonor,
  registerAdmin,
  loginAdmin,
} = require("../controllers/authController");

const router = express.Router();

// Donor auth
router.post("/donor/register", registerDonor);
router.post("/donor/login", loginDonor);

// Admin auth
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

module.exports = router;



