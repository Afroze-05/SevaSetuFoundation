import { Link, useLocation } from "react-router-dom";
import { Home, Heart, Trophy, Users, Info, Mail, User, LogOut, HandHeart } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom">
      <div className="nav-container">
        <Link to="/home" className="nav-logo">
          <HandHeart className="logo-icon-nav" />
          <span className="logo-text">SevaSetu Foundation</span>
        </Link>

        <div className="nav-menu">
          <Link to="/home" className={`nav-link ${isActive("/home") ? "active" : ""}`}>
            <Home className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link to="/campaigns" className={`nav-link ${isActive("/campaigns") ? "active" : ""}`}>
          <HandHeart className="nav-icon" />
            <span>Campaigns</span>
          </Link>
          <Link to="/donations" className={`nav-link ${isActive("/donations") ? "active" : ""}`}>
            <Heart className="nav-icon" />
            <span>Donations</span>
          </Link>
          <Link to="/leaderboard" className={`nav-link ${isActive("/leaderboard") ? "active" : ""}`}>
            <Trophy className="nav-icon" />
            <span>Leaderboard</span>
          </Link>
          <Link to="/volunteers" className={`nav-link ${isActive("/volunteers") ? "active" : ""}`}>
            <Users className="nav-icon" />
            <span>Volunteers</span>
          </Link>
          <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>
            <Info className="nav-icon" />
            <span>About</span>
          </Link>
          <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>
            <Mail className="nav-icon" />
            <span>Contact</span>
          </Link>
          <Link to="/profile" className={`nav-link profile-link ${isActive("/profile") ? "active" : ""}`}>
            <User className="nav-icon" />
            <span>Profile</span>
          </Link>
          <Link to="/" className="nav-link logout-link">
            <LogOut className="nav-icon" />
            <span>Logout</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;