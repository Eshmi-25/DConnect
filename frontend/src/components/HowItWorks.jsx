import React from "react";
import "../styles/howitworks.css"; 
import verify from "../assets/verification_icon.png";
import handshake from "../assets/handshake_icon.png";
import user from "../assets/user_icon.png";

const HowItWorks = () => {
  return (
    <div className="htw_container">
      <div className="htw_content">
        <div className="htw_title"><h2 >How<br /> it<br /> Works</h2></div>
        <div className="htw_steps">
          <div className="htw_step">
            <img className="htw_user_icon" src={user} alt="user_icon"></img> 
            <span className="htw_number">1</span>
            <p>Meet clients and find projects that interest you</p>
          </div>
          <div className="htw_step">
            <span className="htw_number">2</span>
            <p>
              Agree on timelines and payment with the client
              <img className="htw_handshake_icon" src={handshake} alt="handshake_icon"></img> 
            </p>
          </div>
          <div className="htw_step">
          <img className="htw_verify_icon" src={verify} alt="user_verify"></img> 
            <span className="htw_number">3</span>
            <p>
              Get a unique NFT every time you finish a project to build your reputation
            </p>
          </div>
        </div>
      </div><div className="htw_slanted-section1"></div><div className="htw_slanted-section"></div>
    </div>
    
  );
}

export default HowItWorks;
