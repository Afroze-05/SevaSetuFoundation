import { Link } from "react-router-dom";
import { Heart, Users, Award, HandHeart } from "lucide-react";
import "./Welcome.css";

function Welcome() {
  return (
    <div className="welcome-container">
      {/* Background Image Section */}
      <div className="welcome-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="logo-section">
            <HandHeart className="logo-icon" />
            <h1 className="ngo-name">SevaSetu Foundation</h1>
            <p className="tagline">Connecting Kind Hearts with Those in Need</p>
          </div>
        </div>
      </div>

      {/* Login Card Section */}
      <div className="login-section">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Choose your login option</p>
          
          <div className="login-options">
            <Link to="/donor-login" className="login-option-card">
              <Users className="option-icon" />
              <h3>Login as Donor</h3>
              <p>Contribute items or money</p>
            </Link>
            
            <Link to="/admin-login" className="login-option-card admin">
              <Award className="option-icon" />
              <h3>Login as NGO Admin</h3>
              <p>Manage campaigns & requests</p>
            </Link>
          </div>

          <div className="register-link">
            <p>New here? <Link to="/donor-register">Register as Donor</Link></p>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="impact-section">
        <h2 className="section-title">Our Impact</h2>
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

      {/* Mission Statement */}
      <div className="mission-section">
        <div className="mission-content">
          <Heart className="mission-icon" />
          <h2>Our Mission</h2>
          <p>
            SevaSetu Foundation is dedicated to bridging the gap between those who want to help 
            and those who need help. We facilitate donations of food, clothing, education materials, 
            and financial support to communities in need, ensuring every contribution makes a real difference.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;