import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/tables/DataTable';
import { mockSubmissions } from '../../data/submissions';
import { mockCourses } from '../../data/courses';
import { formatDate } from '../../utils/helpers';
import type { Submission } from '../../types';

export default function Submissions() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const profCourseIds = mockCourses.filter(c => c.professorId === 'PROF001').map(c => c.id);
  const subs = mockSubmissions.filter(s => profCourseIds.includes(s.courseId));

  const filtered = subs.filter(s => {
    const matchSearch = s.studentName.toLowerCase().includes(search.toLowerCase()) || s.assignmentTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? s.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const columns = [
    { key: 'studentName' as const, label: 'Student' },
    { key: 'assignmentTitle' as const, label: 'Assignment' },
    { key: 'courseName' as const, label: 'Course' },
    { key: 'submittedAt' as const, label: 'Submitted', render: (s: Submission) => formatDate(s.submittedAt) },
    { key: 'status' as const, label: 'Status', render: (s: Submission) => <StatusBadge status={s.status} /> },
    { key: 'grade' as const, label: 'Grade', render: (s: Submission) => s.grade != null ? `${s.grade}` : '-' },
    { key: 'id' as const, label: 'Actions', render: (s: Submission) => (
      <button onClick={() => navigate(`/professor/submissions/${s.id}`)} className="text-indigo-600 hover:underline text-sm">Review</button>
    )},
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Student Submissions" subtitle={`${filtered.length} submissions`} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by student or assignment..." className="flex-1" />
        <FilterDropdown label="Filter by Status" value={statusFilter} onChange={setStatusFilter} options={[{ value: 'submitted', label: 'Submitted' }, { value: 'late', label: 'Late' }, { value: 'graded', label: 'Graded' }]} />
      </div>
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No submissions found." />
    </div>
  );
}
