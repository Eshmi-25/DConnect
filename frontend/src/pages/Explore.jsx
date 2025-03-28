import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import Logo from "../assets/logo.png";
import Avatar from '@mui/material/Avatar';
import Image_Avatar from "../assets/image1.png";
import User_Avatar from "../assets/image.png";
import { Menu, MenuItem, Slider, Button, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterDropdown from "../components/FilterDropdown";

// Dummy Profiles
/*const profiles = Array(12).fill().map((_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  nfts: Math.floor(Math.random() * 21),  // Random NFTs between 0-20
  
  experience: Math.floor(Math.random() * 11), // Experience 0-10 years
  description: "Experienced freelancer delivering high-quality services with efficiency and professionalism. Let's work together to bring your project to life!",
}));*/

const Explore = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [profiles, setProfiles] = useState([]);

  // State for Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    nfts: [0, 20],
    
    experience: [0, 10],
  });

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await axios.post("http://localhost:3000/api/users/find-user", { name: query });
      setResults(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-purple-500 p-4 rounded-full">
            <IoIosSearch />
          </button>
        </div>

        {/* Filter Dropdown */}
        <FilterDropdown filters={filters} setFilters={setFilters} />

        {/* Avatar */}
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

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {results.map((profile, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-gray-300 to-blue-500 p-4 rounded-xl cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/profile/${profile._id}`)}
          >
            <div className="flex items-center gap-3">
              <Avatar alt={profile.name} src={profile.profilePicUrl || "/default-avatar.png"} sx={{ width: 40, height: 40 }} />
              <div>
                <h2 className="text-lg font-bold text-black">Name: {profile.name}</h2>
                <p className="text-sm text-black">Occupation: {profile.occupation}</p>
                <p className="text-sm text-black">Country: {profile.country}</p>
              </div>
            </div>
            <p className="text-black mt-2 text-sm">{profile.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
