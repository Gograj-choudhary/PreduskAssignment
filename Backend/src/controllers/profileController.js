const Profile = require("../models/Profile");

const addProfile = async (req, res) => {
  try {
    const adminId = req.user.adminId;
    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, email, bio, education, links } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const profile = new Profile({ adminId, name, email, bio, education, links });
    await profile.save();

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (err) {
    console.error("Error adding profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    if (profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }
    res.status(200).json({ message: "Profiles fetched successfully", profiles });
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.adminId;
    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const profile = await Profile.findOneAndUpdate(
      { _id: id, adminId },
      req.body,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found or unauthorized" });
    }

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.adminId;

    const profile = await Profile.findOneAndDelete({ _id: id, adminId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found or unauthorized" });
    }

    res.status(200).json({ message: "Profile deleted successfully", profile });
  } catch (err) {
    console.error("Error deleting profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addProfile, getProfiles, updateProfile, deleteProfile };
