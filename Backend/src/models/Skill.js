const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  adminId: { type: String, required: true},   
  title: { type: String, required: true, unique: true }, 
  skills: { type: String, required: true },                             
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);
