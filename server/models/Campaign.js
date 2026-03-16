const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    goal: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

const defaultCampaigns = [
  {
    title: "Food Donation Drive",
    description:
      "Support daily meals for underprivileged communities through our food donation drive.",
    category: "Food",
    image: "/images/food-drive.jpg",
    goal: 100000,
    progress: 25000,
  },
  {
    title: "Stationary Donation Campaign",
    description:
      "Help children get access to notebooks, pens, and learning material.",
    category: "Education",
    image: "/images/stationary.jpg",
    goal: 50000,
    progress: 12000,
  },
  {
    title: "Clothes Donation Drive",
    description:
      "Provide warm and clean clothes to families in need across the city.",
    category: "Clothes",
    image: "/images/clothes-drive.jpg",
    goal: 75000,
    progress: 30000,
  },
  {
    title: "Toiletries / Hygiene Collection",
    description:
      "Ensure access to basic hygiene items like soap, toothpaste, and sanitary products.",
    category: "Hygiene",
    image: "/images/hygiene.jpg",
    goal: 40000,
    progress: 8000,
  },
  {
    title: "Accessories & Essentials",
    description:
      "Distribute bags, blankets, footwear, and daily essentials to those in need.",
    category: "Essentials",
    image: "/images/accessories.jpg",
    goal: 60000,
    progress: 15000,
  },
  {
    title: "Financial Support Fund",
    description:
      "Contribute to our financial support fund for emergency medical and education aid.",
    category: "Financial",
    image: "/images/financial-support.jpg",
    goal: 200000,
    progress: 50000,
  },
];

async function seedDefaultCampaigns() {
  const count = await Campaign.countDocuments();
  if (count === 0) {
    await Campaign.insertMany(defaultCampaigns);
    console.log("Seeded default campaigns");
  }
}

module.exports = { Campaign, seedDefaultCampaigns };



