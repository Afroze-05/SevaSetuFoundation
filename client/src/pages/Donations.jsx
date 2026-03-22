import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, XCircle, Clock, Package } from "lucide-react";
import "./Donations.css";
import { readLocalJson } from "../services/api";

function Donations() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("all");
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Check if donor is logged in
    let loggedInDonor = null;
    try {
      const raw = localStorage.getItem("loggedInDonor");
      loggedInDonor = raw ? JSON.parse(raw) : null;
    } catch {
      loggedInDonor = null;
    }
    if (!loggedInDonor) {
      navigate("/login");
      return;
    }

    // Load donations for this donor
    const allDonations = JSON.parse(localStorage.getItem("donorDonations") || "[]");
    const donorDonations = allDonations.filter(
      (donation) => donation.donorEmail === loggedInDonor.email
    );
    setDonations(donorDonations);
  }, [navigate]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedInDonor = readLocalJson("loggedInDonor", null);
      if (loggedInDonor && loggedInDonor.email) {
        const allDonations = readLocalJson("donorDonations", []);
        const donorDonations = allDonations.filter(
          (donation) => donation.donorEmail === loggedInDonor.email
        );
        setDonations(donorDonations);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("donationsUpdated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("donationsUpdated", handleStorageChange);
    };
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle className="status-icon accepted" />;
      case "Rejected":
        return <XCircle className="status-icon rejected" />;
      case "Pending":
        return <Clock className="status-icon pending" />;
      default:
        return null;
    }
  };


  const filteredDonations = filterStatus === "all" 
    ? donations 
    : donations.filter(d => d.status.toLowerCase() === filterStatus.toLowerCase());

  return (
    <div className="donations-page">
      <Navbar />
      
      <div className="donations-header">
        <h1 className="page-title">My Donations</h1>
        <p className="page-subtitle">Track all your donation requests and their status</p>
      </div>

      <div className="donations-filters">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="status-filter"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="donations-container">
        {filteredDonations.length > 0 ? (
          <div className="donations-table">
            <div className="table-header">
              <div className="table-cell">Campaign</div>
              <div className="table-cell">Donation Details</div>
              <div className="table-cell">Date</div>
              <div className="table-cell">Status</div>
            </div>
            
            {filteredDonations.map(donation => (
              <div key={donation.id} className="table-row">
                <div className="table-cell">
                  <strong>{donation.campaignTitle}</strong>
                  <span className="donation-type">
                    {donation.type || donation.campaignType}
                  </span>
                </div>
                <div className="table-cell">
                  <div className="donation-details">
                    <span className="item-name">
                      {donation.itemName || donation.type || "—"}
                    </span>
                    <span className="item-quantity">
                      {donation.amount || donation.quantity || "—"}
                    </span>
                  </div>
                </div>
                <div className="table-cell">
                  <span className="donation-date">
                    {new Date(donation.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="table-cell">
                  <div className="status-badge">
                    {getStatusIcon(donation.status || "Pending")}
                    <span
                      className={`status-text ${String(
                        donation.status || "Pending"
                      ).toLowerCase()}`}
                    >
                      {donation.status || "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-donations">
            <Package className="no-donations-icon" />
            <p>No donations found</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Donations;