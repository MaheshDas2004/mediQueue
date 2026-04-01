# 🏥 Hospital Queue Management System

A modern **Hospital Queue Management System** built using **FastAPI** to streamline patient flow, reduce waiting time, and improve hospital efficiency.

---

## 🚀 Features

* 👤 Patient Registration & Login
* 🩺 Doctor Management
* 📅 Appointment Booking System
* 🔢 Real-time Queue Generation
* ⏳ Live Queue Status Tracking
* 🔐 Authentication & Authorization
* ⚡ Fast API performance (FastAPI)

---

## 🛠️ Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Backend    | FastAPI                    |
| Database   | SQLite / PostgreSQL        |
| ORM        | SQLAlchemy                 |
| Validation | Pydantic                   |
| Frontend   | (Planned) React / HTML-CSS |
| Server     | Uvicorn                    |

---

## 📁 Project Structure

```
hospital-queue-system/
│
├── backend/                          ← 🚀 FastAPI backend
│   │
│   ├── app/
│   │   ├── main.py                   ← Entry point
│   │   ├── config.py                 ← ENV settings (.env)
│   │
│   │   ├── models/                   ← DB tables (SQLAlchemy)
│   │   │   ├── patient.py
│   │   │   ├── queue.py
│   │   │   └── doctor.py (optional future)
│   │
│   │   ├── schemas/                  ← Request/Response (Pydantic)
│   │   │   ├── patient_schema.py
│   │   │   └── queue_schema.py
│   │
│   │   ├── routes/                   ← API endpoints
│   │   │   ├── patient_routes.py
│   │   │   └── queue_routes.py
│   │
│   │   ├── services/                 ← 🔥 CORE LOGIC
│   │   │   ├── patient_service.py
│   │   │   └── queue_service.py
│   │
│   │   ├── database/
│   │   │   ├── connection.py         ← engine + session
│   │   │   └── base.py               ← Base import (optional)
│   │
│   │   ├── utils/                    ← helper logic
│   │   │   └── triage.py             ← 🔥 emergency detection logic
│   │
│   │   └── dependencies/
│   │       └── db.py                 ← get_db dependency
│   │
│   ├── .env
│   ├── requirements.txt
│   └── venv/
│
├── frontend/ (future)
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/hospital-queue-system.git
cd hospital-queue-system
```

---

### 2️⃣ Setup Backend

```bash
cd backend
```

### 🔹 Create Virtual Environment

```bash
python -m venv venv
```

### 🔹 Activate Virtual Environment

* Windows:

```bash
venv\Scripts\activate
```

* Linux/Mac:

```bash
source venv/bin/activate
```

---

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4️⃣ Run Server

```bash
uvicorn app.main:app --reload
```

---

### 5️⃣ Open API Docs

```
http://127.0.0.1:8000/docs
```

👉 Interactive Swagger UI available

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 📌 API Modules Overview

| Module      | Description                 |
| ----------- | --------------------------- |
| Auth        | Login/Register              |
| Patient     | Patient data management     |
| Doctor      | Doctor info                 |
| Appointment | Booking system              |
| Queue       | Queue generation & tracking |

---

## 🔄 System Workflow

1. Patient registers/logs in
2. Books appointment
3. System assigns queue number
4. Doctor calls next patient
5. Queue updates dynamically

---

## 🧪 Future Improvements

* 📱 Frontend UI (React)
* 🔔 SMS/Email Notifications
* 📊 Admin Dashboard
* 🌐 Deployment (AWS / Render)
* ⚡ WebSocket for real-time updates

---

## 🤝 Contribution

Feel free to fork this repo and contribute!

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Mahesh Das**

---

⭐ If you like this project, don't forget to star the repo!
