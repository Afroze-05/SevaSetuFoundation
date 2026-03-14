import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin, Phone, Mail, Send, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send to backend
    console.log("Feedback submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-page">
      <Navbar />
      
      <div className="contact-header">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">We'd love to hear from you</p>
      </div>

      <div className="contact-container">
        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          <p>Have questions or feedback? Reach out to us through any of these channels.</p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin className="icon" />
              </div>
              <div className="contact-text">
                <h3>Address</h3>
                <p>123 SevaSetu Street<br />Community Center<br />City, State - 123456</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Phone className="icon" />
              </div>
              <div className="contact-text">
                <h3>Phone</h3>
                <p>+91 9876543210<br />+91 9876543211</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Mail className="icon" />
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>info@sevasetu.org<br />support@sevasetu.org</p>
              </div>
            </div>
          </div>

          <div className="social-media">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link instagram" aria-label="Instagram">
                <Instagram className="social-icon" />
              </a>
              <a href="#" className="social-link facebook" aria-label="Facebook">
                <Facebook className="social-icon" />
              </a>
              <a href="#" className="social-link twitter" aria-label="Twitter">
                <Twitter className="social-icon" />
              </a>
              <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                <Linkedin className="social-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="feedback-form-section">
          <h2>Send us a Message</h2>
          {submitted ? (
            <div className="success-message">
              <Send className="success-icon" />
              <p>Thank you! Your message has been sent successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="form-input"
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className="submit-btn">
                <Send className="btn-icon" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;