# Portfolio Backend API

A robust REST API backend for a portfolio application built with Node.js and Express.js. Features JWT authentication, role-based access control, and MongoDB database integration.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JSON Web Tokens (JWT)
- Express Rate Limit
- bcrypt
- dotenv
- cors

## Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-based access control (Admin/User)
- 📊 Rate limiting for API endpoints
- 🗄️ MongoDB database integration
- 🔒 Password hashing with bcrypt
- ✨ CRUD operations for:
  - User profiles
  - Projects
  - Skills
  - Experience

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-backend.git
cd portfolio-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Environment Variables

```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/portfolio  # MongoDB connection string
JWT_SECRET=your_jwt_secret_key              # JWT signing key
NODE_ENV=development                        # development/production
```

## API Routes

### Authentication
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123"
}

POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Profile
```json
GET /api/profile     // Get profile
POST /api/profile    // Create profile
{
  "name": "John Doe",
  "title": "Full Stack Developer",
  "bio": "Passionate developer..."
}
PUT /api/profile     // Update profile
DELETE /api/profile  // Delete profile
```

### Projects
```json
GET /api/projects           // Get all projects
GET /api/projects/:id       // Get single project
POST /api/projects         // Create project
{
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["React", "Node.js"]
}
PUT /api/projects/:id      // Update project
DELETE /api/projects/:id   // Delete project
```

### Skills
```json
GET /api/skills           // Get all skills
POST /api/skills         // Create skill
{
  "name": "JavaScript",
  "level": "Advanced"
}
PUT /api/skills/:id      // Update skill
DELETE /api/skills/:id   // Delete skill
```

### Experience
```json
GET /api/experience           // Get all experiences
POST /api/experience         // Create experience
{
  "company": "Company Name",
  "position": "Developer",
  "duration": "2020-2023"
}
PUT /api/experience/:id      // Update experience
DELETE /api/experience/:id   // Delete experience
```

## Development vs Production

### Development Mode
```bash
npm run dev
```
- Runs with nodemon for hot reloading
- Detailed error messages
- Debug logging enabled

### Production Mode
```bash
npm start
```
- Optimized for performance
- Minimal error information exposed
- Security headers enabled
- Rate limiting enforced

## Error Handling

The API uses consistent error response format:
```json
{
  "status": "error",
  "message": "Error description",
  "code": 400
}
```

## Security Features

- JWT token validation
- Rate limiting (100 requests per 15 minutes)
- Password hashing
- CORS enabled
- Helmet security headers
- Input validation
- MongoDB injection protection



## PostMan Testing Folder URL

https://abc333-0339.postman.co/workspace/Milk-Book~8c7d2154-97d8-4b9e-8c63-8889def8b6f5/collection/40357458-5ca36a2c-9b0e-4b4f-aeb3-6fd15274e390?action=share&source=copy-link&creator=40357458