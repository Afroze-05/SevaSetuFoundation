import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Edit, LogOut, Camera, LayoutDashboard } from "lucide-react";
import "./AdminProfile.css";
import { readLocalJson } from "../services/api";

function AdminProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    totalCampaigns: 0,
    notifications: 0
  });

  // Load admin data from localStorage
  useEffect(() => {
    const loggedInAdmin = readLocalJson("loggedInAdmin", null);
    const campaigns = readLocalJson("campaigns", []);
    
    if (loggedInAdmin && loggedInAdmin.email) {
      setProfileData({
        name: loggedInAdmin.name || "",
        email: loggedInAdmin.email || "",
        phone: loggedInAdmin.phone || "",
        address: loggedInAdmin.address || "",
        totalCampaigns: campaigns.length,
        notifications: 0
      });
    } else {
      // Redirect to login if not logged in
      navigate("/admin-login");
    }
  }, [navigate]);

  // Update campaigns count when campaigns change
  useEffect(() => {
    const handleStorageChange = () => {
      const campaigns = readLocalJson("campaigns", []);
      setProfileData(prev => ({
        ...prev,
        totalCampaigns: campaigns.length
      }));
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("campaignsUpdated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("campaignsUpdated", handleStorageChange);
    };
  }, []);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Save updated profile to localStorage
    const updatedAdmin = {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address
    };
    localStorage.setItem("loggedInAdmin", JSON.stringify(updatedAdmin));
    localStorage.setItem("admin", JSON.stringify(updatedAdmin));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    // Reload original data
    const loggedInAdmin = readLocalJson("loggedInAdmin", {});
    const campaigns = readLocalJson("campaigns", []);
    
    setProfileData({
      name: loggedInAdmin.name || "",
      email: loggedInAdmin.email || "",
      phone: loggedInAdmin.phone || "",
      address: loggedInAdmin.address || "",
      totalCampaigns: campaigns.length,
      notifications: 0
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-container">
        <div className="admin-profile-header">
          <div className="admin-profile-avatar-section">
            <div className="avatar-container">
              <div className="admin-profile-avatar">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <button className="avatar-edit-btn">
                <Camera className="camera-icon" />
              </button>
            </div>
            <h1 className="admin-profile-name">{profileData.name}</h1>
            <p className="admin-profile-email">{profileData.email}</p>
          </div>
        </div>

        <div className="admin-profile-content">
          <div className="admin-profile-stats">
            <div className="stat-card">
              <LayoutDashboard className="stat-icon" />
              <div className="stat-info">
                <div className="stat-value">{profileData.totalCampaigns}</div>
                <div className="stat-label">Total Campaigns Managed</div>
              </div>
            </div>
            <div className="stat-card">
              <Mail className="stat-icon" />
              <div className="stat-info">
                <div className="stat-value">{profileData.notifications}</div>
                <div className="stat-label">Notifications</div>
              </div>
            </div>
          </div>

          <div className="admin-profile-details-card">
            <div className="card-header">
              <h2>Profile Information</h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  <Edit className="edit-icon" />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={handleCancel} className="cancel-btn">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="save-btn">
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="admin-profile-form">
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
                  <Phone className="label-icon" />
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
                  <div className="form-value">{profileData.phone || "Not provided"}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <MapPin className="label-icon" />
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
                  <div className="form-value">{profileData.address || "Not provided"}</div>
                )}
              </div>
            </div>
          </div>

          <div className="admin-profile-actions">
            <Link to="/admin-dashboard" className="action-btn primary">
              <LayoutDashboard className="btn-icon" />
              Back to Dashboard
            </Link>
            <button onClick={handleLogout} className="action-btn danger">
              <LogOut className="btn-icon" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;