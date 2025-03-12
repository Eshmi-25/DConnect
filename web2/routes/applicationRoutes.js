const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { applyForProject, viewProjectApplications, viewUserApplications } = require("../controllers/applicationController");

const router = express.Router();

router.post("/apply", protect, applyForProject);
router.get("/my-applications", protect, viewUserApplications);
router.get("/:projectId", protect, viewProjectApplications);

module.exports = router;
