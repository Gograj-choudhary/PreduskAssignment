const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  adminId: { type: String, required: true}, 
  title: { type: String, required: true },
  description:[{ type: String }],
  skillsUsed: [{ type: String }],              // e.g., ["React", "Node.js"]
  links: {
    github: { type: String },
    demo: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
