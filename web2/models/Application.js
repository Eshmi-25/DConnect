const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    answers: [String] // List of answers to custom questions
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);
