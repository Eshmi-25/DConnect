import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/logo.png";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import User_Avatar from "../assets/image.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

const API_BASE_URL = "http://localhost:3000/api";

const NotificationPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [openProjects, setOpenProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(
          `${API_BASE_URL}/applications/my-applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // const formattedApplications = response.data.map(app => ({
        //   ...app,
        //   applicantName: app.user?.name || "Unknown Applicant",
        // }));

        setApplications(response.data);
      } catch (error) {
        console.error(
          "Error fetching applications:",
          error.response?.data?.message || error.message
        );
        // setApplications([
        //   { _id: "1", project: { name: "NFT Marketplace" }, applicantName: "John Doe", status: "Pending" },
        //   { _id: "2", project: { name: "AI Chatbot" }, applicantName: "Jane Smith", status: "Pending" },
        //   { _id: "3", project: { name: "E-commerce Platform" }, applicantName: "Arya Sinha", status: "Pending" }
        // ]);
      }
    };

    const fetchVerifications = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/projects/projects-for-verification`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setVerifications(response.data);
      } catch (error) {
        console.error(
          "Error fetching verifications:",
          error.response?.data?.message || error.message
        );
        // setVerifications([
        //   { id: 1, project: "E-commerce Platform", status: "Awaiting Verification" },
        //   { id: 2, project: "AI Chatbot", status: "Awaiting Verification" },
        //   { id: 3, project: "Blockchain Voting System", status: "Verified" }
        // ]);
      }
    };

    const fetchOpenProjects = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/projects/my-projects-status`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOpenProjects(response.data);
      } catch (error) {
        console.error(
          "Error fetching verifications:",
          error.response?.data?.message || error.message
        );
        // setOpenProjects ([
        //   { id: 1, project: "E-commerce Platform", status: "Awaiting Verification" },
        //   { id: 2, project: "AI Chatbot", status: "Awaiting Verification" },
        //   { id: 3, project: "Blockchain Voting System", status: "Verified" }
        // ]);
      }
    };

    fetchApplications();
    fetchVerifications();
    fetchOpenProjects();
  }, [token]);

  const handleAccept = async (id) => {
    await axios
      .put(
        `${API_BASE_URL}/projects/${id}/accept`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Project accepted successfully!");
        console.log("Project accepted successfully:", response.data);
      })
      .catch((error) => {
        alert(
          "Error accepting project:",
          error.response?.data?.message || error.message
        );
        console.error(
          "Error accepting project:",
          error.response?.data?.message || error.message
        );
      });
  };

  const handleVerify = async (verify, pendingType) => {
    if (verify.verificationType === "Pending") {
      await axios
        .post(
          `${API_BASE_URL}/nfts/add-nft`,
          {
            projectId: verify._id,
            confirmationType: pendingType,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          alert("Verified");
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response?.data?.message || err.message);
        });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <img src={Logo} alt="Logo" className="w-20 h-20" />
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
          <button
            className="bg-gray-800 p-2 rounded"
            onClick={() => navigate("/explore")}
          >
            <TravelExploreOutlinedIcon />
          </button>
          <button
            className="bg-purple-600 px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
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
      <hr className="border-purple-400 mb-6" />

      {/* Applications Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-purple-400 mb-2">
          Your Applications
        </h2>
        <p className="text-gray-400 mb-4">
          These are the projects you've applied to.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg border border-blue-500">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div
                key={app._id}
                className="p-4 bg-gray-700 rounded-lg mb-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-semibold text-lg">
                    {app.project.name}
                  </p>
                  <p className="text-gray-400">
                    Posted By: {app.project.postedBy}
                  </p>
                  <p
                    className={`text-${
                      app.status === "In review" ? "yellow" : "red"
                    }-400`}
                  >
                    Status: {app.status}
                  </p>
                </div>
                {app.status !== "Accepted" && (
                  <button
                    className="bg-blue-500 px-4 py-2 rounded-lg text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/project-apply/${app.project._id}`);
                    }}
                  >
                    View
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">
              You haven’t applied to any projects yet.
            </p>
          )}
        </div>
      </div>

      {/* Verification Section */}
      <div>
        <h2 className="text-3xl font-bold text-purple-400 mb-2">
          Payment & Project Verifications
        </h2>
        <p className="text-gray-400 mb-4">
          Confirm payments or project deliveries below.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg border border-blue-500">
          {verifications.length > 0 ? (
            <div>
              {verifications.map((verify, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-700 rounded-lg mb-3 flex justify-between items-center"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-semibold text-lg">
                      {verify.name}
                    </span>
                    <span
                      className={`${
                        verify.verificationType === "Completed"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      Status:{" "}
                      {verify.verificationType === "Completed"
                        ? "Completed"
                        : verify.verificationType === "None"
                        ? "Open"
                        : verify.verificationType == "Waiting"
                        ? "Waiting for Freelancer"
                        : "Pending Verification"}
                    </span>
                  </div>
                  <div>
                    {verify.verificationType === "None" && verify.owner ? (
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/applications/${verify._id}`);
                        }}
                      >
                        View Applications
                      </Button>
                    ) : verify.verificationType === "Pending" ? (
                      <div className="flex flex-col gap-2">
                        {verify.pending.map((type, index) => (
                          <Button
                            key={index}
                            variant="contained"
                            onClick={(e) => {
                              e.preventDefault();
                              handleVerify(verify, type);
                            }}
                          >
                            Verify {type}
                          </Button>
                        ))}
                      </div>
                    ) : verify.verificationType === "Waiting" &&
                      !verify.owner ? (
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAccept(verify._id);
                        }}
                      >
                        Accept
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No verifications pending.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
