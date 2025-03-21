import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/logo.png";
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import User_Avatar from "../assets/image.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const API_BASE_URL = "http://localhost:3000/api";

const ProjectContractPage = ({ token }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [answers, setAnswers] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user's projects for dropdown
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects/my-projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error.response?.data?.message || error.message);
      }
    };

    fetchProjects();
  }, [token]);

  // Handle Apply for Project
  const handleApply = async () => {
    if (!selectedProject) {
      setMessage("Please select a project.");
      return;
    }

    try {
      await applyForProject(token, selectedProject, answers);
      setMessage("Project application submitted successfully!");
    } catch (error) {
      setMessage(error);
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
            <TravelExploreOutlinedIcon/>
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
        <label className="block text-white mb-2">Select Your Project</label>
       {/*} <select className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500">
          <option>Drop down of user’s projects</option>
        </select>*/}
        <select
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
        </select>

         {/* Answer Input */}
         <label className="block text-white mt-4">Application Details</label>
        <textarea
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500"
          placeholder="Enter your application details..."
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
        ></textarea>


        <div className="flex justify-center mt-4">
  <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-semibold transition duration-300" onClick={handleApply}>
    Apply
  </button>
</div>
{/* Success/Error Message */}
{message && <p className="text-center text-red-400 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ProjectContractPage;
