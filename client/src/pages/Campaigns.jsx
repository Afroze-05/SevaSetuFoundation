import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";
import DonationModal from "../components/DonationModal";
import { Search, Filter } from "lucide-react";
import "./Campaigns.css";

function Campaigns() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // FIXED: missing states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const campaigns = [
    {
      id: 1,
      title: "Food Donation Drive",
      description:
        "Help us provide nutritious meals to families in need. Every contribution counts!",
      type: "Food",
      required: 500,
      collected: 320,
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
    },
    {
      id: 2,
      title: "Stationary Donation Campaign",
      description:
        "Support education by donating books, notebooks, pens, and other school supplies.",
      type: "Education",
      required: 200,
      collected: 150,
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
    },
    {
      id: 3,
      title: "Clothes Donation Drive",
      description:
        "Donate clean, gently used clothing to help those in need stay warm and comfortable.",
      type: "Clothing",
      required: 1000,
      collected: 450,
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600",
    },
    {
      id: 4,
      title: "Toiletries Collection",
      description:
        "Essential hygiene products for families. Soap, toothpaste, sanitary items needed.",
      type: "Hygiene",
      required: 300,
      collected: 180,
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
    },
    {
      id: 5,
      title: "Accessories & Essentials",
      description:
        "Donate bags, shoes, and other essential accessories for daily use.",
      type: "Accessories",
      required: 400,
      collected: 250,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
    },
    {
      id: 6,
      title: "Financial Support Fund",
      description:
        "Monetary donations to support our various programs and emergency relief efforts.",
      type: "Financial",
      required: 100000,
      collected: 65000,
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600",
    },
  ];

  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      campaign.type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="campaigns-page">
      <Navbar />

      <div className="campaigns-header">
        <h1 className="page-title">Our Campaigns</h1>
        <p className="page-subtitle">
          Choose a campaign and make a difference today
        </p>
      </div>

      <div className="campaigns-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <Filter className="filter-icon" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="food">Food</option>
            <option value="education">Education</option>
            <option value="clothing">Clothing</option>
            <option value="hygiene">Hygiene</option>
            <option value="accessories">Accessories</option>
            <option value="financial">Financial</option>
          </select>
        </div>
      </div>

      <div className="campaigns-grid">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onDonate={() => handleDonateClick(campaign)}
          />
        ))}
      </div>

      <DonationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        campaignType={selectedCampaign?.type || selectedCampaign?.title}
      />

      <Footer />
    </div>
  );
}

export default Campaigns;