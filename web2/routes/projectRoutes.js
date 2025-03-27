const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    createProject,
    editProject,
    listUserPostedProjects,
    listUserAssignedProjects,
    assignProject,
    acceptProject,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/create", protect, createProject);
router.put("/edit/:id", protect, editProject);
router.get("/posted", protect, listUserPostedProjects);
router.get("/assigned", protect, listUserAssignedProjects);
router.put("/:id/assign", protect, assignProject);
router.put("/:id/accept", protect, acceptProject);

module.exports = router;
