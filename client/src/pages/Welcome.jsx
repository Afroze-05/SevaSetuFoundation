import { Link } from "react-router-dom";
import { Heart, Users, Award, HandHeart } from "lucide-react";
import "./Welcome.css";
import banner from "../assets/banner1.jpg";
import logo from "../assets/logo.jpg";

function Welcome() {
  return (
    <div className="welcome-container">
      {/* HEADER */}
      <header className="main-header">
        <div className="header-brand">
          <img
            src={logo}
            alt="SevaSetu Logo"
            className="header-logo-img"
          />
          <div className="header-text">
            <h1 className="header-title">SevaSetu Foundation</h1>
            <p className="header-tagline">Bridging Hearts. Changing Lives.</p>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <div
        className="welcome-hero"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>Welcome to SevaSetu</h1>
          <p>
            Together, we connect kind hearts with communities in need and turn
            compassion into lasting impact.
          </p>
        </div>
      </div>

      {/* HOW SEVASETU WORKS */}
      <div className="how-section">
        <h2 className="section-title">How SevaSetu Works</h2>

        <p className="how-subtitle">
          SevaSetu connects donors and NGOs through a simple process to ensure
          help reaches the people who need it the most.
        </p>

        <div className="how-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <Users className="step-icon" />
            <h3>Donors Contribute</h3>
            <p>
              Generous donors contribute food, clothes, books, or funds through
              the SevaSetu platform to support social causes.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <Award className="step-icon" />
            <h3>NGOs Organize Campaigns</h3>
            <p>
              NGOs create campaigns and manage requests for communities in need,
              ensuring donations are used effectively.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <Heart className="step-icon" />
            <h3>Help Reaches People</h3>
            <p>
              Donations are delivered to people who truly need support,
              creating meaningful and lasting social impact.
            </p>
          </div>
        </div>
      </div>

      {/* LOGIN SECTION */}
      <div className="login-section">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Choose how you want to continue</p>

          <div className="login-options">
            <Link to="/donor-login" className="login-option-card">
              <Users className="option-icon" />
              <h3>Login as Donor</h3>
              <p>Contribute items, food, or funds to ongoing campaigns.</p>
            </Link>

            <Link to="/admin-login" className="login-option-card admin">
              <Award className="option-icon" />
              <h3>Login as NGO Admin</h3>
              <p>Manage campaigns, requests, and donor contributions.</p>
            </Link>
          </div>

          <div className="register-link">
            <p>
              New here? <Link to="/donor-register">Register as Donor</Link>
            </p>
          </div>
        </div>
      </div>

      {/* IMPACT SECTION */}
      <div className="impact-section">
        <h2 className="section-title">Our Impact</h2>

        <p className="impact-text">
          Over the years, SevaSetu Foundation has connected thousands of
          generous donors with communities in need. Every contribution, whether
          big or small, helps bring hope and resources to those who need it the
          most.
        </p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🍽️</div>
            <h3>10,000+</h3>
            <p>Meals Donated</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <h3>2,000+</h3>
            <p>Volunteers</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <h3>500+</h3>
            <p>Campaigns Completed</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <h3>50,000+</h3>
            <p>Lives Touched</p>
          </div>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="mission-section">
        <div className="mission-content">
          <HandHeart className="mission-icon" />

          <h2>Our Mission</h2>

          <p>
            SevaSetu Foundation works to bridge the gap between people who want
            to help and communities that need support. Through food drives,
            clothing donations, educational support, and financial aid, every
            act of kindness reaches the right hands.
          </p>

          <p className="mission-extra">
            Our platform enables donors and NGOs to collaborate, organize
            campaigns, and create real social impact together.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>SevaSetu Foundation</h3>
            <p>Connecting Kind Hearts with Those in Need.</p>
          </div>

          <div className="footer-right">
            <p>© 2026 SevaSetu Foundation</p>
            <p>All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;