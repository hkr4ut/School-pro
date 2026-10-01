import { Link } from 'react-router-dom';
import { BookOpen, User, Clock } from 'lucide-react';
import Badge from '../common/Badge';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  linkPrefix: string;
}

export default function CourseCard({ course, linkPrefix }: CourseCardProps) {
  return (
    <Link
      to={`${linkPrefix}/${course.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow hover:border-indigo-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <BookOpen className="h-5 w-5 text-indigo-600" />
        </div>
        <Badge variant="info">{course.code}</Badge>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{course.name}</h3>
      <div className="space-y-1.5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{course.professorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{course.creditHours} Credit Hours • Semester {course.semester}</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>{course.enrolledStudents.length} students enrolled</span>
        <Badge variant={course.status === 'active' ? 'success' : 'default'}>{course.status}</Badge>
      </div>
    </Link>
  );
}
