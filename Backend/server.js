const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./src/config/db');
// const { jwtAuthMiddleware } = require('./src/middlewares/jwt'); 

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Connect to DB
connectDB();

// Routes
const AdminRoutes = require('./src/routes/AdminRoutes');
const AuthRoutes = require('./src/routes/AuthRoutes');
const ExperienceRoutes = require('./src/routes/ExperienceRoutes');
const ProfileRoutes = require('./src/routes/ProfileRoutes');
const ProjectRoutes = require('./src/routes/ProjectRoutes');
const SkillRoutes = require('./src/routes/SkillRoutes');

app.use('/api/v1/admin', AdminRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/experience', ExperienceRoutes);
app.use('/api/v1/profile', ProfileRoutes);
app.use('/api/v1/project', ProjectRoutes);
app.use('/api/v1/skill', SkillRoutes);

app.get("/health", (req, res)=>{
  res.status(200).json({ status: "ok" ,message : "server is healthy", timeStamp : new Date().toLocaleDateString()})
}
)


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
