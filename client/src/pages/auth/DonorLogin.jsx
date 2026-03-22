import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, HandHeart } from "lucide-react";
import "./DonorLogin.css";
import api, { readLocalJson } from "../../services/api";

function upsertRegisteredDonor(record) {
  const list = readLocalJson("registeredDonors", []);
  const idx = list.findIndex((d) => d.email === record.email);
  if (idx >= 0) list[idx] = { ...list[idx], ...record };
  else list.push(record);
  localStorage.setItem("registeredDonors", JSON.stringify(list));
}

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
      const payload = response.data;
      const donorData = payload?.data;
      const token = payload?.token;
      const loginSuccess =
        payload?.success === true && donorData && token;

      if (loginSuccess) {
        localStorage.setItem("donorToken", token);
        localStorage.setItem("donor", JSON.stringify(donorData));
        localStorage.setItem("loggedInDonor", JSON.stringify(donorData));
        upsertRegisteredDonor({
          ...donorData,
          password: formData.password,
        });
        navigate("/home");
        alert("Login successful!");
      } else {
        alert(payload?.message || "Login failed");
      }
    } catch (error) {
      const registered = readLocalJson("registeredDonors", []);
      const match = registered.find(
        (d) =>
          d.email === formData.email && d.password === formData.password
      );
      if (match) {
        const { password: _p, ...donor } = match;
        localStorage.setItem("donorToken", donor.token || "");
        localStorage.setItem("donor", JSON.stringify(donor));
        localStorage.setItem("loggedInDonor", JSON.stringify(donor));
        navigate("/home");
        alert("Login successful!");
        return;
      }
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