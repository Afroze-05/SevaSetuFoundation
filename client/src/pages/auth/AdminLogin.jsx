import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import "./AdminLogin.css"; // note: going one level up to pages/AdminLogin.css
import api from "../../services/api";
import { setAuthToken } from "../../services/api";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/api/admin/login", formData);

      if (response.data?.success) {
        const token = response.data.token;
        localStorage.setItem("adminToken", token);
        localStorage.setItem("admin", JSON.stringify(response.data.data));
        setAuthToken(token);
        alert("Admin login successful!");
        navigate("/admin-dashboard");
      } else {
        alert(response.data?.message || "Login failed");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error while logging in admin";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-home">
        ← Back to Welcome
      </Link>

      <div className="auth-container">
        <div className="auth-header">
          <ShieldCheck className="auth-logo" />
          <h1>Admin Login</h1>
          <p>NGO staff access only</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="adminEmail">
              <Mail className="label-icon" />
              Email
            </label>
            <input
              id="adminEmail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="admin@sevasetu.org"
            />
          </div>

          <div className="form-group">
            <label htmlFor="adminPassword">
              <Lock className="label-icon" />
              Password
            </label>
            <input
              id="adminPassword"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

          <p className="auth-footer">
            Not registered? <Link to="/admin-register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;