Web 2.0 – React Lab 5 (Monorepo)

Advanced React exercises and Node/Express + MongoDB homeworks consolidated in a single repository.

Repository Layout
Web2.0_React_Lab5/
├─ Exercises/            # React app (Lab Exercises + Homework 3 frontend)
│  ├─ src/               # Components, pages, AuthContext, API client
│  ├─ package.json
│  └─ .env               # REACT_APP_API_URL=http://localhost:5000
│
└─ Homework_1/           # Express + MongoDB API (Homework 1 & 2 backend)
   ├─ src/
   │  ├─ server.js       # Express bootstrap
   │  ├─ db.js           # connectDB
   │  ├─ models/         # Task.js, User.js
   │  ├─ controllers/    # taskController.js, authController.js
   │  ├─ routes/         # taskRoutes.js, authRoutes.js
   │  └─ middleware/     # auth.js, errorHandler.js
   ├─ package.json
   └─ .env               # PORT, MONGODB_URI, JWT_SECRET, CORS_ORIGIN

Requirements

Node.js 18+

MongoDB (local service or Atlas connection string)

Git, Postman/Thunder Client (optional for manual API tests)

Environment Variables
Homework_1/.env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/tasks_db
JWT_SECRET=super_secret_change_me
CORS_ORIGIN=http://localhost:3000

Exercises/.env
REACT_APP_API_URL=http://localhost:5000


Note: After editing .env in Exercises, restart npm start.

Install & Run

Open two terminals.

1) Backend (Homework 1 & 2)
cd Web2.0_React_Lab5/Homework_1
npm install
npm run dev
# Server listens on http://localhost:5000


Health-check:

GET http://localhost:5000/health  →  { "ok": true }

2) Frontend (Exercises + Homework 3)
cd Web2.0_React_Lab5/Exercises
npm install
npm start
# App runs on http://localhost:3000

API Endpoints (Backend)

Auth (HW2):

POST /api/auth/register → { username, email, password }

POST /api/auth/login → { email, password }

GET /api/auth/profile → Bearer JWT required

Tasks (HW1 + protected in HW2):

GET /api/tasks (auth) – list user’s tasks

POST /api/tasks (auth) – { title, description? }

GET /api/tasks/:id (auth)

PUT /api/tasks/:id (auth)

DELETE /api/tasks/:id (auth)

Homework 3 (Frontend) – Highlights

React Router protected routes (/profile, /tasks)

Authentication Context (JWT persistence, bootstrap on refresh)

Auto logout based on JWT exp using jwt-decode

Minimal validation for login/registration

Modern ultra-light pink “cafeteria” theme

Test Flow (Screenshots to include in report)

[H3-1] Register success → redirected Profile

[H3-2] Protected Profile shows username, email

[H3-3] Protected Tasks: add a task and list updates

Scripts
Backend (Homework_1/package.json)

npm run dev – start server with nodemon

npm start – start server (production)

Frontend (Exercises/package.json)

npm start – CRA dev server

npm run build – production build

Versioning

Annotated Git tags used:

hw1-v1.0.0 – Homework 1 (CRUD Tasks API)

hw2-v2.0.0, hw2-v2.0.1 – Homework 2 (JWT auth + fixes)

hw3-v3.0.0 – Homework 3 (React auth frontend)

Use Compare on GitHub to see diffs between tags.

Troubleshooting

GET / on backend returns 404**: Expected. Use /health or API routes.

Port in use: kill process on 3000/5000 or accept a new port when CRA prompts.

jwt-decode import: use import { jwtDecode } from "jwt-decode"; (no default export).

CORS: ensure CORS_ORIGIN=http://localhost:3000 in backend .env.

License

For educational use in BCU2025 course labs.

Contributors

Student: Nhi – 24560059@uit.gm.edu.vn

Changelog

v3.0.0 – Add React authentication frontend, protected routes, auto-logout

v2.0.1 – Backend minor fixes (auth routes order, polish)

v2.0.0 – Add JWT auth & protect tasks

v1.0.0 – CRUD tasks API

How to Run Tests (manual)

Postman collection: register → login → use returned token for /api/auth/profile and /api/tasks routes.

Frontend: verify protected routes redirect when unauthenticated.