import { Download, FileText, Film, Link as LinkIcon, StickyNote, Presentation, FileIcon } from 'lucide-react';
import Badge from '../common/Badge';
import type { StudyMaterial } from '../../types';
import { formatDate } from '../../utils/helpers';

interface MaterialCardProps {
  material: StudyMaterial;
}

const fileIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="h-5 w-5 text-rose-500" />,
  doc: <FileIcon className="h-5 w-5 text-blue-500" />,
  ppt: <Presentation className="h-5 w-5 text-orange-500" />,
  video: <Film className="h-5 w-5 text-purple-500" />,
  link: <LinkIcon className="h-5 w-5 text-emerald-500" />,
  notes: <StickyNote className="h-5 w-5 text-gray-500" />,
};

export default function MaterialCard({ material }: MaterialCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          {fileIcons[material.fileType] || <FileText className="h-5 w-5 text-gray-500" />}
        </div>
        <Badge>{material.fileType.toUpperCase()}</Badge>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{material.title}</h3>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{material.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <span>{material.courseName}</span>
        <span>{formatDate(material.uploadedAt)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{material.fileSize}</span>
        <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>
    </div>
  );
}
