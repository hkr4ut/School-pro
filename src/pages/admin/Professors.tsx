import { useState, useMemo } from 'react';
import type { Professor } from '../../types';
import { mockProfessors } from '../../data/users';
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

export default function Professors() {
  const { items: professors, addItem, updateItem, deleteItem } = useMockData<Professor>(mockProfessors, 'PRF');
  const { toasts, showToast, removeToast } = useToast();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Professor | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', professorId: '', department: 'Computer Science',
    designation: 'Lecturer', status: 'active' as string,
  });

  const uniqueDepts = useMemo(() => {
    const depts = new Set(professors.map(p => p.department));
    return Array.from(depts);
  }, [professors]);

  const filteredProfessors = useMemo(() => {
    let result = searchFilter(professors, search, ['name', 'email', 'professorId']);
    if (deptFilter) result = result.filter(p => p.department === deptFilter);
    return result;
  }, [professors, search, deptFilter]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', email: '', professorId: '', department: 'Computer Science', designation: 'Lecturer', status: 'active' });
    setIsFormOpen(true);
  };

  const handleEdit = (item: Professor) => {
    setEditingItem(item);
    setFormData({
      name: item.name, email: item.email, professorId: item.professorId,
      department: item.department, designation: item.designation, status: item.status,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profData = {
      ...formData,
      role: 'professor' as const,
      status: formData.status as 'active' | 'inactive',
      assignedCourses: editingItem ? editingItem.assignedCourses : [],
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString(),
    } as Professor;

    if (editingItem) {
      updateItem(editingItem.id, profData);
      showToast('success', 'Professor updated successfully');
    } else {
      addItem(profData);
      showToast('success', 'Professor added successfully');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Professor deleted successfully');
      setIsDeleteOpen(false);
      setItemToDelete(null);
    }
  };

  const columns = [
    { key: 'professorId', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { key: 'designation', label: 'Designation' },
    { key: 'status', label: 'Status', render: (p: Professor) => <StatusBadge status={p.status} /> },
    {
      key: 'actions', label: 'Actions', render: (p: Professor) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(p)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(p.id); setIsDeleteOpen(true); }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Professor Management"
        subtitle="Manage all faculty members"
        actions={<Button onClick={handleOpenAdd}>Add Professor</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search professors..." />
        <FilterDropdown
          label="Filter by Department"
          options={[{ label: 'All Departments', value: '' }, ...uniqueDepts.map(d => ({ label: d, value: d }))]}
          value={deptFilter}
          onChange={setDeptFilter}
        />
      </div>

      <DataTable columns={columns as any} data={filteredProfessors} keyField="id" emptyMessage="No professors found." />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingItem ? 'Edit Professor' : 'Add Professor'}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      >
        <div className="space-y-4">
          <FormInput label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <FormInput label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <FormInput label="Professor ID" value={formData.professorId} onChange={(e) => setFormData({ ...formData, professorId: e.target.value })} required />
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
          <FormSelect
            label="Designation"
            options={[
              { label: 'Professor', value: 'Professor' },
              { label: 'Associate Professor', value: 'Associate Professor' },
              { label: 'Assistant Professor', value: 'Assistant Professor' },
              { label: 'Lecturer', value: 'Lecturer' },
            ]}
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
          />
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
        title="Delete Professor"
        message="Are you sure you want to delete this professor? This action cannot be undone."
        variant="danger"
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
