import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import MaterialCard from '../../components/cards/MaterialCard';
import EmptyState from '../../components/common/EmptyState';
import { mockStudyMaterials } from '../../data/studyMaterials';
import { mockCourses } from '../../data/courses';

export default function StudyMaterials() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const studentCourseIds = mockCourses
    .filter(c => c.enrolledStudents?.includes('STU001'))
    .map(c => c.id);

  const materials = mockStudyMaterials.filter(m => studentCourseIds.includes(m.courseId));

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = courseFilter ? m.courseId === courseFilter : true;
    const matchesType = typeFilter ? m.fileType === typeFilter : true;
    return matchesSearch && matchesCourse && matchesType;
  });

  const courseOptions = [...new Set(materials.map(m => m.courseId))].map(id => {
    const course = mockCourses.find(c => c.id === id);
    return { value: id, label: course?.name || id };
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Study Materials" subtitle={`${materials.length} materials available`} />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search materials..." className="flex-1" />
        <FilterDropdown
          label="Filter by Course"
          value={courseFilter}
          onChange={setCourseFilter}
          options={courseOptions}
        />
        <FilterDropdown
          label="Filter by Type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: 'pdf', label: 'PDF' },
            { value: 'doc', label: 'Document' },
            { value: 'ppt', label: 'Presentation' },
            { value: 'video', label: 'Video' },
            { value: 'link', label: 'Link' },
            { value: 'notes', label: 'Notes' },
          ]}
        />
      </div>

      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map(m => <MaterialCard key={m.id} material={m} />)}
        </div>
      ) : (
        <EmptyState title="No study materials found" description="Try adjusting your search or filters." />
      )}
    </div>
  );
}
