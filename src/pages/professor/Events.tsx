import { useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import Badge from '../../components/common/Badge';
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/modals/FormModal';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextArea from '../../components/forms/FormTextArea';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ToastContainer from '../../components/common/Toast';
import { mockEvents } from '../../data/events';
import { useMockData, useToast } from '../../hooks/useMockData';
import { formatDate, getEventTypeColor } from '../../utils/helpers';
import type { SportEvent } from '../../types';

export default function Events() {
  const { items, addItem, deleteItem } = useMockData(mockEvents, 'EVT');
  const { toasts, showToast, removeToast } = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', eventType: 'sports', date: '', time: '', venue: '', maxParticipants: '' });

  const filtered = items.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter ? e.eventType === typeFilter : true;
    return matchSearch && matchType;
  });

  const handleSave = () => {
    addItem({ ...form, maxParticipants: form.maxParticipants ? Number(form.maxParticipants) : undefined, organizer: 'PROF001', organizerName: 'Dr. Ram Prasad Khanal', registeredStudents: [], status: 'upcoming' } as any);
    showToast('success', 'Event created!');
    setShowModal(false);
  };

  const handleDelete = () => { if (deleteId) { deleteItem(deleteId); showToast('success', 'Event deleted!'); setDeleteId(null); } };

  const columns = [
    { key: 'title' as const, label: 'Title' },
    { key: 'eventType' as const, label: 'Type', render: (e: SportEvent) => <Badge className={getEventTypeColor(e.eventType)}>{e.eventType}</Badge> },
    { key: 'date' as const, label: 'Date', render: (e: SportEvent) => formatDate(e.date) },
    { key: 'time' as const, label: 'Time' },
    { key: 'venue' as const, label: 'Venue' },
    { key: 'registeredStudents' as const, label: 'Registered', render: (e: SportEvent) => String(e.registeredStudents.length) },
    { key: 'status' as const, label: 'Status', render: (e: SportEvent) => <StatusBadge status={e.status} /> },
    { key: 'id' as const, label: 'Actions', render: (e: SportEvent) => (
      <button onClick={() => setDeleteId(e.id)} className="text-rose-600 hover:underline text-sm">Delete</button>
    )},
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="Sports & Events" actions={<Button onClick={() => { setForm({ title: '', description: '', eventType: 'sports', date: '', time: '', venue: '', maxParticipants: '' }); setShowModal(true); }} icon={<Plus className="h-4 w-4" />}>Create Event</Button>} />
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search events..." className="flex-1" />
        <FilterDropdown label="Filter by Type" value={typeFilter} onChange={setTypeFilter} options={[{ value: 'sports', label: 'Sports' }, { value: 'cultural', label: 'Cultural' }, { value: 'academic', label: 'Academic' }, { value: 'workshop', label: 'Workshop' }, { value: 'seminar', label: 'Seminar' }]} />
      </div>
      <DataTable columns={columns} data={filtered} keyField="id" emptyMessage="No events found." />

      <FormModal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Event" onSubmit={handleSave}>
        <div className="space-y-4">
          <FormInput label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <FormTextArea label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <FormSelect label="Event Type" value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })} options={[{ label: 'Sports', value: 'sports' }, { label: 'Cultural', value: 'cultural' }, { label: 'Academic', value: 'academic' }, { label: 'Workshop', value: 'workshop' }, { label: 'Seminar', value: 'seminar' }]} />
          <FormInput label="Date" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
          <FormInput label="Time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="10:00 AM" />
          <FormInput label="Venue" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} />
          <FormInput label="Max Participants" type="number" value={form.maxParticipants} onChange={e => setForm({ ...form, maxParticipants: e.target.value })} />
        </div>
      </FormModal>
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Event" message="Are you sure?" />
    </div>
  );
}
