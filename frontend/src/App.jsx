import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HowItWorks from "./pages/HowItWorks";
//import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/LoginPage"; 

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
        
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
