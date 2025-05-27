# 🧠 Real-Time Chat App (React + Django + Redis)

A real-time chat application using **Django**, **Redis**, and **React**.

---

## 🚀 Features

- Real-time messaging with WebSockets
- Scalable Redis backend for channels
- React frontend (with hot-reload)
- Django REST + Channels backend

---

## 🧩 Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Django + Django Channels
- **Real-time Layer**: Redis
- **WebSocket Protocol**: `ws://` over Channels

---

## 🛠️ Local Setup

### 📦 Requirements

- Python 3.9+
- Node.js 16+
- Redis (local or via Docker)
- `pip`, `npm` or `yarn`

---

### 🔌 Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

 daphne -p 8000 chatProject.asgi:application

```


### 🔌 Frontend Setup (Django)


```bash cd frontend
npm install
npm start
```
