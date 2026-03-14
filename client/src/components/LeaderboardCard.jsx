import { Trophy, Medal, Award } from "lucide-react";
import "./LeaderboardCard.css";

function LeaderboardCard({ donor, rank }) {
  const getMedal = () => {
    if (rank === 1) return <Trophy className="medal-icon gold" />;
    if (rank === 2) return <Medal className="medal-icon silver" />;
    if (rank === 3) return <Award className="medal-icon bronze" />;
    return <span className="rank-number">{rank}</span>;
  };

  const getRankClass = () => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "";
  };

  return (
    <div className={`leaderboard-card ${getRankClass()}`}>
      <div className="rank-section">
        {getMedal()}
      </div>
      <div className="donor-info">
        <div className="donor-avatar">
          {donor.name.charAt(0).toUpperCase()}
        </div>
        <div className="donor-details">
          <h3 className="donor-name">{donor.name}</h3>
          <p className="donor-email">{donor.email}</p>
        </div>
      </div>
      <div className="donation-stats">
        <div className="stat-value">{donor.totalDonations}</div>
        <div className="stat-label">Donations</div>
      </div>
    </div>
  );
}

export default LeaderboardCard;