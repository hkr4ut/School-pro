import { Calendar, Clock, MapPin, BookOpen } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import Badge from '../common/Badge';
import type { Exam } from '../../types';
import { formatDate } from '../../utils/helpers';

interface ExamCardProps {
  exam: Exam;
}

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <Badge variant="info">{exam.examType.charAt(0).toUpperCase() + exam.examType.slice(1)}</Badge>
        <StatusBadge status={exam.status} />
      </div>
      <h3 className="font-semibold text-gray-900 mb-3">{exam.courseName}</h3>
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>{exam.courseCode}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(exam.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{exam.startTime} — {exam.endTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{exam.room}</span>
        </div>
      </div>
    </div>
  );
}
