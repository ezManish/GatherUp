# SynapHack Platform (GatherUp)

Welcome to the **SynapHack Platform**, a modern, full-stack solution for hosting and managing hackathons and events. This platform streamlines the entire process from event creation to team formation, submission management, and judging.

![Status](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Event Management**: Create and manage online, offline, or hybrid events with ease.
- **Team Formation**: Participants can create teams, generate invite codes, and join existing teams.
- **Project Submission**: Seamless submission workflow with repository and demo links.
- **Judging & Reviews**: Granular scoring system (Impact, Innovation, UX, Tech) for judges.
- **Live Leaderboard**: Real-time ranking of submissions based on review scores.
- **Announcements**: Real-time updates for event participants.
- **Q&A System**: Threaded discussions for participant queries.

## Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Inline Styles / CSS Modules (MVP), Ready for Tailwind
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: [Express.js](https://expressjs.com/)
- **Database (Relational)**: SQLite (Dev) / PostgreSQL or MySQL (Prod) via [Prisma ORM](https://www.prisma.io/)
- **Database (NoSQL)**: MongoDB (for Announcements & Q&A) - *Optional (falls back to memory)*

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [Git](https://git-scm.com/)

*(Optional)*
- [MongoDB](https://www.mongodb.com/) (Local or Atlas connection string) for persistent announcements/Q&A.

## Getting Started

### 1. Clone the Repository
```bash
git clone <https://github.com/ezManish/GatherUp.git>
cd GatherUp
```

### 2. Install Dependencies
Install dependencies for the root, backend, and frontend:

```bash
# Root
npm install

# Backend
cd backend
npm install
# Generate Prisma Client
npx prisma generate
cd ..

# Frontend
cd frontend
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the `backend` directory (copy from `.env.example` if available).

**Backend (`backend/.env`)**:
```env
PORT=4000
DATABASE_URL="file:./dev.db"
# MONGO_URL="mongodb://localhost:27017/synaphack" # Optional
```

**Frontend (`frontend/.env.local` - Optional)**:
```env
NEXT_PUBLIC_API_BASE="http://localhost:4000"
```

## Running the Project

You can start the entire platform (Frontend + Backend) with a single command from the root directory:

```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

### Running Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## API Documentation

The backend API is available at `http://localhost:4000`. Here are some key endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Check API status |
| `POST` | `/users` | Create a new user |
| `GET` | `/events` | List all events |
| `POST` | `/events` | Create a new event |
| `POST` | `/teams` | Create a team |
| `POST` | `/teams/join` | Join a team with a code |
| `GET` | `/events/:id/leaderboard` | Get event leaderboard |

## Project Structure

```
GatherUp/
├── backend/                # Express server & API
│   ├── prisma/             # Database schema & migrations
│   ├── src/                # Source code
│   │   ├── index.js        # Entry point & Routes
│   │   └── prisma.js       # DB Client Singleton
│   └── package.json
├── frontend/               # Next.js Application
│   ├── src/
│   │   └── app/            # App Router Pages
│   ├── public/             # Static assets
│   └── package.json
├── package.json            # Root configuration
└── README.md               # You are here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
