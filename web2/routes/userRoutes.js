const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, findUserByName } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/fetch-profile", protect, getUserProfile);
router.put("/update-profile", protect, updateUserProfile);
router.put("/find-user", protect, findUserByName);

module.exports = router;
