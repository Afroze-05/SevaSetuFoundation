import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  User,
  Mail,
  Heart,
  Bell,
  Edit,
  LogOut,
  Camera,
  Phone,
  MapPin,
} from "lucide-react";
import "./Profile.css";
import { readLocalJson } from "../services/api";

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    totalDonations: 0,
    notifications: 0,
  });

  // Load donor data from localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      const loggedInDonor = readLocalJson("loggedInDonor", null);
      const donorDonations = readLocalJson("donorDonations", []);

      if (loggedInDonor && loggedInDonor.email) {
        const donorDonationCount = donorDonations.filter(
          (donation) => donation.donorEmail === loggedInDonor.email
        ).length;

        setProfileData({
          name: loggedInDonor.name || "",
          email: loggedInDonor.email || "",
          phone: loggedInDonor.phone || "",
          address: loggedInDonor.address || "",
          totalDonations: donorDonationCount,
          notifications: 0,
        });
        setLoading(false);
      } else {
        navigate("/login");
      }
    }, 400); // small delay to show "Loading..."

    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedDonor = {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
    };
    localStorage.setItem("loggedInDonor", JSON.stringify(updatedDonor));
    localStorage.setItem("donor", JSON.stringify(updatedDonor));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    const loggedInDonor = readLocalJson("loggedInDonor", {});
    const donorDonations = readLocalJson("donorDonations", []);
    const donorDonationCount = donorDonations.filter(
      (donation) => donation.donorEmail === loggedInDonor.email
    ).length;

    setProfileData({
      name: loggedInDonor.name || "",
      email: loggedInDonor.email || "",
      phone: loggedInDonor.phone || "",
      address: loggedInDonor.address || "",
      totalDonations: donorDonationCount,
      notifications: 0,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInDonor");
    localStorage.removeItem("donorToken");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="profile-loading-page">
        <p className="profile-loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-shell">
        <header className="profile-header">
          <div className="profile-header-gradient" />
          <div className="profile-header-content">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-circle">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <button className="profile-avatar-edit">
                <Camera className="profile-avatar-icon" />
              </button>
            </div>
            <div className="profile-header-text">
              <h1>{profileData.name}</h1>
              <p>{profileData.email}</p>
            </div>
          </div>
        </header>

        <main className="profile-main">
          <section className="profile-stats-row">
            <div className="profile-stat-card">
              <Heart className="profile-stat-icon heart" />
              <div>
                <p className="profile-stat-label">Total Donations</p>
                <p className="profile-stat-value">
                  {profileData.totalDonations}
                </p>
              </div>
            </div>
            <div className="profile-stat-card">
              <Bell className="profile-stat-icon bell" />
              <div>
                <p className="profile-stat-label">Notifications</p>
                <p className="profile-stat-value">
                  {profileData.notifications}
                </p>
              </div>
            </div>
          </section>

          <section className="profile-card">
            <div className="profile-card-header">
              <h2>Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="profile-edit-btn"
                >
                  <Edit className="profile-edit-icon" />
                  Edit Profile
                </button>
              ) : (
                <div className="profile-edit-actions">
                  <button
                    onClick={handleCancel}
                    className="profile-cancel-btn"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="profile-save-btn"
                    type="button"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="profile-form-grid">
              <div className="profile-form-group">
                <label>
                  <User className="profile-label-icon" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profileData.name}</p>
                )}
              </div>

              <div className="profile-form-group">
                <label>
                  <Mail className="profile-label-icon" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">{profileData.email}</p>
                )}
              </div>

              <div className="profile-form-group">
                <label>
                  <Phone className="profile-label-icon" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="profile-input"
                  />
                ) : (
                  <p className="profile-value">
                    {profileData.phone || "Not provided"}
                  </p>
                )}
              </div>

              <div className="profile-form-group wide">
                <label>
                  <MapPin className="profile-label-icon" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="profile-input"
                    rows={3}
                  />
                ) : (
                  <p className="profile-value">
                    {profileData.address || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="profile-actions-row">
            <Link to="/donations" className="profile-action-btn primary">
              View My Donations
            </Link>
            <Link to="/campaigns" className="profile-action-btn secondary">
              Browse Campaigns
            </Link>
            <button
              onClick={handleLogout}
              className="profile-action-btn danger"
              type="button"
            >
              <LogOut className="profile-action-icon" />
              Logout
            </button>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;