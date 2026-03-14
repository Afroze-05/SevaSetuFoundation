import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeaderboardCard from "../components/LeaderboardCard";
import { Trophy, Calendar, Users } from "lucide-react";
import "./Leaderboard.css";

function Leaderboard() {
  const [timeframe, setTimeframe] = useState("week");

  const weeklyDonors = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", totalDonations: 45 },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", totalDonations: 38 },
    { id: 3, name: "Amit Patel", email: "amit@example.com", totalDonations: 32 },
    { id: 4, name: "Sneha Reddy", email: "sneha@example.com", totalDonations: 28 },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", totalDonations: 25 }
  ];

  const monthlyDonors = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", totalDonations: 180 },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", totalDonations: 165 },
    { id: 3, name: "Amit Patel", email: "amit@example.com", totalDonations: 142 },
    { id: 4, name: "Sneha Reddy", email: "sneha@example.com", totalDonations: 128 },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", totalDonations: 115 }
  ];

  const activeDonors = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", totalDonations: 45 },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", totalDonations: 38 },
    { id: 3, name: "Amit Patel", email: "amit@example.com", totalDonations: 32 },
    { id: 4, name: "Sneha Reddy", email: "sneha@example.com", totalDonations: 28 },
    { id: 5, name: "Vikram Singh", email: "vikram@example.com", totalDonations: 25 },
    { id: 6, name: "Anjali Mehta", email: "anjali@example.com", totalDonations: 22 },
    { id: 7, name: "Rahul Verma", email: "rahul@example.com", totalDonations: 20 },
    { id: 8, name: "Kavita Nair", email: "kavita@example.com", totalDonations: 18 }
  ];

  const getDonors = () => {
    if (timeframe === "week") return weeklyDonors;
    if (timeframe === "month") return monthlyDonors;
    return activeDonors;
  };

  return (
    <div className="leaderboard-page">
      <Navbar />
      
      <div className="leaderboard-header">
        <Trophy className="header-icon" />
        <h1 className="page-title">Top Donors Leaderboard</h1>
        <p className="page-subtitle">Celebrating our most generous contributors</p>
      </div>

      <div className="timeframe-selector">
        <button
          className={`timeframe-btn ${timeframe === "week" ? "active" : ""}`}
          onClick={() => setTimeframe("week")}
        >
          <Calendar className="btn-icon" />
          Top Donor of the Week
        </button>
        <button
          className={`timeframe-btn ${timeframe === "month" ? "active" : ""}`}
          onClick={() => setTimeframe("month")}
        >
          <Calendar className="btn-icon" />
          Top Donor of the Month
        </button>
        <button
          className={`timeframe-btn ${timeframe === "active" ? "active" : ""}`}
          onClick={() => setTimeframe("active")}
        >
          <Users className="btn-icon" />
          Active Donors
        </button>
      </div>

      <div className="leaderboard-container">
        <div className="leaderboard-list">
          {getDonors().map((donor, index) => (
            <LeaderboardCard
              key={donor.id}
              donor={donor}
              rank={index + 1}
            />
          ))}
        </div>

        <div className="leaderboard-sidebar">
          <div className="sidebar-card">
            <h3>🏆 Recognition</h3>
            <p>Thank you to all our donors for their continued support and generosity!</p>
          </div>
          <div className="sidebar-card">
            <h3>📊 Statistics</h3>
            <div className="stat-item">
              <span>Total Donors:</span>
              <strong>2,500+</strong>
            </div>
            <div className="stat-item">
              <span>Total Donations:</span>
              <strong>15,000+</strong>
            </div>
            <div className="stat-item">
              <span>This Month:</span>
              <strong>1,200+</strong>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Leaderboard;