const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    // Compare the input password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password." });
    }

    // If the password matches, create a JWT
    const payload = { userId: user._id };
    const token = jwt.sign(payload, "jwtSecret", { expiresIn: "1h" });

    // Respond with the token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


module.exports = router;
