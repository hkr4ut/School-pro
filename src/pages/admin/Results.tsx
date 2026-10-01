import { useState, useMemo } from 'react';
import type { Result } from '../../types';
import { getGradeColor } from '../../utils/helpers';
import { mockResults } from '../../data/results';
import { mockCourses } from '../../data/courses';
import { mockStudents } from '../../data/users';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ToastContainer from '../../components/common/Toast';
import Pagination from '../../components/common/Pagination';
import PageHeader from '../../components/layout/PageHeader';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextArea from '../../components/forms/FormTextArea';
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/modals/FormModal';
import { useMockData, useToast } from '../../hooks/useMockData';

export default function Results() {
  const { items: results, addItem, updateItem, deleteItem } = useMockData<Result>(mockResults, 'RES');
  const { toasts, showToast, removeToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Result | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [formData, setFormData] = useState<Partial<Result>>({
    studentId: '', courseId: '', semester: 1, marksObtained: 0, totalMarks: 100, grade: 'A', gradePoint: 4.0, remarks: ''
  });

  const filteredData = useMemo(() => {
    return results.filter(res => {
      const matchesSearch = !searchTerm || ['studentName', 'courseName', 'courseCode'].some(field => 
        String((res as any)[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCourse = courseFilter ? res.courseId === courseFilter : true;
      const matchesSemester = semesterFilter ? res.semester.toString() === semesterFilter : true;
      return matchesSearch && matchesCourse && matchesSemester;
    });
  }, [results, searchTerm, courseFilter, semesterFilter]);
  
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: 'studentName', label: 'Student' },
    { key: 'courseName', label: 'Course' },
    { key: 'courseCode', label: 'Code' },
    { key: 'semester', label: 'Semester' },
    { key: 'marks', label: 'Marks', render: (r: Result) => `${r.marksObtained}/${r.totalMarks}` },
    { key: 'grade', label: 'Grade', render: (r: Result) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(r.grade)}`}>
          {r.grade}
        </span>
      ) 
    },
    { key: 'gradePoint', label: 'Grade Point' },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: (r: Result) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(r)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(r.id); setIsDeleteDialogOpen(true); }}>Delete</Button>
        </div>
      ) 
    }
  ];

  const handleEdit = (item: Result) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ studentId: '', courseId: '', semester: 1, marksObtained: 0, totalMarks: 100, grade: 'A', gradePoint: 4.0, remarks: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = mockCourses.find(c => c.id === formData.courseId);
    const student = mockStudents.find(s => s.id === formData.studentId);
    
    const dataToSave = {
      ...formData,
      courseName: course?.name,
      courseCode: course?.code,
      studentName: student?.name,
      publishedAt: editingItem ? editingItem.publishedAt : new Date().toISOString()
    } as Result;

    if (editingItem) {
      updateItem(editingItem.id, dataToSave);
      showToast('success', 'Result updated successfully');
    } else {
      addItem(dataToSave);
      showToast('success', 'Result added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Result deleted successfully');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Result Management" 
        actions={<Button onClick={handleOpenAdd}>Add Result</Button>} 
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search results..." />
        <FilterDropdown 
          label="Filter by Course" 
          options={[{label: 'All Courses', value: ''}, ...mockCourses.map(c => ({label: c.name, value: c.id}))]}
          value={courseFilter}
          onChange={setCourseFilter}
        />
        <FilterDropdown 
          label="Filter by Semester" 
          options={[{label: 'All Semesters', value: ''}, ...Array.from({length: 8}, (_, i) => ({label: `Semester ${i+1}`, value: `${i+1}`}))]}
          value={semesterFilter}
          onChange={setSemesterFilter}
        />
      </div>
      
      <DataTable 
        columns={columns as any} 
        data={paginatedData} 
        keyField="id" 
        emptyMessage="No results found." 
      />
      
      {filteredData.length > itemsPerPage && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={Math.ceil(filteredData.length / itemsPerPage)} 
          onPageChange={setCurrentPage} 
        />
      )}
      
      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Result' : 'Add Result'}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <FormSelect 
            label="Student" 
            options={mockStudents.map(s => ({label: s.name, value: s.id}))}
            value={formData.studentId || ''}
            onChange={(e) => setFormData({...formData, studentId: e.target.value})}
            placeholder="Select a student"
            required
          />
          <FormSelect 
            label="Course" 
            options={mockCourses.map(c => ({label: c.name, value: c.id}))}
            value={formData.courseId || ''}
            onChange={(e) => setFormData({...formData, courseId: e.target.value})}
            placeholder="Select a course"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Semester" type="number" value={formData.semester || ''} onChange={(e) => setFormData({...formData, semester: Number(e.target.value)})} required />
            <FormInput label="Marks Obtained" type="number" value={formData.marksObtained || ''} onChange={(e) => setFormData({...formData, marksObtained: Number(e.target.value)})} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Total Marks" type="number" value={formData.totalMarks || ''} onChange={(e) => setFormData({...formData, totalMarks: Number(e.target.value)})} required />
            <FormInput label="Grade" value={formData.grade || ''} onChange={(e) => setFormData({...formData, grade: e.target.value})} required />
          </div>
          <FormInput label="Grade Point" type="number" step="0.1" value={formData.gradePoint || ''} onChange={(e) => setFormData({...formData, gradePoint: Number(e.target.value)})} required />
          <FormTextArea label="Remarks" value={formData.remarks || ''} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
        </div>
      </FormModal>
      
      <ConfirmDialog 
        isOpen={isDeleteDialogOpen} 
        title="Delete Result" 
        message="Are you sure you want to delete this result? This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
