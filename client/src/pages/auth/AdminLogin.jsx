import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import "./AdminLogin.css"; // note: going one level up to pages/AdminLogin.css

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin login:", formData);
    navigate("/admin-dashboard");
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

          <button type="submit" className="auth-submit-btn">
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;