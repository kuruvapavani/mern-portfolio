// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const portfolioRoute = require('./routes/portfolioRoute'); // Ensure this is the correct path to your route
const userRoute = require('./routes/userRoute');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors({
    origin: process.env.FRONTEND_URI, // Or '*' to allow all origins (less secure)
}));
app.use(express.json());

// MongoDB connection setup
const dbConfig = process.env.MONGODB_URI; // Get the URI from environment variables

// Check if the URI is undefined
if (!dbConfig) {
  console.error("MongoDB URI is undefined. Check your .env file.");
  process.exit(1); // Exit the process if the URI is not set
}

// Connect to the database
mongoose.connect(dbConfig)
  .then(() => {
    app.listen(port, () => {
    });
  })
  .catch(err => {
    console.error("Error connecting to the database:", err.message);
  });

// Use the portfolio routes
app.use('/api', portfolioRoute); // Prefix your portfolio routes with /api
app.use("/api", userRoute); 