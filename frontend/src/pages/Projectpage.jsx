import React, { useState } from "react";
import Project_Banner from "../assets/project_banner.png";
import SearchIcon from '@mui/icons-material/Search';
import Logo from "../assets/logo.png";
import Avatar from '@mui/material/Avatar';
import image_avatar from "../assets/image1.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import User_Avatar from "../assets/image.png";

const JobDetails = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const token = localStorage.getItem("authToken"); // Get token from localStorage (or use context)

  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    if (!agreed) {
      setMessage("You must agree to the terms before applying.");
      return;
    }

    setLoading(true);
    setMessage("");

    axios
      .post(
        "http://localhost:3000/api/applications/apply",
        { projectId, answers: [experience, skills] },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      )
      .then(() => setMessage("Application submitted successfully!"))
      .catch((error) => setMessage(error.response?.data?.message || "Something went wrong."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Header with Logo and Search Bar */}
      <div className="flex justify-between items-center mb-8">
        
        <div>
          <img src={Logo} alt="Logo" className="w-25 h-25" />
        </div>
        
        <div className="relative w-4/5">
          <input
            type="text"
            placeholder="Search by name or designation"
            className="w-full p-3 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="absolute right-1 top bg-purple-500 p-3 rounded-full">
            <SearchIcon/>
          </button>
        
        </div>
        <img
         src={User_Avatar}
         alt="User Avatar"
         className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => navigate("/dashboard")}
                            />
      </div>

      {/* Divider Line */}
      <hr className="border-purple-400 mb-4" />

      <div><img src={Project_Banner} alt="Project Banner" className="w-full rounded-lg mb-5" /></div>

      {/* Content Section */}
      <div className="flex gap-10 max-w-6xl mx-auto">
        
        {/* Left Section */}
        <div className="w-2/3">
          
          <h1 className="text-3xl font-bold text-purple-400">E-Commerce Website for Fashion Brand</h1>
          <div className="text-gray-400 text-sm mt-2 flex items-center gap-2">
  <Avatar alt="vincenzo cassano" src={image_avatar} />
  <span>Posted by: <span className="text-white">Ananya Mehra</span></span>
</div>


          <h2 className="text-xl font-semibold mt-6 text-purple-400">Description</h2>
          <p className="text-gray-300 text-sm">A sleek and modern e-commerce platform for a high-end fashion brand. The website should feature a user-friendly interface, seamless navigation, and a responsive design to ensure an optimal shopping experience across all devices. Key functionalities include product listings, filtering options, a shopping cart, secure checkout, and user authentication.</p>

          <h2 className="text-xl font-semibold mt-4 text-purple-400">Minimum NFTs desired</h2>
          <p className="text-gray-300 text-sm">2</p>

          <h2 className="text-xl font-semibold mt-4 text-purple-400">Estimated Duration</h2>
          <p className="text-gray-300 text-sm">3 months</p>

          <h2 className="text-xl font-semibold mt-4 text-purple-400">Required Skills</h2>
          <ul className="list-disc list-inside text-gray-300 text-sm">
            <li>Frontend development</li>
            <li>ReactJS</li>
          </ul>

          <h2 className="text-xl font-semibold mt-4 text-purple-400">Additional Notes from Client</h2>
          <ol className="list-disc list-inside text-gray-300 text-sm">
            <li>The website should have a minimalist and elegant design, similar to luxury fashion brands.</li> 
            <li>Implement smooth animations and transitions to enhance user engagement.</li>
            <li>Ensure fast loading times and optimized performance for both mobile and desktop users. </li>
            <li>Include integrations for payment gateways such as Stripe or PayPal.</li>
          </ol>
        </div>

        {/* Right Section - Application Form */}
        <div className="w-1/3 bg-gray-800 p-6 rounded-lg border border-blue-500">
        <p className="text-gray-300 text-sm mb-4">Sounds Interesting?</p>
        <h2 className="text-blue-400 text-xl font-bold text-center">Apply Now!</h2>
          <form onSubmit={handleApply} className="mt-4">
            <label className="text-gray-300 text-sm">Your Name</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded mt-1 text-white"
              placeholder="Your name"
            />

            <label className="text-gray-300 text-sm mt-3">Your Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-700 rounded mt-1 text-white"
              placeholder="Your email"
            />

            <label className="text-gray-300 text-sm mt-3">Years of Experience</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-1/2 p-2 bg-gray-700 rounded mt-1 text-white"
                placeholder="Years"
                value={experience} onChange={(e) => setExperience(e.target.value)}
              />
              <input
                type="text"
                className="w-1/2 p-2 bg-gray-700 rounded mt-1 text-white"
                placeholder="Skills"
                value={skills} onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="flex items-start gap-2 mt-4">
              <input type="checkbox" className="mt-1" checked={agreed} onChange={() => setAgreed(!agreed)} />
              <p className="text-gray-300 text-sm">
                You agree that your D-Connect profile and email address will be shared with the client when you submit this application.
              </p>
            </div>

            <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded" >Apply</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
