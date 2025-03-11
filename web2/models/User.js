const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String },
    expertise: [String],
    occupation: { type: String },
    country: { type: String },
    graduation: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    dribbleUrl: { type: String },
    portfolioUrl: { type: String },
    profilePic: { type: String },
    freelancerNFT: { type: mongoose.Schema.Types.ObjectId, ref: "NFT" },
    projectOwnerNFT: { type: mongoose.Schema.Types.ObjectId, ref: "NFT" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
