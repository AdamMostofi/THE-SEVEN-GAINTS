# 🏔️ THE SEVEN GIANTS - Expedition Portal

A full-stack web application built for **CSCI426 Phase 2**. This platform allows mountain enthusiasts to explore peak data and communicate securely with the expedition team.

## 🌟 Key Features
- **User Authentication:** Complete Signup and Login flow.
- **Relational Database:** Messages are linked to specific User IDs (One-to-Many relationship).
- **Secure Admin Panel:** A restricted dashboard (`/admin`) for managing user communications.
- **Dynamic Frontend:** Built with React and Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide Icons, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL (Relational).

## ⚙️ Setup Instructions
1. **Clone the repository.**
2. **Install Dependencies:** Run `npm install` in the root directory.
3. **Database:** Import the provided SQL schema into your MySQL server.
4. **Run:** Start the server with `node server.js` and the frontend with `npm run dev`.

## 📜 Database Relationship
The project uses two related entities:
- **Users Table:** Stores credentials.
- **User_Messages Table:** Stores messages linked to Users via `user_id` (Foreign Key).