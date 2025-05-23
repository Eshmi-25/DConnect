import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
import person from "../assets/login_man.png";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/users/login", {
      "email": email,
      "password": password
    }).then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  };

  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 to-purple-600 flex flex-col justify-center items-center">
      {/* Logo */}
      <div className="mb-4">
        <img src={logo} alt="logo" className="w-26 h-26 login_logo" />
      </div>
      {/* Main Login Section */}
      <div className="flex bg-transparent w-3/4 max-w-4xl p-6 rounded-lg">
        {/* Left Side: Login Form */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-1/2">
          <h2 className="text-white text-3xl font-semibold text-center mb-6">
          Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="flex gap-2 text-white mb-2 items-center"><PersonIcon />Email</label>
              <input
                type="text"
                name="username"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex gap-2 items-center text-white mb-2"><LockIcon />Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-400 mt-4">
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/signup")}
    className="text-purple-400 cursor-pointer hover:underline"
  >
    Sign Up
  </span>
</p>
        </div>

        <div className="login_man flex justify-center items-center">
          <img src={person} alt="login_man" className="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
