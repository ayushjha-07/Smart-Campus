# Smart Campus Complaint & Analytics System

> **“Report. Track. Resolve. Improve.”**

A production-grade, full-stack university facility and grievance management platform designed for higher education institutions. The system empowers students to lodge and track complaints with rule-based AI triage, enables department staff to manage operations, and equips university administrators with campus-wide analytics and governance tools.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React 18 + Vite + Tailwind CSS          │
│        (Student Portal, Department Console, Admin Suite)    │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API (JSON / Bearer JWT)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 FastAPI REST Backend (Python 3.11+)         │
│          App Factory, Router Layer, Security & RBAC         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
   ┌───────────────────────────┐ ┌───────────────────────────┐
   │       Service Layer       │ │    Pydantic v2 Schemas    │
   │  • AI Triage & Routing    │ │  Request / Response DTOs  │
   │  • Sequential Numbering   │ └───────────────────────────┘
   │  • Notification Engine    │
   │  • Executive Analytics    │
   └────────────┬──────────────┘
                │
                ▼
   ┌───────────────────────────┐
   │     SQLAlchemy 2.x ORM    │
   │ DeclarativeBase, Sessions │
   └────────────┬──────────────┘
                │
                ▼
   ┌───────────────────────────┐
   │    PostgreSQL 16 Engine   │
   │     (Alembic Migrations)  │
   └───────────────────────────┘
```

---

## 🚀 Tech Stack

### Backend
- **Framework**: Python 3.11+ / FastAPI
- **Server**: Uvicorn
- **ORM**: SQLAlchemy 2.x (`DeclarativeBase`)
- **Database**: PostgreSQL 16 (with SQLite test fallback)
- **Validation**: Pydantic v2 & Pydantic Settings
- **Migrations**: Alembic
- **Security**: Salted Bcrypt, JWT (`pyjwt` / `python-jose`), RBAC
- **File Uploads**: `python-multipart`

### Frontend
- **Framework**: React 18 / Vite
- **Styling**: Tailwind CSS / Lucide React / Recharts
- **Theme**: Unified Dark & Light university theme engine
- **API Client**: Centralized fetch wrapper (`src/services/api.js`)

---

## 📂 Project Structure

```
Smart Campus/
├── docker-compose.yml               # PostgreSQL 16 & FastAPI container orchestration
├── .env.example                     # Frontend environment template
├── src/                             # React application
│   ├── services/
│   │   └── api.js                   # Centralized API service layer
│   ├── components/                  # UI components across portals
│   ├── pages/                       # Route pages (Student, Admin, Department)
│   └── context/                     # Global state & theme management
├── backend/
│   ├── Dockerfile                   # Production Python container definition
│   ├── requirements.txt             # Pinned backend dependencies
│   ├── alembic.ini                  # Migration configuration
│   ├── .env.example                 # Backend environment variable template
│   ├── seed.py                      # Database seeding script (10 departments, demo accounts)
│   ├── app/
│   │   ├── main.py                  # FastAPI entrypoint, CORS, static mounts, logging
│   │   ├── core/
│   │   │   ├── config.py            # Pydantic Settings
│   │   │   ├── database.py          # SQLAlchemy engine, DeclarativeBase, get_db session dependency
│   │   │   └── security.py          # Bcrypt hashing, JWT encoding, RBAC guards
│   │   ├── models/                  # SQLAlchemy 2.x ORM entities
│   │   │   ├── user.py              # User entity (Student, Staff, Admin)
│   │   │   ├── department.py        # Department entity
│   │   │   ├── complaint.py         # Complaint tracking entity
│   │   │   ├── complaint_update.py  # Timeline progression log
│   │   │   ├── attachment.py        # File metadata
│   │   │   ├── notification.py      # Cross-role alert notifications
│   │   │   └── enums.py             # UserRole, Status, Priority enums
│   │   ├── schemas/                 # Pydantic v2 serialization schemas
│   │   ├── routers/                 # Modular API route controllers
│   │   │   ├── health.py            # /api/v1/health & /database
│   │   │   ├── auth.py              # /api/v1/auth
│   │   │   ├── users.py             # /api/v1/users
│   │   │   ├── departments.py       # /api/v1/departments
│   │   │   ├── complaints.py        # /api/v1/complaints
│   │   │   ├── notifications.py     # /api/v1/notifications
│   │   │   ├── analytics.py         # /api/v1/analytics
│   │   │   └── dashboard.py         # /api/v1/dashboard
│   │   └── services/                # Domain business logic
│   │       ├── ai_service.py        # Rule-based AI classification & scoring
│   │       ├── complaint_service.py # Routing, sequential numbers (SC-2026-XXXX), status workflow
│   │       ├── notification_service.py # Notification dispatching
│   │       ├── auth_service.py      # Registration & authentication
│   │       └── analytics_service.py # KPI calculation & trend aggregation
│   ├── migrations/                  # Alembic migration revisions
│   └── tests/                       # Pytest automated test suite
```

---

## ⚙️ Environment Setup & Getting Started

### 1. Prerequisites
- Python 3.11+
- Node.js 18+ and npm
- Docker and Docker Compose (optional, for containerized PostgreSQL)

### 2. Running Database via Docker (Recommended)
```bash
# Start PostgreSQL container on port 5432
docker compose up -d postgres
```

### 3. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Apply database migrations
alembic upgrade head

# Seed demo data (10 departments, 3 demo users, sample complaints)
python seed.py

# Start FastAPI development server
uvicorn app.main:app --reload --port 8000
```

FastAPI server runs on **`http://localhost:8000`**.
- Swagger Interactive UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc Technical Specs: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 4. Running Automated Tests
```bash
cd backend
python -m pytest tests/ -v
```

### 5. Frontend Setup
```bash
# In project root
npm install

# Configure environment
cp .env.example .env

# Start React development server
npm run dev
```
Frontend runs on **`http://localhost:5173`** (or `5174` if port is occupied).

---

## 👥 Demo User Credentials

The database seeder (`seed.py`) configures verified accounts for immediate evaluation:

| Role | Email | Password | Scope / Permissions |
| :--- | :--- | :--- | :--- |
| **Student** | `student@smartcampus.edu` | `Student@123` | File complaints, track own tickets, view notifications |
| **Department Staff** | `maintenance@smartcampus.edu` | `Staff@123` | Maintenance shift lead; triage, update, and resolve assigned tickets |
| **Administrator** | `admin@smartcampus.edu` | `Admin@123` | Full university panel; manage users, departments, priority, analytics |

*(Note: These credentials are strictly intended for local development and demonstration).*

---

## 📡 REST API Route Summary (`/api/v1`)

### Health & Diagnostics
- `GET /api/v1/health`: API service liveness probe.
- `GET /api/v1/health/database`: Database connectivity validation.

### Authentication (`/auth`)
- `POST /api/v1/auth/register`: Student self-service registration.
- `POST /api/v1/auth/login`: Issue Bearer JWT token.
- `GET /api/v1/auth/me`: Resolve profile of current session.

### Users (`/users`)
- `GET /api/v1/users/me` & `PUT /api/v1/users/me`: Manage personal contact info.
- `GET /api/v1/users`: Filterable directory with role/department facets *(Admin)*.
- `GET /api/v1/users/{id}` & `PUT /api/v1/users/{id}`: Edit account credentials *(Admin)*.
- `PATCH /api/v1/users/{id}/status`: Activate, suspend, or verify user account *(Admin)*.

### Departments (`/departments`)
- `GET /api/v1/departments`: List campus departments with active ticket counts.
- `GET /api/v1/departments/{id}`: Detailed department view with assigned head.
- `POST /api/v1/departments`: Create department division *(Admin)*.
- `PUT /api/v1/departments/{id}`: Modify department metadata *(Admin)*.
- `PATCH /api/v1/departments/{id}/status`: Toggle active status *(Admin)*.
- `GET /api/v1/departments/{id}/complaints`: View complaints routed to department *(Staff/Admin)*.

### Complaints (`/complaints`)
- `POST /api/v1/complaints`: Submit new complaint (triggers AI triage and auto-routing).
- `GET /api/v1/complaints`: Scoped complaint listing by role.
- `GET /api/v1/complaints/{id}`: Inspect single complaint by UUID or sequence number (`SC-2026-XXXX`).
- `PUT /api/v1/complaints/{id}`: Modify title/location before triage begins.
- `PATCH /api/v1/complaints/{id}/status`: Transition status along lifecycle:
  $$\text{PENDING} \rightarrow \text{UNDER\_REVIEW} \rightarrow \text{ASSIGNED} \rightarrow \text{IN\_PROGRESS} \rightarrow \text{RESOLVED}$$
- `PATCH /api/v1/complaints/{id}/priority`: Re-classify urgency level *(Admin)*.
- `PATCH /api/v1/complaints/{id}/department`: Reassign to different division *(Admin)*.
- `POST /api/v1/complaints/{id}/updates`: Log timeline remark or internal staff note.
- `GET /api/v1/complaints/{id}/timeline`: Retrieve structured 5-stage tracking progress.
- `POST /api/v1/complaints/{id}/resolve`: Complete resolution with mandatory technician notes.
- `POST /api/v1/complaints/{id}/attachments`: Upload evidence files (JPEG, PNG, WEBP, PDF $\le 10$MB).

### Notifications (`/notifications`)
- `GET /api/v1/notifications`: Fetch user notification feed.
- `GET /api/v1/notifications/unread-count`: Badge counter.
- `PATCH /api/v1/notifications/{id}/read`: Mark notification as read.
- `PATCH /api/v1/notifications/read-all`: Clear unread status.
- `DELETE /api/v1/notifications/{id}`: Remove notification.

### Analytics (`/analytics`) *(Admin Only)*
- `GET /api/v1/analytics/overview`: High-level metrics, resolution rate, and average turnaround time.
- `GET /api/v1/analytics/trends`: Day-by-day volume vs resolution velocity.
- `GET /api/v1/analytics/categories`: Category volume distribution.
- `GET /api/v1/analytics/priorities`: Urgency distribution breakdown.
- `GET /api/v1/analytics/status`: Lifecycle stage distribution.
- `GET /api/v1/analytics/departments`: Department resolution compliance and assigned load.
- `GET /api/v1/analytics/resolution-time`: Average hours by category.

### Dashboard Aggregates (`/dashboard`)
- `GET /api/v1/dashboard/student`: Student KPI counters and recent activity.
- `GET /api/v1/dashboard/admin`: Executive administrative metrics and department benchmarks.
- `GET /api/v1/dashboard/department`: Staff operations summary, urgent hazards, and recent activity.

---

## 🔒 Security Practices
- Passwords salted and hashed with **Bcrypt** prior to persistence.
- Stateles **JWT Bearer token** verification with cryptographic signatures (`HS256`).
- **Role-Based Access Control (RBAC)** enforced at router dependency level.
- Strict **CORS whitelist** reading allowed origins from environment configuration.
- File upload sanitization: strictly restricts MIME types, limits file size, and stores files using randomized UUID filenames.
- SQL injection prevention via **SQLAlchemy 2.x** parameterized queries.
