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
import { mockNotices } from '../../data/notices';
import { useMockData, useToast } from '../../hooks/useMockData';
import { formatDate } from '../../utils/helpers';
import type { Notice } from '../../types';

export default function Notices() {
  const { items, addItem, updateItem, deleteItem } = useMockData(mockNotices, 'NOT');
  const { toasts, showToast, removeToast } = useToast();
  const [search, setSearch] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Notice | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', content: '', department: 'Computer Science', urgency: 'medium' });

  const filtered = items.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchUrgency = urgencyFilter ? n.urgency === urgencyFilter : true;
    return matchSearch && matchUrgency;
  });

  const openAdd = () => { setForm({ title: '', content: '', department: 'Computer Science', urgency: 'medium' }); setEditItem(null); setShowModal(true); };
  const openEdit = (n: Notice) => { setForm({ title: n.title, content: n.content, department: n.department, urgency: n.urgency }); setEditItem(n); setShowModal(true); };

  const handleSave = () => {
    const data = { ...form, urgency: form.urgency as Notice['urgency'], publishedBy: 'PROF001', publisherName: 'Dr. Ram Prasad Khanal', publishedAt: new Date().toISOString(), isRead: false };
    if (editItem) { updateItem(editItem.id, data); showToast('success', 'Notice updated!'); }
    else { addItem(data as any); showToast('success', 'Notice created!'); }
    setShowModal(false);
  };

  const handleDelete = () => { if (deleteId) { deleteItem(deleteId); showToast('success', 'Notice deleted!'); setDeleteId(null); } };

  const columns = [
    { key: 'title' as const, label: 'Title' },
    { key: 'department' as const, label: 'Department' },
    { key: 'urgency' as const, label: 'Urgency', render: (n: Notice) => <StatusBadge status={n.urgency} /> },
    { key: 'publishedAt' as const, label: 'Published', render: (n: Notice) => formatDate(n.publishedAt) },
    { key: 'id' as const, label: 'Actions', render: (n: Notice) => (
      <div className="flex gap-2">
        <button onClick={() => openEdit(n)} className="text-indigo-600 hover:underline text-sm">Edit</button>
        <button onClick={() => setDeleteId(n.id)} className="text-rose-600 hover:underline text-sm">Delete</button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="Notices" actions={<Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>Create Notice</Button>} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search notices..." className="flex-1" />
        <FilterDropdown label="Filter by Urgency" value={urgencyFilter} onChange={setUrgencyFilter} options={[{ value: 'low', label: 'Low' }, { value: 'medium', label: 'Medium' }, { value: 'high', label: 'High' }, { value: 'urgent', label: 'Urgent' }]} />
      </div>
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No notices found." />

      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} title={editItem ? 'Edit Notice' : 'Create Notice'} onSubmit={handleSave}>
        <div className="space-y-4">
          <FormInput label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <FormTextArea label="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          <FormSelect label="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} options={[{ label: 'Computer Science', value: 'Computer Science' }, { label: 'Information Technology', value: 'Information Technology' }, { label: 'Administration', value: 'Administration' }]} />
          <FormSelect label="Urgency" value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })} options={[{ label: 'Low', value: 'low' }, { label: 'Medium', value: 'medium' }, { label: 'High', value: 'high' }, { label: 'Urgent', value: 'urgent' }]} />
        </div>
      </FormModal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Notice" message="Are you sure?" />
    </div>
  );
}
