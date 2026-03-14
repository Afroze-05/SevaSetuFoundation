import { ArrowRight, Target, Users, Calendar } from "lucide-react";
import "./CampaignCard.css";

function CampaignCard({ campaign, onDonate }) {
  const progress = (campaign.collected / campaign.required) * 100;

  return (
    <div className="campaign-card">
      <div className="campaign-image-container">
        <img src={campaign.image} alt={campaign.title} className="campaign-image" />
        <div className="campaign-badge">{campaign.type}</div>
      </div>
      
      <div className="campaign-content">
        <h3 className="campaign-title">{campaign.title}</h3>
        <p className="campaign-description">{campaign.description}</p>
        
        <div className="campaign-stats">
          <div className="stat-item">
            <Target className="stat-icon" />
            <span>Required: {campaign.required}</span>
          </div>
          <div className="stat-item">
            <Users className="stat-icon" />
            <span>Collected: {campaign.collected}</span>
          </div>
        </div>
        
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <span className="progress-text">{Math.round(progress)}%</span>
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