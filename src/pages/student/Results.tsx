import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import FilterDropdown from '../../components/common/FilterDropdown';
import DataTable from '../../components/tables/DataTable';
import { mockResults } from '../../data/results';
import { mockCourses } from '../../data/courses';
import { getGradeColor, calcPercentage } from '../../utils/helpers';

export default function Results() {
  const [semesterFilter, setSemesterFilter] = useState('');

  const studentResults = mockResults.filter(r => r.studentId === 'STU001');

  const filteredResults = studentResults.filter(r => {
    return semesterFilter ? r.semester === Number(semesterFilter) : true;
  });

  // Calculate GPA
  const totalGradePoints = filteredResults.reduce((sum, r) => {
    const course = mockCourses.find(c => c.id === r.courseId);
    return sum + r.gradePoint * (course?.creditHours || 3);
  }, 0);
  const totalCredits = filteredResults.reduce((sum, r) => {
    const course = mockCourses.find(c => c.id === r.courseId);
    return sum + (course?.creditHours || 3);
  }, 0);
  const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
  const avgPercentage = filteredResults.length > 0
    ? Math.round(filteredResults.reduce((sum, r) => sum + calcPercentage(r.marksObtained, r.totalMarks), 0) / filteredResults.length)
    : 0;

  const semesters = [...new Set(studentResults.map(r => r.semester))].sort();

  const columns = [
    { key: 'courseCode', label: 'Code' },
    { key: 'courseName', label: 'Course' },
    {
      key: 'marks',
      label: 'Marks',
      render: (r: typeof filteredResults[0]) => `${r.marksObtained} / ${r.totalMarks}`,
    },
    {
      key: 'percentage',
      label: '%',
      render: (r: typeof filteredResults[0]) => `${calcPercentage(r.marksObtained, r.totalMarks)}%`,
    },
    {
      key: 'grade',
      label: 'Grade',
      render: (r: typeof filteredResults[0]) => (
        <span className={`font-semibold ${getGradeColor(r.grade)}`}>{r.grade}</span>
      ),
    },
    { key: 'gradePoint', label: 'GP' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="My Results" subtitle="View your academic performance" />

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <FilterDropdown
          label="Filter by Semester"
          value={semesterFilter}
          onChange={setSemesterFilter}
          options={semesters.map(s => ({ value: String(s), label: `Semester ${s}` }))}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">GPA</p>
          <p className="text-3xl font-bold text-indigo-600">{gpa}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Total Courses</p>
          <p className="text-3xl font-bold text-gray-900">{filteredResults.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <p className="text-sm text-gray-500 mb-1">Average</p>
          <p className="text-3xl font-bold text-emerald-600">{avgPercentage}%</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredResults}
        keyField="id"
        emptyMessage="No results found for the selected semester."
      />
    </div>
  );
}
