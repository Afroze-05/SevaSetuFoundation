const Volunteer = require("../models/Volunteer");

exports.createVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({ success: true, data: volunteer });
  } catch (err) {
    console.error("createVolunteer error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getMyVolunteerRequests = async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email } : {};
    const volunteers = await Volunteer.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: volunteers });
  } catch (err) {
    console.error("getMyVolunteerRequests error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: volunteers });
  } catch (err) {
    console.error("getAllVolunteers error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateVolunteerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const volunteer = await Volunteer.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, message: "Volunteer request not found" });
    }
    res.json({ success: true, data: volunteer });
  } catch (err) {
    console.error("updateVolunteerStatus error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



