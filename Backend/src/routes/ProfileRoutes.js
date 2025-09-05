const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const apiLimiter = require("../middleware/rateLimiter");

const {
  addProfile,
  getProfiles,
  updateProfile,
  deleteProfile
} = require("../controllers/profileController");

// No auth needed
router.get("/", apiLimiter, getProfiles);

// Protected
router.post("/add", jwtAuthMiddleware, apiLimiter, addProfile);
router.put("/update/:id", jwtAuthMiddleware, apiLimiter, updateProfile);
router.delete("/delete/:id", jwtAuthMiddleware, apiLimiter, deleteProfile);

module.exports = router;
