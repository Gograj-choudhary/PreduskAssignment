# Portfolio Frontend Application

A modern, responsive portfolio application built with React, Vite, and Tailwind CSS. Features a clean UI with admin dashboard for managing portfolio content.

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- Bun (Package Manager)
- React Router DOM
- Custom Hooks
- RESTful API Integration

## Features

- 🎨 Responsive Design
- 🔐 Admin Authentication
- 📊 Dashboard Interface
- ✨ CRUD Operations for:
  - Profile Management
  - Projects Showcase
  - Skills Display
  - Experience Timeline
- 🎯 Custom React Hooks
- 🚀 Optimized Production Build

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Layouts/       # Layout components
│   └── UI/            # UI elements
├── pages/             # Route components
│   ├── Admin/         # Admin related pages
│   ├── Experience/    # Experience management
│   ├── Profile/       # Profile management
│   ├── Projects/      # Projects management
│   └── Skills/        # Skills management
├── services/          # API service layer
├── hooks/             # Custom React hooks
└── assets/            # Static assets
```

## Prerequisites

- Node.js 16+ or Bun runtime
- Backend API running (see backend README)


1. Clone the repository:
```bash
git clone https://github.com/Gograj-choudhary/PreduskAssignment.git
cd Frontend
```

2. Install dependencies using Bun:
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

3. Backend base URLs in Services

adminApi =http://localhost:3000/api/v1/admin
authApi =http://localhost:3000/api/v1/auth
projectApi =http://localhost:3000/api/v1/project
skillApi =http://localhost:3000/api/v1/skill
experienceApi =http://localhost:3000/api/v1/experience
profileApi =http://localhost:3000/api/v1/profile
```

4. Start the development server:
```bash
# Using Bun
bun dev

# Or using npm
npm run dev
```

## Available Scripts

```bash
# Development server
bun dev

# Production build
bun run build

# Preview production build
bun run preview

# Lint code
bun run lint
```

## Building for Production

1. Create production build:
```bash
bun run build
```

2. The build output will be in the `dist` directory

3. To preview the production build:
```bash
bun run preview
```

## Deployment

1. Build the project:
```bash
bun run build
```

2. The `dist` folder is ready to be deployed. You can serve it with any static hosting service like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Firebase Hosting


## Code Organization

- **components/**: Reusable UI components
- **pages/**: Route components and page layouts
- **services/**: API integration and data fetching
- **hooks/**: Custom React hooks for shared logic
- **assets/**: Images, icons, and other static files

## Best Practices

- Use custom hooks for API calls and shared logic
- Follow component-based architecture
- Implement lazy loading for routes
- Use proper TypeScript/PropTypes
- Follow ESLint rules
- Use Tailwind CSS for styling

## Performance Optimization

- Route-based code splitting
- Lazy loading of components
- Image optimization
- Caching strategies
- Minimized bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


