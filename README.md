# 📘 School Enrollment System — Laravel + React

A full-stack School Enrollment System that allows parents to submit student enrollment requests and enables staff to review, approve, or reject applications through a dashboard. Built with a Laravel API backend and a React (Vite) frontend.

---

# 🧱 Tech Stack

## Backend
- Laravel
- PHP
- Laravel Sanctum (API token authentication)
- MySQL
- REST API
- Laravel Mail (Gmail)
- API Rate Limiting

## Frontend
- React (Vite)
- React Router
- Axios
- TailwindCSS
- XLSX (Excel export)

---

# ⚙️ Features

- Parent enrollment form (public)
- Staff login with token authentication
- Enrollment workflow statuses:
  - Pending
  - Approved
  - Rejected
- Staff dashboard report table
- Approve / Reject with API update
- Email notifications:
  - New enrollment → Staff alert
  - Status update → Parent confirmation
- API rate limiting (5 requests / minute)
- Excel export (frontend)
- Protected routes
- Auto logout on inactivity

---

# 📁 Project Structure

backend/ Laravel API
frontend/ React Vite app

------

🚀 Backend Setup (Laravel)

1. Install Dependencies
cd backend
composer install

2. Environment File
cp .env.example .env


Update database configuration in .env:

DB_DATABASE=your_database
DB_USERNAME=root
DB_PASSWORD=

3. Generate App Key
php artisan key:generate

4. Run Migrations
php artisan migrate

5. Install Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate


Ensure your authenticatable model uses:

use Laravel\Sanctum\HasApiTokens;

6. Configure Mail

Example using gmail:
MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=YOUR_USER
MAIL_PASSWORD=YOUR_PASS
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="no-reply@school.com"
MAIL_FROM_NAME="School Enrollment System"

7. Start Backend
php artisan serve


Backend URL: http://127.0.0.1:8000

💻 Frontend Setup (React + Vite)
1. Install Packages
cd frontend
npm install

2. Configure API Base URL

Edit src/api.js:

baseURL: "http://127.0.0.1:8000/api"

3. Run Frontend
npm run dev


Frontend URL: http://localhost:5173

🔐 Authentication Flow

Staff login returns:

token

staff object

Frontend stores:

localStorage.token

localStorage.user

Axios interceptor attaches Bearer token automatically

Protected routes require a valid token

📡 API Endpoints
Public

POST /api/staff/login

POST /api/enroll

Protected (requires token)

GET /api/students

PATCH /api/enrollments/{id}

POST /api/logout

⛔ Rate Limiting

Sensitive routes limited to 5 requests/minute per IP

Configured via route middleware: throttle

✉️ Email Triggers

Enrollment submitted → Staff notified

Enrollment approved/rejected → Parent notified

Mail classes located in: app/Mail/

📊 Dashboard Functions

Load enrollment data via API

Approve / Reject entries

Buttons disabled while processing

Success modal feedback

Excel export via XLSX

Auto logout after inactivity

🧪 Quick Test Flow
Enrollment (Parent)

Open enrollment page

Submit form

Verify DB records created

Staff receives email

Staff

Login

Dashboard loads records

Approve / Reject entries

Parent receives status email

Export to Excel works

✅ Run Sequence
# Backend
cd backend
php artisan serve

# Frontend
cd frontend
npm run dev
