import { useState, useMemo } from 'react';
import type { Student } from '../../types';
import { mockStudents } from '../../data/users';
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
import ConfirmDialog from '../../components/common/ConfirmDialog';
import StatusBadge from '../../components/common/StatusBadge';
import ToastContainer from '../../components/common/Toast';

export default function Students() {
  const { items: students, addItem, updateItem, deleteItem } = useMockData<Student>(mockStudents, 'STU');
  const { toasts, showToast, removeToast } = useToast();

  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Student | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', studentId: '', program: 'Computer Science', semester: 1, status: 'active' as string,
  });

  const uniquePrograms = useMemo(() => {
    const progs = new Set(students.map(s => s.program));
    return Array.from(progs);
  }, [students]);

  const filteredStudents = useMemo(() => {
    let result = searchFilter(students, search, ['name', 'email', 'studentId']);
    if (programFilter) result = result.filter(s => s.program === programFilter);
    return result;
  }, [students, search, programFilter]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', email: '', studentId: '', program: 'Computer Science', semester: 1, status: 'active' });
    setIsFormOpen(true);
  };

  const handleEdit = (item: Student) => {
    setEditingItem(item);
    setFormData({
      name: item.name, email: item.email, studentId: item.studentId,
      program: item.program, semester: item.semester, status: item.status,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData = {
      ...formData,
      role: 'student' as const,
      semester: Number(formData.semester),
      status: formData.status as 'active' | 'inactive',
      enrolledCourses: editingItem ? editingItem.enrolledCourses : [],
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString(),
    } as Student;

    if (editingItem) {
      updateItem(editingItem.id, studentData);
      showToast('success', 'Student updated successfully');
    } else {
      addItem(studentData);
      showToast('success', 'Student added successfully');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Student deleted successfully');
      setIsDeleteOpen(false);
      setItemToDelete(null);
    }
  };

  const columns = [
    { key: 'studentId', label: 'Student ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'program', label: 'Program' },
    { key: 'semester', label: 'Semester' },
    { key: 'status', label: 'Status', render: (s: Student) => <StatusBadge status={s.status} /> },
    {
      key: 'actions', label: 'Actions', render: (s: Student) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(s)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(s.id); setIsDeleteOpen(true); }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Management"
        subtitle="Manage all registered students"
        actions={<Button onClick={handleOpenAdd}>Add Student</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search students..." />
        <FilterDropdown
          label="Filter by Program"
          options={[{ label: 'All Programs', value: '' }, ...uniquePrograms.map(p => ({ label: p, value: p }))]}
          value={programFilter}
          onChange={setProgramFilter}
        />
      </div>

      <DataTable columns={columns as any} data={filteredStudents} keyField="id" emptyMessage="No students found." />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingItem ? 'Edit Student' : 'Add Student'}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      >
        <div className="space-y-4">
          <FormInput label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <FormInput label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <FormInput label="Student ID" value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} required />
          <FormSelect
            label="Program"
            options={[
              { label: 'Computer Science', value: 'Computer Science' },
              { label: 'IT', value: 'IT' },
              { label: 'Mathematics', value: 'Mathematics' },
              { label: 'Engineering', value: 'Engineering' },
            ]}
            value={formData.program}
            onChange={(e) => setFormData({ ...formData, program: e.target.value })}
          />
          <FormInput label="Semester" type="number" value={formData.semester} onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })} required />
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
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        variant="danger"
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
