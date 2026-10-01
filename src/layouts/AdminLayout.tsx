import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';

const adminNavItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
  { label: 'Users', path: '/admin/users', icon: 'Users' },
  { label: 'Students', path: '/admin/students', icon: 'GraduationCap' },
  { label: 'Professors', path: '/admin/professors', icon: 'UserCog' },
  { label: 'Courses', path: '/admin/courses', icon: 'BookOpen' },
  { label: 'Assignments', path: '/admin/assignments', icon: 'FileText' },
  { label: 'Notices', path: '/admin/notices', icon: 'Bell' },
  { label: 'Exams', path: '/admin/exams', icon: 'Calendar' },
  { label: 'Study Materials', path: '/admin/study-materials', icon: 'FolderOpen' },
  { label: 'Events', path: '/admin/events', icon: 'Trophy' },
  { label: 'Results', path: '/admin/results', icon: 'BarChart3' },
  { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        items={adminNavItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        roleLabel="Admin"
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
