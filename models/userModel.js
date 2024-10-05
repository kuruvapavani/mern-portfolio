const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define UserSchema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  try {
    // Check if the password is new or being modified
    if (!this.isModified("password")) {
      return next();
    }

    // If the password has already been hashed in the route, skip hashing here
    next();
  } catch (error) {
    return next(error);
  }
});



// Add a method to compare passwords
// Add a method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch; // Return the boolean value
};


module.exports = mongoose.model("User", UserSchema);
