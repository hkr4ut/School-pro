import { useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/modals/FormModal';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextArea from '../../components/forms/FormTextArea';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ToastContainer from '../../components/common/Toast';
import { mockExams } from '../../data/exams';
import { mockCourses } from '../../data/courses';
import { useMockData, useToast } from '../../hooks/useMockData';
import { formatDate } from '../../utils/helpers';
import type { Exam } from '../../types';

export default function Exams() {
  const profCourseIds = mockCourses.filter(c => c.professorId === 'PROF001').map(c => c.id);
  const myExams = mockExams.filter(e => profCourseIds.includes(e.courseId));
  const { items, addItem, updateItem, deleteItem } = useMockData(myExams, 'EXM');
  const { toasts, showToast, removeToast } = useToast();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Exam | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ courseId: '', examType: 'midterm', date: '', startTime: '', endTime: '', room: '', semester: '4', instructions: '' });

  const filtered = items.filter(e => e.courseName.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ courseId: '', examType: 'midterm', date: '', startTime: '', endTime: '', room: '', semester: '4', instructions: '' }); setEditItem(null); setShowModal(true); };
  const openEdit = (e: Exam) => { setForm({ courseId: e.courseId, examType: e.examType, date: e.date.split('T')[0], startTime: e.startTime, endTime: e.endTime, room: e.room, semester: String(e.semester), instructions: e.instructions || '' }); setEditItem(e); setShowModal(true); };

  const handleSave = () => {
    const course = mockCourses.find(c => c.id === form.courseId);
    const data = { ...form, examType: form.examType as Exam['examType'], semester: Number(form.semester), courseName: course?.name || '', courseCode: course?.code || '', status: 'upcoming' as const };
    if (editItem) { updateItem(editItem.id, data); showToast('success', 'Exam updated!'); }
    else { addItem(data as any); showToast('success', 'Exam added!'); }
    setShowModal(false);
  };

  const handleDelete = () => { if (deleteId) { deleteItem(deleteId); showToast('success', 'Exam deleted!'); setDeleteId(null); } };

  const courseOptions = profCourseIds.map(id => ({ value: id, label: mockCourses.find(c => c.id === id)?.name || id }));

  const columns = [
    { key: 'courseName' as const, label: 'Course' },
    { key: 'examType' as const, label: 'Type', render: (e: Exam) => <StatusBadge status={e.examType} /> },
    { key: 'date' as const, label: 'Date', render: (e: Exam) => formatDate(e.date) },
    { key: 'startTime' as const, label: 'Time', render: (e: Exam) => `${e.startTime} - ${e.endTime}` },
    { key: 'room' as const, label: 'Room' },
    { key: 'status' as const, label: 'Status', render: (e: Exam) => <StatusBadge status={e.status} /> },
    { key: 'id' as const, label: 'Actions', render: (e: Exam) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(e)} className="text-indigo-600 hover:underline text-sm">Edit</button>
        <button onClick={() => setDeleteId(e.id)} className="text-rose-600 hover:underline text-sm">Delete</button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="Exam Schedule" actions={<Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>Add Exam</Button>} />
      <SearchBar value={search} onChange={setSearch} placeholder="Search exams..." />
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No exams found." />

      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Exam' : 'Add Exam'} onSubmit={handleSave}>
        <div className="space-y-4">
          <FormSelect label="Course" value={form.courseId} onChange={e => setForm({ ...form, courseId: e.target.value })} options={courseOptions} required />
          <FormSelect label="Exam Type" value={form.examType} onChange={e => setForm({ ...form, examType: e.target.value })} options={[{ label: 'Midterm', value: 'midterm' }, { label: 'Final', value: 'final' }, { label: 'Internal', value: 'internal' }, { label: 'Practical', value: 'practical' }]} />
          <FormInput label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
          <FormInput label="Start Time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} placeholder="10:00 AM" />
          <FormInput label="End Time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} placeholder="12:00 PM" />
          <FormInput label="Room" value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} />
          <FormInput label="Semester" type="number" value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} />
          <FormTextArea label="Instructions" value={form.instructions} onChange={e => setForm({ ...form, instructions: e.target.value })} />
        </div>
      </FormModal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Exam" message="Are you sure?" />
    </div>
  );
}
