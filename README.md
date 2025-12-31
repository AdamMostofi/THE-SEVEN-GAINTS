# 🏔️ THE SEVEN GIANTS - Expedition Portal

**Live Demo:** [https://the-seven-gaints-1.onrender.com/](https://the-seven-gaints-1.onrender.com/)

A professional Full-Stack application developed for **CSCI426 Phase 2**. This platform serves as a comprehensive portal for mountain expeditions, featuring real-time data synchronization and a secure administrative management system.

---

## 🏗️ System Architecture
The application follows a **Decoupled Client-Server Architecture**:
* **Frontend:** React (Vite) hosted on **Render (Static Site)**.
* **Backend:** Node.js & Express.js REST API hosted on **Render (Web Service)**.
* **Cloud Database:** Managed MySQL instance hosted on **Aiven Cloud**.



---

## 🌟 Key Features

### 👤 User Authentication & Security
* **Secure Flow:** Complete Signup and Login system with persistent user sessions.
* **State Management:** Utilizes `localStorage` and React Hooks to maintain authentication state across the application.

### 🔐 Advanced Admin Dashboard
* **Restricted Access:** The `/admin` route is protected and exclusively accessible to verified administrative accounts (e.g., `adammostofi@gmail.com`).
* **Message Management:** A centralized dashboard for administrators to view and manage all incoming expedition inquiries.
* **Real-time CRUD:** Fully integrated with the cloud database for immediate updates to mountain data and user messages.

### 📊 Relational Data Integrity
* **Database Normalization:** Uses a relational structure where messages are linked to specific User IDs.
* **Data Reliability:** Implements **Foreign Keys** (`user_id`) to ensure every piece of communication is tied to a verified user account (One-to-Many relationship).

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Radix UI, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js, CORS, Dotenv |
| **Database** | MySQL (Relational), Aiven Cloud Hosting |
| **Deployment** | Render (CI/CD via GitHub Integration) |

---

## 📜 Database Schema
The relational structure consists of two primary entities:
1.  **Users Table:** Stores unique user credentials and profile data.
2.  **User_Messages Table:** Stores expedition inquiries, linked to the Users table via a **Foreign Key** (`user_id`). This ensures data traceability and security.

---

## ⚙️ Development Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AdamMostofi/THE-SEVEN-GAINTS.git](https://github.com/AdamMostofi/THE-SEVEN-GAINTS.git)
    ```
2.  **Install Dependencies:**
    * Navigate to `/Frontend` and run `npm install`
    * Navigate to `/Backend` and run `npm install`
3.  **Environment Variables:**
    Create a `.env` file in the `/Backend` directory with your Aiven MySQL credentials:
    * `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`, `PORT`
4.  **Run Locally:**
    * **Backend:** `node server.js`
    * **Frontend:** `npm run dev`

---

## 👤 Author
**Adam Mostofi** Developed as part of the CSCI426 Computer Science curriculum.