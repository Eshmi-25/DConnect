import React from "react";
import logo from "../assets/logo.png";
import banner from "../assets/landing-banner-img.svg";
import "../styles/landingpage.css";
import { TextField, Button } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col relative">
      <div className="flex gap-5 items-end justify-end p-5">
        <Button variant="contained" size="small"  sx={{ background: "#8B7CFB" }} onClick={() => navigate("/login")} >
          login
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          sx={{ background: "#8B7CFB" }} 
          onClick={() => navigate("/SignUp")}
        >
          sign up
        </Button>
      </div>
      <div className="flex items-center pl-30">
        <img src={logo} alt="logo" />
        <div className="gap-2 flex flex-col">
          <h1 className="text-5xl font-medium text-[#AFFEFF]">D-Connect</h1>
          <span>The Future of Professional Credibility</span>
          <div>
            <TextField
              variant="filled"
              label="Look for the right people. Eg: Web developer, Content Writer, etc..."
              size="small"
              sx={{
                background: "#ffffff",
                color: "#333333",
                fontSize: "10px",
                input: { color: "#333333" },
                "& .MuiInputBase-root": { height: "40px" },
                "& .MuiInputBase-input": { color: "#333333" },
                "& .MuiFilledInput-underline:before": {
                  borderBottomColor: "#999999",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#333333",
                },
                "& .MuiInputLabel-root": { color: "#666666" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#333333" },
              }}
            />
            <Button
              variant="contained"
              sx={{
                height: "40px",
                width: "40px",
                background: "#8B7CFB",
              }}
            >
              <IoIosSearch />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute">
        <img src={banner} alt="" className="w-screen"/>
      </div>
    </div>
  );
};

export default LandingPage;
