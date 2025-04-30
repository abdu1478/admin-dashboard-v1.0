# Admin Dashboard

An interactive and responsive Admin Dashboard built with **React + TypeScript + Tailwind CSS + shadcn/ui** for the frontend and **Node.js + Express + MongoDB** for the backend. This dashboard helps administrators manage billing, user data, and system insights with ease. **Supabase** is integrated for seamless and secure authentication.

---

## 🔧 Tech Stack

### Frontend:
- React + TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts (for data visualization)
- Vite (for fast development)
- Supabase (Authentication)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- RESTful API structure
- JWT-based authentication (server-side)

---

## ✨ Features

- 💳 Billing Page with:
  - Searchable and filterable invoice list
  - Invoice summary cards (Revenue, Outstanding, Overdue)
  - Revenue trend chart (Recharts)
  - Invoice creation modal
  - Pagination and responsive table
- 🔐 Secure login and role-based access (Supabase)
- 📊 Dashboard analytics and data charts
- 📁 Modular file structure for scalability
- 🌓 Light/Dark mode support

---

## 📁 Folder Structure

```
admin-dashboard/
│
├── client/               # Frontend (React)
│   ├── src/
│   │   ├── assets/
│   │   ├── Components/
│   │   ├── config/
│   │   ├── data/
│   │   ├── Helper/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   └── index.html
│
├── server/               # Backend (Node.js)
│   ├── src/
│   │   ├── Models/
│   │__ ├── Server.ts
│   
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git https://github.com/abdu1478/admin-dashboard-v1.0.git
cd admin-dashboard
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env  # Configure your MongoDB URI and JWT secret
npm run dev
```

### 3. Setup Frontend

```bash
npm install
npm run dev
```

---

## 📦 Environment Variables

Make sure to set the following in your backend `.env` file:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/db
JWT_SECRET=your_jwt_secret_key
```

For Supabase authentication, also configure your frontend environment variables (e.g. in `.env`):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📌 Future Enhancements

- Add invoice export/download (PDF, Excel)
- Email notifications for due invoices
- Admin analytics for user behavior
- Role and permission management UI

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 💬 Contact

- Developer: Abdurahman Seid
- Email: abduseid8@yahoo.com
- Phone: +251974525193


