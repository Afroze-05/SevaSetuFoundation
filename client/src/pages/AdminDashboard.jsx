import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { readLocalJson } from "../services/api";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Plus,
  Users,
  User,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [donationRequests, setDonationRequests] = useState([]);
  const [volunteerRequests, setVolunteerRequests] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    goal: "",
    progress: "0",
  });

  // Check admin login and load data
  useEffect(() => {
    const loggedInAdmin = readLocalJson("loggedInAdmin", null);
    if (!loggedInAdmin || !loggedInAdmin.email) {
      navigate("/admin-login");
      return;
    }

    // Load all data from localStorage
    loadData();
  }, [navigate]);

  const loadData = () => {
    const storedDonations = readLocalJson("donorDonations", []);
    const storedVolunteers = readLocalJson("volunteerRequests", []);
    const storedCampaigns = readLocalJson("campaigns", []);

    setDonationRequests(storedDonations);
    setVolunteerRequests(storedVolunteers);
    setCampaigns(storedCampaigns);
  };

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      loadData();
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("donationsUpdated", handleStorageChange);
    window.addEventListener("volunteerRequestsUpdated", handleStorageChange);
    window.addEventListener("campaignsUpdated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("donationsUpdated", handleStorageChange);
      window.removeEventListener("volunteerRequestsUpdated", handleStorageChange);
      window.removeEventListener("campaignsUpdated", handleStorageChange);
    };
  }, []);

  const openAddCampaign = () => {
    setEditingCampaign(null);
    setCampaignForm({
      title: "",
      description: "",
      image: "",
      category: "",
      goal: "",
      progress: "0",
    });
    setCampaignModalOpen(true);
  };

  const openEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      title: campaign.title || "",
      description: campaign.description || "",
      image: campaign.image || "",
      category: campaign.category || "",
      goal: campaign.goal || "",
      progress: campaign.progress || "0",
    });
    setCampaignModalOpen(true);
  };

  const closeCampaignModal = () => {
    setCampaignModalOpen(false);
  };

  const handleCampaignChange = (e) => {
    const { name, value } = e.target;
    setCampaignForm((f) => ({ ...f, [name]: value }));
  };

  const handleSaveCampaign = (e) => {
    e.preventDefault();
    const storedCampaigns = readLocalJson("campaigns", []);

    if (editingCampaign) {
      // Update existing campaign
      const updatedCampaigns = storedCampaigns.map((c) =>
        c.id === editingCampaign.id
          ? {
              ...c,
              ...campaignForm,
              goal: parseInt(campaignForm.goal) || 100,
              progress: parseInt(campaignForm.progress) || 0,
            }
          : c
      );
      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
    } else {
      // Add new campaign
      const newCampaign = {
        id: Date.now().toString(),
        ...campaignForm,
        goal: parseInt(campaignForm.goal) || 100,
        progress: parseInt(campaignForm.progress) || 0,
      };
      storedCampaigns.push(newCampaign);
      localStorage.setItem("campaigns", JSON.stringify(storedCampaigns));
    }

    window.dispatchEvent(new Event("campaignsUpdated"));
    setCampaignModalOpen(false);
    loadData();
  };

  const handleDeleteCampaign = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      const storedCampaigns = readLocalJson("campaigns", []);
      const updatedCampaigns = storedCampaigns.filter((c) => c.id !== id);
      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
      window.dispatchEvent(new Event("campaignsUpdated"));
      loadData();
    }
  };

  const updateDonationStatus = (id, status) => {
    const storedDonations = readLocalJson("donorDonations", []);
    const updatedDonations = storedDonations.map((d) =>
      d.id === id ? { ...d, status } : d
    );
    localStorage.setItem("donorDonations", JSON.stringify(updatedDonations));
    window.dispatchEvent(new Event("donationsUpdated"));
    loadData();
  };

  const updateVolunteerStatus = (id, status) => {
    const storedVolunteers = readLocalJson("volunteerRequests", []);
    const updatedVolunteers = storedVolunteers.map((v) =>
      v.id === id ? { ...v, status } : v
    );
    localStorage.setItem("volunteerRequests", JSON.stringify(updatedVolunteers));
    window.dispatchEvent(new Event("volunteerRequestsUpdated"));
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInAdmin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/");
  };

  const renderStatusBadge = (status) => {
    const lower = String(status || "Pending").toLowerCase();
    const iconMap = {
      pending: <Clock size={16} />,
      accepted: <CheckCircle size={16} />,
      rejected: <XCircle size={16} />,
    };

    return (
      <span className={`status-chip ${lower}`}>
        {iconMap[lower] || <Clock size={16} />}
        <span>{status || "Pending"}</span>
      </span>
    );
  };

  // Calculate stats
  const totalDonationRequests = donationRequests.length;
  const pendingDonationRequests = donationRequests.filter(
    (r) => (r.status || "Pending") === "Pending"
  ).length;
  const totalVolunteerRequests = volunteerRequests.length;
  const pendingVolunteerRequests = volunteerRequests.filter(
    (r) => (r.status || "Pending") === "Pending"
  ).length;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <LayoutDashboard size={24} />
          <span>SevaSetu Admin</span>
        </div>

        <nav className="sidebar-menu">
          <button
            className={`sidebar-link ${
              activeSection === "dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className={`sidebar-link ${
              activeSection === "donations" ? "active" : ""
            }`}
            onClick={() => setActiveSection("donations")}
          >
            <Inbox size={18} />
            <span>Donation Requests</span>
          </button>
          <button
            className={`sidebar-link ${
              activeSection === "volunteers" ? "active" : ""
            }`}
            onClick={() => setActiveSection("volunteers")}
          >
            <Users size={18} />
            <span>Volunteer Requests</span>
          </button>
          <button
            className={`sidebar-link ${
              activeSection === "campaigns" ? "active" : ""
            }`}
            onClick={() => setActiveSection("campaigns")}
          >
            <FolderKanban size={18} />
            <span>Campaign Management</span>
          </button>
          <button
            className={`sidebar-link ${
              activeSection === "profile" ? "active" : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <User size={18} />
            <span>Admin Profile</span>
          </button>
        </nav>

        <button className="sidebar-link logout-link" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {activeSection === "dashboard" && (
          <section className="admin-section">
            <h1>Admin Dashboard</h1>
            <p className="section-subtitle">
              Overview of donation activity and campaigns.
            </p>

            <div className="admin-cards-grid">
              <div className="stat-card">
                <h3>Total Donation Requests</h3>
                <p className="stat-number">{totalDonationRequests}</p>
              </div>
              <div className="stat-card">
                <h3>Pending Donations</h3>
                <p className="stat-number">{pendingDonationRequests}</p>
              </div>
              <div className="stat-card">
                <h3>Total Campaigns</h3>
                <p className="stat-number">{campaigns.length}</p>
              </div>
              <div className="stat-card">
                <h3>Volunteer Requests</h3>
                <p className="stat-number">{totalVolunteerRequests}</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === "donations" && (
          <section className="admin-section">
            <h1>Donation Requests</h1>
            <p className="section-subtitle">
              Review and manage incoming donation requests.
            </p>

            <div className="cards-list">
              {donationRequests.length > 0 ? (
                donationRequests.map((req) => (
                  <div key={req.id} className="request-card">
                    <div className="request-header">
                      <div>
                        <h3>{req.donorName}</h3>
                        <p className="muted">{req.donorEmail}</p>
                        {req.phone && (
                          <p className="muted">{req.phone}</p>
                        )}
                      </div>
                      {renderStatusBadge(req.status)}
                    </div>

                    <div className="request-body">
                      <p>
                        <strong>Campaign:</strong> {req.campaignTitle}
                      </p>
                      {req.campaignId && (
                        <p>
                          <strong>Campaign ID:</strong> {req.campaignId}
                        </p>
                      )}
                      <p>
                        <strong>Type:</strong>{" "}
                        {req.type || req.campaignType || "—"}
                      </p>
                      <p>
                        <strong>Item:</strong> {req.itemName || "—"}
                      </p>
                      <p>
                        <strong>Quantity / Amount:</strong>{" "}
                        {req.amount || req.quantity || "—"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {req.address || req.pickupLocation || "—"}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(req.date).toLocaleDateString()}
                      </p>
                    </div>

                    {(req.status || "Pending") === "Pending" && (
                      <div className="request-actions">
                        <button
                          className="btn-small accept"
                          onClick={() => updateDonationStatus(req.id, "Accepted")}
                        >
                          <CheckCircle size={16} />
                          Accept
                        </button>
                        <button
                          className="btn-small reject"
                          onClick={() => updateDonationStatus(req.id, "Rejected")}
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <Inbox size={48} />
                  <p>No donation requests found.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "volunteers" && (
          <section className="admin-section">
            <h1>Volunteer Requests</h1>
            <p className="section-subtitle">
              Review and manage volunteer applications.
            </p>

            <div className="cards-list">
              {volunteerRequests.length > 0 ? (
                volunteerRequests.map((req) => (
                  <div key={req.id} className="request-card">
                    <div className="request-header">
                      <div>
                        <h3>{req.name}</h3>
                        <p className="muted">{req.email}</p>
                        <p className="muted">{req.phone}</p>
                      </div>
                      {renderStatusBadge(req.status)}
                    </div>

                    <div className="request-body">
                      <p>
                        <strong>Address:</strong> {req.address}
                      </p>
                      <p>
                        <strong>Availability:</strong> {req.availability}
                      </p>
                      <p>
                        <strong>Skills:</strong> {req.skills || "Not specified"}
                      </p>
                      <p>
                        <strong>Motivation:</strong>
                      </p>
                      <p className="motivation-text">{req.motivation}</p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(req.date).toLocaleDateString()}
                      </p>
                    </div>

                    {(req.status || "Pending") === "Pending" && (
                      <div className="request-actions">
                        <button
                          className="btn-small accept"
                          onClick={() => updateVolunteerStatus(req.id, "Accepted")}
                        >
                          <CheckCircle size={16} />
                          Accept
                        </button>
                        <button
                          className="btn-small reject"
                          onClick={() => updateVolunteerStatus(req.id, "Rejected")}
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <Users size={48} />
                  <p>No volunteer requests found.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "campaigns" && (
          <section className="admin-section">
            <div className="section-header-row">
              <div>
                <h1>Campaign Management</h1>
                <p className="section-subtitle">
                  Add, edit or remove NGO campaigns.
                </p>
              </div>
              <button className="btn-primary-custom" onClick={openAddCampaign}>
                <Plus size={18} />
                Add Campaign
              </button>
            </div>

            <div className="cards-list">
              {campaigns.length > 0 ? (
                campaigns.map((c) => (
                  <div key={c.id} className="campaign-card-admin">
                    <h3>{c.title}</h3>
                    <p className="muted">{c.category}</p>
                    <p className="campaign-desc">{c.description}</p>
                    <p className="campaign-stats">
                      Goal: {c.goal || 100} | Progress: {c.progress || 0}
                    </p>

                    <div className="campaign-actions-row">
                      <button
                        className="btn-small"
                        onClick={() => openEditCampaign(c)}
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        className="btn-small danger"
                        onClick={() => handleDeleteCampaign(c.id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <FolderKanban size={48} />
                  <p>No campaigns found. Create your first campaign!</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === "profile" && (
          <section className="admin-section">
            <h1>Admin Profile</h1>
            <p className="section-subtitle">
              <a href="/admin-profile" style={{ color: "var(--primary-green)" }}>
                View and edit your profile
              </a>
            </p>
          </section>
        )}
      </main>

      {/* Campaign Add/Edit Modal */}
      {campaignModalOpen && (
        <div
          className="donation-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("donation-modal-overlay")) {
              closeCampaignModal();
            }
          }}
        >
          <div className="donation-modal">
            <button
              className="donation-modal-close"
              onClick={closeCampaignModal}
            >
              ✕
            </button>
            <h2 className="donation-modal-title">
              {editingCampaign ? "Edit Campaign" : "Add Campaign"}
            </h2>

            <form onSubmit={handleSaveCampaign} className="donation-modal-form">
              <div className="form-group">
                <label>Campaign Title *</label>
                <input
                  type="text"
                  name="title"
                  value={campaignForm.title}
                  onChange={handleCampaignChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={campaignForm.description}
                  onChange={handleCampaignChange}
                  required
                  rows={3}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Campaign Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={campaignForm.image}
                  onChange={handleCampaignChange}
                  className="form-input"
                  placeholder="Optional image URL"
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={campaignForm.category}
                  onChange={handleCampaignChange}
                  required
                  className="form-input"
                >
                  <option value="">Select category</option>
                  <option value="Food">Food</option>
                  <option value="Education">Education</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Hygiene">Hygiene</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Financial">Financial</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Goal *</label>
                  <input
                    type="number"
                    name="goal"
                    value={campaignForm.goal}
                    onChange={handleCampaignChange}
                    required
                    className="form-input"
                    placeholder="100"
                  />
                </div>
                <div className="form-group">
                  <label>Initial Progress</label>
                  <input
                    type="number"
                    name="progress"
                    value={campaignForm.progress}
                    onChange={handleCampaignChange}
                    className="form-input"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="donation-modal-actions">
                <button
                  type="button"
                  className="btn-secondary-custom"
                  onClick={closeCampaignModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-custom">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;