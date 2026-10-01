import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import StatCard from '../../components/cards/StatCard';
import NoticeCard from '../../components/cards/NoticeCard';
import AssignmentCard from '../../components/cards/AssignmentCard';
import ExamCard from '../../components/cards/ExamCard';
import EventCard from '../../components/cards/EventCard';
import PageHeader from '../../components/layout/PageHeader';
import { mockCourses } from '../../data/courses';
import { mockAssignments } from '../../data/assignments';
import { mockNotices } from '../../data/notices';
import { mockExams } from '../../data/exams';
import { mockEvents } from '../../data/events';
import { mockSubmissions } from '../../data/submissions';

export default function Dashboard() {
  const { user } = useAuth();
  const [dashEvents, setDashEvents] = useState(mockEvents);

  const studentCourses = mockCourses.filter(c => c.enrolledStudents?.includes('STU001'));
  const courseIds = studentCourses.map(c => c.id);
  const pendingAssignments = mockAssignments.filter(
    a => courseIds.includes(a.courseId) && !mockSubmissions.find(s => s.assignmentId === a.id && s.studentId === 'STU001')
  );
  const unreadNotices = mockNotices.filter(n => !n.isRead);
  const upcomingExams = mockExams.filter(e => courseIds.includes(e.courseId) && e.status === 'upcoming');
  const upcomingEvents = dashEvents.filter(e => e.status === 'upcoming');

  const handleToggleRegister = (eventId: string) => {
    setDashEvents(prev => prev.map(e => {
      if (e.id !== eventId) return e;
      const isRegistered = e.registeredStudents.includes('STU001');
      return {
        ...e,
        registeredStudents: isRegistered
          ? e.registeredStudents.filter(id => id !== 'STU001')
          : [...e.registeredStudents, 'STU001'],
      };
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title={`Welcome back, ${user?.name || 'Student'}!`} subtitle="Here's what's happening today." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Enrolled Courses" value={studentCourses.length} icon="BookOpen" color="bg-blue-100 text-blue-600" />
        <StatCard label="Pending Assignments" value={pendingAssignments.length} icon="FileText" color="bg-amber-100 text-amber-600" />
        <StatCard label="Unread Notices" value={unreadNotices.length} icon="Bell" color="bg-rose-100 text-rose-600" />
        <StatCard label="Upcoming Exams" value={upcomingExams.length} icon="Calendar" color="bg-emerald-100 text-emerald-600" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/student/courses" className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">View Courses</Link>
          <Link to="/student/assignments" className="px-4 py-2 bg-amber-50 text-amber-600 rounded-lg text-sm font-medium hover:bg-amber-100 transition-colors">Submit Assignment</Link>
          <Link to="/student/results" className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors">Check Results</Link>
          <Link to="/student/translator" className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">Translator</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Notices</h2>
            <Link to="/student/notices" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {mockNotices.slice(0, 3).map(n => <NoticeCard key={n.id} notice={n} linkPrefix="/student/notices" />)}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Assignments</h2>
            <Link to="/student/assignments" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {pendingAssignments.slice(0, 3).map(a => <AssignmentCard key={a.id} assignment={a} linkPrefix="/student/assignments" />)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Exams</h2>
            <Link to="/student/exams" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingExams.slice(0, 3).map(e => <ExamCard key={e.id} exam={e} />)}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
            <Link to="/student/events" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.slice(0, 2).map(e => (
              <EventCard
                key={e.id}
                event={e}
                isRegistered={e.registeredStudents.includes('STU001')}
                onToggleRegister={handleToggleRegister}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
