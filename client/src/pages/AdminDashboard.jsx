import { useState } from "react";
import "./AdminDashboard.css";
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
} from "lucide-react";


const initialRequests = [
  {
    id: 1,
    donorName: "Rajesh Kumar",
    campaignType: "Food Donation",
    itemName: "Rice & Pulses",
    quantity: "50 kg",
    pickupLocation: "123 Main Street, City",
    requestedDate: "2024-02-01",
    status: "Pending",
  },
  {
    id: 2,
    donorName: "Priya Sharma",
    campaignType: "Clothes Donation",
    itemName: "Winter Clothes",
    quantity: "30 items",
    pickupLocation: "Park Road, City",
    requestedDate: "2024-02-03",
    status: "Accepted",
  },
];

const initialCampaigns = [
  {
    id: 1,
    title: "Food Donation Drive",
    description: "Providing meals to families in need.",
    image: "",
    category: "Food",
  },
  {
    id: 2,
    title: "Stationary for Students",
    description: "Notebooks and pens for school children.",
    image: "",
    category: "Education",
  },
];

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [requests, setRequests] = useState(initialRequests);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
  });

  const openAddCampaign = () => {
    setEditingCampaign(null);
    setCampaignForm({ title: "", description: "", image: "", category: "" });
    setCampaignModalOpen(true);
  };

  const openEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm(campaign);
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
    if (editingCampaign) {
      // update
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingCampaign.id ? { ...editingCampaign, ...campaignForm } : c
        )
      );
    } else {
      // add
      setCampaigns((prev) => [
        ...prev,
        {
          ...campaignForm,
          id: Date.now(),
        },
      ]);
    }
    setCampaignModalOpen(false);
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const updateRequestStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const renderStatusBadge = (status) => {
    const lower = status.toLowerCase();
    const iconMap = {
      pending: <Clock size={16} />,
      accepted: <CheckCircle size={16} />,
      rejected: <XCircle size={16} />,
    };

    return (
      <span className={`status-chip ${lower}`}>
        {iconMap[lower]}
        <span>{status}</span>
      </span>
    );
  };

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
              activeSection === "requests" ? "active" : ""
            }`}
            onClick={() => setActiveSection("requests")}
          >
            <Inbox size={18} />
            <span>Donation Requests</span>
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
        </nav>

        <button className="sidebar-link logout-link">
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
                <h3>Total Requests</h3>
                <p className="stat-number">{requests.length}</p>
              </div>
              <div className="stat-card">
                <h3>Pending</h3>
                <p className="stat-number">
                  {requests.filter((r) => r.status === "Pending").length}
                </p>
              </div>
              <div className="stat-card">
                <h3>Campaigns</h3>
                <p className="stat-number">{campaigns.length}</p>
              </div>
            </div>
          </section>
        )}

        {activeSection === "requests" && (
          <section className="admin-section">
            <h1>Donation Requests</h1>
            <p className="section-subtitle">
              Review and manage incoming donation requests.
            </p>

            <div className="cards-list">
              {requests.map((req) => (
                <div key={req.id} className="request-card">
                  <div className="request-header">
                    <div>
                      <h3>{req.donorName}</h3>
                      <p className="muted">{req.campaignType}</p>
                    </div>
                    {renderStatusBadge(req.status)}
                  </div>

                  <div className="request-body">
                    <p>
                      <strong>Item:</strong> {req.itemName}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {req.quantity}
                    </p>
                    <p>
                      <strong>Pickup Location:</strong> {req.pickupLocation}
                    </p>
                    <p>
                      <strong>Requested Date:</strong>{" "}
                      {new Date(req.requestedDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="request-actions">
                    <button
                      className="btn-small accept"
                      onClick={() => updateRequestStatus(req.id, "Accepted")}
                    >
                      <CheckCircle size={16} />
                      Accept
                    </button>
                    <button
                      className="btn-small reject"
                      onClick={() => updateRequestStatus(req.id, "Rejected")}
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
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
              {campaigns.map((c) => (
                <div key={c.id} className="campaign-card-admin">
                  <h3>{c.title}</h3>
                  <p className="muted">{c.category}</p>
                  <p className="campaign-desc">{c.description}</p>

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
              ))}
            </div>
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
                <input
                  type="text"
                  name="category"
                  value={campaignForm.category}
                  onChange={handleCampaignChange}
                  required
                  className="form-input"
                  placeholder="Food, Clothes, Education..."
                />
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