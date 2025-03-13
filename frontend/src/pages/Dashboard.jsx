import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Logo from "../assets/logo.png";
import Image from "../assets/image.png";
import Avatar from '@mui/material/Avatar';
import Image_Avatar from "../assets/image.png";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InfoIcon from '@mui/icons-material/Info';
import ShareIcon from '@mui/icons-material/Share';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

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

      <div className="w-3/4">
      <h2 className="text-xl font-bold text-purple-400 mb-4 ml-2 flex items-center">
        <AccountTreeOutlinedIcon className="mr-2" /> Active Projects
      </h2>

      <div className="bg-gray-800 p-6 rounded-2xl border border-purple-500">
        {/* Hiring For Section */}
        <h3 className="text-lg font-semibold mb-2 text-white">Hiring For</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <thead>
              <tr className="text-gray-400 border-b border-gray-600">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Assigned to</th>
                <th className="p-3 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
            {[
              {
                title: "E-Commerce Website for Fashion Brand",
                description: "Lorem ipsum dolor sit amet",
                avatar: Image,
                name: "Song Joong-ki",
                dueDate: "21 Feb 2026",
              },
              {
                title: "E-Commerce Website for Fashion Brand",
                description: "Lorem ipsum dolor sit amet",
                avatar: Image,
                name: "Jin Do-Jun",
                dueDate: "21 Feb 2026",
              },
            ].map((job, index) => (
              <tr
                key={index}
                className="text-gray-300 bg-gray-800 rounded-xl border border-gray-600"
              >
                <td className="p-4 rounded-l-xl">{job.title}</td>
                <td className="p-4 text-sm">{job.description}</td>
                <td className="p-4 text-sm flex items-center gap-2">
                  <Avatar src={job.avatar} /> {job.name}
                </td>
                <td className="p-4 text-sm rounded-r-xl">{job.dueDate}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Working On Section */}
        <h3 className="text-lg font-semibold mt-6 text-white">Working On</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <thead>
              <tr className="text-gray-400 border-b border-gray-600">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-300">
                <td className="p-3">E-Commerce Website for Fashion Brand</td>
                <td className="p-3 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</td>
                <td className="p-3 text-sm"><Avatar  src={Image_Avatar} /> Edgar L. Knowles</td>
                <td className="p-3 text-sm">21 Feb 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>

      {/* Projects Section */}
      <div className="mt-10 border border-cyan-500 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-cyan-400 mb-4"><AssignmentOutlinedIcon/>Projects</h2>

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
          {[...Array(21)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
          <Button variant="contained" className="bg-purple-500 text-white">
            <AddIcon /> Create New
          </Button>
        </div>

        {/* Project Listings */}
        <div className="bg-gray-800 p-4 rounded-lg">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-gray-900 p-4 rounded-2xl mb-4 flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-1/6 text-gray-300 text-center">Title</div>
            <div className="flex items-center gap-3 w-full md:w-1/4 text-gray-300">
              <Avatar src={Image} />
              <span className="font-semibold">Edgar L. Knowles</span>
            </div>
            <div className="w-full md:w-1/2 text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ea minus harum est officia rerum qui.
            </div>
            <div className="w-full md:w-1/6 text-gray-300 text-center">3 months</div>
            <div className="w-full md:w-1/6 text-gray-300 text-center">INR 80000.00</div>
            <div className="w-full md:w-1/6 text-gray-300 text-center">3 NFT</div>
            <div className="w-full md:w-auto">
              <Button variant="contained" className="bg-purple-500 text-white">Edit</Button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
