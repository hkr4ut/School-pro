import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import CourseCard from '../../components/cards/CourseCard';
import EmptyState from '../../components/common/EmptyState';
import { mockCourses } from '../../data/courses';

export default function Courses() {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  const studentCourses = mockCourses.filter(c => c.enrolledStudents?.includes('STU001'));

  const filteredCourses = studentCourses.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchesSemester = semesterFilter ? c.semester === Number(semesterFilter) : true;
    return matchesSearch && matchesSemester;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="My Courses" subtitle={`${studentCourses.length} enrolled courses`} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." className="flex-1" />
        <FilterDropdown
          label="Filter by Semester"
          value={semesterFilter}
          onChange={setSemesterFilter}
          options={[
            { value: '4', label: 'Semester 4' },
            { value: '6', label: 'Semester 6' },
          ]}
        />
      </div>

      {filteredCourses.length === 0 ? (
        <EmptyState title="No courses found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} linkPrefix="/student/courses" />
          ))}
        </div>
      )}
    </div>
  );
}
