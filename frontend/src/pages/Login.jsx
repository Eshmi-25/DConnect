import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
import person from "../assets/login_man.png";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data: ", formData);
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
              <label className="block text-white mb-2"><PersonIcon />Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2"><LockIcon />Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            <a href="#" className="text-purple-400">
              Sign Up
            </a>
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
