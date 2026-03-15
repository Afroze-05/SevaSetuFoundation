import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, ShieldCheck } from "lucide-react";
import "../../styles/auth.css";
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
        alert("Admin registered successfully!");
        navigate("/admin-login");
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
    <div className="auth-page">
      <Link to="/" className="back-home">
        ← Back to Welcome
      </Link>

      <div className="auth-container">
        <div className="auth-header">
          <ShieldCheck className="auth-logo" />
          <h1>Admin Register</h1>
          <p>Create an admin account for SevaSetu</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">
              <User className="label-icon" />
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Admin Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail className="label-icon" />
              Email
            </label>
            <input
              id="email"
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
            <label htmlFor="password">
              <Lock className="label-icon" />
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Create a strong password"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Registering..." : "Register as Admin"}
          </button>

          <p className="auth-footer">
            Already registered? <Link to="/admin-login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;


