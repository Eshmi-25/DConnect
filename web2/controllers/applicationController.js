const Application = require("../models/Application");
const Project = require("../models/Project");

// Apply for a Project
const applyForProject = async (req, res) => {
    try {
        const { projectId, answers } = req.body;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const application = await Application.create({
            user: req.user.id,
            project,
            answers
        });
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// View Applications for a Project (Only Project Owner)
const viewProjectApplications = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project || project.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const applications = await Application.find({ project: req.params.projectId }).populate("user", "name email");
        res.json(applications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// View Applications by User
const viewUserApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user.id }).populate("project", "name");
        res.json(applications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { applyForProject, viewProjectApplications, viewUserApplications };
