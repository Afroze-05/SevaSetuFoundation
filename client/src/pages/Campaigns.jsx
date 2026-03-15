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

  // Seed campaigns into localStorage if not present
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("campaigns") || "[]");

    if (!existing || existing.length === 0) {
      const seededCampaigns = [
        {
          id: "food-drive",
          title: "Food Donation Drive",
          description:
            "Provide nutritious meals to underprivileged families, children and the homeless across the city.",
          category: "Food",
          goal: 500,
          progress: 120,
          image:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&auto=format&fit=crop",
        },
        {
          id: "stationary-campaign",
          title: "Stationary Donation Campaign",
          description:
            "Support children’s education by donating notebooks, pens, bags and other learning materials.",
          category: "Education",
          goal: 300,
          progress: 80,
          image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop",
        },
        {
          id: "clothes-drive",
          title: "Clothes Donation Drive",
          description:
            "Share warmth by donating gently used clothes for children, women and men in need.",
          category: "Clothing",
          goal: 400,
          progress: 200,
          image:
            "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&auto=format&fit=crop",
        },
        {
          id: "hygiene-collection",
          title: "Toiletries / Hygiene Collection",
          description:
            "Help families maintain dignity and health by contributing soaps, sanitizers, pads and essentials.",
          category: "Hygiene",
          goal: 350,
          progress: 90,
          image:
            "https://images.unsplash.com/photo-1556227702-1b1c1c687a5f?w=900&auto=format&fit=crop",
        },
        {
          id: "accessories-essentials",
          title: "Accessories & Essentials",
          description:
            "Donate bags, footwear, blankets and daily-use accessories for vulnerable communities.",
          category: "Accessories",
          goal: 250,
          progress: 60,
          image:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&auto=format&fit=crop",
        },
        {
          id: "financial-support-fund",
          title: "Financial Support Fund",
          description:
            "Contribute monetarily to help us respond to urgent medical, educational and welfare needs.",
          category: "Financial",
          goal: 100000,
          progress: 42000,
          image:
            "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=900&auto=format&fit=crop",
        },
      ];

      localStorage.setItem("campaigns", JSON.stringify(seededCampaigns));
      setCampaigns(seededCampaigns);
    } else {
      setCampaigns(existing);
    }
  }, []);

  // Listen for storage changes (when admin adds/edits campaigns)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedCampaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
      setCampaigns(storedCampaigns);
    };

    window.addEventListener("storage", handleStorageChange);
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

      <header className="campaigns-hero">
        <div className="campaigns-hero-content">
          <p className="campaigns-kicker">Make a real impact</p>
          <h1>Active Donation Campaigns</h1>
          <p className="campaigns-subtitle">
            Choose a cause close to your heart and support it with in‑kind or financial donations.
          </p>
        </div>
      </header>

      <section className="campaigns-controls">
        <div className="campaigns-search">
          <Search className="campaigns-search-icon" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="campaigns-filter">
          <Filter className="campaigns-filter-icon" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
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
      </section>

      <main className="campaigns-grid">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDonate={() => handleDonateClick(campaign)}
            />
          ))
        ) : (
          <div className="campaigns-empty">
            <Heart className="campaigns-empty-icon" />
            <p>No campaigns found. Try adjusting your filters.</p>
          </div>
        )}
      </main>

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