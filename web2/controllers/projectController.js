const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {
    try {
        const { name, description, budget, minNFT, keywords, additionalNotes, estdDuration, questions } = req.body;
        const project = await Project.create({
            name,
            description,
            budget,
            minNFT,
            keywords,
            additionalNotes,
            estdDuration,
            questions,
            postedBy: req.user.id
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Edit Project
const editProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        Object.assign(project, req.body);
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// List Projects Posted by User
const listUserPostedProjects = async (req, res) => {
    try {
        const projects = await Project.find({ postedBy: req.user.id });
        res.json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// List Projects Assigned to User
const listUserAssignedProjects = async (req, res) => {
    try {
        const projects = await Project.find({ assignedTo: req.user.id });
        res.json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Assign Project to a User
const assignProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        project.assignedTo = req.body.assignedTo;
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createProject, editProject, listUserPostedProjects, listUserAssignedProjects, assignProject };
