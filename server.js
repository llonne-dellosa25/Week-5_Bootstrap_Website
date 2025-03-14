const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const path = require("path");

app.use(express.json());

// ✅ Middleware to log requests (Moved Up)
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


// Create a new user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update a user
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user ✅ (Removed Duplicate)
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Static Files & Routes
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start the Server
app.listen(3000, () => {
  console.log(`🚀 Server is running on http://localhost:3000`);
});
