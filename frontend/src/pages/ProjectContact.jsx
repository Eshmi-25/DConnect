import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import User_Avatar from "../assets/image.png";
import Logo from "../assets/logo.png";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const API_BASE_URL = "http://localhost:3000/api";

const ProjectContractPage = () => {
  const token = localStorage.getItem("token");
  const { projectId, userId } = useParams(); // Extract from URL
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(projectId || ""); // Default to URL param if available
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch user's projects for dropdown
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects/fetch-project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error.response?.data?.message || error.message);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/fetch-profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data?.message || error.message);
      }
    };

    fetchProjects();
    fetchUser();
  }, [token]);

  // Handle Apply for Project
  const handleApply = async () => {
    if (!selectedProject || !deliveryDate || !paymentDate) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    try {
      console.log("Submitting Project Application with:", {
        selectedProject,
        userId,
        deliveryDate,
        paymentDate,
      });

      await axios.put(
        `${API_BASE_URL}/projects/${selectedProject}/assign`, {
          assignedTo: userId,
          agreedDueDate: deliveryDate,
          agreedAmount: paymentDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((response) => {
        console.log("Project assigned successfully:", response.data);
      }).catch((error) => {
        console.error("Error assigning project:", error.response?.data?.message || error.message);
      });
  

      setMessage("Project contract submitted successfully!");
    } catch (error) {
      setMessage("Failed to submit project contract.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </div>
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search by name or designation"
            className="w-full p-3 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 p-3 rounded-full">
            <SearchIcon />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-gray-800 p-2 rounded" onClick={() => navigate("/explore")}>
            <TravelExploreOutlinedIcon />
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
      <hr className="border-purple-400 mb-4" />

      {/* Header Section */}
      <div className="text-left mb-6">
        <p className="text-gray-400">Found the right project?</p>
        <h1 className="text-3xl font-bold text-purple-400">Generate Project Contract</h1>
        <p className="text-gray-300 mt-2">
        We’re so glad you found the right fit! It is strongly recommended that before generating this contract, you connect with your preferred candidate using their e-mail and work out the following details: 
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          <li>A deadline range during which the project has to be delivered</li>
          <li>The payment that has to be made</li>
          <li>A hard deadline on which the payment has to be completed in full</li>
        </ul>
        <p className="text-gray-300 mt-2">Besides these, it is also helpful to set the right expectations and agree on deliverables. However, these cannot be tracked using D-Connect currently and we take no responsibility for it.</p>
        <p className="block text-red-400 mt-6">*D-Connect does not guarantee that the selected candidate will accept the contract.</p>
      </div>

      {/* Contract Form */}
      <div className="bg-gray-800 p-6 rounded-lg border border-blue-500 max-w-3xl mx-auto">
        {/* Project Selection */}
        <label className="block text-white mb-2"> Your Project</label>
        {/*<select
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>*/}

        {/* Display Project ID and User ID */}
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <p className="text-gray-300"><span className="font-bold text-purple-300">Project ID:</span> {projects?.name}</p>
          <p className="text-gray-300"><span className="font-bold text-purple-300">User ID:</span> {user?.name}</p>
        </div>

        {/* Agreed Delivery Date */}
        <label className="block text-white mt-4">Agreed Delivery Date</label>
        <input
          type="datetime-local"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
        />

        {/* Payment Date */}
        <label className="block text-white mt-4">Payment Amount</label>
        <input
          type="number"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
        />

        {/* Apply Button */}
        <div className="flex justify-center mt-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleApply}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-semibold transition duration-300"
          >
            Apply
          </Button>
        </div>

        {/* Success/Error Message */}
        {message && <p className="text-center text-red-400 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ProjectContractPage;
