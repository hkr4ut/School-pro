import { mockStudents, mockProfessors } from '../../data/users';
import { mockCourses } from '../../data/courses';
import { mockAssignments } from '../../data/assignments';
import { mockNotices } from '../../data/notices';
import { mockExams } from '../../data/exams';
import { mockStudyMaterials } from '../../data/studyMaterials';
import { mockEvents } from '../../data/events';
import PageHeader from '../../components/layout/PageHeader';
import StatCard from '../../components/cards/StatCard';
import { formatDate } from '../../utils/helpers';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const upcomingExams = mockExams.filter(e => e.status === 'upcoming');
  
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={mockStudents.length} icon="GraduationCap" color="bg-blue-100 text-blue-600" />
        <StatCard label="Total Professors" value={mockProfessors.length} icon="UserCog" color="bg-emerald-100 text-emerald-600" />
        <StatCard label="Total Courses" value={mockCourses.length} icon="BookOpen" color="bg-indigo-100 text-indigo-600" />
        <StatCard label="Total Assignments" value={mockAssignments.length} icon="FileText" color="bg-amber-100 text-amber-600" />
        <StatCard label="Active Notices" value={mockNotices.length} icon="Bell" color="bg-rose-100 text-rose-600" />
        <StatCard label="Upcoming Exams" value={upcomingExams.length} icon="Calendar" color="bg-purple-100 text-purple-600" />
        <StatCard label="Study Materials" value={mockStudyMaterials.length} icon="FolderOpen" color="bg-teal-100 text-teal-600" />
        <StatCard label="Events" value={mockEvents.length} icon="Trophy" color="bg-orange-100 text-orange-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {mockNotices.slice(0, 5).map(notice => (
              <li key={notice.id} className="flex flex-col border-b pb-2 last:border-0">
                <span className="font-medium text-gray-800">{notice.title}</span>
                <span className="text-xs text-gray-500">{formatDate(notice.publishedAt)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-col space-y-2">
            <Link to="/admin/users" className="text-blue-600 hover:underline">Manage Users</Link>
            <Link to="/admin/courses" className="text-blue-600 hover:underline">Manage Courses</Link>
            <Link to="/admin/notices" className="text-blue-600 hover:underline">Manage Notices</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
