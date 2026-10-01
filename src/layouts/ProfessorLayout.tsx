import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TopNavbar from '../components/layout/TopNavbar';

const professorNavItems = [
  { label: 'Dashboard', path: '/professor/dashboard', icon: 'LayoutDashboard' },
  { label: 'Courses', path: '/professor/courses', icon: 'BookOpen' },
  { label: 'Assignments', path: '/professor/assignments', icon: 'FileText' },
  { label: 'Submissions', path: '/professor/submissions', icon: 'ClipboardCheck' },
  { label: 'Notices', path: '/professor/notices', icon: 'Bell' },
  { label: 'Exam Schedule', path: '/professor/exams', icon: 'Calendar' },
  { label: 'Study Materials', path: '/professor/study-materials', icon: 'FolderOpen' },
  { label: 'Sports & Events', path: '/professor/events', icon: 'Trophy' },
  { label: 'Results', path: '/professor/results', icon: 'BarChart3' },
  { label: 'Profile', path: '/professor/profile', icon: 'User' },
];

export default function ProfessorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        items={professorNavItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        roleLabel="Professor"
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
