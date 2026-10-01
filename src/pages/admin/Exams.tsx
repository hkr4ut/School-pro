import { useState, useMemo } from 'react';
import type { Exam } from '../../types';
import { formatDate } from '../../utils/helpers';
import { mockExams } from '../../data/exams';
import { mockCourses } from '../../data/courses';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import StatusBadge from '../../components/common/StatusBadge';
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

export default function Exams() {
  const { items: exams, addItem, updateItem, deleteItem } = useMockData<Exam>(mockExams, 'EXM');
  const { toasts, showToast, removeToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [examTypeFilter, setExamTypeFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Exam | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [formData, setFormData] = useState<Partial<Exam>>({
    courseId: '', examType: 'midterm', date: '', startTime: '', endTime: '', room: '', semester: 1, instructions: '', status: 'upcoming'
  });

  const filteredData = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = !searchTerm || ['courseName', 'courseCode', 'room'].some(field => 
        String((exam as any)[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesType = examTypeFilter ? exam.examType === examTypeFilter : true;
      const matchesSemester = semesterFilter ? exam.semester.toString() === semesterFilter : true;
      return matchesSearch && matchesType && matchesSemester;
    });
  }, [exams, searchTerm, examTypeFilter, semesterFilter]);
  
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: 'courseName', label: 'Course' },
    { key: 'courseCode', label: 'Code' },
    { key: 'examType', label: 'Exam Type', render: (e: Exam) => <StatusBadge status={e.examType} /> },
    { key: 'date', label: 'Date', render: (e: Exam) => formatDate(e.date) },
    { key: 'time', label: 'Time', render: (e: Exam) => `${e.startTime} - ${e.endTime}` },
    { key: 'room', label: 'Room' },
    { key: 'semester', label: 'Semester' },
    { key: 'status', label: 'Status', render: (e: Exam) => <StatusBadge status={e.status} /> },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: (e: Exam) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(e)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(e.id); setIsDeleteDialogOpen(true); }}>Delete</Button>
        </div>
      ) 
    }
  ];

  const handleEdit = (item: Exam) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ courseId: '', examType: 'midterm', date: '', startTime: '', endTime: '', room: '', semester: 1, instructions: '', status: 'upcoming' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = mockCourses.find(c => c.id === formData.courseId);
    const dataToSave = {
      ...formData,
      courseName: course?.name,
      courseCode: course?.code,
    } as Exam;

    if (editingItem) {
      updateItem(editingItem.id, dataToSave);
      showToast('success', 'Exam updated successfully');
    } else {
      addItem(dataToSave);
      showToast('success', 'Exam added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Exam deleted successfully');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Exam Management" 
        actions={<Button onClick={handleOpenAdd}>Add Exam</Button>} 
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search exams..." />
        <FilterDropdown 
          label="Filter by Type" 
          options={[{label: 'All Types', value: ''}, {label: 'Midterm', value: 'midterm'}, {label: 'Final', value: 'final'}, {label: 'Quiz', value: 'quiz'}, {label: 'Practical', value: 'practical'}]}
          value={examTypeFilter}
          onChange={setExamTypeFilter}
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
        emptyMessage="No exams found." 
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
        title={editingItem ? 'Edit Exam' : 'Add Exam'}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <FormSelect 
            label="Course" 
            options={mockCourses.map(c => ({label: c.name, value: c.id}))}
            value={formData.courseId || ''}
            onChange={(e) => setFormData({...formData, courseId: e.target.value})}
            placeholder="Select a course"
            required
          />
          <FormSelect 
            label="Exam Type" 
            options={[{label: 'Midterm', value: 'midterm'}, {label: 'Final', value: 'final'}, {label: 'Quiz', value: 'quiz'}, {label: 'Practical', value: 'practical'}]}
            value={formData.examType || 'midterm'}
            onChange={(e) => setFormData({...formData, examType: e.target.value as any})}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Date" type="date" value={formData.date ? formData.date.split('T')[0] : ''} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            <FormInput label="Semester" type="number" value={formData.semester || ''} onChange={(e) => setFormData({...formData, semester: Number(e.target.value)})} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Start Time" type="time" value={formData.startTime || ''} onChange={(e) => setFormData({...formData, startTime: e.target.value})} required />
            <FormInput label="End Time" type="time" value={formData.endTime || ''} onChange={(e) => setFormData({...formData, endTime: e.target.value})} required />
          </div>
          <FormInput label="Room" value={formData.room || ''} onChange={(e) => setFormData({...formData, room: e.target.value})} required />
          <FormSelect 
            label="Status" 
            options={[{label: 'Upcoming', value: 'upcoming'}, {label: 'Ongoing', value: 'ongoing'}, {label: 'Completed', value: 'completed'}, {label: 'Cancelled', value: 'cancelled'}]}
            value={formData.status || 'upcoming'}
            onChange={(e) => setFormData({...formData, status: e.target.value as any})}
            required
          />
          <FormTextArea label="Instructions" value={formData.instructions || ''} onChange={(e) => setFormData({...formData, instructions: e.target.value})} />
        </div>
      </FormModal>
      
      <ConfirmDialog 
        isOpen={isDeleteDialogOpen} 
        title="Delete Exam" 
        message="Are you sure you want to delete this exam? This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
