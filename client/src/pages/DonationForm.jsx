import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, ArrowLeft } from "lucide-react";
import "./DonationForm.css";

function DonationForm() {
  const [searchParams] = useSearchParams();
  const campaignId = searchParams.get("campaign");
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    donationType: "",
    itemName: "",
    quantity: "",
    amount: "",
    pickupLocation: "",
    pickupDate: "",
    notes: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (campaignId) {
      const campaignTypes = {
        "1": "Food",
        "2": "Education",
        "3": "Clothing",
        "4": "Hygiene",
        "5": "Accessories",
        "6": "Financial"
      };
      setFormData(prev => ({ ...prev, donationType: campaignTypes[campaignId] || "" }));
    }
  }, [campaignId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to backend
    console.log("Donation submitted:", formData);
    setSubmitted(true);
    
    setTimeout(() => {
      navigate("/donations");
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="donation-form-page">
        <Navbar />
        <div className="success-message">
          <CheckCircle className="success-icon" />
          <h2>Thank You!</h2>
          <p>Your donation request has been sent to the NGO for approval.</p>
          <p className="success-note">You will receive a confirmation email shortly.</p>
          <button onClick={() => navigate("/donations")} className="btn-primary-custom">
            View My Donations
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="donation-form-page">
      <Navbar />
      
      <div className="form-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft className="back-icon" />
          Back to Campaigns
        </button>

        <div className="form-header">
          <h1>Donation Form</h1>
          <p>Fill in the details to submit your donation request</p>
        </div>

        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-group">
            <label htmlFor="donationType">
              <span className="label-icon">📦</span>
              Donation Type *
            </label>
            <select
              id="donationType"
              name="donationType"
              value={formData.donationType}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select donation type</option>
              <option value="Food">Food</option>
              <option value="Education">Education / Stationary</option>
              <option value="Clothing">Clothing</option>
              <option value="Hygiene">Toiletries / Hygiene</option>
              <option value="Accessories">Accessories</option>
              <option value="Financial">Financial Support</option>
            </select>
          </div>

          {formData.donationType !== "Financial" ? (
            <>
              <div className="form-group">
                <label htmlFor="itemName">
                  <span className="label-icon">📝</span>
                  Item Name *
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="e.g., Rice, Books, Shirts"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="quantity">
                  <span className="label-icon">🔢</span>
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  min="1"
                  required
                  className="form-input"
                />
              </div>
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="amount">
                <span className="label-icon">💰</span>
                Amount (₹) *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount in rupees"
                min="1"
                required
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="pickupLocation">
              <span className="label-icon">📍</span>
              Pickup Location *
            </label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pickupDate">
              <span className="label-icon">📅</span>
              Preferred Pickup Date *
            </label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">
              <span className="label-icon">💬</span>
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional information or special instructions..."
              rows="4"
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-button">
            <span>Send Donation Request</span>
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default DonationForm;