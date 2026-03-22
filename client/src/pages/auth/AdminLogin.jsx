import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import "./AdminLogin.css";
import api, { setAuthToken, readLocalJson } from "../../services/api";

function upsertRegisteredAdmin(record) {
  const list = readLocalJson("registeredAdmins", []);
  const idx = list.findIndex((a) => a.email === record.email);
  if (idx >= 0) list[idx] = { ...list[idx], ...record };
  else list.push(record);
  localStorage.setItem("registeredAdmins", JSON.stringify(list));
}

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
        const adminData = response.data.data;

        // Existing keys
        localStorage.setItem("adminToken", token);
        localStorage.setItem("admin", JSON.stringify(adminData));
        setAuthToken(token);

        // NEW required key
        localStorage.setItem("loggedInAdmin", JSON.stringify(adminData));
        upsertRegisteredAdmin({
          ...adminData,
          password: formData.password,
        });

        alert("Admin login successful!");
        navigate("/admin-dashboard");
      } else {
        alert(response.data?.message || "Login failed");
      }
    } catch (error) {
      const registered = readLocalJson("registeredAdmins", []);
      const match = registered.find(
        (a) =>
          a.email === formData.email && a.password === formData.password
      );
      if (match) {
        const { password: _p, ...admin } = match;
        localStorage.setItem("adminToken", admin.token || "");
        localStorage.setItem("admin", JSON.stringify(admin));
        setAuthToken(admin.token || "");
        localStorage.setItem("loggedInAdmin", JSON.stringify(admin));
        alert("Admin login successful!");
        navigate("/admin-dashboard");
        return;
      }
      const message =
        error.response?.data?.message || "Error while logging in admin";
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
          <h1>Admin Login</h1>
          <p>NGO staff access only</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="adminEmail">
              <Mail className="auth-label-icon" />
              Email
            </label>
            <input
              id="adminEmail"
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
            <label htmlFor="adminPassword">
              <Lock className="auth-label-icon" />
              Password
            </label>
            <input
              id="adminPassword"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn admin"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

          <p className="auth-footer-text">
            Not registered?{" "}
            <Link to="/admin-register" className="auth-link">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;