const { Campaign } = require("../models/Campaign");

exports.getCampaigns = async (req, res) => {
  try {
    const { search = "", category } = req.query;
    const query = { isActive: true };

    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }
    if (category) {
      query.category = category;
    }

    const campaigns = await Campaign.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: campaigns });
  } catch (err) {
    console.error("getCampaigns error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json({ success: true, data: campaign });
  } catch (err) {
    console.error("createCampaign error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!campaign) {
      return res
        .status(404)
        .json({ success: false, message: "Campaign not found" });
    }
    res.json({ success: true, data: campaign });
  } catch (err) {
    console.error("updateCampaign error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByIdAndDelete(id);
    if (!campaign) {
      return res
        .status(404)
        .json({ success: false, message: "Campaign not found" });
    }
    res.json({ success: true, message: "Campaign deleted" });
  } catch (err) {
    console.error("deleteCampaign error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



