import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import ExamCard from '../../components/cards/ExamCard';
import EmptyState from '../../components/common/EmptyState';
import { mockExams } from '../../data/exams';
import { mockCourses } from '../../data/courses';

export default function Exams() {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const studentCourseIds = mockCourses
    .filter(c => c.enrolledStudents?.includes('STU001'))
    .map(c => c.id);

  const exams = mockExams.filter(e => studentCourseIds.includes(e.courseId));

  const filteredExams = exams.filter(e => {
    const matchesSearch = e.courseName.toLowerCase().includes(search.toLowerCase()) ||
      e.courseCode.toLowerCase().includes(search.toLowerCase());
    const matchesSemester = semesterFilter ? e.semester === Number(semesterFilter) : true;
    const matchesType = typeFilter ? e.examType === typeFilter : true;
    return matchesSearch && matchesSemester && matchesType;
  });

  const upcomingExams = filteredExams.filter(e => e.status === 'upcoming');
  const pastExams = filteredExams.filter(e => e.status !== 'upcoming');

  return (
    <div className="space-y-6">
      <PageHeader title="Exam Schedule" subtitle={`${upcomingExams.length} upcoming exams`} />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search exams..." className="flex-1" />
        <FilterDropdown
          label="Filter by Semester"
          value={semesterFilter}
          onChange={setSemesterFilter}
          options={[
            { value: '4', label: 'Semester 4' },
            { value: '6', label: 'Semester 6' },
          ]}
        />
        <FilterDropdown
          label="Filter by Type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: 'midterm', label: 'Midterm' },
            { value: 'final', label: 'Final' },
            { value: 'internal', label: 'Internal' },
            { value: 'practical', label: 'Practical' },
          ]}
        />
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams</h2>
          {upcomingExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingExams.map(e => <ExamCard key={e.id} exam={e} />)}
            </div>
          ) : (
            <EmptyState title="No upcoming exams" description="No upcoming exams scheduled for your courses." />
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Past Exams</h2>
          {pastExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastExams.map(e => <ExamCard key={e.id} exam={e} />)}
            </div>
          ) : (
            <EmptyState title="No past exams" description="No past exams found for your courses." />
          )}
        </section>
      </div>
    </div>
  );
}
