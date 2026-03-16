const express = require("express");
const {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCampaigns);

// Admin-only routes
router.post("/", authMiddleware.requireAdmin, createCampaign);
router.put("/:id", authMiddleware.requireAdmin, updateCampaign);
router.delete("/:id", authMiddleware.requireAdmin, deleteCampaign);

module.exports = router;



