import React from "react";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Logo from "../assets/logo.png";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Avatar from '@mui/material/Avatar';
import Image_Avatar from "../assets/image.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    minNFT: "",
    keywords: "",
    additionalNotes: "",
    estdDuration: "",
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new question
  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));
      setNewQuestion(""); // Reset input field
    }
  };

  // Remove a question
  const handleRemoveQuestion = (index) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/projects", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, 
      });

      setMessage("Project created successfully!");
      setFormData({
        name: "",
        description: "",
        budget: "",
        minNFT: "",
        keywords: "",
        additionalNotes: "",
        estdDuration: "",
        questions: [],
      });
    } catch (error) {
      setMessage("Error creating project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Header with Logo and Search Bar */}
      <div className="flex justify-between items-center mb-8">
        
        <div>
          <img src={Logo} alt="Logo" className="w-25 h-25" />
        </div>
        
        <div className="relative w-3/4">
          <input
            type="text"
            placeholder="Search by name or designation"
            className="w-full p-3 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="absolute right-1 top bg-purple-500 p-3 rounded-full">
            <SearchIcon/>
          </button>
        </div>
        <button className="bg-purple-600 px-4 py-2 rounded" onClick={() => navigate("/")}>
         Log Out
          </button>
        <img
          src={Image_Avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
      </div>
      <hr className="border-purple-400 mb-4" />
      {/* Main Content */}
      <div className="flex gap-10 max-w-6xl mx-auto">
        {/* Left Section - Project Details Form */}
        <div className="w-2/3">
        <p className="text-gray-400 text-sm mt-2">
            Ready to start hiring?
          </p>
          <h1 className="text-3xl font-bold text-purple-400">Create Your Project</h1>
          <p className="text-gray-400 text-sm mt-2">
          When putting your project out there, you want to attract as many as qualified resources as possible. So, explain your project in as much detail as possible and be clear about the expectations you want to set. 
          </p>
          
          <div className="mt-6">
            <label className="block text-purple-400">Project Title</label>
            <p className="text-gray-400 text-sm mt-2">Make this short and concise but give your prospective hires a basic idea of what you are looking for. Eg: E-Commerce website for a fashion brand</p>
            <TextField name="name" required placeholder="Your answer..." value={formData.name} onChange={handleChange} variant="filled" fullWidth className="bg-gray-700 rounded mt-1" />
          </div>

          <div className="mt-4">
            <label className="block text-purple-400">Description</label>
            <p className="text-gray-400 text-sm mt-2">Describe your project in as much detail as possible without including any confidential or personal details.</p>
            <TextField name="description" required placeholder="Your answer..." value={formData.description} onChange={handleChange} variant="filled"  fullWidth multiline rows={3} className="bg-gray-700 rounded mt-1" />
            
          </div>

          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <label className="block text-purple-400">NFTs Required</label>
              <p className="text-gray-400 text-sm mt-2">Specify the minimum number of NFTs your ideal candidate should have.</p>
              <TextField name="minNFT" type="number" required placeholder="Your answer..." value={formData.minNFT} onChange={handleChange} variant="filled" fullWidth className="bg-gray-700 rounded mt-1" />
              <p className="block text-red-400">*Note that this is only a guideline for applicants. Applications with lesser NFTs will NOT be auto-rejected.</p>
            </div>
            <div className="w-1/2">
              <label className="block text-purple-400">Expected Duration</label>
              <p className="text-gray-400 text-sm mt-2">Give an estimate in WEEKS based on when you need the project delivered.</p>
              <TextField name="estdDuration" type="number" required placeholder="Your answer..." value={formData.estdDuration} onChange={handleChange} variant="filled" fullWidth className="bg-gray-700 rounded mt-1" /> 
              <p className="block text-red-400">*This may be negotiated later by the applicant and is NOT final. D-Connect takes no responsibility for the final deadline that gets agreed upon.</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-purple-400">Your Budget</label><p className="text-gray-400 text-sm mt-2">Give an approximate budget that you are willing to pay. This will not be the final amount as it may be negotiated by applicants. This is only a guideline for applicants.</p>
            <TextField type="number" required name="budget" placeholder="Your answer..." value={formData.budget} onChange={handleChange} variant="filled" fullWidth className="bg-gray-700 rounded mt-1" />
          </div>

          <div className="mt-4">
            <label className="block text-purple-400">Required Skills</label> 
            <p name="keywords" className="text-gray-400 text-sm mt-2">Give a brief of the skills you are looking for. Bullet point or numbered list format works best!</p>
            <TextField required placeholder="Your answer..." value={formData.keywords} onChange={handleChange} variant="filled" fullWidth className="bg-gray-700 rounded mt-1" />
          </div>

          <div className="mt-4">
            <label className="block text-purple-400">Additional Notes</label><p className="text-gray-400 text-sm mt-2">Anything else you want to communicate?</p>
            <TextField name="additionalNotes" required placeholder="Your answer..."ss variant="filled" fullWidth multiline rows={2} className="bg-gray-700 rounded mt-1" />
          </div>
        </div>

        {/* Right Section - Questionnaire */}
        <div className="w-3/5 p-6 ">
        <div className=" p-6 rounded-2xl border border-blue-600 bg-gradient-to-t from-gray-900 to-gray-600">
        <p className="text-gray-400 text-sm mt-2 mb-2">Want to know more?</p>
          <h2 className="text-blue-400 text-xl font-bold text-center">Prepare Custom Questionnaire for Applicants</h2>
          <p className="text-gray-300 text-sm mt-2">
            When a candidate applies, you will by default receive their D-Connect Profile and email address. This will include most of the relevant information you need, including:
           <ol className="list-decimal list-inside mt-2">
             <li>Name</li>
             <li>Work experience</li>
             <li>NFTs earned</li>
             <li>Any portfolio links that they may have added</li>
            </ol>
          </p>
          <p className="text-blue-200 text-sm mt-2">If there are any additional questions, you can add them here and the candidate will answer them when submitting their application</p>

          <div className="mt-4">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className="bg-blue-500 text-white w-full"
              onClick={handleAddQuestion}
            >
              Add New
            </Button>
          </div>
          <div className="mt-4 mb-4">

          <div className="mt-4 mb-4 ">
            <TextField variant="filled" fullWidth label="Your question" className="bg-gray-400 rounded-2xl" />
          </div>
          <div className="flex justify-end"Cancel><Button size="medium" onClick={handleAddQuestion}>Save</Button>
          <Button size="medium" onClick={() => setNewQuestion("")}>Cancel</Button></div>
         {/*} <TextField
    variant="filled"
    fullWidth
    className="bg-gray-400 rounded-2xl"
    value={newQuestion} 
    onChange={(e) => setNewQuestion(e.target.value)} 
  />*/}
</div>
           {/* Display Added Questions */}
           {formData.questions.map((q, index) => (
              <div key={index} className="mt-4 flex justify-between items-center bg-gray-700 p-2 rounded">
                <p className="text-white">{q}</p>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveQuestion(index)}
                  sx={{ color: "white", borderColor: "red", "&:hover": { borderColor: "darkred", backgroundColor: "rgba(255, 0, 0, 0.1)" } }}
                >
                  Delete
                </Button>
              </div>
            ))}
           <p className="text-gray-400 mt-4 text-center">The applications for this project will show up on the applications tab. It is strongly recommended that you connect with the candidate you choose and discuss the specifics via their e-mail address before generating the contract.</p>
           <button className="mt-4 w-full bg-purple-500 text-white p-2 rounded" onClick={handleSubmit} disabled={loading}><AddCircleOutlineIcon/>Create Project</button>
        </div>
       </div>
      </div> 
    </div>
  );
};

export default CreateProject;
