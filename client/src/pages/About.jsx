import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Heart, Target, Users, Award, HandHeart } from "lucide-react";
import "./About.css";

function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Founder & Director",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Program Manager",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    },
    {
      id: 3,
      name: "Anjali Mehta",
      role: "Community Outreach",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    },
    {
      id: 4,
      name: "Amit Patel",
      role: "Operations Head",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    }
  ];

  const events = [
    {
      id: 1,
      title: "Food Distribution Drive",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
      description: "Monthly food distribution to 500+ families"
    },
    {
      id: 2,
      title: "Education Campaign",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
      description: "Providing books and stationery to underprivileged students"
    },
    {
      id: 3,
      title: "Winter Clothing Drive",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600",
      description: "Collecting and distributing warm clothes for winter"
    },
    {
      id: 4,
      title: "Health Camp",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600",
      description: "Free medical checkups and health awareness programs"
    }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      <div className="about-hero">
        <div className="hero-content">
          <HandHeart className="hero-icon" />
          <h1>About SevaSetu Foundation</h1>
          <p>Connecting Kind Hearts with Those in Need</p>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <Target className="section-icon" />
            <h2>Our Mission</h2>
            <p>
              SevaSetu Foundation is dedicated to bridging the gap between those who want to help 
              and those who need help. We facilitate donations of food, clothing, education materials, 
              and financial support to communities in need, ensuring every contribution makes a real difference.
            </p>
            <p>
              Our mission is to create a sustainable ecosystem where generosity flows freely, 
              and no one goes to bed hungry, uneducated, or without basic necessities.
            </p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <Heart className="value-icon" />
              <h3>Compassion</h3>
              <p>We approach every situation with empathy and understanding</p>
            </div>
            <div className="value-card">
              <Users className="value-icon" />
              <h3>Community</h3>
              <p>Building strong communities through collective action</p>
            </div>
            <div className="value-card">
              <Award className="value-icon" />
              <h3>Excellence</h3>
              <p>Maintaining high standards in all our programs</p>
            </div>
            <div className="value-card">
              <Target className="value-icon" />
              <h3>Impact</h3>
              <p>Focusing on measurable outcomes and real change</p>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section">
        <div className="container">
          <h2 className="section-title">Our Events</h2>
          <p className="section-subtitle">Recent activities and campaigns</p>
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="event-content">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Meet the people behind SevaSetu Foundation</p>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-photo-container">
                  <img src={member.photo} alt={member.name} className="team-photo" />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;