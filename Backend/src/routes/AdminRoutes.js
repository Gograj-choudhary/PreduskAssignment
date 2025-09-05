const express = require("express");
const router = express.Router();

const { registerAdmin, loginAdmin } = require("../controllers/adminController");

// Register new admin
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

module.exports = router;
