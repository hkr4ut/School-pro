import { useParams, Link } from 'react-router-dom';
import { Calendar, Building, User } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';
import ErrorState from '../../components/common/ErrorState';
import { mockNotices } from '../../data/notices';
import { formatDate } from '../../utils/helpers';

export default function NoticeDetail() {
  const { id } = useParams<{ id: string }>();
  const notice = mockNotices.find(n => n.id === id);

  if (!notice) {
    return <ErrorState title="Notice not found" message="The notice you are looking for does not exist." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={notice.title}
        breadcrumbs={[
          { label: 'Notices', path: '/student/notices' },
          { label: notice.title },
        ]}
      />

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <StatusBadge status={notice.urgency} />
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Building className="h-4 w-4" />
            {notice.department}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <User className="h-4 w-4" />
            {notice.publisherName}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            {formatDate(notice.publishedAt)}
          </span>
        </div>

        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
          {notice.content}
        </div>
      </div>

      <Link to="/student/notices" className="inline-flex items-center text-sm text-indigo-600 hover:underline">
        ← Back to Notices
      </Link>
    </div>
  );
}
