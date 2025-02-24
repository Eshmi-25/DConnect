import React from "react";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
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

        <div className="search-container">
           <input 
              type="text" 
              placeholder="Look for the right people. Eg: Web developer, Content Writer, etc..." 
              className="search-bar"
            />

            <div className="mini-search">
            <img src={search} alt="Search icon" className="search-icon" />
            </div>
        </div>

      <img src={lady} alt="Landing Page Lady" className="landing-image" />
      </div>
      <div className="slanted-section"></div> <div className="slanted-section1"></div>
    </div>
  );
};

export default LandingPage;
