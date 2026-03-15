import { ArrowRight, Target, Heart } from "lucide-react";
import "./CampaignCard.css";

function CampaignCard({ campaign, onDonate }) {
  // Calculate progress percentage
  const goal = campaign.goal || 100;
  const progress = campaign.progress || 0;
  const progressPercent = Math.min((progress / goal) * 100, 100);

  // Default image if none provided
  const defaultImages = {
    Food: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
    Education: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
    Clothing: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600",
    Hygiene: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600",
    Accessories: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
    Financial: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600"
  };

  const imageUrl = campaign.image || defaultImages[campaign.category] || defaultImages.Food;

  return (
    <div className="campaign-card">
      <div className="campaign-image-container">
        <img src={imageUrl} alt={campaign.title} className="campaign-image" />
        <div className="campaign-badge">{campaign.category || "General"}</div>
      </div>
      
      <div className="campaign-content">
        <h3 className="campaign-title">{campaign.title}</h3>
        <p className="campaign-description">{campaign.description}</p>
        
        <div className="campaign-stats">
          <div className="stat-item">
            <Target className="stat-icon" />
            <span>Goal: {goal}</span>
          </div>
          <div className="stat-item">
            <Heart className="stat-icon" />
            <span>Progress: {progress}</span>
          </div>
        </div>
        
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercent}%` }}
          >
            <span className="progress-text">{Math.round(progressPercent)}%</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="campaign-donate-btn"
        onClick={onDonate}
      >
        Donate Now
        <ArrowRight className="btn-arrow" />
      </button>
    </div>
  );
}

export default CampaignCard;