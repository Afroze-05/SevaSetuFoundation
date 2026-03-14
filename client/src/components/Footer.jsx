import { Link } from "react-router-dom";
import { HandHeart, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <HandHeart className="logo-icon" />
            <h3>SevaSetu Foundation</h3>
          </div>
          <p className="footer-description">
            Connecting kind hearts with those in need. Together we can make a difference.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Instagram">
              <Instagram className="social-icon" />
            </a>
            <a href="#" className="social-link" aria-label="Facebook">
              <Facebook className="social-icon" />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Twitter className="social-icon" />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <Linkedin className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/campaigns">Campaigns</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul className="contact-info">
            <li>
              <MapPin className="contact-icon" />
              <span>123 SevaSetu Street, City, State - 123456</span>
            </li>
            <li>
              <Phone className="contact-icon" />
              <span>+91 9876543210</span>
            </li>
            <li>
              <Mail className="contact-icon" />
              <span>info@sevasetu.org</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to our newsletter for updates</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} SevaSetu Foundation. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/">Privacy Policy</Link>
          <span>|</span>
          <Link to="/">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;