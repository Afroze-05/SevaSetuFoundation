import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";
import DonationModal from "../components/DonationModal";
import { Search, Filter, Heart } from "lucide-react";
import "./Campaigns.css";

function Campaigns() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [campaigns, setCampaigns] = useState([]);

  // Load campaigns from localStorage
  useEffect(() => {
    const storedCampaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
    setCampaigns(storedCampaigns);
  }, []);

  // Listen for storage changes (when admin adds/edits campaigns)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedCampaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
      setCampaigns(storedCampaigns);
    };
    
    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event (same-tab updates)
    window.addEventListener("campaignsUpdated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("campaignsUpdated", handleStorageChange);
    };
  }, []);

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
      campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      campaign.category?.toLowerCase() === filterType.toLowerCase();

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
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDonate={() => handleDonateClick(campaign)}
            />
          ))
        ) : (
          <div className="no-results">
            <Heart className="no-results-icon" size={48} />
            <p>No campaigns found. Check back later!</p>
          </div>
        )}
      </div>

      <DonationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        campaign={selectedCampaign}
      />

      <Footer />
    </div>
  );
}

export default Campaigns;