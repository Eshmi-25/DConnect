const NFT = require("../models/NFT");
const Project = require("../models/Project");
const User = require("../models/User");

// Add NFT
const addNFT = async (req, res) => {
    try {
      const { confirmationType, projectId } = req.body;
      const userId = req.user.id;
  
      if (!["payment", "delivery"].includes(confirmationType)) {
        return res.status(400).json({ message: "Invalid confirmation type" });
      }
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      const isProjectOwner = project.postedBy.toString() === req.user.id;
      const isFreelancer = project.assignedTo.toString() === req.user.id;
  
      if (!isProjectOwner && !isFreelancer) {
        return res.status(403).json({ message: "Unauthorized" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // 1. Set the correct confirmation field
      if (confirmationType === "payment") {
        if (isProjectOwner) {
          project.paymentConfirmationProjectOwner = true;
        } else if (isFreelancer) {
          project.paymentConfirmationFreelancer = true;
        }
      } else if (confirmationType === "delivery") {
        if (isProjectOwner) {
          project.deliveryConfirmationProjectOwner = true;
        } else if (isFreelancer) {
          project.deliveryConfirmationFreelancer = true;
        }
      }
  
      // 2. Check if both parties confirmed and issue NFT accordingly
      let nft = null;
  
      if (
        confirmationType === "payment" &&
        project.paymentConfirmationProjectOwner &&
        project.paymentConfirmationFreelancer
      ) {
        nft = await NFT.find({ user: project.postedBy, project: projectId });
        if (nft.length === 0) {
            // Issue project owner NFT
            nft = await NFT.create({
                user: project.postedBy,
                type: "project owner",
                project: project._id,
            });
        }
      }
  
      if (
        confirmationType === "delivery" &&
        project.deliveryConfirmationProjectOwner &&
        project.deliveryConfirmationFreelancer
      ) {
        nft = await NFT.find({ user: project.assignedTo, project: projectId });
        console.log(nft);
        if (nft.length === 0) {
            // Issue freelancer NFT
            nft = await NFT.create({
                user: project.assignedTo,
                type: "freelancer",
                project: project._id,
            });
        }
      }
  
      // 3. If all confirmations are complete, mark project as completed
      if (
        project.paymentConfirmationProjectOwner &&
        project.paymentConfirmationFreelancer &&
        project.deliveryConfirmationProjectOwner &&
        project.deliveryConfirmationFreelancer
      ) {
        project.status = "completed";
      }

  
      await project.save();
      res.status(200).json({ message: "Confirmation updated", nft, project });
    } catch (error) {
      console.error(error);
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
