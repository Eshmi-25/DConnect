import React from "react";
import Project_Banner from "../assets/project_banner.png";
import SearchIcon from '@mui/icons-material/Search';
import Logo from "../assets/logo.png";
import Avatar from '@mui/material/Avatar';
import image_avatar from "../assets/image.png";

const JobDetails = () => {
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
      </div>

      {/* Divider Line */}
      <hr className="border-blue-700 mb-4" />

      <div><img src={Project_Banner} alt="Project Banner" className="w-full rounded-lg mb-5" /></div>

      {/* Content Section */}
      <div className="flex gap-10 max-w-6xl mx-auto">
        
        {/* Left Section */}
        <div className="w-2/3">
          
          <h1 className="text-3xl font-bold text-purple-400">E-Commerce Website for Fashion Brand</h1>
          <p className="text-gray-400 text-sm mt-2"><Avatar alt="vincenzo cassano" src={image_avatar} />Posted by: <span className="text-white">Vincenzo Cassano</span></p>

          <h2 className="text-xl font-semibold mt-6">Description</h2>
          <p className="text-gray-300 text-sm">Lorem ipsum dolor sit amet...</p>

          <h2 className="text-xl font-semibold mt-4">Minimum NFTs desired</h2>
          <p className="text-gray-300 text-sm">4</p>

          <h2 className="text-xl font-semibold mt-4">Estimated Duration</h2>
          <p className="text-gray-300 text-sm">3 weeks</p>

          <h2 className="text-xl font-semibold mt-4">Required Skills</h2>
          <ul className="list-disc list-inside text-gray-300 text-sm">
            <li>Frontend development</li>
            <li>ReactJS</li>
          </ul>
        </div>

        {/* Right Section - Application Form */}
        <div className="w-1/3 bg-gray-800 p-6 rounded-lg border border-blue-500">
        <p className="text-gray-300 text-sm mb-4">Sounds Interesting?</p>
        <h2 className="text-blue-400 text-xl font-bold text-center">Apply Now!</h2>
          <form className="mt-4">
            <label className="text-gray-300 text-sm">Your Name</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded mt-1 text-white"
              placeholder="Your answer..."
            />

            <label className="text-gray-300 text-sm mt-3">Your Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-700 rounded mt-1 text-white"
              placeholder="Your answer..."
            />

            <label className="text-gray-300 text-sm mt-3">Years of Experience</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-1/2 p-2 bg-gray-700 rounded mt-1 text-white"
                placeholder="Years"
              />
              <input
                type="text"
                className="w-1/2 p-2 bg-gray-700 rounded mt-1 text-white"
                placeholder="Skills"
              />
            </div>

            <div className="flex items-start gap-2 mt-4">
              <input type="checkbox" className="mt-1" />
              <p className="text-gray-300 text-sm">
                You agree that your D-Connect profile and email address will be shared with the client when you submit this application.
              </p>
            </div>

            <button className="mt-4 w-full bg-blue-500 text-white p-2 rounded">Apply</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
