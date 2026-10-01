import { useState, useMemo } from 'react';
import type { Assignment } from '../../types';
import { mockAssignments } from '../../data/assignments';
import { mockCourses } from '../../data/courses';
import { useMockData, useToast } from '../../hooks/useMockData';
import { searchFilter, formatDate } from '../../utils/helpers';
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

export default function Assignments() {
  const { items: assignments, addItem, updateItem, deleteItem } = useMockData<Assignment>(mockAssignments, 'ASG');
  const { toasts, showToast, removeToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Assignment | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '', description: '', courseId: '', dueDate: '',
    priority: 'medium' as string, instructions: '', maxMarks: 100,
    status: 'active' as string,
  });

  const filteredAssignments = useMemo(() => {
    let result = searchFilter(assignments, search, ['title', 'courseName', 'courseCode']);
    if (statusFilter) result = result.filter(a => a.status === statusFilter);
    return result;
  }, [assignments, search, statusFilter]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', courseId: '', dueDate: '', priority: 'medium', instructions: '', maxMarks: 100, status: 'active' });
    setIsFormOpen(true);
  };

  const handleEdit = (item: Assignment) => {
    setEditingItem(item);
    setFormData({
      title: item.title, description: item.description, courseId: item.courseId,
      dueDate: item.dueDate.split('T')[0], priority: item.priority,
      instructions: item.instructions, maxMarks: item.maxMarks, status: item.status,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = mockCourses.find(c => c.id === formData.courseId);
    const assignmentData = {
      ...formData,
      maxMarks: Number(formData.maxMarks),
      priority: formData.priority as Assignment['priority'],
      status: formData.status as Assignment['status'],
      courseName: course?.name || '',
      courseCode: course?.code || '',
      professorId: course?.professorId || '',
      professorName: course?.professorName || '',
      createdAt: editingItem ? editingItem.createdAt : new Date().toISOString(),
    } as Assignment;

    if (editingItem) {
      updateItem(editingItem.id, assignmentData);
      showToast('success', 'Assignment updated successfully');
    } else {
      addItem(assignmentData);
      showToast('success', 'Assignment created successfully');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Assignment deleted successfully');
      setIsDeleteOpen(false);
      setItemToDelete(null);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'courseName', label: 'Course' },
    { key: 'dueDate', label: 'Due Date', render: (a: Assignment) => formatDate(a.dueDate) },
    { key: 'priority', label: 'Priority', render: (a: Assignment) => <StatusBadge status={a.priority} /> },
    { key: 'maxMarks', label: 'Marks' },
    { key: 'status', label: 'Status', render: (a: Assignment) => <StatusBadge status={a.status} /> },
    {
      key: 'actions', label: 'Actions', render: (a: Assignment) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(a)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(a.id); setIsDeleteOpen(true); }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assignment Management"
        subtitle="Manage all assignments across courses"
        actions={<Button onClick={handleOpenAdd}>Add Assignment</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search assignments..." />
        <FilterDropdown
          label="Filter by Status"
          options={[{ label: 'All Statuses', value: '' }, { label: 'Active', value: 'active' }, { label: 'Closed', value: 'closed' }]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>

      <DataTable columns={columns as any} data={filteredAssignments} keyField="id" emptyMessage="No assignments found." />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingItem ? 'Edit Assignment' : 'Add Assignment'}
        onSubmit={handleSubmit}
        submitLabel={editingItem ? 'Update' : 'Create'}
      >
        <div className="space-y-4">
          <FormInput label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          <FormTextArea label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Course"
              options={mockCourses.map(c => ({ label: `${c.code} - ${c.name}`, value: c.id }))}
              value={formData.courseId}
              onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              placeholder="Select a course"
              required
            />
            <FormInput label="Due Date" type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} required />
          </div>
          <FormTextArea label="Instructions" value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} />
          <div className="grid grid-cols-3 gap-4">
            <FormInput label="Max Marks" type="number" value={formData.maxMarks} onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })} required />
            <FormSelect
              label="Priority"
              options={[{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }]}
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            />
            <FormSelect
              label="Status"
              options={[{ label: 'Active', value: 'active' }, { label: 'Closed', value: 'closed' }]}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </div>
        </div>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setItemToDelete(null); }}
        onConfirm={handleDelete}
        title="Delete Assignment"
        message="Are you sure you want to delete this assignment? This action cannot be undone."
        variant="danger"
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
