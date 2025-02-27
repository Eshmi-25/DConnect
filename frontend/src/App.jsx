import React from "react";
import LandingPage from "./pages/LandingPage";
import HowItWorks from "./pages/HowItWorks";

function App() {
  return (
    <div className="relative">
  <LandingPage />
  <div className="mt-[-50px]">
    <HowItWorks />
  </div>
</div>

    
  );
}

export default App;
