import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Logo from "../assets/logo.png";
import Avatar from '@mui/material/Avatar';
import Image_Avatar from "../assets/image1.png";
import User_Avatar from "../assets/image.png";
import { Menu, MenuItem, Slider, Button, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Dummy Profiles
const profiles = Array(12).fill().map((_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  nfts: Math.floor(Math.random() * 21),  // Random NFTs between 0-20
  rating: (Math.random() * 4 + 1).toFixed(1), // Random rating between 1-5
  experience: Math.floor(Math.random() * 11), // Experience 0-10 years
  description: "Experienced freelancer delivering high-quality services with efficiency and professionalism. Let's work together to bring your project to life!",
}));

const Explore = () => {
  const navigate = useNavigate();

  // State for Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    nfts: [0, 20],
    rating: [1, 5],
    experience: [0, 10],
  });

  // Open & Close Menu
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // Handle Slider Change
  const handleSliderChange = (filterName, newValue) => {
    setFilters({ ...filters, [filterName]: newValue });
  };

  // Filter profiles based on selected filters
  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.nfts >= filters.nfts[0] &&
      profile.nfts <= filters.nfts[1] &&
      profile.rating >= filters.rating[0] &&
      profile.rating <= filters.rating[1] &&
      profile.experience >= filters.experience[0] &&
      profile.experience <= filters.experience[1]
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-20 h-20" />

        {/* Search Bar */}
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Look for the right people. Eg: Web developer, Content Writer, etc..."
            className="w-full p-3 pl-4 pr-12 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 p-2 rounded-full">
            <IoIosSearch />
          </button>
        </div>

        {/* NFT Filter */}
        <select className="p-2 rounded bg-gray-800 text-white">
          <option>NFT</option>
          {[...Array(21)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        {/* Dropdown Filter Button */}
        <Button
          onClick={openMenu}
          variant="contained"
          sx={{ background: "#6B7280", color: "white" }}
        >
          All Filters < ArrowDropDownIcon/>
        </Button>

        {/* Filter Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem>
            <Typography>No. of NFTs</Typography>
            <Slider
              value={filters.nfts}
              onChange={(e, newValue) => handleSliderChange("nfts", newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={20}
            />
          </MenuItem>
          <MenuItem >
            <Typography>Rating</Typography>
            <Slider
              value={filters.rating}
              onChange={(e, newValue) => handleSliderChange("rating", newValue)}
              valueLabelDisplay="auto"
              min={1}
              max={5}
              step={0.1}
            />
          </MenuItem>
          <MenuItem>
            <Typography>Experience (Years)</Typography>
            <Slider
              value={filters.experience}
              onChange={(e, newValue) => handleSliderChange("experience", newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10}
            />
          </MenuItem>
        </Menu>

        {/* Avatar */}
        <img
          src={User_Avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProfiles.map((profile, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-300 to-blue-500 p-4 rounded-xl cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/profile`)}     //${profile.id}
          >
            <div className="flex items-center gap-3">
              <Avatar alt="Profile" src={Image_Avatar} sx={{ width: 40, height: 40 }} />
              <div>
                <h2 className="text-lg font-bold text-black">Name: {profile.name}</h2>
                <p className="text-sm text-black">NFTs: {profile.nfts}</p>
                <p className="text-sm text-black">Rating: {profile.rating} ⭐</p>
                <p className="text-sm text-black">Experience: {profile.experience} years</p>
              </div>
            </div>
            <p className="text-black mt-2 text-sm">{profile.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
