
---

# Task Management & Collaboration System

A full‑stack web application built with **FastAPI (Backend)** and **React.js (Frontend)**.  
Features include user authentication, project management, task tracking, assignments, analytics, and optional notifications.

---

## 📦 Tech Stack
- **Backend**: FastAPI, SQLAlchemy ORM, JWT Authentication
- **Database**: SQLite (default) or PostgreSQL
- **Frontend**: React.js, Axios, TailwindCSS (optional), Recharts/Chart.js for analytics

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone <https://github.com/chandramouli2812/task-management-system.git>
cd task-management-system
```

---

### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv/bin/activate
```

#### Run Migrations / Create DB
```bash
python -c "from database import Base, engine; import models; Base.metadata.create_all(bind=engine)"
```

#### Start Backend Server
```bash
uvicorn main:app --reload
```
Backend runs at: `http://localhost:8000`

---

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs at: `http://localhost:3000`

---

## 🔑 Authentication
- Register: `POST /auth/register`
- Login: `POST /auth/login` → returns JWT token
- Token stored in `localStorage` and attached to all API requests.

---

## 📂 Project Structure

```
backend/
  ├── main.py
  ├── database.py
  ├── models.py
  ├── schemas.py
  ├── auth.py
  ├── routers/
      ├── projects.py
      ├── tasks.py
      └── analytics.py

frontend/
  ├── src/
      ├── api.js
      ├── pages/
      │   ├── Login.js
      │   ├── Register.js
      │   ├── Projects.js
      │   ├── Tasks.js
      │   └── Analytics.js
      └── components/
          ├── Navbar.js
          ├── ProjectCard.js
          └── TaskCard.js
```

---

## 📊 Features
- **User Authentication**: Register/Login with JWT
- **Projects**: Create, update, delete, list
- **Tasks**: Create, update, delete, assign
- **Analytics**: Task summary, per‑project stats, charts
- **Notifications (Optional)**: In‑app or email alerts

---
