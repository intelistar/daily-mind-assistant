# 🧠 MindUp Platform

> A psychological assistant that helps users improve emotional well-being through daily exercises, Telegram integration, and progress tracking.

---

## 🚀 Overview

**MindUp** is a full-stack wellness platform that combines a **Telegram bot**, a **web dashboard**, and an **admin panel**.  
Every morning, users receive personalized psychological exercises (such as meditation, gratitude journaling, or breathing practice) and can mark them as completed to track their progress over time.

---

## ✨ Features

### 📨 Telegram Bot

- Daily exercises automatically sent to users at 09:00.
- Commands:
  - `/start` — register a new user.
  - `/done` — mark today’s task as completed.
  - `/progress` — show weekly and monthly statistics.
  - `/help` — list all available commands.

### 💻 Web Dashboard

- Secure user registration and login (JWT authentication).
- View today’s task and mark it as **Completed**.
- Access full task history.

### 🛠 Admin Panel

- Manage all users and their assigned tasks.
- Create, edit, or remove exercises.
- Accessible only to **admin** role users.

### 🧮 Scheduler

- Automatically generates and assigns new tasks every morning.
- Sends notifications via Telegram using a background scheduler.

---

## 🧩 Tech Stack

| Layer         | Technology                       |
| ------------- | -------------------------------- |
| **Backend**   | NestJS, Prisma ORM, PostgreSQL   |
| **Frontend**  | Next.js (React + TypeScript)     |
| **Bot**       | Telegraf with NestJS integration |
| **Auth**      | JWT + bcrypt password hashing    |
| **Infra**     | Docker, Docker Compose           |
| **Scheduler** | Nest Schedule / Cron jobs        |

---
