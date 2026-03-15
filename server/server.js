// server.js
// Entry point of the backend server for SevaSetuFoundation.
// Responsibilities:
// - Load environment variables
// - Connect to MongoDB
// - Initialize Express app with JSON parsing and CORS
// - Register donor and admin routes

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");
const donorRoutes = require("./routes/donorRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins (you can restrict this in production)
app.use(cors());

// Register routes
app.use("/api/donors", donorRoutes);
app.use("/api/admin", adminRoutes);

// Basic health check route
app.get("/", (req, res) => {
  res.json({ success: true, message: "SevaSetuFoundation API is running" });
});

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;


