const NFT = require("../models/NFT");
const Project = require("../models/Project");

// Add NFT
const addNFT = async (req, res) => {
    try {
        const { type, projectId, userId} = req.body;
        if (!["freelancer", "project owner"].includes(type)) {
            return res.status(400).json({ message: "Invalid NFT type" });
        }
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(400).json({ message: "Project not found" });
        }
        if (type === "freelancer" && project.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        else if (type === "project owner" && project.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const nft = await NFT.create({ user: userId, type, project });
        res.status(201).json(nft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get NFTs for User
const getUserNFTs = async (req, res) => {
    try {
        const nfts = await NFT.find({ user: req.user.id });
        res.json(nfts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addNFT, getUserNFTs };
