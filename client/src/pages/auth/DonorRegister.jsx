import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, ArrowLeft, HandHeart } from "lucide-react";
import "./DonorRegister.css";
import api, { readLocalJson } from "../../services/api";

function upsertRegisteredDonor(record) {
  const list = readLocalJson("registeredDonors", []);
  const idx = list.findIndex((d) => d.email === record.email);
  if (idx >= 0) list[idx] = { ...list[idx], ...record };
  else list.push(record);
  localStorage.setItem("registeredDonors", JSON.stringify(list));
}

function DonorRegister() {
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
      const response = await api.post("/api/donors/register", formData);

      if (response.data?.success) {
        const donorData = {
          ...response.data.data,
          token: response.data.token,
        };

        // Existing key
        localStorage.setItem("donor", JSON.stringify(donorData));

        // NEW required key + optional token
        localStorage.setItem("loggedInDonor", JSON.stringify(response.data.data));
        localStorage.setItem("donorToken", response.data.token || "");
        upsertRegisteredDonor({
          ...response.data.data,
          password: formData.password,
        });

        alert("Registration successful!");
        navigate("/");
      } else {
        alert(response.data?.message || "Registration failed");
      }
    } catch (error) {
      if (!error.response) {
        const localDonor = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: "",
          address: "",
        };
        upsertRegisteredDonor(localDonor);
        const { password: _p, ...forSession } = localDonor;
        localStorage.setItem("loggedInDonor", JSON.stringify(forSession));
        localStorage.setItem("donor", JSON.stringify(forSession));
        localStorage.setItem("donorToken", "");
        alert("Registered locally (backend unavailable). You can log in offline.");
        navigate("/");
        return;
      }
      const message =
        error.response?.data?.message || "Error while registering donor";
      alert(message);
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
          <h1>Donor Register</h1>
          <p>Join SevaSetu and start making an impact</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="name">
              <User className="auth-label-icon" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="auth-input"
              placeholder="Your full name"
            />
          </div>

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
              placeholder="Create a secure password"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Registering..." : "Register as Donor"}
          </button>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/donor-login" className="auth-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default DonorRegister;