import { Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import Donations from "./pages/Donations";
import Leaderboard from "./pages/Leaderboard";
import Volunteers from "./pages/Volunteers";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";

import DonorLogin from "./pages/auth/DonorLogin";
import DonorRegister from "./pages/auth/DonorRegister";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminRegister from "./pages/auth/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import MyVolunteerRequests from "./pages/MyVolunteerRequests";
import ScrollToTop from "./ScrollToTop";
import { readLocalJson } from "./services/api";

// Donor-protected route
function DonorRoute({ children }) {
  const loggedInDonor = readLocalJson("loggedInDonor", null);
  if (!loggedInDonor || !loggedInDonor.email) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Admin-protected route
function AdminRoute({ children }) {
  const loggedInAdmin = readLocalJson("loggedInAdmin", null);
  if (!loggedInAdmin || !loggedInAdmin.email) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Auth routes */}
        <Route path="/login" element={<DonorLogin />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />

        {/* Donor-protected routes */}
        <Route
          path="/home"
          element={
            <DonorRoute>
              <Home />
            </DonorRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <DonorRoute>
              <Campaigns />
            </DonorRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <DonorRoute>
              <Profile />
            </DonorRoute>
          }
        />
        <Route
          path="/donations"
          element={
            <DonorRoute>
              <Donations />
            </DonorRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <DonorRoute>
              <Leaderboard />
            </DonorRoute>
          }
        />
        <Route
          path="/volunteers"
          element={
            <DonorRoute>
              <Volunteers />
            </DonorRoute>
          }
        />
        <Route
          path="/my-volunteer-requests"
          element={
            <DonorRoute>
              <MyVolunteerRequests />
            </DonorRoute>
          }
        />

        {/* Admin-protected routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;