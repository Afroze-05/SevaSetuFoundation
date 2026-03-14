import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, HandHeart } from "lucide-react";
import "../../styles/auth.css";

function DonorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", formData);
    navigate("/home");
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-home">
        <ArrowLeft className="back-icon" />
        Back to Home
      </Link>
      
      <div className="auth-container">
        <div className="auth-header">
          <HandHeart className="auth-logo" />
          <h1>Donor Login</h1>
          <p>Welcome back! Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <Mail className="label-icon" />
              Email Address
            </label>
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
            <label htmlFor="password">
              <Lock className="label-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="#" className="forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-submit-btn">
            Login
          </button>

          <p className="auth-footer">
            Don't have an account? <Link to="/donor-register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default DonorLogin;