import React from "react";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="relative">
            <LandingPage />
            <div className="mt-[-50px]">
              <HowItWorks />
            </div>
          </div>
        } />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/project" element={<Projectpage/>} />
        <Route path="/projectcreation" element={<ProjectCreationPage/>} />
        <Route path="/projectcontract" element={<Contract/>} />
      </Routes>
    </Router>
  );
}

export default App;
