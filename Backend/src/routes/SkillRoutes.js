const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const apiLimiter = require("../middleware/rateLimiter");

const {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill
} = require("../controllers/skillController");

// No auth needed
router.get("/", apiLimiter, getSkills);

// Protected
router.post("/add", jwtAuthMiddleware, apiLimiter, addSkill);
router.put("/update/:id", jwtAuthMiddleware, apiLimiter, updateSkill);
router.delete("/delete/:id", jwtAuthMiddleware, apiLimiter, deleteSkill);

module.exports = router;
