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
git clone https://github.com/Gograj-choudhary/PreduskAssignment.git
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=My_jwt_secret_key
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
node server.js

# Production mode
node server.js
```

## Environment Variables

```env
PORT=3000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/portfolio  # MongoDB connection string
JWT_SECRET=my_jwt_secret_key              # JWT signing key
NODE_ENV=development                        # development/production
```

## API Routes

### Authentication
```json
POST /api/v1/admin/register
{
  "name": "gograj dadarwal",
  "password": "gograj@123",
  "phone" : 9876543210
}

POST /api/v1/admin/login
{
  "phone" : 9876543210,
  "password": "password123"
}
```

### Profile
```json
//Public routes
GET /api/v1/profile/     // Get profile

//protected routes 
POST /api/v1/profile/add    // Create profile
{
  "name": "Suresh Kumar",
  "email": "suresh123@example.com",
  "bio": "Passionate MERN developer",
  "education": [
    {
      "institute": "IIIT Kottayam",
      "degree": "B.Tech",
      "field": "ECE",
      "startYear": 2022,
      "endYear": 2026
    }
  ],
  "links": {
    "github": "https://github.com/sureshk",
    "linkedin": "https://linkedin.com/in/sureshk"
  }
}

// Response 

{
  "success": true,
  "message": "Profile created successfully"
}



PUT /api/v1/profile/update/:profileid     // Update profile
DELETE /api/v1/profile/delete/:profileid  // Delete profile
```

### Projects
```json
GET GET /api/v1/project/          // Get all projects

// Protected APIs
POST /api/project/add         // Create project

{
  "title": "Milk Bill Book",
  "description": [
    "Created a full-stack Milk Bill Management application using the MERN stack with JWT authentication for secure multi-role (admin & customer) access.",
    "Integrated Razorpay payment gateway, enabling 100% secure bill payments directly into respective admin accounts.",
    "Built OTP verification, bill automation, and multi-channel reminders (Email + SMS) using Node-Cron, NodeMailer, and Fast2SMS custom services improving security and payment compliance."
  ],
  "skillsUsed": [
    "MERN",
    "JWT",
    "RazorPay",
    "NodeMailer",
    "Node-Cron",
    "SMS Service"
  ],
  "links": {
    "github": "https://github.com/gograj/milk-bill-book",
    "demo": "https://milk-bill-book-3hqd.vercel.app/"
  }
}

PUT /api/v1/project/update/:projectid      // Update project
DELETE /api/v1/project/delete/:projectid   // Delete project
```

### Skills
```json
GET /api/v1/skill/         // Get all skills

// protecte routes
POST /api/v1/skill/add        // Create skill

{
    "title": "Languages",
    "skills": "JavaScript, Python, C, C++, HTML/CSS, MATLAB"
}

PUT /api/v1/skill/update/:skillid      // Update skill
DELETE /api/v1/skill/delete/:skillid   // Delete skill
```

### Experience
```json
GET /api/v1/experience/           // Get all experiences

// protected routes 
POST /api/v1/experience/add         // Create experience

{
  "title": "Senior Backend Developer",
  "company": "Tech Corp",
  "location": "Remote",
  "startDate": "january 2025",
  "endDate": "May 2025",
  "description": "Built scalable microservices"
}

PUT /api/v1/experience/update/:experienceid      // Update experience
DELETE /api/v1/experience/delete/:experienceid   // Delete experience
```

## Development vs Production

### Development Mode
```bash
node server.js
```
- Runs with nodemon for hot reloading
- Detailed error messages
- Debug logging enabled

### Production Mode
```bash
node server.js
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

https://api.postman.com/collections/40357458-5ca36a2c-9b0e-4b4f-aeb3-6fd15274e390?access_key=PMAT-01K4D97ZFABFJN4J3XJGFGEGHD
