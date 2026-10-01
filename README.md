# Student AI — Smart Student Management System

A modern, responsive web-based student portal built with React and TypeScript. Student AI brings all college information into one platform for students, professors, and administrators.

## 🎯 Project Purpose

Student AI is a college project that provides:
- **Students**: One dashboard to see courses, assignments, notices, exams, study materials, results, events, and a Nepali/English translator
- **Professors/Organizers**: Tools to manage courses, publish assignments, grade submissions, post notices, schedule exams, upload materials, and organize events
- **Admins**: Complete system management including users, courses, and all academic data

## 🛠 Technologies Used

| Technology | Purpose |
|-----------|---------|
| [React 18](https://react.dev) | UI framework |
| [TypeScript](https://www.typescriptlang.org) | Type-safe JavaScript |
| [Vite](https://vitejs.dev) | Fast build tool and dev server |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS framework |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [Lucide React](https://lucide.dev) | Beautiful icon library |

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── assets/          # Static assets (logo, images)
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Button, Badge, Modal, Toast, Pagination, etc.
│   │   ├── layout/      # Sidebar, TopNavbar, PageHeader, ProfileDropdown
│   │   ├── cards/       # StatCard, CourseCard, AssignmentCard, etc.
│   │   ├── forms/       # FormInput, FormSelect, FormTextArea, FileInput
│   │   ├── tables/      # DataTable (responsive)
│   │   └── modals/      # FormModal
│   ├── layouts/         # PublicLayout, StudentLayout, ProfessorLayout, AdminLayout
│   ├── pages/           # All page components
│   │   ├── public/      # Landing, Login, Register, ForgotPassword
│   │   ├── student/     # 13 student pages (Dashboard, Courses, etc.)
│   │   ├── professor/   # 12 professor pages (Dashboard, Assignments, etc.)
│   │   ├── admin/       # 12 admin pages (Dashboard, Users, etc.)
│   │   └── common/      # NotFound (404)
│   ├── data/            # Mock data files
│   ├── types/           # TypeScript interfaces
│   ├── hooks/           # Custom React hooks (useAuth, useMockData)
│   ├── context/         # AuthContext for mock authentication
│   ├── routes/          # AppRoutes with role-based protection
│   └── utils/           # Helper functions, translator dictionary
├── package.json
├── vite.config.ts
└── README.md
```

## 🚀 How to Install and Run

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or newer)
- npm (comes with Node.js)

### Steps

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

5. **Build for production (optional):**
   ```bash
   npm run build
   ```

## 👥 Demo Roles

The frontend uses **mock authentication**. On the login page, click one of the demo role buttons:

| Role | Demo User | Dashboard |
|------|----------|-----------|
| **Student** | Aarav Sharma | `/student/dashboard` |
| **Professor** | Dr. Ram Prasad Khanal | `/professor/dashboard` |
| **Admin** | Admin User | `/admin/dashboard` |

## 🗺 Main Routes

### Public
| Route | Page |
|-------|------|
| `/` | Landing Page |
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Forgot Password |

### Student (`/student/...`)
| Route | Page |
|-------|------|
| `dashboard` | Student Dashboard |
| `courses` | My Courses |
| `courses/:id` | Course Detail |
| `assignments` | Assignments |
| `assignments/:id` | Assignment Detail & Submission |
| `notices` | Notices |
| `notices/:id` | Notice Detail |
| `exams` | Exam Schedule |
| `study-materials` | Study Materials |
| `results` | Results & GPA |
| `events` | Sports & Events |
| `translator` | Nepali ↔ English Translator |
| `profile` | My Profile |

### Professor (`/professor/...`)
| Route | Page |
|-------|------|
| `dashboard` | Professor Dashboard |
| `courses` | My Courses (CRUD) |
| `courses/:id` | Course Detail |
| `assignments` | Assignments (CRUD) |
| `submissions` | Student Submissions |
| `submissions/:id` | Submission Review & Grading |
| `notices` | Notices (CRUD) |
| `exams` | Exam Schedule (CRUD) |
| `study-materials` | Study Materials (CRUD) |
| `events` | Events (CRUD) |
| `results` | Student Results (CRUD) |
| `profile` | My Profile |

### Admin (`/admin/...`)
| Route | Page |
|-------|------|
| `dashboard` | System Dashboard |
| `users` | User Management |
| `students` | Student Management |
| `professors` | Professor Management |
| `courses` | Course Management |
| `assignments` | Assignment Management |
| `notices` | Notice Management |
| `exams` | Exam Management |
| `study-materials` | Study Material Management |
| `events` | Event Management |
| `results` | Result Management |
| `settings` | Profile & App Settings |

## 📋 What is Currently Mock Data

All data in this frontend is **mock/simulated**:
- Users, students, professors (stored in `src/data/`)
- Courses, assignments, submissions, notices, exams, study materials, events, results
- Authentication (no real login — demo role selection)
- File uploads (UI only, no actual file storage)
- Translation (dictionary-based lookup, not a real API)
- CRUD operations (local state only, resets on page refresh)

## 🔮 What Will Be Connected to Backend

In the next development phase, the following will be replaced with real backend functionality:
- Real authentication with JWT tokens
- PostgreSQL database via Prisma ORM
- REST API endpoints (Node.js + Express)
- Real file uploads (assignments, study materials)
- Real translation API integration
- Persistent CRUD operations
- Email notifications
- Role-based access control (server-side)

## 📝 License

This is a college project for educational purposes.
