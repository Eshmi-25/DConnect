import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/logo.png";

const ProjectContractPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-10">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <img src={Logo} alt="Logo" className="w-20 h-20" />
        </div>
        <div className="relative w-4/5">
          <input
            type="text"
            placeholder="Search by name or designation"
            className="w-full p-3 rounded-full bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 p-3 rounded-full">
            <SearchIcon />
          </button>
        </div>
      </div>
      <hr className="border-purple-400 mb-4" />
      {/* Header Section */}
      <div className="text-left mb-6">
        <p className="text-gray-400">Found the right project?</p>
        <h1 className="text-3xl font-bold text-purple-400">Generate Project Contract</h1>
        <p className="text-gray-300 mt-2">
        We’re so glad you found the right fit! It is strongly recommended that before generating this contract, you connect with your preferred candidate using their e-mail and work out the following details: 
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          <li>A deadline range during which the project has to be delivered</li>
          <li>The payment that has to be made</li>
          <li>A hard deadline on which the payment has to be completed in full</li>
        </ul>
        <p className="text-gray-300 mt-2">Besides these, it is also helpful to set the right expectations and agree on deliverables. However, these cannot be tracked using D-Connect currently and we take no responsibility for it.</p>
        <p className="block text-red-400 mt-6">*D-Connect does not guarantee that the selected candidate will accept the contract.</p>
      </div>

      {/* Contract Form */}
      <div className="bg-gray-800 p-6 rounded-lg border border-blue-500 max-w-3xl mx-auto">
        <label className="block text-white mb-2">Select Your Project</label>
        <select className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500">
          <option>Drop down of user’s projects</option>
        </select>
        <div className="flex justify-center mt-4">
  <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-semibold transition duration-300">
    Generate
  </button>
</div>

      </div>
    </div>
  );
};

export default ProjectContractPage;
