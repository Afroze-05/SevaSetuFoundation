import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeaderboardCard from "../components/LeaderboardCard";
import { Trophy, Calendar, Users } from "lucide-react";
import "./Leaderboard.css";
import { readLocalJson } from "../services/api";

function parseMoneyish(val) {
  if (val == null || val === "") return 0;
  const n = parseFloat(String(val).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function filterByTimeframe(donations, tf) {
  const now = new Date();
  if (tf === "active") return donations;
  const cutoff = new Date();
  if (tf === "week") cutoff.setDate(now.getDate() - 7);
  if (tf === "month") cutoff.setMonth(now.getMonth() - 1);
  return donations.filter((d) => {
    const t = new Date(d.date);
    return !Number.isNaN(t.getTime()) && t >= cutoff;
  });
}

function aggregateDonors(donations, sortBy) {
  const byEmail = {};
  for (const d of donations) {
    const email = d.donorEmail;
    if (!email) continue;
    if (!byEmail[email]) {
      byEmail[email] = {
        id: email,
        email,
        name: d.donorName || email,
        totalDonations: 0,
        totalAmount: 0,
      };
    }
    byEmail[email].totalDonations += 1;
    byEmail[email].totalAmount += parseMoneyish(d.amount || d.quantity);
    if (d.donorName) byEmail[email].name = d.donorName;
  }
  const list = Object.values(byEmail);
  list.sort((a, b) => {
    if (sortBy === "amount") {
      if (b.totalAmount !== a.totalAmount) return b.totalAmount - a.totalAmount;
      return b.totalDonations - a.totalDonations;
    }
    if (b.totalDonations !== a.totalDonations) return b.totalDonations - a.totalDonations;
    return b.totalAmount - a.totalAmount;
  });
  return list;
}

function Leaderboard() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("week");
  const [sortBy, setSortBy] = useState("count");
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    let donor = null;
    try {
      const raw = localStorage.getItem("loggedInDonor");
      donor = raw ? JSON.parse(raw) : null;
    } catch {
      donor = null;
    }
    if (!donor) {
      navigate("/login");
    }
  }, [navigate]);

  const load = () => {
    setDonations(readLocalJson("donorDonations", []));
  };

  useEffect(() => {
    load();
    const onChange = () => load();
    window.addEventListener("storage", onChange);
    window.addEventListener("donationsUpdated", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("donationsUpdated", onChange);
    };
  }, []);

  const rankedDonors = useMemo(() => {
    const filtered = filterByTimeframe(donations, timeframe);
    return aggregateDonors(filtered, sortBy);
  }, [donations, timeframe, sortBy]);

  const stats = useMemo(() => {
    const filtered = filterByTimeframe(donations, timeframe);
    const unique = new Set(filtered.map((d) => d.donorEmail).filter(Boolean));
    const totalAmt = filtered.reduce(
      (sum, d) => sum + parseMoneyish(d.amount || d.quantity),
      0
    );
    return {
      donorCount: unique.size,
      donationCount: filtered.length,
      totalAmount: totalAmt,
    };
  }, [donations, timeframe]);

  return (
    <div className="leaderboard-page">
      <Navbar />

      <div className="leaderboard-header">
        <Trophy className="header-icon" />
        <h1 className="page-title">Top Donors Leaderboard</h1>
        <p className="page-subtitle">
          Rankings from recorded donations (grouped by donor email)
        </p>
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

      <div className="leaderboard-sort-row">
        <span className="leaderboard-sort-label">Rank by:</span>
        <button
          type="button"
          className={`timeframe-btn ${sortBy === "count" ? "active" : ""}`}
          onClick={() => setSortBy("count")}
        >
          Donation count
        </button>
        <button
          type="button"
          className={`timeframe-btn ${sortBy === "amount" ? "active" : ""}`}
          onClick={() => setSortBy("amount")}
        >
          Total amount (parsed)
        </button>
      </div>

      <div className="leaderboard-container">
        <div className="leaderboard-list">
          {rankedDonors.length > 0 ? (
            rankedDonors.map((donor, index) => (
              <LeaderboardCard
                key={donor.email}
                donor={donor}
                rank={index + 1}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
              No donations in this period yet. Make a donation to appear on the board.
            </p>
          )}
        </div>

        <div className="leaderboard-sidebar">
          <div className="sidebar-card">
            <h3>🏆 Recognition</h3>
            <p>Thank you to all our donors for their continued support and generosity!</p>
          </div>
          <div className="sidebar-card">
            <h3>📊 Statistics</h3>
            <div className="stat-item">
              <span>Donors (unique emails):</span>
              <strong>{stats.donorCount}</strong>
            </div>
            <div className="stat-item">
              <span>Donations (this filter):</span>
              <strong>{stats.donationCount}</strong>
            </div>
            <div className="stat-item">
              <span>Sum of parsed amounts:</span>
              <strong>
                {stats.totalAmount > 0
                  ? `₹${Math.round(stats.totalAmount).toLocaleString()}`
                  : "—"}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Leaderboard;
