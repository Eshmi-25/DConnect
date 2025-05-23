const User = require("../models/User");
const Project = require("../models/Project");
const NFT = require("../models/NFT");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password, bio, expertise, occupation, country, graduation, linkedinUrl, githubUrl, dribbleUrl, portfolioUrl } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, bio, expertise, occupation, country, graduation, linkedinUrl, githubUrl, dribbleUrl, portfolioUrl });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("hi")

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id || req.user.id; // Use the ID from the request params or the authenticated user ID
        const user = await User.findById(userId).select("-password");
        if (user) {
            const userObj = user.toObject();
            if (user._id !== req.user.id) {
                userObj.email = undefined;
                userObj.password = undefined;
                userObj.owner = true;
            }
            res.json(userObj);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Users by name
const findUserByName = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const users = await User.find({ name: { $regex: `^${name}`, $options: "i" } });

        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.bio = req.body.bio || user.bio;
            user.expertise = req.body.expertise || user.expertise;
            user.occupation = req.body.occupation || user.occupation;
            user.country = req.body.country || user.country;
            user.graduation = req.body.graduation || user.graduation;
            user.linkedinUrl = req.body.linkedinUrl || user.linkedinUrl;
            user.githubUrl = req.body.githubUrl || user.githubUrl;
            user.dribbleUrl = req.body.dribbleUrl || user.dribbleUrl;
            user.portfolioUrl = req.body.portfolioUrl || user.portfolioUrl;

            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getUserProjectData = async (req, res) => {
    try {
      const userId = req.params.id || req.user.id;
  
      const initiated = await Project.find({ postedBy: userId });
      const completed = await Project.find({ assignedTo: userId, status: "completed" });
      const assigned = await Project.find({ assignedTo: userId, status: "in-progress" });
  
      res.json({
        initiated: initiated.length,
        completed: completed.length,
        assigned: assigned.length,
      });
    } catch (error) {
      console.error("Error fetching user project data:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
const getUserNFTs = async (req, res) => {
try {
    const userId = req.params.userId || req.user.id;

    // Populate only the _id and name fields from the Project
    const nfts = await NFT.find({ user: userId }).populate({
    path: "project",
    select: "name _id"
    });

    res.json(nfts);
} catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).json({ message: "Server Error" });
}
};

const getUserName = async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        return res.status(200).json({"name": user.name});
    }
    return res.status(500).json({"message": "Server Error"});
}

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, findUserByName, getUserProjectData, getUserNFTs, getUserName };
