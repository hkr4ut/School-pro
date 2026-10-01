import { useState, useMemo } from 'react';
import type { Notice } from '../../types';
import { formatDate } from '../../utils/helpers';
import { mockNotices } from '../../data/notices';
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

export default function Notices() {
  const { items: notices, addItem, updateItem, deleteItem } = useMockData<Notice>(mockNotices, 'NOT');
  const { toasts, showToast, removeToast } = useToast();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Notice | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [formData, setFormData] = useState<Partial<Notice>>({
    title: '', content: '', department: 'All', urgency: 'medium'
  });

  const uniqueDepartments = useMemo(() => {
    const depts = new Set(notices.map(n => n.department));
    return Array.from(depts);
  }, [notices]);

  const filteredData = useMemo(() => {
    return notices.filter(notice => {
      const matchesSearch = !searchTerm || ['title', 'content', 'publisherName'].some(field => 
        String((notice as any)[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesDepartment = departmentFilter ? notice.department === departmentFilter : true;
      const matchesUrgency = urgencyFilter ? notice.urgency === urgencyFilter : true;
      return matchesSearch && matchesDepartment && matchesUrgency;
    });
  }, [notices, searchTerm, departmentFilter, urgencyFilter]);
  
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'department', label: 'Department' },
    { key: 'urgency', label: 'Urgency', render: (n: Notice) => <StatusBadge status={n.urgency} /> },
    { key: 'publisherName', label: 'Publisher' },
    { key: 'publishedAt', label: 'Published Date', render: (n: Notice) => formatDate(n.publishedAt) },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: (n: Notice) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(n)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(n.id); setIsDeleteDialogOpen(true); }}>Delete</Button>
        </div>
      ) 
    }
  ];

  const handleEdit = (item: Notice) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', content: '', department: 'All', urgency: 'medium' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      publishedBy: editingItem ? editingItem.publishedBy : user?.id || 'admin',
      publisherName: editingItem ? editingItem.publisherName : user?.name || 'Admin',
      publishedAt: editingItem ? editingItem.publishedAt : new Date().toISOString()
    } as Notice;

    if (editingItem) {
      updateItem(editingItem.id, dataToSave);
      showToast('success', 'Notice updated successfully');
    } else {
      addItem(dataToSave);
      showToast('success', 'Notice created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Notice deleted successfully');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Notice Management" 
        actions={<Button onClick={handleOpenAdd}>Create Notice</Button>} 
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search notices..." />
        <FilterDropdown 
          label="Filter by Department" 
          options={[{label: 'All Departments', value: ''}, ...uniqueDepartments.map(d => ({label: d, value: d}))]}
          value={departmentFilter}
          onChange={setDepartmentFilter}
        />
        <FilterDropdown 
          label="Filter by Urgency" 
          options={[
            {label: 'All Urgencies', value: ''},
            {label: 'Low', value: 'low'},
            {label: 'Medium', value: 'medium'},
            {label: 'High', value: 'high'},
            {label: 'Urgent', value: 'urgent'}
          ]}
          value={urgencyFilter}
          onChange={setUrgencyFilter}
        />
      </div>
      
      <DataTable 
        columns={columns as any} 
        data={paginatedData} 
        keyField="id" 
        emptyMessage="No notices found." 
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
        title={editingItem ? 'Edit Notice' : 'Create Notice'}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <FormInput label="Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <FormTextArea label="Content" value={formData.content || ''} onChange={(e) => setFormData({...formData, content: e.target.value})} required />
          <FormSelect 
            label="Department" 
            options={[{label: 'All', value: 'All'}, {label: 'Computer Science', value: 'Computer Science'}, {label: 'Engineering', value: 'Engineering'}]}
            value={formData.department || 'All'}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            required
          />
          <FormSelect 
            label="Urgency" 
            options={[{label: 'Low', value: 'low'}, {label: 'Medium', value: 'medium'}, {label: 'High', value: 'high'}, {label: 'Urgent', value: 'urgent'}]}
            value={formData.urgency || 'medium'}
            onChange={(e) => setFormData({...formData, urgency: e.target.value as any})}
            required
          />
        </div>
      </FormModal>
      
      <ConfirmDialog 
        isOpen={isDeleteDialogOpen} 
        title="Delete Notice" 
        message="Are you sure you want to delete this notice? This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
