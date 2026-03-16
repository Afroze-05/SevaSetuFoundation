const Donation = require("../models/Donation");

exports.createDonation = async (req, res) => {
  try {
    const {
      campaignId,
      campaignTitle,
      itemName,
      quantity,
      amount,
      pickupLocation,
      phone,
    } = req.body;

    const donation = await Donation.create({
      donor: req.user.id,
      donorName: req.user.name,
      donorEmail: req.user.email,
      campaign: campaignId || undefined,
      campaignTitle,
      itemName,
      quantity,
      amount,
      pickupLocation,
      phone,
      status: "Pending",
    });

    res.status(201).json({ success: true, data: donation });
  } catch (err) {
    console.error("createDonation error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: donations });
  } catch (err) {
    console.error("getMyDonations error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json({ success: true, data: donations });
  } catch (err) {
    console.error("getAllDonations error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!donation) {
      return res
        .status(404)
        .json({ success: false, message: "Donation not found" });
    }
    res.json({ success: true, data: donation });
  } catch (err) {
    console.error("updateDonationStatus error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



