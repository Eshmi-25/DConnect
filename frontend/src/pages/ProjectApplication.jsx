import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import Avatar from "@mui/material/Avatar";
import User_Avatar from "../assets/image.png";
import Logo from "../assets/logo.png";
import { useSnapshot } from "valtio";
import userStore from "../store/userStore";
import stringToColor from "../string_to_color";

const ProjectApplications = () => {
  const snap = useSnapshot(userStore);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  // Toggle- use mock data
  const useMockData = false;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (useMockData) {
          // Hardcoded applications
          const mockApps = [
            {
              _id: "mock1",
              user: {
                _id: "user123",
                name: "Alice Johnson",
                email: "alice@example.com",
              },
              answers: [
                "I'm highly experienced in React and Node.js.",
                "I'd bring 5+ years of full-stack development to this project.",
              ],
            },
            {
              _id: "mock2",
              user: {
                _id: "user456",
                name: "Bob Smith",
                email: "bob@example.com",
              },
              answers: [
                "I have a background in AI and product design.",
                "I’ve worked with similar SaaS tools and can deliver fast.",
              ],
            },
          ];
          setApplications(mockApps);
        } else {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.get(
            `http://localhost:3000/api/applications/${projectId}`
          );
          setApplications(response.data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load applications.");
      }
    };

    fetchApplications();
  }, [projectId]);

  const handleCreateContract = (userId) => {
    navigate(`/projectcontract/${projectId}/${userId}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <img src={Logo} alt="Logo" className="w-25 h-25" />
        </div>
        <h1 className="text-2xl font-bold text-purple-400 mb-6">
          Applications for Project
        </h1>
        <Avatar
          sx={{
            bgcolor: stringToColor(snap.userName|| "U"),
            color: "white",
          }}
          onClick={() => navigate("/dashboard")}
        >
          {(snap.userName || "U").charAt(0).toUpperCase()}
        </Avatar>
      </div>
      <hr className="border-purple-400 mb-4" />

      {error && <p className="text-red-400">{error}</p>}

      {applications.length === 0 ? (
        <p className="text-gray-400">No applications found for this project.</p>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-gray-800 p-6 rounded-xl border border-purple-500 shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {application.user.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {application.user.email}
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg text-sm space-y-2 text-gray-300">
                {application.answers.map((answer, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <span className="text-purple-300 font-semibold">
                      Q{index + 1}: {application.questions[index]}
                    </span>
                    <span>{answer}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-right">
                <Button
                  variant="contained"
                  className="bg-purple-500 text-white"
                  startIcon={<GavelIcon />}
                  onClick={() => handleCreateContract(application.user._id)}
                >
                  Create Contract
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectApplications;
