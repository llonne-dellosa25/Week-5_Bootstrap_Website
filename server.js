const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv'); // Import dotenv
dotenv.config();  // Load .env variables

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.log('❌ Error connecting to MongoDB Atlas:', err.message);
  });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes to serve pages (no need for '/' route)
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
