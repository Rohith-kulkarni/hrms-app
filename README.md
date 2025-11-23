# 🌐 Organisation Management Frontend

A modern React-based frontend for managing **Organisations, Employees, Teams, Authentication**, and Dashboard analytics.  
This UI connects to the Node.js Backend API and offers a clean, responsive, and user-friendly experience.

---

## 🚀 Features

- User Signup & Login
- JWT-based Authentication
- Protected Routes (React Router)
- Organisation Dashboard (Counts, Created Date)
- Create / View / Edit / Delete Employees
- Create / View / Edit / Delete Teams
- Assign & Unassign Employees to Teams
- Global API client for token-based requests
- Error handling with toasts / UI feedback
- Responsive UI with Tailwind / CSS

---

## 🛠️ Tech Stack

- **React**
- **React Router**
- **Axios / Fetch**
- **TailwindCSS / CSS**
- **LocalStorage** for JWT token
- **Vite / CRA** depending on your setup

---

## 📂 Folder Structure

```
src/
 ├── api/
 │   ├── apiClient.js
 │   ├── employeesApi.js
 │   ├── teamsApi.js
 │   └── organisationApi.js
 │
 ├── components/
 │   ├── Login/
 │   ├── Signup/
 │   ├── Dashboard/
 │   ├── employees/
 │   ├── teams/
 │   └── common/ProtectedRoute.js
 │
 ├── context/AuthContext.js
 ├── utils/
 ├── App.js
 ├── main.jsx
 └── index.css
```

---

## ⚙️ Installation

### 1️⃣ Clone Repo

```sh
git clone https://github.com/Rohith-kulkarni/hrms-app
cd hrms-app
```

### 2️⃣ Install Dependencies

```sh
npm install
```

---

## 🌍 Environment Setup

Create a `.env` file in project root:

For CRA:

```
REACT_APP_BASE_URL=http://localhost:5000
```

For Vite:

```
VITE_BASE_URL=http://localhost:5000
```

Your backend must run on this URL.

---

## ▶️ Start the Project

### Development server

```sh
npm start
```

Or for Vite:

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

---

## 🔌 API Setup

All API calls go through:

### `src/api/apiClient.js`

Handles:

- Injecting JWT token
- Base URL
- JSON headers
- Response handling

Example:

```js
export const apiClient = (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(`${process.env.REACT_APP_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  }).then(async (response) => {
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  });
};
```

---

## 🔐 Authentication Flow

1. Login / Signup → JWT returned
2. Token stored in `localStorage`
3. Every request includes `Authorization: Bearer <token>`
4. Protected routes check token before rendering

Example:

```jsx
const ProtectedRoute = ({ children }) => {
  return localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};
```

---

## 📄 Main Routes

| Route               | Description               |
| ------------------- | ------------------------- |
| `/login`            | Login page                |
| `/signup`           | User registration         |
| `/dashboard`        | Organisation summary      |
| `/employees`        | List employees            |
| `/employees/create` | Add employee              |
| `/teams`            | List teams                |
| `/teams/create`     | Add team                  |
| `/teams/:id`        | Assign/unassign employees |

---

## 🛠️ Common Issues

### ❌ 401 Unauthorized

Check token saved:

```js
localStorage.setItem("token", response.token);
```

### ❌ API “Organisation not defined”

Ensure backend route:

```
/api/organisation/:id
```

### ❌ “Invalid Date” in Dashboard

Backend must return valid `created_at`.

---

## 📜 License

MIT License

---

## ✨ Author

Your Name  
your@email  
GitHub: https://github.com/your-user
