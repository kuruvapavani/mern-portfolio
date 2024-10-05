// routes/portfolioRoute.js
const express = require("express");
const router = express.Router();
const {
  Intro,
  About,
  Skill,
  Project,
  Experience,
  Testimonial,
} = require("../models/portfolioModel");

// Get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
  try {
    const [intro, about, skills, projects, experience, testimonials] = await Promise.all([
      Intro.find(),
      About.find(),
      Skill.find(),
      Project.find(),
      Experience.find(),
      Testimonial.find(),
    ]);
    
    res.status(200).send({
      intro,
      about,
      skills,
      projects,
      experience,
      testimonials,
    });
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    res.status(500).send({ message: "Error fetching portfolio data" });
  }
});

// Update Intro
router.put("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findByIdAndUpdate(
      req.body.id,
      {
        headingText: req.body.title,
        subText: req.body.subtitle,
        mainText: req.body.mainContent,
      },
      { new: true }
    );

    if (!intro) {
      return res.status(404).send({ success: false, message: "Intro not found" });
    }

    res.status(200).send({ success: true, data: intro });
  } catch (error) {
    console.error("Error updating intro:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

// Update About
router.put('/update-about', async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).send({ success: false, message: 'About section not found' });
    }

    res.status(200).send({ success: true, data: updatedAbout });
  } catch (error) {
    console.error('Error updating about section:', error);
    res.status(500).send({ success: false, message: 'Error updating about section' });
  }
});

// Add new skill
router.post("/add-skill", async (req, res) => {
  try {
    const newSkill = new Skill({
      name: req.body.name,
      src: req.body.src,
      alt: req.body.alt,
    });

    const savedSkill = await newSkill.save();
    res.status(201).send({
      success: true,
      message: "Skill added successfully",
      data: savedSkill,
    });
  } catch (error) {
    console.error('Error adding new skill:', error);
    res.status(500).send({
      success: false,
      message: 'Error adding new skill',
    });
  }
});


// Update skill by ID
router.put("/update-skill/:id", async (req, res) => {
  try {
    const skillId = req.params.id;
    const updatedSkill = await Skill.findByIdAndUpdate(
      skillId,
      { name: req.body.name, src: req.body.src, alt: req.body.alt },  // Update skill fields
      { new: true }  // Return the updated document
    );

    if (!updatedSkill) {
      return res.status(404).send({
        success: false,
        message: 'Skill not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Skill updated successfully',
      data: updatedSkill,
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).send({
      success: false,
      message: 'Error updating skill',
    });
  }
});

// Delete skill by ID
router.delete("/delete-skill/:id", async (req, res) => {
  try {
    const skillId = req.params.id;
    const deletedSkill = await Skill.findByIdAndDelete(skillId);

    if (!deletedSkill) {
      return res.status(404).send({
        success: false,
        message: 'Skill not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Skill deleted successfully',
      data: deletedSkill,
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).send({
      success: false,
      message: 'Error deleting skill',
    });
  }
});


// Add new project
router.post("/add-project", async (req, res) => {
  try {
    const newProject = new Project({
      title: req.body.title,
      image: req.body.image,
      stack: req.body.stack,
      demoLink:req.body.demoLink,
      codeLink:req.body.codeLink,
    });

    const savedProject = await newProject.save();
    res.status(201).send({ success: true, message: "Project added successfully", data: savedProject });
  } catch (error) {
    console.error('Error adding new project:', error);
    res.status(500).send({ success: false, message: 'Error adding new project' });
  }
});

// Update project by ID
router.put("/update-project/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).send({ success: false, message: 'Project not found' });
    }

    res.status(200).send({ success: true, data: updatedProject });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).send({ success: false, message: 'Error updating project' });
  }
});

// Delete project by ID
router.delete("/delete-project/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).send({ success: false, message: 'Project not found' });
    }

    res.status(200).send({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).send({ success: false, message: 'Error deleting project' });
  }
});

router.get('/get-experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json({ success: true, experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add a new experience
router.post('/add-experience', async (req, res) => {
  const { position, company, image, blogLink } = req.body;
  try {
    const newExperience = new Experience({ position, company, image, blogLink });
    const savedExperience = await newExperience.save();
    res.json({ success: true, data: savedExperience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update an existing experience
router.put('/update-experience/:id', async (req, res) => {
  const { id } = req.params;
  const { position, company, image, blogLink } = req.body;
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(id, { position, company, image, blogLink }, { new: true });
    res.json({ success: true, data: updatedExperience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete an experience
router.delete('/delete-experience/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Experience.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.get('/get-testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add a new testimonial
// Add a new testimonial
router.post('/add-testimonial', async (req, res) => {
  const { name, email, company, text } = req.body;
  try {
    const newTestimonial = new Testimonial({ name, email, company, text });
    const savedTestimonial = await newTestimonial.save();
    res.json({ success: true, data: savedTestimonial });
  } catch (error) {
    console.error('Error adding testimonial:', error); // Log the error for debugging
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Update an existing testimonial
router.put('/update-testimonial/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, company, text } = req.body;
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, { name, email, company, text }, { new: true });
    res.json({ success: true, data: updatedTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete a testimonial
router.delete('/delete-testimonial/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Testimonial.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// Add more routes for skills as needed...




module.exports = router;
