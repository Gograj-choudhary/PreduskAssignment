const Skill = require("../models/Skill");

// Add Skill
const addSkill = async (req, res) => {
  try {
    const adminId = req.user.adminId;
    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, skills } = req.body;
    if (!title || !skills) {
      return res.status(400).json({ message: "Title and skills are required" });
    }

    const skill = new Skill({ adminId, title, skills });
    await skill.save();

    res.status(201).json({ message: "Skill category added successfully", skill });
  } catch (err) {
    console.error("Error adding skill:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Skills
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    if (skills.length === 0) {
      return res.status(404).json({ message: "No skills found" });
    }
    res.status(200).json({ message: "Skills fetched successfully", skills });
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Skill
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.adminId;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, skills } = req.body;
    if (!title || !skills) {
      return res.status(400).json({ message: "Title and skills are required" });
    }

    const skill = await Skill.findOneAndUpdate(
      { _id: id, adminId: adminId },
      { title, skills },
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({ message: "Skill not found or unauthorized" });
    }

    res.status(200).json({ message: "Skill updated successfully", skill });
  } catch (err) {
    console.error("Error updating skill:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete Skill
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.adminId;

    const skill = await Skill.findOneAndDelete({ _id: id, adminId });
    if (!skill) {
      return res.status(404).json({ message: "Skill not found or unauthorized" });
    }

    res.status(200).json({ message: "Skill deleted successfully", skill });
  } catch (err) {
    console.error("Error deleting skill:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { addSkill, getSkills, updateSkill, deleteSkill };
