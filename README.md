# 🛰️ Satellite-based Disaster Early Warning System (EWS)

🔗 **Live Demo:** https://68e24a187a1a645ba88951c2--exquisite-granita-c2aff6.netlify.app/

A robust full-stack (MERN) web platform designed for near real-time disaster monitoring and early warnings.  
The system processes satellite-derived and environmental data to identify potential risks such as **floods, wildfires, cyclones, and heatwaves**, and delivers timely alerts to at-risk populations.

---

## 📌 Problem Statement

Natural disasters often cause severe damage due to delayed information and lack of timely alerts.  
Communities and authorities require an **early warning system** that can visualize risk zones, monitor disaster indicators, and provide actionable alerts in near real-time.

---

## 🚀 Key Features

- 🌍 Real-time disaster monitoring dashboard (simulated data for MVP)  
- 🗺️ Interactive map view for affected regions  
- ⚠️ Disaster severity levels (Low / Medium / High)  
- 📊 Visual analytics for disaster trends  
- 🔐 Secure authentication using JWT  
- 🧑‍💻 Admin-ready architecture for managing alerts (planned)

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

**Security**
- JWT Authentication  
- Secure environment variable management using dotenv

---

## 📁 Project Structure

├── backend/ # Server logic, API routes, database models
├── frontend/ # React UI components and dashboards
└── README.md # Project documentation


---

## ⚙️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/ashukumari95/Satellite-based-Disaster-Early-Warning-System.git
cd Satellite-based-Disaster-Early-Warning-System

2️⃣ Setup Backend

cd backend
npm install
Create a .env file inside backend/:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Run backend server: npm start
The backend will run on:
http://localhost:5000

3️⃣ Setup Frontend
cd ../frontend
npm install
npm run dev

Frontend will run on:
http://localhost:5173

## 🧠 Architecture Overview

Frontend consumes REST APIs exposed by the backend

Backend processes incoming disaster data and manages alerts

MongoDB stores disaster logs and user alert configurations

JWT secures protected routes and admin functionalities

 ## 🗺️ Roadmap

 Integrate real satellite and weather public APIs

 Implement location-based alert notifications

 Add SMS/WhatsApp alerts for critical warnings

 Offline-first support using PWA

 Multilingual alerts for wider accessibility

 Role-based admin panel for disaster management authorities

