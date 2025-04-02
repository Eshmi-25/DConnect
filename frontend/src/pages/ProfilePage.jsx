import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import User_Avatar from "../assets/image.png";
import Project_Banner from "../assets/project_banner.png";
import Logo from "../assets/logo.png";
import ProfilePic from "../assets/image1.png"; 
import NFT1 from "../assets/badge.png";
import NFT2 from "../assets/badge.png";
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import SourceIcon from '@mui/icons-material/Source';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Education from '@mui/icons-material/SchoolOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import Portfolio from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Apply from '@mui/icons-material/CallMade';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleShareProfile = () => {
    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Header with Search Bar and Navigation Icons */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </div>

        {/* Search Bar */}
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Look for the right people e.g: web developer..."
            className="w-full p-3 pl-4 pr-12 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 p-2 rounded-full">
            <IoIosSearch />
          </button>
        </div>

        {/* Icons and Logout */}
        <div className="flex items-center gap-4">
          <button className="bg-gray-800 p-2 rounded" onClick={() => navigate("/explore")}>
            <TravelExploreOutlinedIcon/>
          </button>
          <button className="bg-gray-800 p-2 rounded" onClick={() => navigate("/projectcreation")}>
            <SourceIcon/>
          </button>
          <button className="bg-purple-600 px-4 py-2 rounded" onClick={() => navigate("/")}>
            Log Out
          </button>
          <img
                    src={User_Avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  />
        </div>
      </div>
      
      {/* Project Banner with Profile Image Overlay */}
      <div className="relative w-full">
        <img src={Project_Banner} alt="Project Banner" className="w-full rounded-lg mb-10" />
        <div className="absolute -bottom-15 left-10">
          <img src={ProfilePic} alt="Profile" className="w-48 h-48 rounded-full border-4 border-grey-600 shadow-lg" />
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex gap-10">
        {/* Left - Profile Info */}
        <div className="bg-gray-800 p-6 rounded-lg w-2/5  border border-purple-400 ml-4">
          <h1 className="text-xl font-bold mt-3">Ananya Mehra</h1>
          <p className="text-s text-gray-400 mt-2 mb-2">Creative and detail-oriented UX/UI designer with 6+ years of experience crafting seamless digital experiences. Passionate about user-centered design, accessibility, and sleek aesthetics. Loves working with startups and e-commerce brands to elevate their online presence.</p>
          <p className="text-sm text-gray-400 mb-2">Freelancer | UX/UI Designer & Frontend Developer</p>
          <div>
          <p className="text-sm text-gray-400"><WorkOutlineOutlinedIcon />SDE, Google</p>
          <p className="text-sm text-gray-400"><LocationOnOutlinedIcon/>India</p>
          <p className="text-sm text-gray-400 "><Education/>B.Des in Interaction Design – National Institute of Design (NID), Ahmedabad</p> 
          </div>
          <div>
          <p className=" text-gray-400 mb-2">Skills & Work:</p>
          <p className="text-sm text-gray-400 ">
UX/UI Design (Figma, Adobe XD) |
Frontend Development (React, TailwindCSS) |
Branding & Visual Identity |
User Research & Prototyping |
Website Optimization for Conversion</p>
          </div>
          {/* Social Links */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-4">
            <a href="#" className="text-blue-400"><LinkedInIcon/>LinkedIn</a>
            <a href="#" className="text-black"><GitHubIcon/>GitHub</a>
            <a href="#" className="text-pink-400">Dribbble</a>
            <a href="#" className="text-purple-400"><Portfolio/>Portfolio</a>
          </div>
        </div>

        {/* Right - NFTs and Stats */}
        <div className="bg-gray-800 p-6 rounded-lg flex-1 border border-blue-600">
          <div className="flex justify-between ">
          <h1 className="text-4xl font-bold">NFTs</h1>

            <button className="bg-purple-500 px-3 py-1 rounded flex items-center gap-1" onClick={handleShareProfile}>
              <FaShareAlt /> Share Profile
              {copied && (
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs py-1 px-2 rounded">
          Link Copied!
        </span>
      )}
            </button>
          </div>

          {/* NFT Display */}
          <div className="flex gap-3 mt-4">
            <img src={NFT1} alt="NFT" className="w-36 h-36" />
            <img src={NFT2} alt="NFT" className="w-36 h-36" />
            <img src={NFT2} alt="NFT" className="w-36 h-36" />
          </div>
          <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg text-gray-400 text-sm">
  <h3 className="text-lg font-semibold text-white mb-6">Project Overview</h3>
  <div className="grid grid-cols-3 gap-4">
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-red-400">1</span>
      <p className="text-xs">Initiated</p>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-green-400">3</span>
      <p className="text-xs">Completed</p>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-blue-400">2</span>
      <p className="text-xs">Assigned</p>
    </div>
  </div>
</div>

        </div>
        
      </div>
      

      {/* Activity Section */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-blue-400 ml-4">
        <h3 className="text-lg font-bold mb-3">Activity</h3>

        <table className="w-full text-sm text-gray-400">
          <thead>
            <tr className="border-b border-purple-700">
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Description</th>
              <th className="p-2">Duration</th>
              <th className="p-2">NFTs Required</th>
              <th className="p-2">Budget</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            
              <tr className="border-b border-gray-700">
                <td className="p-2">E-Commerce Website for Fashion Brand</td>
                <td className="p-2">A sleek and modern e-commerce platform for a high-end fashion brand. The website should feature a user-friendly interface, seamless navigation, and a responsive design to ensure an optimal shopping experience across all devices. Key functionalities include product listings, filtering options, a shopping cart, secure checkout, and user authentication.</td>
                <td className="p-2 text-center">3 months</td>
                <td className="p-2 text-center">2+</td>
                <td className="p-2 text-center">INR 50000</td>
                <td className="p-2 text-center">
                  <button className="bg-purple-500 px-3 py-1 rounded text-white" onClick={() => navigate("/project")}>APPLY <Apply/></button>
                </td>
              </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
