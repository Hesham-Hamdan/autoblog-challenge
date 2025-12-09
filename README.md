# 🚀 Auto-Generated Blog (Full Stack Challenge)

A containerized full-stack application that automatically generates daily tech blog posts using AI (or a robust fallback mechanism). Deployed on AWS EC2 via a CI/CD pipeline.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## 📖 Overview

This project was built as a technical challenge to demonstrate proficiency in **Docker**, **AWS Infrastructure**, and **Full-Stack Development**. It consists of a React frontend and a Node.js backend that schedules daily article generation.

## 🛠 Tech Stack

- **Frontend:** React (Vite), Nginx
- **Backend:** Node.js, Express, SQLite (Persistent storage)
- **Infrastructure:** Docker, Docker Compose
- **Cloud & DevOps:** AWS EC2, AWS CodeBuild, AWS ECR
- **Automation:** `node-cron` for job scheduling

## ✨ Features

- **Daily Content Generation:** A cron job runs daily at midnight (`0 0 * * *`) to generate a new article.
- **AI Integration:** Originally integrated with Hugging Face API.
  - _Note:_ Due to stability issues with the free-tier API (404/503 errors), a **Circuit Breaker / Mock Service** pattern was implemented to ensure system reliability during the review process.
- **Containerization:** Fully Dockerized frontend and backend with optimized multi-stage builds.
- **CI/CD:** Automated build and push pipeline using AWS CodeBuild.

## 🏗 Architecture

The application follows a standard containerized microservices pattern:

1. **Frontend:** Serves the UI via Nginx.
2. **Backend:** Handles API requests and the Cron Job scheduler.
3. **Database:** SQLite file (`blog.db`) mounted via Docker volumes for persistence.

For a detailed breakdown of architectural decisions, please see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## 🏃 Running Locally

### Prerequisites

- Docker & Docker Compose
- Node.js (Optional, for local dev without Docker)

### Option 1: Using Docker (Recommended)

This will spin up both the frontend (Port 8080) and backend (Port 3000).

```bash
# 1. Clone the repo
git clone [https://github.com/Hesham-Hamdan/autoblog-challenge.git](https://github.com/Hesham-Hamdan/autoblog-challenge.git)
cd autoblog-challenge

# 2. Run with Compose (pointing to the infra folder configuration)
docker-compose -f infra/docker-compose.yml up --build
Access the app at: **http://localhost:8080**
```

### Option 2: Manual Setup

If you prefer not to use Docker locally:

**1. Backend**

```bash
cd backend
# Create a .env file with HF_API_KEY=your_key
npm install
npm start
# Server runs on http://localhost:3000

```

**2. Frontend**

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## ☁️ Deployment

The application is deployed on an **AWS EC2 t3.micro** instance.

### CI/CD Pipeline

1. **Source:** GitHub Push triggers the pipeline.
2. **Build:** AWS CodeBuild compiles Docker images (Privileged mode enabled).
3. **Registry:** Images are pushed to private AWS ECR repositories.
4. **Deploy:** The EC2 instance pulls the latest images via the `deploy.sh` script.

### Deployment Scripts

Located in `infra/scripts/`:

- `init-ec2.sh`: Sets up Docker on a fresh Amazon Linux instance.
- `deploy.sh`: Authenticates with ECR, pulls the latest images, and restarts containers with zero downtime.

## 📂 Project Structure

.
├── backend/ # Node.js Express API & Scheduler
├── frontend/ # React App (Vite)
├── infra/ # Infrastructure Config
│ ├── buildspec.yml # AWS CodeBuild instructions
│ ├── docker-compose.yml
│ └── scripts/ # Deployment shell scripts
├── docs/ # Architecture documentation
└── README.md

## 👤 Author

**Hesham Hamdan**
Full Stack Developer
