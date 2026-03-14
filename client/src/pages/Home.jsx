import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PosterSlider from "../components/PosterSlider";
import { 
  Utensils, 
  Shirt, 
  BookOpen, 
  HeartPulse, 
  DollarSign, 
  HandHeart,
  ArrowRight 
} from "lucide-react";
import "./Home.css";

function Home() {
  const helpSections = [
    {
      icon: Utensils,
      title: "Food Donation",
      description: "Help feed families in need by donating food items or organizing food drives.",
      color: "#FF6F00"
    },
    {
      icon: Shirt,
      title: "Clothes Donation",
      description: "Donate clothing items to help those in need stay warm and comfortable.",
      color: "#1565C0"
    },
    {
      icon: BookOpen,
      title: "Stationary Donation",
      description: "Support education by donating books, notebooks, and school supplies.",
      color: "#2E7D32"
    },
    {
      icon: HeartPulse,
      title: "Medical Help",
      description: "Contribute medical supplies and support healthcare initiatives.",
      color: "#C62828"
    },
    {
      icon: DollarSign,
      title: "Financial Support",
      description: "Make monetary donations to support our various programs and campaigns.",
      color: "#7B1FA2"
    },
    {
      icon: HandHeart,
      title: "Volunteer",
      description: "Join us as a volunteer and make a direct impact in your community.",
      color: "#F57C00"
    }
  ];

  return (
    <div className="home-container">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Together We Can Make a Difference
          </h1>
          <p className="hero-subtitle">
            Every contribution, big or small, helps us build a better tomorrow for those in need.
          </p>
          <Link to="/campaigns" className="btn-donate-now">
            <HandHeart className="btn-icon" />
            Donate Now
            <ArrowRight className="btn-icon" />
          </Link>
        </div>
        <div className="hero-image">
          <div className="hero-overlay-gradient"></div>
        </div>
      </section>

      {/* Poster Slider */}
      <section className="slider-section">
        <h2 className="section-heading">Our Recent Activities</h2>
        <PosterSlider />
      </section>

      {/* Help Sections */}
      <section className="help-sections">
        <div className="section-header">
          <h2 className="section-heading">Ways You Can Help</h2>
          <p className="section-subtitle">Choose how you'd like to contribute and make an impact</p>
        </div>
        
        <div className="help-grid">
          {helpSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div key={index} className="help-card" style={{ '--card-color': section.color }}>
                <div className="help-card-icon">
                  <IconComponent className="icon" />
                </div>
                <h3 className="help-card-title">{section.title}</h3>
                <p className="help-card-description">{section.description}</p>
                <Link to="/campaigns" className="help-card-link">
                  Learn More <ArrowRight className="link-arrow" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make an Impact?</h2>
          <p>Join thousands of donors making a difference in their communities</p>
          <div className="cta-buttons">
            <Link to="/campaigns" className="btn-primary-custom">Start Donating</Link>
            <Link to="/volunteers" className="btn-secondary-custom">Become a Volunteer</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;