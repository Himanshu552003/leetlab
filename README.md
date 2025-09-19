# LeetLab

LeetLab is a full-stack coding platform inspired by LeetCode. It helps users prepare for coding interviews and improve their coding skills by solving programming problems, tracking submissions, and managing playlists.

## Features

- User authentication (sign up, login)
- Problem listing, creation (admin), and solving
- Code editor with multi-language support (JavaScript, Python, Java)
- Test case evaluation using Judge0 API
- Submission history and statistics
- Playlists for organizing problems

---

## Project Structure

```
leetlab/
├── backend/      # Node.js, Express, Prisma, Judge0 integration
│   ├── src/
│   ├── prisma/
│   └── package.json
├── frontend/     # React, Vite, Tailwind CSS, Zustand
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (or another supported DB for Prisma)
- [Judge0 API](https://judge0.com/) endpoint

---

### Backend Setup

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your database and Judge0 API credentials.

3. **Setup database:**
   ```sh
   npx prisma migrate dev
   ```

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The server runs on `http://localhost:8080`.

---

### Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```

2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The app runs on `http://localhost:5173`.

---

## Usage

- Visit `http://localhost:5173` in your browser.
- Sign up or log in.
- Browse, solve, and create problems (admin).
- View submissions and manage playlists.

---

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Zustand, React Hook Form, Zod
- **Backend:** Node.js, Express, Prisma ORM, Judge0 API
- **Database:** PostgreSQL (configurable)
- **Other:** JWT Auth, REST API, Monaco Editor

---

## Scripts

### Backend

- `npm run dev` – Start backend in development mode
- `npx prisma migrate dev` – Run database migrations

### Frontend

- `npm run dev` – Start frontend in development mode
- `npm run build` – Build frontend for production

---

## License

MIT

---

## Acknowledgements

- [LeetCode](https://leetcode.com/) for inspiration
- [Judge0](https://judge0.com/) for code execution API
