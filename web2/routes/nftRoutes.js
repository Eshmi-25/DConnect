const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { addNFT, getUserNFTs } = require("../controllers/nftController");

const router = express.Router();

router.post("/add-nft", protect, addNFT);
router.get("/get-nft", protect, getUserNFTs);

module.exports = router;
