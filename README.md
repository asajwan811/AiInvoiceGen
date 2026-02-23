# AI Invoice Generator

An intelligent invoice generator and dashboard application that leverages AI to extract invoice data, generate friendly payment reminders, and analyze revenue metrics so that businesses can get paid faster.

**Live Application:** [easyinvoice-knus.onrender.com](https://easyinvoice-knus.onrender.com/)

---

## 🛠 Tech Stack

### Frontend
- **React 19** with **Vite**
- **Tailwind CSS v4** for styling
- **React Router** for protected routing
- **Lucide React** for icons
- **Axios** for API requests

### Backend
- **Node.js** & **Express** server
- **MongoDB** / **Mongoose** for data storage
- **JWT & bcryptjs** for secure authentication
- **@google/genai** integration for AI Insights and Data Parsing

---

## ✨ Core Features

- **Secure Authentication System:** JWT-based protected routes and session handling.
- **Invoice Management Dashboard:** Create, update, view, and track paid and unpaid invoices.
- **AI Data Extraction:** Upload unstructured text, and use Google Gemini AI to instantly parse and auto-fill an invoice.
- **AI Dashboard Summaries:** Actionable insights automatically generated based on recent revenue, paid, and outstanding invoice histories.
- **AI Payment Reminders:** Automatically drafts friendly follow-up emails for overdue balances.

---

## 🚀 Running Locally

You will need two terminal windows to run both the frontend and backend servers simultaneously.

### 1. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following keys:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:
```bash
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend/invoice-generator
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The application will now be running on `http://localhost:5173`.

---
