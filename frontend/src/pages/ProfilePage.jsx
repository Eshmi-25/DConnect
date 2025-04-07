import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Project_Banner from "../assets/project_banner.png";
import Logo from "../assets/logo.png";
import NFT1 from "../assets/badge.png";
import NFT2 from "../assets/client_badge.png";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SourceIcon from "@mui/icons-material/Source";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Education from "@mui/icons-material/SchoolOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import Portfolio from "@mui/icons-material/Language";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { useSnapshot } from "valtio";
import userStore from "../store/userStore";

const ProfilePage = () => {
  const snap = useSnapshot(userStore);
  const userId = useParams().userId;
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [nftData, setNftData] = useState(null);

  const handleShareProfile = () => {
    const profileURL = window.location.href;
    navigator.clipboard.writeText(profileURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color =
      "#" +
      ((hash >> 24) & 0xff).toString(16).padStart(2, "0") +
      ((hash >> 16) & 0xff).toString(16).padStart(2, "0") +
      ((hash >> 8) & 0xff).toString(16).padStart(2, "0");
    return color;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const fetchUserData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:3000/api/users/fetch-profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          alert("Something went wrong. Please try again later.");
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const fetchProjectData = async () => {
      await axios
        .get(`http://localhost:3000/api/users/user-project-data/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProjectData(response.data);
        })
        .catch((error) => {
          alert("Something went wrong. Please try again later.");
          console.error("Error fetching project data:", error);
        });
    };

    const fetchNFTs = async () => {
      await axios
        .get(`http://localhost:3000/api/users/user-nfts/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setNftData(response.data);
        })
        .catch((error) => {
          alert("Something went wrong. Please try again later.");
          console.error("Error fetching NFTs:", error);
        });
    };

    fetchUserData();
    fetchProjectData();
    fetchNFTs();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          Loading...
        </div>
      ) : (
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
              <button
                className="bg-gray-800 p-2 rounded"
                onClick={() => navigate("/notification")}
              >
                <NotificationsIcon />
              </button>
              {/* <button
                className="bg-gray-800 p-2 rounded"
                onClick={() => navigate("/explore")}
              >
                <TravelExploreOutlinedIcon />
              </button> */}
              <button
                className="bg-gray-800 p-2 rounded"
                onClick={() => navigate("/projectcreation")}
              >
                <SourceIcon />
              </button>
              <button
                className="bg-purple-600 px-4 py-2 rounded"
                onClick={() => navigate("/")}
              >
                Log Out
              </button>
              <Avatar
                sx={{
                  bgcolor: stringToColor(snap.userName || "U"),
                  color: "white",
                }}
                onClick={() => navigate("/dashboard")}
              >
                {(snap.userName || "U").charAt(0).toUpperCase()}
              </Avatar>
            </div>
          </div>

          {/* Project Banner with Profile Image Overlay */}
          <div className="relative w-full">
            <img
              src={Project_Banner}
              alt="Project Banner"
              className="w-full rounded-lg mb-10"
            />
            <div className="absolute -bottom-15 left-10">
              <Avatar
                sx={{
                  bgcolor: stringToColor(userData?.name || "U"),
                  color: "white",
                  width: 150,
                  height: 150,
                  fontSize: 48,
                }}
              >
                {(userData?.name || "U").charAt(0).toUpperCase()}
              </Avatar>
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex gap-10">
            {/* Left - Profile Info */}
            <div className="bg-gray-800 p-6 rounded-lg w-2/5  border border-purple-400 ml-4">
              <h1 className="text-xl font-bold mt-3">{userData?.name}</h1>
              <p className="text-s text-gray-400 mt-2 mb-2">{userData?.bio}</p>
              <p className="text-sm text-gray-400 mb-2">{userData?.headline}</p>
              <div>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <WorkOutlineOutlinedIcon />
                  {userData?.occupation}
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <LocationOnOutlinedIcon />
                  {userData?.country}
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <Education />
                  {userData?.graduation}
                </p>
              </div>
              <div>
                <p className=" text-gray-400 mb-2 mt-2">Skills & Work:</p>
                <p className="text-sm text-gray-400 ">
                  {userData?.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 px-2 py-1 rounded-full mr-2"
                    >
                      {skill}
                    </span>
                  ))}
                </p>
              </div>
              {/* Social Links */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-4">
                <a
                  href={userData?.linkedinUrl}
                  className="text-blue-400 flex gap-1"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a href={userData?.githubUrl} className="text-black flex gap-1">
                  <GitHubIcon />
                  GitHub
                </a>
                <a
                  href={userData?.dribbleUrl}
                  className="text-pink-400 flex gap-1"
                >
                  <SportsBasketballIcon />
                  Dribbble
                </a>
                <a
                  href={userData?.portfolioUrl}
                  className="text-purple-400 flex gap-1"
                >
                  <Portfolio />
                  Portfolio
                </a>
              </div>
            </div>

            {/* Right - NFTs and Stats */}
            <div className="bg-gray-800 p-6 rounded-lg flex-1 border border-blue-600">
              <div className="flex justify-between ">
                <h1 className="text-4xl font-bold">NFTs</h1>

                <button
                  className="bg-purple-500 px-3 py-1 rounded flex items-center gap-1"
                  onClick={handleShareProfile}
                >
                  <FaShareAlt /> Share Profile
                  {copied && (
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs py-1 px-2 rounded">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* NFT Display */}
              {/* <div className="flex gap-3 mt-4">
                <img src={NFT1} alt="NFT" className="w-36 h-36" />
                <img src={NFT2} alt="NFT" className="w-36 h-36" />
                <img src={NFT2} alt="NFT" className="w-36 h-36" />
              </div> */}
              {nftData && nftData.length > 0 ? (
                <div className="flex gap-3 mt-4">
                  {nftData.map((nft, index) => (
                    <div className="relative group" key={index}>
                      <img
                        src={nft.type === "freelancer" ? NFT1 : NFT2}
                        alt="NFT"
                        className="w-36 h-36"
                      />
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
                        {nft.project?.name || "No Project"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 mt-4">No NFTs found.</p>
              )}

              {/* Project Overview */}
              <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg text-gray-400 text-sm">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Project Overview
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-red-400">
                      {projectData?.initiated}
                    </span>
                    <p className="text-xs">Initiated</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-400">
                      {projectData?.completed}
                    </span>
                    <p className="text-xs">Completed</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-blue-400">
                      {projectData?.assigned}
                    </span>
                    <p className="text-xs">Assigned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
