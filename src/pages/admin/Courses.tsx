import { useState, useMemo } from 'react';
import type { Course } from '../../types';
import { mockCourses } from '../../data/courses';
import { useMockData, useToast } from '../../hooks/useMockData';
import { searchFilter } from '../../utils/helpers';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import Button from '../../components/common/Button';
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/modals/FormModal';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextArea from '../../components/forms/FormTextArea';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import StatusBadge from '../../components/common/StatusBadge';
import ToastContainer from '../../components/common/Toast';

export default function Courses() {
  const { items: courses, addItem, updateItem, deleteItem } = useMockData<Course>(mockCourses, 'CRS');
  const { toasts, showToast, removeToast } = useToast();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Course | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: '', name: '', description: '', creditHours: 3, semester: 1,
    professorName: '', department: 'Computer Science', schedule: '', status: 'active' as string,
  });

  const uniqueDepts = useMemo(() => {
    const depts = new Set(courses.map(c => c.department));
    return Array.from(depts);
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let result = searchFilter(courses, search, ['name', 'code', 'professorName']);
    if (deptFilter) result = result.filter(c => c.department === deptFilter);
    return result;
  }, [courses, search, deptFilter]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ code: '', name: '', description: '', creditHours: 3, semester: 1, professorName: '', department: 'Computer Science', schedule: '', status: 'active' });
    setIsFormOpen(true);
  };

  const handleEdit = (item: Course) => {
    setEditingItem(item);
    setFormData({
      code: item.code, name: item.name, description: item.description,
      creditHours: item.creditHours, semester: item.semester, professorName: item.professorName,
      department: item.department, schedule: item.schedule || '', status: item.status,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      creditHours: Number(formData.creditHours),
      semester: Number(formData.semester),
      professorId: editingItem ? editingItem.professorId : '',
      enrolledStudents: editingItem ? editingItem.enrolledStudents : [],
      status: formData.status as 'active' | 'inactive',
    } as Course;

    if (editingItem) {
      updateItem(editingItem.id, courseData);
      showToast('success', 'Course updated successfully');
    } else {
      addItem(courseData);
      showToast('success', 'Course created successfully');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Course deleted successfully');
      setIsDeleteOpen(false);
      setItemToDelete(null);
    }
  };

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Course Name' },
    { key: 'department', label: 'Department' },
    { key: 'professorName', label: 'Professor' },
    { key: 'creditHours', label: 'Credits' },
    { key: 'semester', label: 'Semester' },
    { key: 'status', label: 'Status', render: (c: Course) => <StatusBadge status={c.status} /> },
    {
      key: 'actions', label: 'Actions', render: (c: Course) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(c)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(c.id); setIsDeleteOpen(true); }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Management"
        subtitle="Manage all courses across departments"
        actions={<Button onClick={handleOpenAdd}>Add Course</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." />
        <FilterDropdown
          label="Filter by Department"
          options={[{ label: 'All Departments', value: '' }, ...uniqueDepts.map(d => ({ label: d, value: d }))]}
          value={deptFilter}
          onChange={setDeptFilter}
        />
      </div>

      <DataTable columns={columns as any} data={filteredCourses} keyField="id" emptyMessage="No courses found." />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingItem ? 'Edit Course' : 'Add Course'}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Course Code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} required />
            <FormInput label="Credit Hours" type="number" value={formData.creditHours} onChange={(e) => setFormData({ ...formData, creditHours: Number(e.target.value) })} required />
          </div>
          <FormInput label="Course Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <FormTextArea label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Semester" type="number" value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })} required />
            <FormInput label="Professor Name" value={formData.professorName} onChange={(e) => setFormData({ ...formData, professorName: e.target.value })} />
          </div>
          <FormSelect
            label="Department"
            options={[
              { label: 'Computer Science', value: 'Computer Science' },
              { label: 'Mathematics', value: 'Mathematics' },
              { label: 'Engineering', value: 'Engineering' },
              { label: 'Physics', value: 'Physics' },
            ]}
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          />
          <FormInput label="Schedule" value={formData.schedule} onChange={(e) => setFormData({ ...formData, schedule: e.target.value })} placeholder="e.g., Mon/Wed 10:00-11:30" />
          <FormSelect
            label="Status"
            options={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
        </div>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setItemToDelete(null); }}
        onConfirm={handleDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        variant="danger"
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
