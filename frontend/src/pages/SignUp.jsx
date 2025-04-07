import React, { useState } from "react";
import "../styles/signup.css";
import logo from "../assets/logo.png";
import person from "../assets/login_man.png";
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    headline: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    bio: "",
    expertise: "",
    occupation: "",
    country: "",
    graduation: "",
    linkedinUrl: "",
    githubUrl: "",
    dribbleUrl: "",
    portfolioUrl: "",
    profilePic: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios.post("http://localhost:3000/api/users/signup", formData)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        } else {
          console.log(res);
          alert(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
    

    console.log("SignUp Data: ", formData);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-gray-900 to-purple-600 flex flex-col justify-center items-center">
      {/* Logo */}
      <div className="mb-4">
        <img src={logo} alt="logo" className="w-26 h-26 login_logo" />
      </div>

      {/* Main SignUp Section */}
      <div className="flex bg-transparent max-w-5xl p-6 rounded-lg">
        {/* Left Side: SignUp Form */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-1/2 signup_container overflow-y-auto max-h-[500px]">
          <h2 className="text-white text-3xl font-semibold text-center mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit}>
            {[
              { label: "Email *", name: "email", type: "text", icon: <PersonIcon /> },
              { label: "Name *", name: "name", type: "text", icon: <PersonIcon /> },
              { label: "Headline *", name: "headline", type: "text", icon: <PersonIcon /> },
              { label: "Phone Number *", name: "phoneNo", type: "text", icon: <PhoneIcon /> },
              { label: "Password *", name: "password", type: "password", icon: <LockIcon /> },
              { label: "Confirm Password *", name: "confirmPassword", type: "password", icon: <LockIcon /> },
              { label: "Bio *", name: "bio", type: "text" },
              { label: "Expertise *", name: "expertise", type: "text" },
              { label: "Occupation *", name: "occupation", type: "text" },
              { label: "Country *", name: "country", type: "text" },
              { label: "College *", name: "graduation", type: "text" },
              { label: "LinkedIn URL", name: "linkedinUrl", type: "url" },
              { label: "GitHub URL", name: "githubUrl", type: "url" },
              { label: "Dribble URL", name: "dribbleUrl", type: "url" },
              { label: "Portfolio URL", name: "portfolioUrl", type: "url" },
              // { label: "Profile Picture URL*", name: "profilePicUrl", type: "url" },
            ].map(({ label, name, type, icon }) => (
              <div className="mb-4" key={name}>
                <label className="block text-white mb-2">{icon} {label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required={!name.includes("Url")}
                />
              </div>
            ))}

            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              Confirm
            </button>
          </form>

          <p className="text-center text-gray-400 mt-4">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/login")}
    className="text-purple-400 cursor-pointer hover:underline"
  >
    Login
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

export default SignUp;
