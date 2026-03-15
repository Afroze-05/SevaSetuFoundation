import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, HandHeart } from "lucide-react";
import "./DonorLogin.css";
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
        const donorData = response.data.data;
        const token = response.data.token;

        // Keep existing keys if used elsewhere
        localStorage.setItem("donorToken", token);
        localStorage.setItem("donor", JSON.stringify(donorData));

        // NEW required key
        localStorage.setItem("loggedInDonor", JSON.stringify(donorData));

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
    <div className="donor-auth-page">
      <Link to="/" className="auth-back-home">
        <ArrowLeft className="auth-back-icon" />
        Back to Home
      </Link>

      <div className="auth-card">
        <div className="auth-gradient-header">
          <HandHeart className="auth-logo" />
          <h1>Donor Login</h1>
          <p>Welcome back! Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="email">
              <Mail className="auth-label-icon" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="your.email@example.com"
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">
              <Lock className="auth-label-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="Enter your password"
            />
          </div>

          <div className="auth-form-options">
            <label className="auth-remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <span className="auth-forgot">Forgot Password?</span>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-footer-text">
            Don’t have an account?{" "}
            <Link to="/donor-register" className="auth-link">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default DonorLogin;