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
import { mockResults } from '../../data/results';
import { mockCourses } from '../../data/courses';
import { mockStudents } from '../../data/users';
import { useMockData, useToast } from '../../hooks/useMockData';
import { getGradeColor } from '../../utils/helpers';
import type { Result } from '../../types';

export default function Results() {
  const profCourseIds = mockCourses.filter(c => c.professorId === 'PROF001').map(c => c.id);
  const myResults = mockResults.filter(r => profCourseIds.includes(r.courseId));
  const { items, addItem, updateItem, deleteItem } = useMockData(myResults, 'RES');
  const { toasts, showToast, removeToast } = useToast();
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Result | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ studentId: '', courseId: '', semester: '4', marksObtained: '', totalMarks: '100', grade: '', gradePoint: '', remarks: '' });

  const filtered = items.filter(r => {
    const matchSearch = r.studentName.toLowerCase().includes(search.toLowerCase()) || r.courseName.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter ? r.courseId === courseFilter : true;
    return matchSearch && matchCourse;
  });

  const openAdd = () => { setForm({ studentId: '', courseId: '', semester: '4', marksObtained: '', totalMarks: '100', grade: '', gradePoint: '', remarks: '' }); setEditItem(null); setShowModal(true); };
  const openEdit = (r: Result) => { setForm({ studentId: r.studentId, courseId: r.courseId, semester: String(r.semester), marksObtained: String(r.marksObtained), totalMarks: String(r.totalMarks), grade: r.grade, gradePoint: String(r.gradePoint), remarks: r.remarks || '' }); setEditItem(r); setShowModal(true); };

  const handleSave = () => {
    const student = mockStudents.find(s => s.id === form.studentId);
    const course = mockCourses.find(c => c.id === form.courseId);
    const data = { ...form, semester: Number(form.semester), marksObtained: Number(form.marksObtained), totalMarks: Number(form.totalMarks), gradePoint: Number(form.gradePoint), studentName: student?.name || '', courseName: course?.name || '', courseCode: course?.code || '', publishedAt: new Date().toISOString() };
    if (editItem) { updateItem(editItem.id, data); showToast('success', 'Result updated!'); }
    else { addItem(data as any); showToast('success', 'Result added!'); }
    setShowModal(false);
  };

  const handleDelete = () => { if (deleteId) { deleteItem(deleteId); showToast('success', 'Result deleted!'); setDeleteId(null); } };

  const courseOptions = profCourseIds.map(id => ({ value: id, label: mockCourses.find(c => c.id === id)?.name || id }));
  const studentOptions = mockStudents.map(s => ({ value: s.id, label: s.name }));

  const columns = [
    { key: 'studentName' as const, label: 'Student' },
    { key: 'courseName' as const, label: 'Course' },
    { key: 'semester' as const, label: 'Semester' },
    { key: 'marksObtained' as const, label: 'Marks', render: (r: Result) => `${r.marksObtained}/${r.totalMarks}` },
    { key: 'grade' as const, label: 'Grade', render: (r: Result) => <span className={`font-semibold ${getGradeColor(r.grade)}`}>{r.grade}</span> },
    { key: 'gradePoint' as const, label: 'GP' },
    { key: 'id' as const, label: 'Actions', render: (r: Result) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(r)} className="text-indigo-600 hover:underline text-sm">Edit</button>
        <button onClick={() => setDeleteId(r.id)} className="text-rose-600 hover:underline text-sm">Delete</button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="Student Results" actions={<Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>Add Result</Button>} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search results..." className="flex-1" />
        <FilterDropdown label="Filter by Course" value={courseFilter} onChange={setCourseFilter} options={courseOptions} />
      </div>
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No results found." />

      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Result' : 'Add Result'} onSubmit={handleSave}>
        <div className="space-y-4">
          <FormSelect label="Student" value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} options={studentOptions} required />
          <FormSelect label="Course" value={form.courseId} onChange={e => setForm({ ...form, courseId: e.target.value })} options={courseOptions} required />
          <FormInput label="Semester" type="number" value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} />
          <FormInput label="Marks Obtained" type="number" value={form.marksObtained} onChange={e => setForm({ ...form, marksObtained: e.target.value })} required />
          <FormInput label="Total Marks" type="number" value={form.totalMarks} onChange={e => setForm({ ...form, totalMarks: e.target.value })} />
          <FormInput label="Grade" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} required />
          <FormInput label="Grade Point" type="number" value={form.gradePoint} onChange={e => setForm({ ...form, gradePoint: e.target.value })} />
          <FormTextArea label="Remarks" value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} />
        </div>
      </FormModal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Result" message="Are you sure?" />
    </div>
  );
}
