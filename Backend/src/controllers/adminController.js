const { generateAccessToken, generateRefreshToken } = require("../middleware/jwt");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");


// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ phone });
    if (existingAdmin) {
      return res
        .status(409)
        .json({ message: "This phone number is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      phone,
      password: hashedPassword,
    });

    await admin.save();

    // Remove password from response
    const adminResponse = { ...admin._doc };
    delete adminResponse.password;

    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: adminResponse });
  } catch (err) {
    console.error("Error in registerAdmin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ phone });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = generateAccessToken({ adminId: admin._id });
    const refreshToken = generateRefreshToken({ adminId: admin._id });

    res.status(200).json({
      message: "Login successful",
      adminId: admin._id,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Error in loginAdmin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
