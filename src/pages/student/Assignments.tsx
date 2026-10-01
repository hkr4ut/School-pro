import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import AssignmentCard from '../../components/cards/AssignmentCard';
import EmptyState from '../../components/common/EmptyState';
import { mockAssignments } from '../../data/assignments';
import { mockSubmissions } from '../../data/submissions';
import { mockCourses } from '../../data/courses';

export default function Assignments() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const studentCourseIds = mockCourses.filter(c => c.enrolledStudents?.includes('STU001')).map(c => c.id);
  const assignments = mockAssignments.filter(a => studentCourseIds.includes(a.courseId));

  const filteredAssignments = assignments.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.courseName.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = courseFilter ? a.courseId === courseFilter : true;

    const submission = mockSubmissions.find(s => s.assignmentId === a.id && s.studentId === 'STU001');
    const status = submission ? submission.status : 'pending';
    const matchesStatus = statusFilter ? status === statusFilter : true;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const courseOptions = studentCourseIds.map(id => ({
    value: id,
    label: mockCourses.find(c => c.id === id)?.name || id,
  }));

  return (
    <div className="space-y-6">
      <PageHeader title="Assignments" subtitle={`${assignments.length} total assignments`} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search assignments..." className="flex-1" />
        <FilterDropdown label="Filter by Course" value={courseFilter} onChange={setCourseFilter} options={courseOptions} />
        <FilterDropdown
          label="Filter by Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'submitted', label: 'Submitted' },
            { value: 'late', label: 'Late' },
            { value: 'graded', label: 'Graded' },
          ]}
        />
      </div>

      {filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAssignments.map(a => {
            const submission = mockSubmissions.find(s => s.assignmentId === a.id && s.studentId === 'STU001');
            return (
              <AssignmentCard key={a.id} assignment={a} submissionStatus={submission?.status} linkPrefix="/student/assignments" />
            );
          })}
        </div>
      ) : (
        <EmptyState title="No assignments found" description="Try adjusting your search or filters." />
      )}
    </div>
  );
}
