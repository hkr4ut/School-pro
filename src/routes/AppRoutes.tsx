import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import StudentLayout from '../layouts/StudentLayout';
import ProfessorLayout from '../layouts/ProfessorLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';
import ForgotPasswordPage from '../pages/public/ForgotPasswordPage';

// Student pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentCourses from '../pages/student/Courses';
import StudentCourseDetail from '../pages/student/CourseDetail';
import StudentAssignments from '../pages/student/Assignments';
import StudentAssignmentDetail from '../pages/student/AssignmentDetail';
import StudentNotices from '../pages/student/Notices';
import StudentNoticeDetail from '../pages/student/NoticeDetail';
import StudentExams from '../pages/student/Exams';
import StudentStudyMaterials from '../pages/student/StudyMaterials';
import StudentResults from '../pages/student/Results';
import StudentEvents from '../pages/student/Events';
import StudentTranslator from '../pages/student/Translator';
import StudentProfile from '../pages/student/Profile';

// Professor pages
import ProfessorDashboard from '../pages/professor/Dashboard';
import ProfessorCourses from '../pages/professor/Courses';
import ProfessorCourseDetail from '../pages/professor/CourseDetail';
import ProfessorAssignments from '../pages/professor/Assignments';
import ProfessorSubmissions from '../pages/professor/Submissions';
import ProfessorSubmissionReview from '../pages/professor/SubmissionReview';
import ProfessorNotices from '../pages/professor/Notices';
import ProfessorExams from '../pages/professor/Exams';
import ProfessorStudyMaterials from '../pages/professor/StudyMaterials';
import ProfessorEvents from '../pages/professor/Events';
import ProfessorResults from '../pages/professor/Results';
import ProfessorProfile from '../pages/professor/Profile';

// Admin pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminStudents from '../pages/admin/Students';
import AdminProfessors from '../pages/admin/Professors';
import AdminCourses from '../pages/admin/Courses';
import AdminAssignments from '../pages/admin/Assignments';
import AdminNotices from '../pages/admin/Notices';
import AdminExams from '../pages/admin/Exams';
import AdminStudyMaterials from '../pages/admin/StudyMaterials';
import AdminEvents from '../pages/admin/Events';
import AdminResults from '../pages/admin/Results';
import AdminSettings from '../pages/admin/Settings';

// Common pages
import NotFound from '../pages/common/NotFound';

// ============================================================
// Protected Route — redirects to login if unauthorized
// ============================================================
function ProtectedRoute({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: string;
}) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (role !== allowedRole) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }
  return <>{children}</>;
}

// ============================================================
// App Routes
// ============================================================
export default function AppRoutes() {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={`/${role}/dashboard`} replace />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Student routes */}
      <Route
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/courses/:id" element={<StudentCourseDetail />} />
        <Route path="/student/assignments" element={<StudentAssignments />} />
        <Route path="/student/assignments/:id" element={<StudentAssignmentDetail />} />
        <Route path="/student/notices" element={<StudentNotices />} />
        <Route path="/student/notices/:id" element={<StudentNoticeDetail />} />
        <Route path="/student/exams" element={<StudentExams />} />
        <Route path="/student/study-materials" element={<StudentStudyMaterials />} />
        <Route path="/student/results" element={<StudentResults />} />
        <Route path="/student/events" element={<StudentEvents />} />
        <Route path="/student/translator" element={<StudentTranslator />} />
        <Route path="/student/profile" element={<StudentProfile />} />
      </Route>

      {/* Professor routes */}
      <Route
        element={
          <ProtectedRoute allowedRole="professor">
            <ProfessorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/professor/dashboard" element={<ProfessorDashboard />} />
        <Route path="/professor/courses" element={<ProfessorCourses />} />
        <Route path="/professor/courses/:id" element={<ProfessorCourseDetail />} />
        <Route path="/professor/assignments" element={<ProfessorAssignments />} />
        <Route path="/professor/submissions" element={<ProfessorSubmissions />} />
        <Route path="/professor/submissions/:id" element={<ProfessorSubmissionReview />} />
        <Route path="/professor/notices" element={<ProfessorNotices />} />
        <Route path="/professor/exams" element={<ProfessorExams />} />
        <Route path="/professor/study-materials" element={<ProfessorStudyMaterials />} />
        <Route path="/professor/events" element={<ProfessorEvents />} />
        <Route path="/professor/results" element={<ProfessorResults />} />
        <Route path="/professor/profile" element={<ProfessorProfile />} />
      </Route>

      {/* Admin routes */}
      <Route
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/professors" element={<AdminProfessors />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/assignments" element={<AdminAssignments />} />
        <Route path="/admin/notices" element={<AdminNotices />} />
        <Route path="/admin/exams" element={<AdminExams />} />
        <Route path="/admin/study-materials" element={<AdminStudyMaterials />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/results" element={<AdminResults />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
