import React, { useState, useEffect } from "react";
import EditProjectModal from "../components/EditProject";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Logo from "../assets/logo.png";
import Image from "../assets/image.png";
import Avatar from "@mui/material/Avatar";
import Image_Avatar from "../assets/image.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InfoIcon from "@mui/icons-material/Info";
import ShareIcon from "@mui/icons-material/Share";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import client1 from "../assets/client1.png";
import client2 from "../assets/client2.png";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [project, setProjects] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [error, setError] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [postedProjects, setPostedProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/projects");
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleEditClick = (project) => {
    setSelectedProject(project); // Set the project data to be edited
    setOpenEditModal(true); // Open the modal
  };

  // Handle closing the Edit Project modal
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedProject(null); // Reset selected project when closing the modal
  };

  // Refresh the projects list after editing
  const refreshProjects = () => {
    fetchProjects(); // Reload the list of projects
  };

  const handleViewProfile = (email) => {
    const mode = email === loggedInUserEmail ? "owner" : "view";
    navigate(`/user/${email}?mode=${mode}`);
  };

  const handleSaveProject = (updatedProject) => {
    setPostedProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      )
    );
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const profileRes = await axios.get(
          "http://localhost:3000/api/users/fetch-profile"
        );
        setProfile(profileRes.data);

        const postedRes = await axios.get(
          "http://localhost:3000/api/projects/posted"
        );
        setPostedProjects(postedRes.data);

        const assignedRes = await axios.get(
          "http://localhost:3000/api/projects/assigned",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAssignedProjects(assignedRes.data);

        const openProjects = await axios.get(
          "http://localhost:3000/api/projects/list-open-projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOpenProjects(openProjects.data);

        const edit_project = await axios.put(
          `http://localhost:3000/api/projects/edit/${selectedProject._id}`,
          selectedProject, // Send the updated project object
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Update the posted projects list with the updated project
        const updatedPostedProjects = postedProjects.map((project) =>
          project._id === selectedProject._id ? edit_project.data : project
        );
        setPostedProjects(updatedPostedProjects);

        // Optionally close the modal after updating
        setOpenEditModal(false);
        setSelectedProject(null);
      } catch (err) {
        setError("Failed to load projects.");
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <img src={Logo} alt="Logo" className="w-25 h-25" />
        </div>

        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search by name or designation"
            className="w-full p-3 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="absolute right-1 top bg-purple-500 p-3 rounded-full">
            <SearchIcon />
          </button>
        </div>
        <button
          className="bg-gray-800 p-2 rounded"
          onClick={() => navigate("/notification")}
        >
          <NotificationsIcon />
        </button>

        <button
          className="bg-gray-800 p-2 rounded"
          onClick={() => navigate("/explore")}
        >
          <TravelExploreOutlinedIcon />
        </button>
        <button
          className="bg-purple-600 px-4 py-2 rounded"
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Log Out
        </button>
        <img
          src={Image_Avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
      </div>
      <hr className="border-purple-400 mb-4" />

      {/* User and Active Projects */}
      <div className="flex gap-6">
        <div className="relative w-2/5 mt-4 ">
          <h2 className="text-xl font-bold text-purple-400 mb-4 ml-2">
            <PersonOutlineOutlinedIcon /> User
          </h2>
          {/* Profile Card */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-blue-500 flex flex-col items-center text-center mb-4">
            <div className="absolute right-2 bg-purple-500 p-1 rounded-full">
              <CameraAltIcon className="text-white text-sm" />
            </div>

            <Avatar
              alt="Vincenzo Cassano"
              src={Image_Avatar}
              sx={{ width: 106, height: 106 }}
            />
            <h2 className="text-lg font-bold text-whitemt-4">{profile.name}</h2>

            <div className="flex gap-4 mt-4">
              <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center gap-2 shadow-md">
                <EditIcon /> Edit Profile
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center gap-2 shadow-md">
                <VisibilityIcon /> View Full Profile
              </button>
            </div>
            {/* Bio Section */}
            <div className="bg-gray-700 p-3 mt-4 rounded border border-purple-400 text-gray-300 text-sm w-full">
              {profile.bio}
            </div>
            {/* Expertise */}
            <div className="flex gap-2 mt-4">
              {profile.expertise?.map((expertise, index) => (
                <span
                  className="bg-gray-700 px-3 py-1 rounded text-gray-300 text-sm"
                  key={index}
                >
                  {expertise}
                </span>
              ))}
            </div>

            {/* Total NFTs & Details */}
            <div className="flex justify-between w-full mt-4 text-gray-300">
              <p>
                Total NFTs:{" "}
                <span className="font-bold">{profile.nfts | "1"}</span>
              </p>
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
            <h3 className="text-lg font-semibold mb-2 text-white">
              Open Projects
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-600">
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Posted By</th>
                    <th className="p-3 text-left">Estd. Duration</th>
                    <th className="p-3 text-left">Apply</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr className="text-gray-300 bg-gray-800 rounded-xl border border-gray-600">
                    <td className="p-4 rounded-l-xl">
                      NFT-Based Loyalty Program
                    </td>
                    <td className="p-4 text-sm">
                      Developing a smart contract-driven rewards system for
                      e-commerce brands.
                    </td>
                    <td className="p-4 text-sm flex items-center gap-2">
                      <Avatar src={client1} /> Rahul Sharma
                    </td>
                    <td className="p-4 text-sm rounded-r-xl">April 15, 2025</td>
                  </tr>
                </tbody> */}

                <tbody>
                  {openProjects.map(
                    (job, index) => (
                      console.log(job),
                      (
                        <tr
                          key={index}
                          className="text-gray-300 bg-gray-800 rounded-xl border border-gray-600"
                        >
                          <td className="p-4 rounded-l-xl">{job.name}</td>
                          <td className="p-4 text-sm">{job.description}</td>
                          <td className="p-4 text-sm flex items-center gap-2">
                            <Avatar src={job.avatar} /> {job.postedBy}
                          </td>
                          <td className="p-4 text-sm">{job.estdDuration}</td>
                          <td className="p-4 text-sm rounded-r-xl">
                            <Button
                              variant="contained"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/applications/${job._id}`);
                              }}
                            >
                              Apply
                            </Button>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* Working On Section */}
            <h3 className="text-lg font-semibold mt-6 text-white">
              Working On
            </h3>
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
                  {/* <tr className="text-gray-300">
                    <td className="p-3">NFT-Based Loyalty Program</td>
                    <td className="p-3 text-sm">
                      Seeking a React & Solidity Developer to create a smart
                      contract-driven rewards system for e-commerce brands.
                    </td>
                    <td className="p-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar src={client2} />
                        <span>Robert B. Ford</span>
                      </div>
                    </td>
                    <td className="p-3 text-sm">21 Feb 2026</td>
                  </tr> */}
                  {assignedProjects.map((project, index) => (
                    <tr key={index} className="text-gray-300">
                      <td className="p-3">{project.name}</td>
                      <td className="p-3 text-sm">{project.description}</td>
                      <td
                        className="p-3 text-sm flex items-center gap-2 cursor-pointer text-blue-400 underline"
                        onClick={() => handleViewProfile(project.clientEmail)}
                      >
                        <Avatar src={project.clientAvatar} /> {project.postedBy}
                      </td>
                      <td className="p-3 text-sm">{project.agreedDueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="mt-10 border border-cyan-500 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">
          <AssignmentOutlinedIcon />
          Projects
        </h2>

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
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <Button
            variant="contained"
            className="bg-purple-500 text-white"
            onClick={() => navigate("/projectcreation")}
          >
            <AddIcon /> Create New
          </Button>
        </div>

        {/* Project Listings */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="bg-gray-900 p-4 rounded-2xl mb-4 flex flex-col gap-5 justify-between items-center">
            {postedProjects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mb-4 md:mb-0"
              >
                <div className="w-full md:w-1/6 text-gray-300 text-center">
                  {project.name}
                </div>
                <div className="flex items-center gap-3 w-full md:w-1/4 text-gray-300">
                  <Avatar src={Image} />
                  <span className="font-semibold">{project.postedBy}</span>
                </div>
                <div className="w-full md:w-1/2 text-sm text-gray-400">
                  {project.description}
                </div>
                <div className="w-full md:w-1/6 text-gray-300 text-center">
                  {project.estdDuration}
                </div>
                <div className="w-full md:w-1/6 text-gray-300 text-center">
                  {project.budget}
                </div>
                <div className="w-full md:w-1/6 text-gray-300 text-center">
                  {project.minNFT}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="contained"
                    className="bg-purple-500 text-white"
                    onClick={() => handleEditClick(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    className="bg-purple-500 text-white"
                    onClick={() => navigate(`/applications/${project._id}`)}
                  >
                    View Applications
                  </Button>
                </div>
                <EditProjectModal
                  open={openEditModal}
                  onClose={handleCloseEditModal}
                  project={selectedProject}
                  onSave={handleSaveProject}
                />
              </div>
            ))}
            {/* <div className="w-full md:w-1/6 text-gray-300 text-center">
              Decentralized Identity Verification
            </div>
            <div className="flex items-center gap-3 w-full md:w-1/4 text-gray-300">
              <Avatar src={Image} />
              <span className="font-semibold">Edgar L. Knowles</span>
            </div>
            <div className="w-full md:w-1/2 text-sm text-gray-400">
              Searching for a Cybersecurity Expert to implement KYC solutions
              using blockchain.
            </div>
            <div className="w-full md:w-1/6 text-gray-300 text-center">
              93 months
            </div>
            <div className="w-full md:w-1/6 text-gray-300 text-center">
              INR 80000.00
            </div>
            <div className="w-full md:w-1/6 text-gray-300 text-center">
              3 NFT
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="contained"
                className="bg-purple-500 text-white"
                onClick={() => handleEditClick(project)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                className="bg-purple-500 text-white"
                onClick={() => navigate(`/applications/${project._id}`)}
              >
                View Applications
              </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
