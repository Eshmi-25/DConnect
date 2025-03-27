const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    minNFT: { type: Number },
    budget: { type: Number },
    agreedAmount: { type: Number },
    agreedDueDate: { type: Date },
    status: { type: String, enum: ["open", "in-progress", "completed"], default: "open" },
    freelancerProposed: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    freelancerAccepted: {type: Boolean, default: false},
    paymentConfirmationFreelancer: {type: Boolean, default: false},
    paymentConfirmationProjectOwner: {type: Boolean, default: false},
    deliveryConfirmationFreelancer: {type: Boolean, default: false},
    deliveryConfirmationProjectOwner: {type: Boolean, default: false},
    keywords: [String],
    additionalNotes: { type: String },
    estdDuration: { type: String },
    questions: [String],
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
