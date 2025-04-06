const Application = require("../models/Application");
const Project = require("../models/Project");
const User = require("../models/User");

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
        const results = [];
        for (let application of applications) {
            const appObj = application.toObject(); // convert Mongoose doc to plain object
            const project = await Project.findById(appObj.project);
            if (project) {
                appObj.questions = project.questions;
            } else {
                appObj.questions = [];

            }
            results.push(appObj);
        }
        res.json(results);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// View Applications by User
const viewUserApplications = async (req, res) => {
    try {
      const applications = await Application.find({ user: req.user.id });
  
      const results = [];
  
      for (let application of applications) {
        const appObj = application.toObject(); // convert Mongoose doc to plain object
  
        const project = await Project.findById(appObj.project);
        if (project) {
          const postedBy = await User.findById(project.postedBy, "name").lean();
  
          appObj.project = {
            _id: project._id,
            name: project.name,
            description: project.description,
            budget: project.budget,
            status: project.status,
            postedBy: postedBy.name, // this will be an object with only the name field
          };

          if (project.assignedTo || project.freelancerProposed) {
            appObj.status = "Assigned";
          } else {
            appObj.status = "In review";
          }
        } else {
          appObj.project = "Deleted Project";
        }
  
        results.push(appObj);
      }
  
      res.json(results);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
  
module.exports = { applyForProject, viewProjectApplications, viewUserApplications };
