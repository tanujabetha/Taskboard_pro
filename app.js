const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();//starting the server
dotenv.config(); //using the .env data

app.use(express.json()); //ensuring request is parsed in json

// Import routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
