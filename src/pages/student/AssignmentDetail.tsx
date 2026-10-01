import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, BookOpen, User, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import ErrorState from '../../components/common/ErrorState';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import FileInput from '../../components/forms/FileInput';
import FormTextArea from '../../components/forms/FormTextArea';
import ToastContainer from '../../components/common/Toast';
import { mockAssignments } from '../../data/assignments';
import { mockSubmissions } from '../../data/submissions';
import { formatDate, getPriorityColor } from '../../utils/helpers';
import { useToast } from '../../hooks/useMockData';

export default function AssignmentDetail() {
  const { id } = useParams<{ id: string }>();
  const assignment = mockAssignments.find(a => a.id === id);
  const { toasts, showToast, removeToast } = useToast();

  const existingSubmission = mockSubmissions.find(s => s.assignmentId === id && s.studentId === 'STU001');
  const [localSubmission, setLocalSubmission] = useState(existingSubmission || null);
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = useCallback(() => {
    if (!assignment) return;
    setLocalSubmission({
      id: `SUB_${Date.now()}`,
      assignmentId: assignment.id,
      assignmentTitle: assignment.title,
      studentId: 'STU001',
      studentName: 'Aarav Sharma',
      courseId: assignment.courseId,
      courseName: assignment.courseName,
      submittedAt: new Date().toISOString(),
      fileName: file?.name || 'submission.pdf',
      notes: notes,
      status: 'submitted',
    });
    showToast('success', 'Assignment submitted successfully!');
  }, [assignment, file, notes, showToast]);

  if (!assignment) {
    return <ErrorState title="Assignment Not Found" message="The requested assignment does not exist." />;
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader
        title={assignment.title}
        breadcrumbs={[
          { label: 'Assignments', path: '/student/assignments' },
          { label: assignment.title },
        ]}
      />

      {/* Assignment Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{assignment.title}</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{assignment.courseName}</span>
              <span className="flex items-center gap-1"><User className="h-4 w-4" />{assignment.professorName}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Due: {formatDate(assignment.dueDate)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
              {assignment.priority} priority
            </span>
            <StatusBadge status={localSubmission ? localSubmission.status : 'pending'} />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Max Marks: <span className="font-semibold">{assignment.maxMarks}</span></p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">{assignment.instructions}</p>
        </div>
      </div>

      {/* Submission Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission</h3>

        {localSubmission ? (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-sm"><span className="font-medium text-gray-700">Submitted:</span> {formatDate(localSubmission.submittedAt)}</p>
            <p className="text-sm"><span className="font-medium text-gray-700">File:</span> {localSubmission.fileName}</p>
            <p className="text-sm"><span className="font-medium text-gray-700">Status:</span> <StatusBadge status={localSubmission.status} /></p>
            {localSubmission.notes && (
              <p className="text-sm"><span className="font-medium text-gray-700">Notes:</span> {localSubmission.notes}</p>
            )}
            {localSubmission.status === 'graded' && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm"><span className="font-medium text-gray-700">Grade:</span> <span className="text-lg font-bold text-indigo-600">{localSubmission.grade}/{localSubmission.maxMarks || assignment.maxMarks}</span></p>
                {localSubmission.feedback && (
                  <p className="text-sm mt-1"><span className="font-medium text-gray-700">Feedback:</span> {localSubmission.feedback}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-sm text-amber-700">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>You have not submitted this assignment yet. Upload your file and submit below.</span>
            </div>
            <FileInput label="Attach File" accept=".pdf,.zip,.doc,.docx,.ppt,.pptx" onChange={setFile} required />
            <FormTextArea label="Submission Notes (Optional)" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add any notes for the professor..." />
            <Button onClick={handleSubmit} disabled={!file}>Submit Assignment</Button>
          </div>
        )}
      </div>

      <Link to="/student/assignments" className="inline-flex items-center text-sm text-indigo-600 hover:underline">
        ← Back to Assignments
      </Link>
    </div>
  );
}
