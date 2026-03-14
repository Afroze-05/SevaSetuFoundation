import { useEffect, useState } from "react";
import "./DonationModal.css";

function DonationModal({ isOpen, onClose, campaignType }) {
  const [formData, setFormData] = useState({
    itemName: "",
    donationType: "",
    quantity: "",
    amount: "",
    expiryDate: "",
    pickupLocation: "",
    pickupDate: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData((prev) => ({
        ...prev,
        donationType: campaignType || "",
      }));
    }
  }, [isOpen, campaignType]);

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
    // Simulate submit
    console.log("Donation request:", { ...formData, campaignType });
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
              Donate for {campaignType}
            </h2>
            <p className="donation-modal-subtitle">
              Fill the details below to send your donation request.
            </p>

            <form onSubmit={handleSubmit} className="donation-modal-form">
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

              <div className="form-group">
                <label>Donation Type *</label>
                <input
                  type="text"
                  name="donationType"
                  value={formData.donationType}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g., Food, Clothes"
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
                    placeholder="e.g., 10 kg / ₹2000"
                  />
                </div>

                <div className="form-group">
                  <label>Expiry Date (if applicable)</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="form-input"
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
                  placeholder="Your full address"
                />
              </div>

              <div className="form-group">
                <label>Preferred Pickup Date *</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                  className="form-input"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="form-input"
                  placeholder="Any extra info or instructions..."
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