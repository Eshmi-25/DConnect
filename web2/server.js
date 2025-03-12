// server.js - Main entry point
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const nftRoutes = require("./routes/nftRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/nfts", nftRoutes);
app.use("/api/applications", applicationRoutes);

// Basic Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
