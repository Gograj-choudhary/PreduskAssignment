const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institute: { type: String, required: true },   // e.g., IIIT Kottayam
  degree: { type: String, required: true },      // e.g., B.Tech
  field: { type: String, required: true },       // e.g., Computer Science
  startYear: { type: Number },                   // optional (e.g., 2021)
  endYear: { type: Number },                     // optional (e.g., 2025)
});

const profileSchema = new mongoose.Schema({
  adminId: { type: String, required: true}, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },

  // Education as an array of entries
  education: [educationSchema],

  links: {
    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
