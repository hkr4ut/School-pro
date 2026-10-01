import { Link } from 'react-router-dom';
import { Bell, Calendar, Building } from 'lucide-react';
import type { Notice } from '../../types';
import { formatDate, getUrgencyColor, truncateText } from '../../utils/helpers';

interface NoticeCardProps {
  notice: Notice;
  linkPrefix: string;
  onMarkRead?: (id: string) => void;
}

export default function NoticeCard({ notice, linkPrefix, onMarkRead }: NoticeCardProps) {
  return (
    <Link
      to={`${linkPrefix}/${notice.id}`}
      onClick={() => onMarkRead?.(notice.id)}
      className={`block bg-white rounded-xl border p-5 hover:shadow-md transition-shadow ${
        notice.isRead ? 'border-gray-200' : 'border-indigo-200 bg-indigo-50/30'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${notice.isRead ? 'bg-gray-100' : 'bg-indigo-100'}`}>
            <Bell className={`h-5 w-5 ${notice.isRead ? 'text-gray-500' : 'text-indigo-600'}`} />
          </div>
          {!notice.isRead && (
            <span className="h-2 w-2 bg-indigo-600 rounded-full" />
          )}
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(notice.urgency)}`}>
          {notice.urgency}
        </span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{notice.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{truncateText(notice.content, 120)}</p>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <Building className="h-3 w-3" />
          <span>{notice.department}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(notice.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
