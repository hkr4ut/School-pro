import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import CourseCard from '../../components/cards/CourseCard';
import Button from '../../components/common/Button';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextArea from '../../components/forms/FormTextArea';
import FormModal from '../../components/modals/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ToastContainer from '../../components/common/Toast';
import EmptyState from '../../components/common/EmptyState';
import { mockCourses } from '../../data/courses';
import { useMockData, useToast } from '../../hooks/useMockData';
import { Plus } from 'lucide-react';

export default function Courses() {
  const myCourses = mockCourses.filter(c => c.professorId === 'PROF001');
  const { items, addItem, updateItem, deleteItem } = useMockData(myCourses, 'CRS');
  const { toasts, showToast, removeToast } = useToast();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof items[0] | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ code: '', name: '', description: '', creditHours: '3', semester: '4', department: 'Computer Science' });

  const filtered = items.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm({ code: '', name: '', description: '', creditHours: '3', semester: '4', department: 'Computer Science' }); setEditItem(null); setShowModal(true); };
  const openEdit = (c: typeof items[0]) => { setForm({ code: c.code, name: c.name, description: c.description, creditHours: String(c.creditHours), semester: String(c.semester), department: c.department }); setEditItem(c); setShowModal(true); };

  const handleSave = () => {
    const data = { ...form, creditHours: Number(form.creditHours), semester: Number(form.semester), professorId: 'PROF001', professorName: 'Dr. Ram Prasad Khanal', enrolledStudents: editItem?.enrolledStudents || [], status: 'active' as const, schedule: '' };
    if (editItem) { updateItem(editItem.id, data); showToast('success', 'Course updated!'); }
    else { addItem(data as any); showToast('success', 'Course added!'); }
    setShowModal(false);
  };

  const handleDelete = () => { if (deleteId) { deleteItem(deleteId); showToast('success', 'Course deleted!'); setDeleteId(null); } };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="My Courses" subtitle={`${items.length} courses`} actions={<Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>Add Course</Button>} />
      <SearchBar value={search} onChange={setSearch} placeholder="Search courses..." />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(c => (
            <div key={c.id} className="relative">
              <CourseCard course={c} linkPrefix="/professor/courses" />
              <div className="absolute top-3 right-3 flex gap-1">
                <button onClick={() => openEdit(c)} className="p-1.5 bg-white rounded-lg shadow text-gray-500 hover:text-indigo-600 text-xs">Edit</button>
                <button onClick={() => setDeleteId(c.id)} className="p-1.5 bg-white rounded-lg shadow text-gray-500 hover:text-rose-600 text-xs">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No courses found" description="Create your first course to get started." />
      )}

      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Course' : 'Add Course'} onSubmit={handleSave}>
        <div className="space-y-4">
          <FormInput label="Course Code" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} required />
          <FormInput label="Course Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <FormTextArea label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <FormInput label="Credit Hours" type="number" value={form.creditHours} onChange={e => setForm({ ...form, creditHours: e.target.value })} />
          <FormInput label="Semester" type="number" value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} />
          <FormSelect label="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} options={[{ label: 'Computer Science', value: 'Computer Science' }, { label: 'Information Technology', value: 'Information Technology' }]} />
        </div>
      </FormModal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Course" message="Are you sure you want to delete this course?" />
    </div>
  );
}
