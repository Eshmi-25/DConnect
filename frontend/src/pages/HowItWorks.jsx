import React from "react";
import { IoMdSearch } from "react-icons/io";
import { FaHandshake, FaAward } from "react-icons/fa";
import "../styles/howItWorks.css"; 
import bottom_banner from "../assets/bottom_banner.png"

const HowItWorks = () => {
  return (
    <div className="how-it-works-container ">
      <h1 className="text-9xl font-medium text-left mb-8 htw_title">How it Works</h1>
      <div className="steps-container flex flex-col ">
        {/* Step 1 */}
        <div className="step flex items-center gap-4">
          <div className="step-number bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
            1
          </div>
          <IoMdSearch className="text-2xl" />
          <p className="text-lg">
            Meet clients and find projects that interest you
          </p>
        </div>

        {/* Step 2 */}
        <div className="step flex items-center gap-4">
          <p className="text-lg">
            Agree on timelines and payment with the client
          </p>
          <FaHandshake className="text-2xl" />
          <div className="step-number bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
            2
          </div>
        </div>

        {/* Step 3 */}
        <div className="step flex items-center gap-4">
          <div className="step-number bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
            3
          </div>
          <FaAward className="text-2xl" />
          <p className="text-lg">
            Get a unique NFT every time you finish a project to build your
            reputation
          </p>
        </div>
      </div>
      <div className=" bottom_banner absolute">
              <img src={bottom_banner} alt="" className="w-screen"/>
            </div>
    </div>
  );
};

export default HowItWorks;
