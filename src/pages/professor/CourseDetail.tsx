import { useParams, Link } from 'react-router-dom';
import { User, Clock, Calendar, Users } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Badge from '../../components/common/Badge';
import StatusBadge from '../../components/common/StatusBadge';
import ErrorState from '../../components/common/ErrorState';
import AssignmentCard from '../../components/cards/AssignmentCard';
import MaterialCard from '../../components/cards/MaterialCard';
import { mockCourses } from '../../data/courses';
import { mockAssignments } from '../../data/assignments';
import { mockStudyMaterials } from '../../data/studyMaterials';
import { mockStudents } from '../../data/users';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const course = mockCourses.find(c => c.id === id);

  if (!course) return <ErrorState title="Course not found" message="The course does not exist." />;

  const assignments = mockAssignments.filter(a => a.courseId === course.id);
  const materials = mockStudyMaterials.filter(m => m.courseId === course.id);
  const students = mockStudents.filter(s => course.enrolledStudents.includes(s.id));

  return (
    <div className="space-y-6">
      <PageHeader title={course.name} breadcrumbs={[{ label: 'Courses', path: '/professor/courses' }, { label: course.name }]} />

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="info">{course.code}</Badge>
          <StatusBadge status={course.status} />
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2"><User className="h-4 w-4 text-gray-400" />{course.professorName}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-gray-400" />{course.creditHours} Credit Hours</div>
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-400" />Semester {course.semester}</div>
          <div className="flex items-center gap-2"><Users className="h-4 w-4 text-gray-400" />{students.length} students</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Students ({students.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {students.map(s => (
            <div key={s.id} className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-medium">
                {s.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{s.name}</p>
                <p className="text-xs text-gray-500">{s.studentId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assignments ({assignments.length})</h2>
        {assignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map(a => <AssignmentCard key={a.id} assignment={a} linkPrefix="/professor/assignments" />)}
          </div>
        ) : <p className="text-sm text-gray-500">No assignments yet.</p>}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Study Materials ({materials.length})</h2>
        {materials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map(m => <MaterialCard key={m.id} material={m} />)}
          </div>
        ) : <p className="text-sm text-gray-500">No materials uploaded yet.</p>}
      </div>

      <Link to="/professor/courses" className="inline-flex text-sm text-indigo-600 hover:underline">← Back to Courses</Link>
    </div>
  );
}
