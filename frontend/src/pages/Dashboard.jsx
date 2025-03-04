import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Logo from "../assets/logo.png";
import Avatar from '@mui/material/Avatar';
import Image_Avatar from "../assets/image.png";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

const Dashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Search Bar */}
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
         <hr className="border-purple-400 mb-4" />
         
         {/* User and Active Projects */}
         <div className="flex gap-6">
            
         <div className="relative w-2/5 mt-4 ">
         <h2 className="text-xl font-bold text-purple-400 mb-4 ml-2 font-bold">
           <PersonOutlineOutlinedIcon /> User
         </h2>
         {/* Profile Card */}
         <div className="bg-gray-800 p-6 rounded-2xl border border-blue-500 flex flex-col items-center text-center mb-4">
         <div className="absolute right-2 bg-purple-500 p-1 rounded-full">
               <CameraAltIcon className="text-white text-sm" />
            </div>
       
           <Avatar alt="Vincenzo Cassano" src={Image_Avatar} sx={{ width: 106, height: 106 }} />
           <h2 className="text-lg font-bold text-whitemt-4">Vincenzo Cassano</h2>
           <p className="text-gray-400 text-sm">Italian Mafia</p>
           <div className="flex gap-4 mt-4">
           <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center gap-2 shadow-md">
             <EditIcon /> Edit Profile
           </button>
           <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center gap-2 shadow-md">
                 <VisibilityIcon /> View Full Profile</button>
            </div>
              {/* Bio Section */}
            <div className="bg-gray-700 p-3 mt-4 rounded border border-purple-400 text-gray-300 text-sm w-full">
            Adopted son of Fabio, the Don of the Cassano Family. Est vitae consequuntur sit corrupti amet et voluptas nemo eos totam culpa.
        </div>
         {/* Expertise */}
    <div className="flex gap-2 mt-4">
      <span className="bg-gray-700 px-3 py-1 rounded text-gray-300 text-sm">Web</span>
      <span className="bg-gray-700 px-3 py-1 rounded text-gray-300 text-sm">SEO</span>
      <span className="bg-gray-700 px-3 py-1 rounded text-gray-300 text-sm">React</span>
    </div>

    {/* Total NFTs & Details */}
    <div className="flex justify-between w-full mt-4 text-gray-300">
      <p>Total NFTs <span className="font-bold">12</span></p>
      <p className="flex items-center gap-1 cursor-pointer">
        See details <InfoIcon className="text-gray-400 text-sm" />
      </p>
    </div>

    {/* Share Profile Button */}
    <button className="bg-purple-500 text-white px-6 py-2 rounded mt-6 w-full flex items-center justify-center gap-2 shadow-md">
      <ShareIcon /> Share Profile
    </button>
         </div>
       </div>
       
        {/* Active Projects */}
        <div className="w-3/4 ">
          <h2 className="text-xl font-bold text-purple-400 mb-4 ml-2"><AccountTreeOutlinedIcon/> Active Projects</h2>
          <div className="bg-gray-800 p-6 rounded-2xl border border-purple-500">
          {/* Hiring For Section */}
          <h3 className="text-lg font-semibold mb-2">Hiring For</h3>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between text-gray-300">
              <p className="w-1/4">E-Commerce Website</p>
              <p className="w-1/2 text-sm">Lorem ipsum dolor sit amet...</p>
              <p className="w-1/4 text-sm text-right">Rhivak Sarkar</p>
            </div>
          </div>

          {/* Working On Section */}
          <h3 className="text-lg font-semibold mt-4">Working On</h3>
          <div className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between text-gray-300">
              <p className="w-1/4">E-Commerce Website</p>
              <p className="w-1/2 text-sm">Lorem ipsum dolor sit amet...</p>
              <p className="w-1/4 text-sm text-right">Edgar L. Knowles</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Projects Section */}
      <div className="mt-10 border border-cyan-500 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">Projects</h2>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by title or keywords"
              className="w-full bg-gray-700 p-2 rounded text-white placeholder-gray-400"
            />
          </div>
          <select className="bg-gray-700 text-white p-2 rounded">
            <option>NFT</option>
          </select>
          <Button variant="contained" className="bg-purple-500 text-white">
            <AddIcon /> Create New
          </Button>
        </div>

        {/* Project Listings */}
        <div className="bg-gray-800 p-4 rounded-lg">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex justify-between items-center border-b border-gray-700 py-3">
              <div className="w-1/4 text-gray-300">E-Commerce Website</div>
              <div className="w-1/2 text-sm text-gray-400">Lorem ipsum dolor sit amet...</div>
              <div className="w-1/6 text-gray-300">3 months</div>
              <div className="w-1/6 text-gray-300 text-right">INR 50000.00</div>
              <Button variant="contained" className="bg-blue-500 text-white">
                Apply
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
