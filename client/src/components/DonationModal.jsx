import { useEffect, useState } from "react";
import "./DonationModal.css";
import { readLocalJson } from "../services/api";

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

  // Load donor info and prefill phone/address
  useEffect(() => {
    const loggedInDonor = readLocalJson("loggedInDonor", {});
    setDonorInfo(loggedInDonor);

    if (loggedInDonor && isOpen) {
      setFormData((prev) => ({
        ...prev,
        phone: loggedInDonor.phone || "",
        pickupLocation: loggedInDonor.address || "",
      }));
    }
  }, [isOpen]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Reset form when opening
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

    const donation = {
      id: Date.now().toString(),
      donorName: donorInfo.name,
      donorEmail: donorInfo.email,
      campaignId: campaign?.id ?? "",
      campaignTitle: campaign?.title || "General Campaign",
      type: campaign?.category || "General",
      quantity: formData.quantity || "",
      amount: formData.amount || "",
      address: formData.pickupLocation,
      phone: formData.phone || donorInfo.phone,
      date: new Date().toISOString(),
      status: "Pending",
      campaignType: campaign?.category || "General",
      itemName: formData.itemName,
      pickupLocation: formData.pickupLocation,
    };

    const existingDonations = readLocalJson("donorDonations", []);
    existingDonations.push(donation);
    localStorage.setItem("donorDonations", JSON.stringify(existingDonations));
    window.dispatchEvent(new Event("donationsUpdated"));

    if (campaign) {
      const campaigns = readLocalJson("campaigns", []);
      const updatedCampaigns = campaigns.map((c) => {
        if (c.id === campaign.id) {
          let delta = 1;
          if (String(c.category || "").toLowerCase() === "financial") {
            const raw = String(formData.amount || formData.quantity || "0").replace(
              /[^\d.]/g,
              ""
            );
            const n = parseFloat(raw);
            delta = Number.isFinite(n) ? n : 1;
          }
          return {
            ...c,
            progress: (Number(c.progress) || 0) + delta,
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
      <div className="donation-modal-card">
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
              <div className="dm-form-group">
                <label>Donor Name</label>
                <input
                  type="text"
                  value={donorInfo?.name || ""}
                  disabled
                  className="dm-input dm-input-disabled"
                />
              </div>

              <div className="dm-form-group">
                <label>Donor Email</label>
                <input
                  type="email"
                  value={donorInfo?.email || ""}
                  disabled
                  className="dm-input dm-input-disabled"
                />
              </div>

              <div className="dm-form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="dm-input"
                  placeholder="Your phone number"
                />
              </div>

              <div className="dm-form-group">
                <label>Donation Item Name *</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                  className="dm-input"
                  placeholder="e.g., Rice, Shirts, Notebooks"
                />
              </div>

              <div className="dm-form-row">
                <div className="dm-form-group">
                  <label>Quantity / Amount *</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="dm-input"
                    placeholder="e.g., 10 kg or ₹2000"
                  />
                </div>

                <div className="dm-form-group">
                  <label>Amount (if monetary)</label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="dm-input"
                    placeholder="₹ amount (optional)"
                  />
                </div>
              </div>

              <div className="dm-form-group">
                <label>Pickup Location *</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                  className="dm-input"
                  placeholder="Your full address for pickup"
                />
              </div>

              <div className="donation-modal-actions">
                <button
                  type="button"
                  className="dm-btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="dm-btn-primary">
                  Donate
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="donation-modal-success">
            <h3>Thank You!</h3>
            <p>Your donation request has been sent to the NGO for approval.</p>
            <button className="dm-btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonationModal;