import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, CheckCircle, Calendar, MapPin, Clock, Heart } from "lucide-react";
import "./Volunteers.css";

function Volunteers() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    availability: "",
    skills: "",
    motivation: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer application:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      availability: "",
      skills: "",
      motivation: ""
    });
  };

  const benefits = [
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Directly impact lives in your community"
    },
    {
      icon: Users,
      title: "Join a Community",
      description: "Connect with like-minded individuals"
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "Volunteer at your convenience"
    },
    {
      icon: CheckCircle,
      title: "Skill Development",
      description: "Gain valuable experience and skills"
    }
  ];

  return (
    <div className="volunteers-page">
      <Navbar />
      
      <div className="volunteers-hero">
        <Users className="hero-icon" />
        <h1>Join Us as a Volunteer</h1>
        <p>Be the change you want to see in the world</p>
      </div>

      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Volunteer with Us?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="benefit-card">
                  <IconComponent className="benefit-icon" />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="application-section">
        <div className="container">
          <div className="application-content">
            <div className="application-info">
              <h2>Volunteer Application</h2>
              <p>
                We're always looking for passionate individuals who want to make a difference. 
                Fill out the form below to join our volunteer team.
              </p>
              <div className="info-items">
                <div className="info-item">
                  <Clock className="info-icon" />
                  <div>
                    <strong>Time Commitment</strong>
                    <p>Flexible - as per your availability</p>
                  </div>
                </div>
                <div className="info-item">
                  <MapPin className="info-icon" />
                  <div>
                    <strong>Location</strong>
                    <p>Various locations across the city</p>
                  </div>
                </div>
                <div className="info-item">
                  <Users className="info-icon" />
                  <div>
                    <strong>Team Work</strong>
                    <p>Work with a supportive community</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="application-form-container">
              {submitted ? (
                <div className="success-message">
                  <CheckCircle className="success-icon" />
                  <h3>Application Submitted!</h3>
                  <p>Thank you for your interest. We'll contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="volunteer-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="form-input"
                      placeholder="Your complete address"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="availability">Availability *</label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      <option value="">Select availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="both">Both Weekdays & Weekends</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="skills">Skills & Interests</label>
                    <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      rows="3"
                      className="form-input"
                      placeholder="e.g., Teaching, Event Management, Social Media, etc."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="motivation">Why do you want to volunteer? *</label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="form-input"
                      placeholder="Tell us about your motivation..."
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    <Users className="btn-icon" />
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Volunteers;
                     