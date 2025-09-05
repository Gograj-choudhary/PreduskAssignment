const Project = require("../models/Project");

const addProject = async (req, res) => {
  try {
    const adminId = req.user.adminId;
    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, skillsUsed, links } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const project = new Project({ adminId, title, description, skillsUsed, links });
    await project.save();

    res.status(201).json({ message: "Project added successfully", project });
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    if (projects.length === 0) {
      return res.status(404).json({ message: "No projects found" });
    }
    res.status(200).json({ message: "Projects fetched successfully", projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.adminId;

    const project = await Project.findOneAndUpdate({ _id: id, adminId }, req.body, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.adminId;

    const project = await Project.findOneAndDelete({ _id: id, adminId });
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    res.status(200).json({ message: "Project deleted successfully", project });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addProject, getProjects, updateProject, deleteProject };
