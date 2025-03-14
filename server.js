const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// ✅ Import Models
const User = require("./models/User");
const Contact = require("./models/Contact");

// ✅ Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Correct static files directory

// ✅ Log Requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Serve the HTML File (FIXED)
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"), (err) => {
    if (err) {
      console.error("Error serving index.html:", err);
      res.status(500).send("Error loading page");
    }
  });
});

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
