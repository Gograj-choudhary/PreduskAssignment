const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middleware/jwt");
const apiLimiter = require("../middleware/rateLimiter");

const {
    addExperience,
    getExperiences,
    updateExerience,
    deleteExperience,
} = require("../controllers/experienceController");


// No auth needed routes 
router.get("/", getExperiences);

// protected routes 
router.post('/add', jwtAuthMiddleware,apiLimiter, addExperience);
router.put('/update/:id', jwtAuthMiddleware,apiLimiter, updateExerience);
router.delete('/delete/:id', jwtAuthMiddleware,apiLimiter, deleteExperience);

module.exports = router;