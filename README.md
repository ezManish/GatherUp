# SynapHack 3.0 – Event & Hackathon Hosting Platform (MVP Monorepo)

This is a runnable MVP skeleton with:
- **frontend/** Next.js + TypeScript
- **backend/** Node (Express) + Prisma (SQLite) + MongoDB for announcements/Q&A
- **functions/** Azure Functions stubs (optional)
- **docker-compose.yml** for MongoDB + Redis (optional)

> Local dev uses **SQLite** for speed. In production, replace SQLite with **Azure SQL** and deploy MongoDB to **MongoDB Atlas / Azure CosmosDB for Mongo**.

## Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Docker (for MongoDB/Redis) – optional but recommended

### 1) Install deps
```bash
npm install
npm --prefix backend run prisma:generate
```

### 2) Start infra (optional: MongoDB + Redis)
```bash
docker compose up -d
```

### 3) Seed DB and run
```bash
npm run seed
npm run dev
```
- Frontend → http://localhost:3000
- Backend  → http://localhost:4000

### Environment
Copy `.env.example` to `.env` in **backend/** and **frontend/** (frontend only needs `NEXT_PUBLIC_API_BASE=http://localhost:4000`).

## Notes
- This is an MVP demonstrating core flows: events, teams, submissions, reviews, leaderboard, announcements & Q&A.
- Announcements/Q&A live in MongoDB; if you don't run Docker, the backend will fallback to an in-memory mock for those endpoints.

## Deploying to Azure (high-level)
- Replace SQLite provider in Prisma with MSSQL; set `DATABASE_URL` to Azure SQL.
- Host backend on **Azure Web App**, frontend on **Azure Static Web Apps** or **Web App**.
- Use **Azure Blob Storage** for file uploads (SAS).

