import { useParams, Link } from 'react-router-dom';
import { BookOpen, User, Clock, Calendar, MapPin, Users } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Badge from '../../components/common/Badge';
import StatusBadge from '../../components/common/StatusBadge';
import ErrorState from '../../components/common/ErrorState';
import AssignmentCard from '../../components/cards/AssignmentCard';
import MaterialCard from '../../components/cards/MaterialCard';
import { mockCourses } from '../../data/courses';
import { mockAssignments } from '../../data/assignments';
import { mockStudyMaterials } from '../../data/studyMaterials';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const course = mockCourses.find(c => c.id === id);

  if (!course) {
    return <ErrorState title="Course not found" message="The course you are looking for does not exist." />;
  }

  const courseAssignments = mockAssignments.filter(a => a.courseId === course.id);
  const courseMaterials = mockStudyMaterials.filter(m => m.courseId === course.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={course.name}
        breadcrumbs={[
          { label: 'Courses', path: '/student/courses' },
          { label: course.name },
        ]}
      />

      {/* Course Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="info">{course.code}</Badge>
          <StatusBadge status={course.status} />
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <span>Professor: {course.professorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{course.creditHours} Credit Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>Semester {course.semester}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{course.department}</span>
          </div>
          {course.schedule && (
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-gray-400" />
              <span>Schedule: {course.schedule}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{course.enrolledStudents.length} students enrolled</span>
          </div>
        </div>
      </div>

      {/* Assignments */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assignments ({courseAssignments.length})</h2>
        {courseAssignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseAssignments.map(a => (
              <AssignmentCard key={a.id} assignment={a} linkPrefix="/student/assignments" />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No assignments for this course.</p>
        )}
      </div>

      {/* Study Materials */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Study Materials ({courseMaterials.length})</h2>
        {courseMaterials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseMaterials.map(m => <MaterialCard key={m.id} material={m} />)}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No study materials for this course.</p>
        )}
      </div>

      <Link to="/student/courses" className="inline-flex items-center text-sm text-indigo-600 hover:underline">
        ← Back to Courses
      </Link>
    </div>
  );
}
