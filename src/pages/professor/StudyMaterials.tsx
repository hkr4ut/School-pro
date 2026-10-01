import { useState } from 'react';
import { Plus } from 'lucide-react';
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
import ToastContainer from '../../components/common/Toast';
import Badge from '../../components/common/Badge';
import { mockStudyMaterials } from '../../data/studyMaterials';
import { mockCourses } from '../../data/courses';
import { useMockData, useToast } from '../../hooks/useMockData';
import { formatDate } from '../../utils/helpers';
import type { StudyMaterial } from '../../types';

export default function StudyMaterials() {
  const profCourseIds = mockCourses.filter(c => c.professorId === 'PROF001').map(c => c.id);
  const myMaterials = mockStudyMaterials.filter(m => profCourseIds.includes(m.courseId));
  const { items, addItem, deleteItem } = useMockData(myMaterials, 'MAT');
  const { toasts, showToast, removeToast } = useToast();
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', courseId: '', fileType: 'pdf' });

  const filtered = items.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter ? m.courseId === courseFilter : true;
    return matchSearch && matchCourse;
  });

  const handleSave = () => {
    const course = mockCourses.find(c => c.id === form.courseId);
    addItem({ ...form, courseName: course?.name || '', courseCode: course?.code || '', uploadedBy: 'PROF001', uploaderName: 'Dr. Ram Prasad Khanal', uploadedAt: new Date().toISOString(), fileSize: '2.5 MB' } as any);
    showToast('success', 'Material uploaded!');
    setShowModal(false);
  };

  const handleDelete = () => { if (deleteId) { deleteItem(deleteId); showToast('success', 'Material deleted!'); setDeleteId(null); } };

  const courseOptions = profCourseIds.map(id => ({ value: id, label: mockCourses.find(c => c.id === id)?.name || id }));

  const columns = [
    { key: 'title' as const, label: 'Title' },
    { key: 'courseName' as const, label: 'Course' },
    { key: 'fileType' as const, label: 'Type', render: (m: StudyMaterial) => <Badge>{m.fileType.toUpperCase()}</Badge> },
    { key: 'uploadedAt' as const, label: 'Uploaded', render: (m: StudyMaterial) => formatDate(m.uploadedAt) },
    { key: 'fileSize' as const, label: 'Size' },
    { key: 'id' as const, label: 'Actions', render: (m: StudyMaterial) => (
      <button onClick={() => setDeleteId(m.id)} className="text-rose-600 hover:underline text-sm">Delete</button>
    )},
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="Study Materials" actions={<Button onClick={() => { setForm({ title: '', description: '', courseId: '', fileType: 'pdf' }); setShowModal(true); }} icon={<Plus className="h-4 w-4" />}>Upload Material</Button>} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search materials..." className="flex-1" />
        <FilterDropdown label="Filter by Course" value={courseFilter} onChange={setCourseFilter} options={courseOptions} />
      </div>
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No materials found." />

      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} title="Upload Material" onSubmit={handleSave}>
        <div className="space-y-4">
          <FormInput label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <FormTextArea label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <FormSelect label="Course" value={form.courseId} onChange={e => setForm({ ...form, courseId: e.target.value })} options={courseOptions} required />
          <FormSelect label="File Type" value={form.fileType} onChange={e => setForm({ ...form, fileType: e.target.value })} options={[{ label: 'PDF', value: 'pdf' }, { label: 'Document', value: 'doc' }, { label: 'Presentation', value: 'ppt' }, { label: 'Video', value: 'video' }, { label: 'Link', value: 'link' }, { label: 'Notes', value: 'notes' }]} />
        </div>
      </FormModal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Material" message="Are you sure?" />
    </div>
  );
}
