import { useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/modals/FormModal';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextArea from '../../components/forms/FormTextArea';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ToastContainer from '../../components/common/Toast';
import { mockAssignments } from '../../data/assignments';
import { mockCourses } from '../../data/courses';
import { useMockData, useToast } from '../../hooks/useMockData';
import { formatDate } from '../../utils/helpers';
import type { Assignment } from '../../types';

export default function Assignments() {
  const profCourseIds = mockCourses.filter(c => c.professorId === 'PROF001').map(c => c.id);
  const myAssignments = mockAssignments.filter(a => profCourseIds.includes(a.courseId));
  const { items, addItem, updateItem, deleteItem } = useMockData(myAssignments, 'ASG');
  const { toasts, showToast, removeToast } = useToast();
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Assignment | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', courseId: '', dueDate: '', priority: 'medium', maxMarks: '100', instructions: '' });

  const filtered = items.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter ? a.courseId === courseFilter : true;
    return matchSearch && matchCourse;
  });

  const openAdd = () => { setForm({ title: '', description: '', courseId: '', dueDate: '', priority: 'medium', maxMarks: '100', instructions: '' }); setEditItem(null); setShowModal(true); };
  const openEdit = (a: Assignment) => { setForm({ title: a.title, description: a.description, courseId: a.courseId, dueDate: a.dueDate.split('T')[0], priority: a.priority, maxMarks: String(a.maxMarks), instructions: a.instructions }); setEditItem(a); setShowModal(true); };

  const handleSave = () => {
    const course = mockCourses.find(c => c.id === form.courseId);
    const data = { ...form, priority: form.priority as Assignment['priority'], maxMarks: Number(form.maxMarks), courseName: course?.name || '', courseCode: course?.code || '', professorId: 'PROF001', professorName: 'Dr. Ram Prasad Khanal', createdAt: new Date().toISOString(), status: 'active' as const };
    if (editItem) { updateItem(editItem.id, data); showToast('success', 'Assignment updated!'); }
    else { addItem(data as any); showToast('success', 'Assignment created!'); }
    setShowModal(false);
  };

  const handleDelete = () => { if (deleteId) { deleteItem(deleteId); showToast('success', 'Assignment deleted!'); setDeleteId(null); } };

  const courseOptions = profCourseIds.map(id => ({ value: id, label: mockCourses.find(c => c.id === id)?.name || id }));

  const columns = [
    { key: 'title' as const, label: 'Title' },
    { key: 'courseName' as const, label: 'Course' },
    { key: 'dueDate' as const, label: 'Due Date', render: (a: Assignment) => formatDate(a.dueDate) },
    { key: 'priority' as const, label: 'Priority', render: (a: Assignment) => <StatusBadge status={a.priority} /> },
    { key: 'maxMarks' as const, label: 'Max Marks' },
    { key: 'status' as const, label: 'Status', render: (a: Assignment) => <StatusBadge status={a.status} /> },
    { key: 'id' as const, label: 'Actions', render: (a: Assignment) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(a)} className="text-indigo-600 hover:underline text-sm">Edit</button>
        <button onClick={() => setDeleteId(a.id)} className="text-rose-600 hover:underline text-sm">Delete</button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="Assignments" actions={<Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>Create Assignment</Button>} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search assignments..." className="flex-1" />
        <FilterDropdown label="Filter by Course" value={courseFilter} onChange={setCourseFilter} options={courseOptions} />
      </div>
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No assignments found." />

      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Assignment' : 'Create Assignment'} onSubmit={handleSave}>
        <div className="space-y-4">
          <FormInput label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <FormTextArea label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <FormSelect label="Course" value={form.courseId} onChange={e => setForm({ ...form, courseId: e.target.value })} options={courseOptions} required />
          <FormInput label="Due Date" type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required />
          <FormSelect label="Priority" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} options={[{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }]} />
          <FormInput label="Max Marks" type="number" value={form.maxMarks} onChange={e => setForm({ ...form, maxMarks: e.target.value })} />
          <FormTextArea label="Instructions" value={form.instructions} onChange={e => setForm({ ...form, instructions: e.target.value })} />
        </div>
      </FormModal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Assignment" message="Are you sure?" />
    </div>
  );
}
