import { ArrowRight, Target, Heart } from "lucide-react";
import "./CampaignCard.css";

function CampaignCard({ campaign, onDonate }) {
  const goal = campaign.goal || 100;
  const progress = campaign.progress || 0;
  const progressPercent = Math.min((progress / goal) * 100, 100);

  const defaultImages = {
    Food: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&auto=format&fit=crop",
    Education:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&auto=format&fit=crop",
    Clothing:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&auto=format&fit=crop",
    Hygiene:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&auto=format&fit=crop",
    Accessories:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=900&auto=format&fit=crop",
    Financial:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&auto=format&fit=crop",
  };

  const imageUrl =
    campaign.image || defaultImages[campaign.category] || defaultImages.Food;

  return (
    <article className="campaign-card">
      <div className="campaign-card-media">
        <img
          src={imageUrl}
          alt={campaign.title}
          className="campaign-card-image"
        />
        <span className="campaign-card-badge">
          {campaign.category || "General"}
        </span>
      </div>

      <div className="campaign-card-body">
        <h3 className="campaign-card-title">{campaign.title}</h3>
        <p className="campaign-card-description">{campaign.description}</p>

        <div className="campaign-card-stats">
          <div className="campaign-card-stat">
            <Target className="campaign-card-stat-icon" />
            <div>
              <p className="campaign-card-stat-label">Goal</p>
              <p className="campaign-card-stat-value">
                {campaign.category === "Financial" ? `₹${goal}` : goal}
              </p>
            </div>
          </div>
          <div className="campaign-card-stat">
            <Heart className="campaign-card-stat-icon donated" />
            <div>
              <p className="campaign-card-stat-label">Collected</p>
              <p className="campaign-card-stat-value">
                {campaign.category === "Financial" ? `₹${progress}` : progress}
              </p>
            </div>
          </div>
        </div>

        <div className="campaign-card-progress">
          <div
            className="campaign-card-progress-bar"
            style={{ width: `${progressPercent}%` }}
          >
            <span className="campaign-card-progress-text">
              {Math.round(progressPercent)}%
            </span>
          </div>
        </div>
      </div>

      <button type="button" className="campaign-card-btn" onClick={onDonate}>
        Donate Now
        <ArrowRight className="campaign-card-btn-icon" />
      </button>
    </article>
  );
}

export default CampaignCard;