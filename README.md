# SHORTERLINK

*Transform Links, Accelerate Connections Instantly*

![GitHub last commit](https://img.shields.io/github/last-commit/elizonRL/shorterlink)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/elizonRL/shorterlink)
![TypeScript](https://img.shields.io/badge/typescript-100%25-blue)
![GitHub language count](https://img.shields.io/github/languages/count/elizonRL/shorterlink)

---

### Built with the tools and technologies:

![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![dotenv](https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Deployment](#docker-deployment)
- [Testing](#testing)
- [Project Structure](#project-structure)

---

## Overview

ShorterLink is a modern URL shortening service built with Node.js, Express, TypeScript, and MongoDB. It provides user authentication, link management, and secure JWT-based authorization with a clean RESTful API.

### Why ShorterLink?

- 🚀 **Modern Stack:** Built with TypeScript, Express.js, and MongoDB
- 🔐 **Secure Authentication:** JWT-based user authentication and authorization
- 🔗 **Link Management:** Create, retrieve, and manage shortened URLs
- 📊 **User Dashboard:** Track and manage your links
- 🐳 **Docker Ready:** Containerized for easy deployment
- 🧪 **Well Tested:** Comprehensive test suite included

---

## Features

- User registration and authentication
- JWT-based authorization
- URL shortening with custom codes
- Link redirection
- User-specific link management
- RESTful API design
- Docker containerization
- Environment-based configuration

---

## Prerequisites

- **Node.js** (v20 or higher)
- **MongoDB** (local or remote instance)
- **npm** or **yarn**
- **Docker** (optional, for containerized deployment)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/elizonRL/shorterlink
   cd shorterlink
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration (see [Configuration](#configuration))

4. **Build the project:**
   ```bash
   npm run tsc
   ```

---

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://username:password@localhost:27017/shorterlink?authSource=admin
MONGODB_URI_TEST=mongodb://username:password@localhost:27017/shorterlink_test?authSource=admin
MONGODB_URI_PROD=mongodb://username:password@localhost:27017/shorterlink_prod?authSource=admin

# Security
JWT_SECRET=your-super-secret-jwt-key
SALT_ROUNDS=10
```

### Environment Variables Explained:

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string for development
- `MONGODB_URI_TEST`: MongoDB connection string for testing
- `MONGODB_URI_PROD`: MongoDB connection string for production
- `JWT_SECRET`: Secret key for JWT token signing (use a strong, random string)
- `SALT_ROUNDS`: Number of salt rounds for password hashing

---

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | User login | No |
| GET | `/api/users` | Get all users | Yes |
| GET | `/api/users/:id` | Get user by ID | Yes |

### Links

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/links` | Create shortened URL | Yes |
| GET | `/api/links` | Get user's links | Yes |
| GET | `/:shortCode` | Redirect to original URL | No |

### Example Requests

**Register User:**
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","userName":"testuser","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"userName":"testuser","password":"password123"}'
```

**Create Short URL:**
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"originalUrl":"https://www.example.com"}'
```

---

## Docker Deployment

### Build and Run with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t shorterlink .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 --env-file .env shorterlink
   ```

### Docker Compose (Recommended)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    depends_on:
      - mongodb

  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=shortlink
      - MONGO_INITDB_ROOT_PASSWORD=elizonlink
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

Run with:
```bash
docker-compose up -d
```

---

## Testing

The project includes comprehensive tests for API endpoints and user functionality.

**Run all tests:**
```bash
npm test
```

**Test files location:**
- `src/test/api.test.ts` - API endpoint tests
- `src/test/user.test.ts` - User functionality tests

---

## Project Structure

```
shorterlink/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── shorten.ts       # Link management logic
│   │   └── user.ts          # User management logic
│   ├── models/              # Database models
│   │   ├── linsk.models.ts  # Link model
│   │   └── user.models.ts   # User model
│   ├── router/              # Route definitions
│   │   ├── links.router.ts  # Link routes
│   │   └── user.router.ts   # User routes
│   ├── test/                # Test files
│   ├── utils/               # Utility functions
│   │   ├── config.ts        # Configuration management
│   │   ├── crypto.ts        # Password hashing
│   │   ├── helper.ts        # Helper functions
│   │   └── middleware.ts    # Express middleware
│   ├── app.ts               # Express app configuration
│   └── interface.ts         # TypeScript interfaces
├── .env                     # Environment variables
├── dockerfile               # Docker configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Support

If you encounter any issues or have questions, please open an issue on GitHub.