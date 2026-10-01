import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';

const studentNavItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: 'LayoutDashboard' },
  { label: 'Courses', path: '/student/courses', icon: 'BookOpen' },
  { label: 'Assignments', path: '/student/assignments', icon: 'FileText' },
  { label: 'Notices', path: '/student/notices', icon: 'Bell' },
  { label: 'Exam Schedule', path: '/student/exams', icon: 'Calendar' },
  { label: 'Study Materials', path: '/student/study-materials', icon: 'FolderOpen' },
  { label: 'Results', path: '/student/results', icon: 'BarChart3' },
  { label: 'Sports & Events', path: '/student/events', icon: 'Trophy' },
  { label: 'Translator', path: '/student/translator', icon: 'Languages' },
  { label: 'Profile', path: '/student/profile', icon: 'User' },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        items={studentNavItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        roleLabel="Student"
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
