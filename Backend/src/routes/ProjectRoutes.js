const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const apiLimiter = require("../middleware/rateLimiter");

const {
  addProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

// No auth needed
router.get("/", apiLimiter, getProjects);

// Protected
router.post("/add", jwtAuthMiddleware, apiLimiter, addProject);
router.put("/update/:id", jwtAuthMiddleware, apiLimiter, updateProject);
router.delete("/delete/:id", jwtAuthMiddleware, apiLimiter, deleteProject);

module.exports = router;
