import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import ErrorState from '../../components/common/ErrorState';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import FormInput from '../../components/forms/FormInput';
import FormTextArea from '../../components/forms/FormTextArea';
import ToastContainer from '../../components/common/Toast';
import { mockSubmissions } from '../../data/submissions';
import { useToast } from '../../hooks/useMockData';
import { formatDate } from '../../utils/helpers';

export default function SubmissionReview() {
  const { id } = useParams<{ id: string }>();
  const submission = mockSubmissions.find(s => s.id === id);
  const { toasts, showToast, removeToast } = useToast();
  const [localStatus, setLocalStatus] = useState(submission?.status || 'submitted');
  const [grade, setGrade] = useState(submission?.grade != null ? String(submission.grade) : '');
  const [feedback, setFeedback] = useState(submission?.feedback || '');

  if (!submission) return <ErrorState title="Submission not found" message="This submission does not exist." />;

  const handleGrade = () => {
    if (!grade) { showToast('error', 'Please enter a grade.'); return; }
    setLocalStatus('graded');
    showToast('success', 'Submission graded successfully!');
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="Review Submission" breadcrumbs={[{ label: 'Submissions', path: '/professor/submissions' }, { label: 'Review' }]} />

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium text-gray-700">Student:</span> <span className="text-gray-900">{submission.studentName}</span></div>
          <div><span className="font-medium text-gray-700">Assignment:</span> <span className="text-gray-900">{submission.assignmentTitle}</span></div>
          <div><span className="font-medium text-gray-700">Course:</span> <span className="text-gray-900">{submission.courseName}</span></div>
          <div><span className="font-medium text-gray-700">Submitted:</span> <span className="text-gray-900">{formatDate(submission.submittedAt)}</span></div>
          <div><span className="font-medium text-gray-700">File:</span> <span className="text-gray-900">{submission.fileName || 'No file'}</span></div>
          <div><span className="font-medium text-gray-700">Status:</span> <StatusBadge status={localStatus} /></div>
        </div>
        {submission.notes && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-1">Student Notes:</p>
            <p className="text-sm text-gray-600">{submission.notes}</p>
          </div>
        )}
      </div>

      {localStatus !== 'graded' ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Submission</h3>
          <div className="space-y-4">
            <FormInput label="Grade" type="number" value={grade} onChange={e => setGrade(e.target.value)} placeholder="Enter marks" required />
            <FormTextArea label="Feedback" value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Provide feedback to the student..." />
            <Button onClick={handleGrade}>Submit Grade</Button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">Graded</h3>
          <p className="text-sm text-emerald-700">Grade: <span className="font-bold">{grade}</span></p>
          {feedback && <p className="text-sm text-emerald-700 mt-1">Feedback: {feedback}</p>}
        </div>
      )}

      <Link to="/professor/submissions" className="inline-flex text-sm text-indigo-600 hover:underline">← Back to Submissions</Link>
    </div>
  );
}
