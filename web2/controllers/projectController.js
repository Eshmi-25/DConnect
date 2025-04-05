const Project = require("../models/Project");
const User = require("../models/User");

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
        const result = await Promise.all(projects.map(async (project) => {
            const user = await User.findById(project.postedBy);
            const projObj = project.toObject();
            projObj.postedBy = user?.name || "Unknown";
            return projObj;
        }));
        res.json(result);
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

        project.freelancerProposed = req.body.assignedTo;
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Accept Project by Freelancer
const acceptProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.freelancerProposed.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        project.assignedTo = req.user.id;
        project.freelancerAccepted = true;
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Reject Project by Freelancer
const rejectProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.freelancerProposed.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        project.assignedTo = null;
        project.freelancerProposed = null;
        project.freelancerAccepted = false;
        const updatedProject = await project.save();
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Sending list of projects with verification or acceptance status
const listProjectsWithStatus = async (req, res) => {
    try {
        let projects = await Project.find({ postedBy: req.user.id });
        projects = projects.filter(project => project.status === "open" || project.status === "in-progress");
        for (let project of projects) {
            if (project.assignedTo) {
                const freelancer = await User.findById(project.assignedTo);
                project.assignedTo = freelancer.name;
            }
            if (project.freelancerAccepted) {
                project.status = "Accepted";
            } else if (project.freelancerProposed) {
                project.status = "Proposed";
            } else {
                project.status = "Pending";
            }
        }
        res.json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

function checkPaymentVerifed(project) {
    return !project.paymentConfirmationFreelancer;
}
function checkDeliveryVerified(project) {
    return !project.deliveryConfirmationFreelancer;
}

// Sending list of projects with verification or acceptance status
const listProjectsToVerify = async (req, res) => {
    try {
        let projects = await Project.find({ assignedTo: req.user.id });
        projects = projects.filter(checkPaymentVerifed);
        projects = projects.filter(checkDeliveryVerified);
        res.json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// list all open projects
const listOpenProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            status: "open",
            freelancerProposed: null,
            postedBy: { $ne: req.user.id }
        });

        const result = await Promise.all(projects.map(async (project) => {
            const user = await User.findById(project.postedBy);
            const projObj = project.toObject(); // convert from Mongoose document to plain JS object
            projObj.postedBy = user?.name || "Unknown";
            return projObj;
        }));

        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = { createProject, editProject, listUserPostedProjects, listUserAssignedProjects, assignProject, acceptProject, rejectProject, listProjectsWithStatus, listProjectsToVerify, listOpenProjects };
