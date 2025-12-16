# 🧑‍💻 Collaborative Task Manager (Full-Stack)

A production-ready **full-stack task management application** built using **React, TypeScript, Node.js, Express, MongoDB, Socket.io**, and **React Query**.  
The app supports **authentication, full CRUD operations, real-time updates**, and a **modern responsive UI**.

---

## 🚀 Live Demo

- **Frontend:** http://localhost:5173  
- **Backend API:** http://localhost:5000  

> ⚠️ Replace with deployed URLs (Vercel / Netlify / Render) before final submission.

---

## 🧩 Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🟦 TypeScript
- 🎨 Tailwind CSS
- 🔄 React Query (Server State & Caching)
- 🧾 React Hook Form + Zod
- 🔌 Socket.io Client

### Backend
- 🟩 Node.js + Express
- 🟦 TypeScript
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication
- 🍪 HttpOnly Cookies
- 🔌 Socket.io Server

---

## ✨ Features

### 🔐 Authentication & Authorization
- User Signup & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes via middleware

### 📝 Task Management (CRUD)
Each task includes:
- `title` (max 100 chars)
- `description`
- `dueDate`
- `priority` (Low, Medium, High, Urgent)
- `status` (To Do, In Progress, Review, Completed)
- `creatorId`
- `assignedToId`

Supported operations:
- Create task
- Read all tasks
- Update task (inline editing)
- Delete task

### 🔥 Real-Time Collaboration (Socket.io)
- Live task updates across users
- Instant UI refresh on create/update/delete
- Real-time sync without page reload

### 📊 Dashboard & Progress Tracking
- Tasks created by user
- Tasks assigned to user
- Overdue task detection
- Progress tracker with completion percentage

---



