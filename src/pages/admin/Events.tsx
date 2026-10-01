import { useState, useMemo } from 'react';
import type { SportEvent } from '../../types';
import { formatDate, getEventTypeColor } from '../../utils/helpers';
import { mockEvents } from '../../data/events';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import ToastContainer from '../../components/common/Toast';
import Pagination from '../../components/common/Pagination';
import PageHeader from '../../components/layout/PageHeader';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import FormTextArea from '../../components/forms/FormTextArea';
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/modals/FormModal';
import { useMockData, useToast } from '../../hooks/useMockData';
import { useAuth } from '../../hooks/useAuth';

export default function Events() {
  const { items: events, addItem, updateItem, deleteItem } = useMockData<SportEvent>(mockEvents, 'EVT');
  const { toasts, showToast, removeToast } = useToast();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SportEvent | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [formData, setFormData] = useState<Partial<SportEvent>>({
    title: '', description: '', eventType: 'sports', date: '', time: '', venue: '', organizerName: '', maxParticipants: 100, status: 'upcoming', registeredStudents: []
  });

  const filteredData = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch = !searchTerm || ['title', 'venue', 'organizerName'].some(field => 
        String((evt as any)[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesType = eventTypeFilter ? evt.eventType === eventTypeFilter : true;
      const matchesStatus = statusFilter ? evt.status === statusFilter : true;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [events, searchTerm, eventTypeFilter, statusFilter]);
  
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'eventType', label: 'Type', render: (e: SportEvent) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(e.eventType)}`}>
          {e.eventType.charAt(0).toUpperCase() + e.eventType.slice(1)}
        </span>
      )
    },
    { key: 'date', label: 'Date', render: (e: SportEvent) => formatDate(e.date) },
    { key: 'time', label: 'Time' },
    { key: 'venue', label: 'Venue' },
    { key: 'organizerName', label: 'Organizer' },
    { key: 'registeredStudents', label: 'Registered', render: (e: SportEvent) => e.registeredStudents?.length || 0 },
    { key: 'status', label: 'Status', render: (e: SportEvent) => <StatusBadge status={e.status} /> },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: (e: SportEvent) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(e)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(e.id); setIsDeleteDialogOpen(true); }}>Delete</Button>
        </div>
      ) 
    }
  ];

  const handleEdit = (item: SportEvent) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', eventType: 'sports', date: '', time: '', venue: '', organizerName: '', maxParticipants: 100, status: 'upcoming', registeredStudents: [] });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      organizer: editingItem ? editingItem.organizer : user?.id || 'admin',
    } as SportEvent;

    if (editingItem) {
      updateItem(editingItem.id, dataToSave);
      showToast('success', 'Event updated successfully');
    } else {
      addItem(dataToSave);
      showToast('success', 'Event created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Event deleted successfully');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Event Management" 
        actions={<Button onClick={handleOpenAdd}>Create Event</Button>} 
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search events..." />
        <FilterDropdown 
          label="Filter by Type" 
          options={[
            {label: 'All Types', value: ''},
            {label: 'Sports', value: 'sports'},
            {label: 'Cultural', value: 'cultural'},
            {label: 'Academic', value: 'academic'},
            {label: 'Workshop', value: 'workshop'},
            {label: 'Seminar', value: 'seminar'}
          ]}
          value={eventTypeFilter}
          onChange={setEventTypeFilter}
        />
        <FilterDropdown 
          label="Filter by Status" 
          options={[
            {label: 'All Statuses', value: ''},
            {label: 'Upcoming', value: 'upcoming'},
            {label: 'Ongoing', value: 'ongoing'},
            {label: 'Completed', value: 'completed'},
            {label: 'Cancelled', value: 'cancelled'}
          ]}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>
      
      <DataTable 
        columns={columns as any} 
        data={paginatedData} 
        keyField="id" 
        emptyMessage="No events found." 
      />
      
      {filteredData.length > itemsPerPage && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={Math.ceil(filteredData.length / itemsPerPage)} 
          onPageChange={setCurrentPage} 
        />
      )}
      
      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Event' : 'Create Event'}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <FormInput label="Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <FormTextArea label="Description" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect 
              label="Event Type" 
              options={[
                {label: 'Sports', value: 'sports'}, {label: 'Cultural', value: 'cultural'}, 
                {label: 'Academic', value: 'academic'}, {label: 'Workshop', value: 'workshop'}, 
                {label: 'Seminar', value: 'seminar'}
              ]}
              value={formData.eventType || 'sports'}
              onChange={(e) => setFormData({...formData, eventType: e.target.value as any})}
              required
            />
            <FormInput label="Max Participants" type="number" value={formData.maxParticipants || ''} onChange={(e) => setFormData({...formData, maxParticipants: Number(e.target.value)})} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Date" type="date" value={formData.date ? formData.date.split('T')[0] : ''} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            <FormInput label="Time" type="time" value={formData.time || ''} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
          </div>
          <FormInput label="Venue" value={formData.venue || ''} onChange={(e) => setFormData({...formData, venue: e.target.value})} required />
          <FormInput label="Organizer Name" value={formData.organizerName || ''} onChange={(e) => setFormData({...formData, organizerName: e.target.value})} required />
          <FormSelect 
            label="Status" 
            options={[{label: 'Upcoming', value: 'upcoming'}, {label: 'Ongoing', value: 'ongoing'}, {label: 'Completed', value: 'completed'}, {label: 'Cancelled', value: 'cancelled'}]}
            value={formData.status || 'upcoming'}
            onChange={(e) => setFormData({...formData, status: e.target.value as any})}
            required
          />
        </div>
      </FormModal>
      
      <ConfirmDialog 
        isOpen={isDeleteDialogOpen} 
        title="Delete Event" 
        message="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
