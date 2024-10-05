const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables



const dbConfig = process.env.MONGODB_URI;


// Check if the URI is undefined
if (!dbConfig) {
  console.error("MongoDB URI is undefined. Check your .env file.");
  process.exit(1); // Exit the process if the URI is not set
}

// Connect to the database
mongoose.connect(dbConfig)
  .then(() => {
  })
  .catch(err => {
    console.error("Error connecting to the database:", err.message);
  });
