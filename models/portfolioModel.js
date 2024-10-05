const mongoose = require("mongoose");
const { Schema } = mongoose;

// Intro Schema
const introSchema = new mongoose.Schema({
  headingText: {
    type: String,
    required: true,
  },
  mainText: {
    type: String,
    required: true,
  },
  subText: {
    type: String,
    required: true,
  },
});

// About Schema
const aboutSchema = new mongoose.Schema({
  headingText1: {
    type: String,
    required: true,
  },
  mainText1: {
    type: String,
    required: true,
  },
});

// Skills Schema
const skillsSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Projects Schema
const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  stack: {
    type: String,
    required: true,
  },
  demoLink: {
    type: String,
    required: true,
  },
  codeLink: {
    type: String,
    required: true,
  },
});

// Experience Schema
const experienceSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  blogLink: {
    type: String,
    required: true,
  },
});

// Testimonials Schema
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  text: { type: String, required: true, maxlength: 250 },
  verified: { type: Boolean, default: false }, // Add verified field
});

// Export models
module.exports = {
  Intro: mongoose.model("intros", introSchema),
  About: mongoose.model("abouts", aboutSchema),
  Skill: mongoose.model("skills", skillsSchema),
  Project: mongoose.model("projects", projectSchema),
  Experience: mongoose.model("experiences", experienceSchema),
  Testimonial: mongoose.model("testimonials", testimonialSchema),
};
