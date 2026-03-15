import { useEffect, useState } from "react";
import "./DonationModal.css";

function DonationModal({ isOpen, onClose, campaign }) {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    amount: "",
    pickupLocation: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [donorInfo, setDonorInfo] = useState(null);

  // Lock scroll when modal is open
  // Load donor info from localStorage
  useEffect(() => {
    const loggedInDonor = JSON.parse(localStorage.getItem("loggedInDonor") || "{}");
    setDonorInfo(loggedInDonor);
    
    if (loggedInDonor && isOpen) {
      setFormData((prev) => ({
        ...prev,
        phone: loggedInDonor.phone || "",
        pickupLocation: loggedInDonor.address || "",
      }));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData({
        itemName: "",
        quantity: "",
        amount: "",
        pickupLocation: donorInfo?.address || "",
        phone: donorInfo?.phone || "",
      });
    }
  }, [isOpen, donorInfo]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("donation-modal-overlay")) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!donorInfo || !donorInfo.email) {
      alert("Please login as a donor first!");
      onClose();
      return;
    }

    // Create donation object
    const donation = {
      id: Date.now().toString(),
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      phone: formData.phone || donorInfo.phone,
      address: donorInfo.address,
      campaignTitle: campaign?.title || "General Campaign",
      campaignType: campaign?.category || "General",
      itemName: formData.itemName,
      quantity: formData.quantity,
      amount: formData.amount || formData.quantity,
      pickupLocation: formData.pickupLocation,
      date: new Date().toISOString().split("T")[0],
      status: "Pending"
    };

    // Save to localStorage
    const existingDonations = JSON.parse(localStorage.getItem("donorDonations") || "[]");
    existingDonations.push(donation);
    localStorage.setItem("donorDonations", JSON.stringify(existingDonations));

    // Update campaign progress (optional - can be done by admin)
    if (campaign) {
      const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
      const updatedCampaigns = campaigns.map((c) => {
        if (c.id === campaign.id) {
          return {
            ...c,
            progress: (c.progress || 0) + 1
          };
        }
        return c;
      });
      localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
      window.dispatchEvent(new Event("campaignsUpdated"));
    }

    setSubmitted(true);
  };

  return (
    <div className="donation-modal-overlay" onClick={handleOverlayClick}>
      <div className="donation-modal">
        <button className="donation-modal-close" onClick={onClose}>
          ✕
        </button>

        {!submitted ? (
          <>
            <h2 className="donation-modal-title">
              Donate to {campaign?.title || "Campaign"}
            </h2>
            <p className="donation-modal-subtitle">
              Fill the details below to send your donation request.
            </p>

            <form onSubmit={handleSubmit} className="donation-modal-form">
              <div className="form-group">
                <label>Donor Name</label>
                <input
                  type="text"
                  value={donorInfo?.name || ""}
                  disabled
                  className="form-input"
                  style={{ background: "#f5f5f5" }}
                />
              </div>

              <div className="form-group">
                <label>Donor Email</label>
                <input
                  type="email"
                  value={donorInfo?.email || ""}
                  disabled
                  className="form-input"
                  style={{ background: "#f5f5f5" }}
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your phone number"
                />
              </div>

              <div className="form-group">
                <label>Donation Item Name *</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g., Rice, Shirts, Notebooks"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Quantity / Amount *</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g., 10 kg or ₹2000"
                  />
                </div>

                <div className="form-group">
                  <label>Amount (if monetary)</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="₹ amount (optional)"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Pickup Location *</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your full address for pickup"
                />
              </div>

              <div className="donation-modal-actions">
                <button
                  type="button"
                  className="btn-secondary-custom"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-custom">
                  Donate
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="donation-modal-success">
            <h3>Thank You!</h3>
            <p>
              Your donation request has been sent to the NGO for approval.
            </p>
            <button className="btn-primary-custom" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonationModal;