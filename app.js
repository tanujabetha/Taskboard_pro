const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Creating a server
const app = express();

// Load .env variables into process.env
dotenv.config(); 

// Middleware to parse incoming JSON
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");

// All auth routes will start with /api/auth
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection failed:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
