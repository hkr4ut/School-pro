import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/cards/StatCard';
import PageHeader from '../../components/layout/PageHeader';
import ExamCard from '../../components/cards/ExamCard';
import { mockCourses } from '../../data/courses';
import { mockAssignments } from '../../data/assignments';
import { mockSubmissions } from '../../data/submissions';
import { mockNotices } from '../../data/notices';
import { mockExams } from '../../data/exams';
import { mockStudyMaterials } from '../../data/studyMaterials';

export default function Dashboard() {
  const { user } = useAuth();

  const myCourses = mockCourses.filter(c => c.professorId === 'PROF001');
  const courseIds = myCourses.map(c => c.id);
  const myAssignments = mockAssignments.filter(a => courseIds.includes(a.courseId));
  const pendingSubs = mockSubmissions.filter(s => courseIds.includes(s.courseId) && (s.status === 'submitted' || s.status === 'late'));
  const myNotices = mockNotices.filter(n => n.publishedBy === 'PROF001');
  const upcomingExams = mockExams.filter(e => courseIds.includes(e.courseId) && e.status === 'upcoming');
  const myMaterials = mockStudyMaterials.filter(m => courseIds.includes(m.courseId));

  return (
    <div className="space-y-6">
      <PageHeader title={`Welcome, ${user?.name || 'Professor'}!`} subtitle="Professor Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="My Courses" value={myCourses.length} icon="BookOpen" color="bg-indigo-100 text-indigo-600" />
        <StatCard label="Total Assignments" value={myAssignments.length} icon="FileText" color="bg-amber-100 text-amber-600" />
        <StatCard label="Pending Submissions" value={pendingSubs.length} icon="ClipboardCheck" color="bg-rose-100 text-rose-600" />
        <StatCard label="Published Notices" value={myNotices.length} icon="Bell" color="bg-sky-100 text-sky-600" />
        <StatCard label="Upcoming Exams" value={upcomingExams.length} icon="Calendar" color="bg-emerald-100 text-emerald-600" />
        <StatCard label="Study Materials" value={myMaterials.length} icon="FolderOpen" color="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Submissions</h2>
            <Link to="/professor/submissions" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {pendingSubs.slice(0, 3).map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.studentName}</p>
                  <p className="text-xs text-gray-500">{s.assignmentTitle} • {s.courseName}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${s.status === 'late' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                  {s.status}
                </span>
              </div>
            ))}
            {pendingSubs.length === 0 && <p className="text-sm text-gray-500">No pending submissions.</p>}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Exams</h2>
            <Link to="/professor/exams" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingExams.slice(0, 3).map(e => <ExamCard key={e.id} exam={e} />)}
            {upcomingExams.length === 0 && <p className="text-sm text-gray-500">No upcoming exams.</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/professor/assignments" className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100">Create Assignment</Link>
          <Link to="/professor/submissions" className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg text-sm font-medium hover:bg-amber-100">Review Submissions</Link>
          <Link to="/professor/notices" className="px-4 py-2 bg-sky-50 text-sky-600 rounded-lg text-sm font-medium hover:bg-sky-100">Post Notice</Link>
          <Link to="/professor/study-materials" className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100">Upload Material</Link>
        </div>
      </div>
    </div>
  );
}
