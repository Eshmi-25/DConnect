import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/logo.png";
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import User_Avatar from "../assets/image.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const NotificationPage = ({ token }) => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [verifications, setVerifications] = useState([
    { id: 1, project: "E-commerce Platform", status: "Awaiting Verification" },
    { id: 2, project: "AI Chatbot", status: "Awaiting Verification" },
  ]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/applications/my-applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error.response?.data?.message || error.message);
      }
    };

    fetchApplications();
  }, [token]);

  const handleVerify = (id) => {
    setVerifications(verifications.map(item => 
      item.id === id ? { ...item, status: "Verified" } : item
    ));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </div>
        <div className="relative w-2/3">
          <input
            type="text"
            placeholder="Search notifications"
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
          <img src={User_Avatar} alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer" onClick={() => navigate("/dashboard")} />
        </div>
      </div>
      <hr className="border-purple-400 mb-4" />

      {/* Applications Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-400">Applications</h2>
        <div className="bg-gray-800 p-6 rounded-lg border border-blue-500 mt-4">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div key={app._id} className="p-3 bg-gray-700 rounded-lg mb-2">
                <p className="text-white font-semibold">{app.project.name}</p>
                <p className="text-gray-400">Applicant ID: {app.user}</p>
                <p className="text-yellow-400">Status: Pending</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No applications available.</p>
          )}
        </div>
      </div>

      {/* Verification Section */}
      <div>
        <h2 className="text-2xl font-bold text-purple-400">Verification</h2>
        <div className="bg-gray-800 p-6 rounded-lg border border-blue-500 mt-4">
          {verifications.length > 0 ? (
            verifications.map((verify) => (
              <div key={verify.id} className="p-3 bg-gray-700 rounded-lg mb-2 flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{verify.project}</p>
                  <p className={`text-${verify.status === "Verified" ? "green" : "yellow"}-400`}>Status: {verify.status}</p>
                </div>
                {verify.status !== "Verified" && (
                  <button className="bg-green-500 px-4 py-2 rounded-lg text-white" onClick={() => handleVerify(verify.id)}>
                    Verify Payment
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No verifications pending.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
