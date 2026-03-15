import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, ShieldCheck, ArrowLeft } from "lucide-react";
import "./AdminRegister.css";
import api from "../../services/api";

function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/api/admin/register", formData);
      if (response.data?.success) {
        const adminData = response.data.data || {
          name: formData.name,
          email: formData.email,
        };

        // Store admin data directly as logged in admin
        localStorage.setItem("loggedInAdmin", JSON.stringify(adminData));

        alert("Admin registered successfully!");
        // Requirement: admin registers → navigate to /admin-dashboard
        navigate("/admin-dashboard");
      } else {
        alert(response.data?.message || "Registration failed");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error while registering admin";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth-page">
      <Link to="/" className="auth-back-home">
        <ArrowLeft className="auth-back-icon" />
        Back to Welcome
      </Link>

      <div className="auth-card">
        <div className="auth-gradient-header admin">
          <ShieldCheck className="auth-logo" />
          <h1>Admin Register</h1>
          <p>Create an admin account for SevaSetu</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="name">
              <User className="auth-label-icon" />
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="Admin Name"
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="email">
              <Mail className="auth-label-icon" />
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="admin@sevasetu.org"
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">
              <Lock className="auth-label-icon" />
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="Create a strong password"
            />
          </div>

          <button type="submit" className="auth-submit-btn admin" disabled={loading}>
            {loading ? "Registering..." : "Register as Admin"}
          </button>

          <p className="auth-footer-text">
            Already registered?{" "}
            <Link to="/admin-login" className="auth-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;