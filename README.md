# 🌲 Nested Tags Tree - Full Stack Assignment

[![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://full-stack-project-mu-blond.vercel.app/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

A high-performance, full-stack implementation of a recursive Nested Tags Tree system. Built with a modern tech stack focusing on scalability, clean architecture, and premium user experience.

🔗 **Live Demo**: [https://full-stack-project-mu-blond.vercel.app/](https://full-stack-project-mu-blond.vercel.app/)

---

## 🚀 Key Features

### 🔹 Recursive Tag Management
- **Deep Nesting**: Support for infinite recursive nesting of tags via a reusable `TagView` component.
- **Intelligent Node Conversion**: Dynamically transforms leaf nodes (data) into branch nodes (children) when a new child is added, maintaining strict data integrity.
- **Collapsible Architecture**: Fully recursive expand/collapse functionality with state persistence.

### 🔹 Advanced Functionality (Including Bonus)
- **Inline Name Editing**: Click-to-edit tag headers with instant feedback and keyboard (`Enter`) support.
- **Data Synchronization**: Real-time editing of "data" fields with automated sync to the backend.
- **JSON Export engine**: Generates a clean, hierarchical JSON output, stripping internal metadata as per requirements.

### 🔹 Professional Tech Stack
- **Frontend**: React (Vite) + Vanilla CSS (Glassmorphism design).
- **Backend**: FastAPI (Python) with SQLAlchemy ORM.
- **Database**: PostgreSQL (Supabase) with Transaction Pooling.
- **DevOps**: Automated CI/CD via GitHub Actions and Vercel.

---

## 🛠 Architecture & Design Decisions

### 1. Hybrid Schema Strategy
I chose to store the tree hierarchy as a **JSONB column** in PostgreSQL. 
- **Rationale**: For highly recursive, write-heavy tree structures where the depth is unpredictable, JSONB provides O(1) fetch performance for the entire tree and avoids complex recursive CTEs or Adjacency List joins that would otherwise degrade performance.

### 2. Serverless Optimization
- **NullPool Connectivity**: Implemented `NullPool` in SQLAlchemy to handle the ephemeral nature of Vercel serverless functions, preventing connection leaks to the database.
- **Transaction Pooling**: Configured connection through port `6543` to ensure compatibility with high-concurrency cloud environments.

### 3. State Management
- Used a **Functional Update Pattern** for recursive state propagation. This ensures that a child node can trigger a state change in the root without requiring heavy libraries like Redux, keeping the bundle size small and the performance snappy.

---

## 📦 Installation & Setup

### Backend
1. `cd backend`
2. `pip install -r requirements.txt`
3. `python main.py`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 👨‍💻 Developer Notes
This project was built with a focus on "Production-First" mentality. Beyond the core requirements, I implemented **GitHub Actions** for automated deployment and a **Premium UI** to demonstrate attention to detail and modern web design standards.

---
*Created for the AIMonk Full Stack Coding Assignment.*