import { Routes, Route } from "react-router-dom";

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
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./ScrollToTop";

function App() {

return (
<>
<ScrollToTop />

<Routes>

<Route path="/" element={<Welcome />} />

<Route path="/home" element={<Home />} />
<Route path="/campaigns" element={<Campaigns />} />
<Route path="/donations" element={<Donations />} />
<Route path="/leaderboard" element={<Leaderboard />} />
<Route path="/volunteers" element={<Volunteers />} />
<Route path="/profile" element={<Profile />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/feedback" element={<Feedback />} />

<Route path="/donor-login" element={<DonorLogin />} />
<Route path="/donor-register" element={<DonorRegister />} />
<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />

</Routes>
</>

);

}

export default App;