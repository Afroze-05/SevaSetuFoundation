const express = require("express");
const {
  createDonation,
  getMyDonations,
  getAllDonations,
  updateDonationStatus,
} = require("../controllers/donationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Donor
router.post("/", authMiddleware.authenticate, createDonation);
router.get("/me", authMiddleware.authenticate, getMyDonations);

// Admin
router.get("/", authMiddleware.requireAdmin, getAllDonations);
router.patch("/:id/status", authMiddleware.requireAdmin, updateDonationStatus);

module.exports = router;



