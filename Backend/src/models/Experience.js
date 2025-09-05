const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  adminId: { type: String, required: true},  
  title: { type: String, required: true },     // e.g., Software Intern
  company: { type: String, required: true },   // e.g., Google
  location: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String },                     // null/empty if ongoing
  description:[ { type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Experience", experienceSchema);
