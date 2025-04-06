const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, findUserByName, getUserProjectData, getUserNFTs } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/fetch-profile/:id?", protect, getUserProfile);
router.put("/update-profile", protect, updateUserProfile);
router.put("/find-user", protect, findUserByName);
router.get("/user-project-data/:id", protect, getUserProjectData);
router.get("/user-nfts/:userId", protect, getUserNFTs);

module.exports = router;
