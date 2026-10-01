import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import EventCard from '../../components/cards/EventCard';
import ToastContainer from '../../components/common/Toast';
import EmptyState from '../../components/common/EmptyState';
import { mockEvents } from '../../data/events';
import { useToast } from '../../hooks/useMockData';

export default function Events() {
  const [events, setEvents] = useState(mockEvents);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { toasts, showToast, removeToast } = useToast();

  const handleToggleRegister = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id !== eventId) return e;
      const isRegistered = e.registeredStudents.includes('STU001');
      showToast('success', isRegistered ? 'Registration cancelled' : 'Registered successfully!');
      return {
        ...e,
        registeredStudents: isRegistered
          ? e.registeredStudents.filter(id => id !== 'STU001')
          : [...e.registeredStudents, 'STU001'],
      };
    }));
  };

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? e.eventType === typeFilter : true;
    const matchesStatus = statusFilter ? e.status === statusFilter : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="Sports & Events" subtitle={`${events.filter(e => e.status === 'upcoming').length} upcoming events`} />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search events..." className="flex-1" />
        <FilterDropdown
          label="Filter by Type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: 'sports', label: 'Sports' },
            { value: 'cultural', label: 'Cultural' },
            { value: 'academic', label: 'Academic' },
            { value: 'workshop', label: 'Workshop' },
            { value: 'seminar', label: 'Seminar' },
          ]}
        />
        <FilterDropdown
          label="Filter by Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'ongoing', label: 'Ongoing' },
            { value: 'completed', label: 'Completed' },
          ]}
        />
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map(e => (
            <EventCard
              key={e.id}
              event={e}
              isRegistered={e.registeredStudents.includes('STU001')}
              onToggleRegister={handleToggleRegister}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No events found" description="Try adjusting your search or filters." />
      )}
    </div>
  );
}
