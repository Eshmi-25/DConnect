const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["freelancer", "project owner"], required: true },
    date: { type: Date, default: Date.now },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
});

module.exports = mongoose.model("NFT", nftSchema);
