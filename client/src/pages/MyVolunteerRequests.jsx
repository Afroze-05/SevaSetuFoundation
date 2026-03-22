import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, XCircle, Clock, Users } from "lucide-react";
import "./MyVolunteerRequests.css";
import { readLocalJson } from "../services/api";

function MyVolunteerRequests() {
  const navigate = useNavigate();
  const [volunteerRequests, setVolunteerRequests] = useState([]);

  useEffect(() => {
    // Check if donor is logged in
    const loggedInDonor = JSON.parse(localStorage.getItem("loggedInDonor") || "{}");
    if (!loggedInDonor || !loggedInDonor.email) {
      navigate("/login");
      return;
    }

    // Load volunteer requests for this donor
    const allRequests = JSON.parse(localStorage.getItem("volunteerRequests") || "[]");
    const donorRequests = allRequests.filter(
      (request) => request.email === loggedInDonor.email
    );
    setVolunteerRequests(donorRequests);
  }, [navigate]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedInDonor = readLocalJson("loggedInDonor", null);
      if (loggedInDonor && loggedInDonor.email) {
        const allRequests = readLocalJson("volunteerRequests", []);
        const donorRequests = allRequests.filter(
          (request) => request.email === loggedInDonor.email
        );
        setVolunteerRequests(donorRequests);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("volunteerRequestsUpdated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("volunteerRequestsUpdated", handleStorageChange);
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

  return (
    <div className="volunteer-requests-page">
      <Navbar />
      
      <div className="volunteer-requests-header">
        <h1 className="page-title">My Volunteer Requests</h1>
        <p className="page-subtitle">Track all your volunteer applications and their status</p>
      </div>

      <div className="volunteer-requests-container">
        {volunteerRequests.length > 0 ? (
          <div className="volunteer-requests-list">
            {volunteerRequests.map((request) => (
              <div key={request.id} className="volunteer-request-card">
                <div className="request-header">
                  <div className="request-title-section">
                    <h3>{request.name}</h3>
                    <span className="request-email">{request.email}</span>
                  </div>
                  <div className="status-badge">
                    {getStatusIcon(request.status || "Pending")}
                    <span
                      className={`status-text ${String(
                        request.status || "Pending"
                      ).toLowerCase()}`}
                    >
                      {request.status || "Pending"}
                    </span>
                  </div>
                </div>

                <div className="request-details">
                  <div className="detail-item">
                    <strong>Phone:</strong> {request.phone}
                  </div>
                  <div className="detail-item">
                    <strong>Address:</strong> {request.address}
                  </div>
                  <div className="detail-item">
                    <strong>Availability:</strong> {request.availability}
                  </div>
                  <div className="detail-item">
                    <strong>Skills:</strong> {request.skills || "Not specified"}
                  </div>
                  <div className="detail-item">
                    <strong>Motivation:</strong>
                    <p className="motivation-text">{request.motivation}</p>
                  </div>
                  <div className="detail-item">
                    <strong>Application Date:</strong>{" "}
                    {new Date(request.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-requests">
            <Users className="no-requests-icon" size={48} />
            <p>No volunteer requests found. Apply to become a volunteer!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default MyVolunteerRequests;