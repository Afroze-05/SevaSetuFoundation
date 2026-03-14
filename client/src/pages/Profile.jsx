import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Mail, Heart, Bell, Edit, LogOut, Camera } from "lucide-react";
import "./Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, City, State",
    totalDonations: 25,
    notifications: 8
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="avatar-container">
              <div className="profile-avatar">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <button className="avatar-edit-btn">
                <Camera className="camera-icon" />
              </button>
            </div>
            <h1 className="profile-name">{profileData.name}</h1>
            <p className="profile-email">{profileData.email}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-stats">
            <div className="stat-card">
              <Heart className="stat-icon" />
              <div className="stat-info">
                <div className="stat-value">{profileData.totalDonations}</div>
                <div className="stat-label">Total Donations</div>
              </div>
            </div>
            <div className="stat-card">
              <Bell className="stat-icon" />
              <div className="stat-info">
                <div className="stat-value">{profileData.notifications}</div>
                <div className="stat-label">Notifications</div>
              </div>
            </div>
          </div>

          <div className="profile-details-card">
            <div className="card-header">
              <h2>Profile Information</h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  <Edit className="edit-icon" />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={() => setIsEditing(false)} className="cancel-btn">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="save-btn">
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="profile-form">
              <div className="form-group">
                <label>
                  <User className="label-icon" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <div className="form-value">{profileData.name}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <Mail className="label-icon" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <div className="form-value">{profileData.email}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">📞</span>
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <div className="form-value">{profileData.phone}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <span className="label-icon">📍</span>
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="form-input"
                    rows="3"
                  />
                ) : (
                  <div className="form-value">{profileData.address}</div>
                )}
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/donations" className="action-btn primary">
              View My Donations
            </Link>
            <Link to="/campaigns" className="action-btn secondary">
              Browse Campaigns
            </Link>
            <Link to="/" className="action-btn danger">
              <LogOut className="btn-icon" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;