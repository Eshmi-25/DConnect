import React from "react";
import logo from "../assets/logo.png";
import lady from "../assets/landingpage_lady.png";
import "../styles/landingpage.css"; 

const LandingPage = () => {
  return (
    <div>
      <div className="navbar">
        <button>Login</button>
        <button>Get Started</button>
      </div>

      <div className="landing-container">
        <img src={logo} alt="D-Connect Logo" className="landing-logo" />
        <h1 className="landing-title">D-Connect</h1> 
        <p className="landing-subtitle">The Future of Professional Credibility</p>
        <img src={lady} alt="Landing Page Lady" className="landing-image" />
      </div>
        <input 
          type="text" 
          placeholder="Search for professionals..." 
          className="search-bar"
        />
      </div>
    //</div>
  );
};

export default LandingPage;
