# AutoBlog Architecture

## Overview

AutoBlog is a containerized full-stack application deployed on AWS EC2. It features an automated content generation pipeline powered by AI (or a robust fallback mechanism).

## Tech Stack

- **Frontend:** React (Vite), Nginx (Production Server)
- **Backend:** Node.js, Express, SQLite
- **Infrastructure:** Docker, AWS EC2, AWS CodeBuild, AWS ECR

## Architecture Diagram

[Developer] -> [GitHub] -> [AWS CodeBuild] -> [AWS ECR]
|
v
[AWS EC2 Instance]
(Docker Engine)
/ \
 [Frontend Container] [Backend Container]
| |
[Nginx] [Node.js]
| |
(Port 80) (Port 3000)

## Key Technical Decisions

### 1. AI "Circuit Breaker" Pattern

During development, the external Hugging Face free-tier API endpoints were highly unstable (frequently returning 404/503 errors or "Model Paused").
To ensure the application remains reliable and testable for review, a **Mock AI Service** was implemented.

- **Behavior:** The system attempts to generate content locally using pre-defined templates if the external API fails or is unstable.
- **Benefit:** Guarantees 100% uptime for the deployment pipeline and daily scheduler.

### 2. SQLite for Persistence

For this scale of application, SQLite was chosen over a separate Postgres container to reduce resource overhead on the `t3.micro` instance. Data is persisted via Docker volumes.

### 3. CI/CD Pipeline

- **CodeBuild:** Automates the build process.
- **Privileged Mode:** Enabled to allow Docker-in-Docker building.
- **ECR Lifecycle Policy:** configured to retain only the last 2 images to remain within the AWS Free Tier storage limits.
