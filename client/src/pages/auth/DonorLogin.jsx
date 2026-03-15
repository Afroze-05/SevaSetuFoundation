import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, HandHeart } from "lucide-react";
import "../../styles/auth.css";
import api from "../../services/api";

function DonorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/api/donors/login", formData);

      if (response.data?.success) {
        // Store JWT token and donor info in localStorage
        localStorage.setItem("donorToken", response.data.token);
        localStorage.setItem("donor", JSON.stringify(response.data.data));
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(response.data?.message || "Login failed");
      }
    } catch (error) {
      const message = error.response?.data?.message;

      if (message === "Registration not done. Please register first.") {
        alert(message);
      } else {
        alert(message || "Error while logging in");
      }
    } finally {
      setLoading(false);
    }
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

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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