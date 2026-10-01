import { Link } from 'react-router-dom';
import { FileText, Calendar, BookOpen } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import type { Assignment } from '../../types';
import { formatDate, getPriorityColor } from '../../utils/helpers';

interface AssignmentCardProps {
  assignment: Assignment;
  linkPrefix: string;
  submissionStatus?: string;
}

export default function AssignmentCard({ assignment, linkPrefix, submissionStatus }: AssignmentCardProps) {
  return (
    <Link
      to={`${linkPrefix}/${assignment.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow hover:border-indigo-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-amber-100 rounded-lg">
          <FileText className="h-5 w-5 text-amber-600" />
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
            {assignment.priority}
          </span>
          {submissionStatus && <StatusBadge status={submissionStatus} />}
        </div>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{assignment.title}</h3>
      <div className="space-y-1.5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>{assignment.courseName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Due: {formatDate(assignment.dueDate)}</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
        Max Marks: {assignment.maxMarks}
      </div>
    </Link>
  );
}
