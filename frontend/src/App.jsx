import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HowItWorks from "./pages/HowItWorks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Projectpage from "./pages/Projectpage";
import ProjectCreationPage from "./pages/ProjectCreationPage";
import Dashboard from "./pages/Dashboard";
import Contract from "./pages/ProjectContact";
import Explore from "./pages/Explore";
import ProfilePage from "./pages/ProfilePage";
import Notification from "./pages/Notification";
import ProjectApplications from "./pages/ProjectApplication";
import { useSnapshot } from "valtio";
import { jwtDecode } from "jwt-decode";
import userStore from "./store/userStore";
import axios from "axios";

function App() {
  useEffect(() => {
    const username = async () => {
      if (!userStore.userId) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decoded = jwtDecode(token);
            const id = decoded.id || decoded._id;
            await axios
              .get(`http://localhost:3000/api/users/get-user-name/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log(response.data.name);
                userStore.setUserId(response.data.name);
              })
              .catch((error) => {
                console.log(error);
                userStore.setUserId("User");
              });
          } catch (error) {
            console.error("Invalid token", error);
          }
        }
      }
    };
    username();
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative">
              <LandingPage />
              <div className="mt-[-50px]">
                <HowItWorks />
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/project-apply/:projectId" element={<Projectpage />} />
        <Route path="/projectcreation" element={<ProjectCreationPage />} />
        <Route
          path="/projectcontract/:projectId/:userId"
          element={<Contract />}
        />
        <Route path="/notification" element={<Notification />} />
        <Route
          path="/applications/:projectId"
          element={<ProjectApplications />}
        />
      </Routes>
    </Router>
  );
}

export default App;
