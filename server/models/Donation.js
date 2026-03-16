const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    donorName: { type: String, required: true },
    donorEmail: { type: String, required: true },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
    campaignTitle: { type: String },
    itemName: { type: String },
    quantity: { type: Number },
    amount: { type: Number },
    pickupLocation: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);



