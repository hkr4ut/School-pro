import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import NoticeCard from '../../components/cards/NoticeCard';
import EmptyState from '../../components/common/EmptyState';
import { mockNotices } from '../../data/notices';

export default function Notices() {
  const [notices, setNotices] = useState(mockNotices);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');

  const handleMarkRead = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const unreadCount = notices.filter(n => !n.isRead).length;

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchesDept = departmentFilter ? n.department === departmentFilter : true;
    const matchesUrgency = urgencyFilter ? n.urgency === urgencyFilter : true;
    return matchesSearch && matchesDept && matchesUrgency;
  });

  const departments = [...new Set(notices.map(n => n.department))];

  return (
    <div className="space-y-6">
      <PageHeader title="Notices" subtitle={`${unreadCount} unread notices`} />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search notices..." className="flex-1" />
        <FilterDropdown
          label="Filter by Department"
          value={departmentFilter}
          onChange={setDepartmentFilter}
          options={departments.map(d => ({ value: d, label: d }))}
        />
        <FilterDropdown
          label="Filter by Urgency"
          value={urgencyFilter}
          onChange={setUrgencyFilter}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'urgent', label: 'Urgent' },
          ]}
        />
      </div>

      {filteredNotices.length > 0 ? (
        <div className="space-y-3">
          {filteredNotices.map(n => (
            <NoticeCard key={n.id} notice={n} linkPrefix="/student/notices" onMarkRead={handleMarkRead} />
          ))}
        </div>
      ) : (
        <EmptyState title="No notices found" description="Try adjusting your search or filters." />
      )}
    </div>
  );
}
