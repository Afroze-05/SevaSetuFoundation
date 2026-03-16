const express = require("express");
const {
  createVolunteer,
  getMyVolunteerRequests,
  getAllVolunteers,
  updateVolunteerStatus,
} = require("../controllers/volunteerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public create
router.post("/", createVolunteer);

// Donor's own requests (by email)
router.get("/me", getMyVolunteerRequests);

// Admin
router.get("/", authMiddleware.requireAdmin, getAllVolunteers);
router.patch("/:id/status", authMiddleware.requireAdmin, updateVolunteerStatus);

module.exports = router;



