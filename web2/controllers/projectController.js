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
        project.agreedDueDate = req.body.agreedDueDate;
        project.agreedAmount = req.body.agreedAmount;
        project.status = "in-progress";
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
        project.freelancerProposed = null;
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
      const userId = req.user.id;
  
      // Get all relevant projects (assigned or proposed)
      let projects = await Project.find({
        $or: [
          { assignedTo: userId },
          { freelancerProposed: userId },
          { postedBy: userId },
        ]
      });
  
      // Build response list
      const result = projects.map(project => {
        const proposed = project.freelancerProposed?.toString() === userId;
        const assigned = project.assignedTo?.toString() === userId;
        const postedBy = project.postedBy?.toString() === userId;
  
        const paymentConfirmation =
          (assigned && project.paymentConfirmationFreelancer === false) ||
          (postedBy && project.paymentConfirmationProjectOwner === false);
  
        const deliveryConfirmation =
          (assigned && project.deliveryConfirmationFreelancer === false) ||
          (postedBy && project.deliveryConfirmationProjectOwner === false);
  
        return {
            _id: project._id,
            name: project.name,
            assignedTo: project.assignedTo || "",
            proposed,
            paymentConfirmation,
            deliveryConfirmation,
            postedBy,
        };
      });
  
      res.json(result);
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

// Fetch project details by ID
const fetchProjectDetails = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate("postedBy", "name email").populate("assignedTo", "name email");
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


module.exports = { createProject, editProject, listUserPostedProjects, listUserAssignedProjects, assignProject, acceptProject, rejectProject, listProjectsWithStatus, listProjectsToVerify, listOpenProjects, fetchProjectDetails };
