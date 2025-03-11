const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    minNFT: { type: Number },
    budget: { type: Number },
    agreedAmount: { type: Number },
    keywords: [String],
    additionalNotes: { type: String },
    estdDuration: { type: String },
    questions: [String],
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
