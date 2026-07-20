# SupplySync AI — Frontend

The web dashboard for **SupplySync AI**, a Supply Chain & Inventory Management System. Built with React and Material UI, it gives businesses a clean interface to manage products, orders, suppliers, warehouses, and stock — with real-time dashboards and an AI assistant for quick answers.

🔗 **Backend Repo:** [SupplySync-AI-Backend](https://github.com/harshpandey9198/SupplySync-AI-Backend)
🔗 **Live Demo:** _add your deployed link here (Vercel/Netlify)_

---

## Features

- 🔐 **Login / Authentication** with JWT (role-based access)
- 📊 **Dashboard** — live business metrics and charts
- 📦 **Products & Categories** management
- 🏬 **Suppliers & Warehouses** management
- 🧾 **Purchase Orders** — create and track supplier orders
- 🛒 **Sales Orders** — create and track customer orders
- 🚚 **Stock Movement** — full history of stock in/out
- 📈 **Inventory** — current stock levels, low-stock alerts
- 📄 **Reports** — business insight reports
- 🤖 **AI Assistant** — chat-based interface for natural language queries
- 🎨 Clean, responsive UI built with **Material UI** and **Framer Motion** animations

---

## Tech Stack

| Category | Technology |
|---|---|
| Library | React 19 |
| Build Tool | Vite |
| UI Components | Material UI (MUI) + MUI Data Grid |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React + MUI Icons |
| Linting | ESLint |

---

## Project Structure

```
src/
├── components/       # Reusable UI pieces, organized per feature
│   ├── dashboard/
│   ├── products/
│   ├── salesOrders/
│   ├── purchaseOrders/
│   ├── inventory/
│   ├── stockMovement/
│   ├── suppliers/
│   ├── warehouses/
│   └── categories/
├── pages/            # Route-level pages (Dashboard, Products, Login, etc.)
├── layouts/           # App shell / navigation layout
├── services/          # Axios API calls, grouped per resource
└── assets/
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- The [backend server](https://github.com/harshpandey9198/SupplySync-AI-Backend) running locally or deployed

### 1. Clone the repository

```bash
git clone https://github.com/harshpandey9198/SupplySync-AI-Frontend.git
cd SupplySync-AI-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Point the app to your backend

Open `src/services/api.js`, `authService.js`, and `axiosConfig.js`, and set the `baseURL` to wherever your backend is running, e.g.:

```js
baseURL: "http://localhost:8080/api"
```

### 4. Run the development server

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

### 5. Login

Use the default admin credentials seeded by the backend on first run:

```
Email:    admin@supplysync.com
Password: admin123
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Screenshots

> _Add screenshots of the Dashboard, Sales Orders, and Inventory pages here._

---

## Future Improvements

- [ ] Form validation feedback (inline error messages)
- [ ] Centralized environment-based API config (`.env` instead of hardcoded URLs)
- [ ] Pagination & search on data tables
- [ ] Dark mode

---

## Author

**Harsh Pandey**
[GitHub](https://github.com/harshpandey9198)
