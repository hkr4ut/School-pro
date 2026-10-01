import { useState, useMemo } from 'react';
import type { StudyMaterial } from '../../types';
import { formatDate } from '../../utils/helpers';
import { mockStudyMaterials } from '../../data/studyMaterials';
import { mockCourses } from '../../data/courses';
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

export default function StudyMaterials() {
  const { items: materials, addItem, updateItem, deleteItem } = useMockData<StudyMaterial>(mockStudyMaterials, 'MAT');
  const { toasts, showToast, removeToast } = useToast();
  const { user } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StudyMaterial | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [formData, setFormData] = useState<Partial<StudyMaterial>>({
    title: '', description: '', courseId: '', fileType: 'pdf', fileSize: ''
  });

  const filteredData = useMemo(() => {
    return materials.filter(mat => {
      const matchesSearch = !searchTerm || ['title', 'courseName', 'uploaderName'].some(field => 
        String((mat as any)[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCourse = courseFilter ? mat.courseId === courseFilter : true;
      const matchesFileType = fileTypeFilter ? mat.fileType === fileTypeFilter : true;
      return matchesSearch && matchesCourse && matchesFileType;
    });
  }, [materials, searchTerm, courseFilter, fileTypeFilter]);
  
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'courseName', label: 'Course' },
    { key: 'fileType', label: 'Type', render: (m: StudyMaterial) => <StatusBadge status={m.fileType} /> },
    { key: 'uploaderName', label: 'Uploaded By' },
    { key: 'uploadedAt', label: 'Date', render: (m: StudyMaterial) => formatDate(m.uploadedAt) },
    { key: 'fileSize', label: 'File Size' },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: (m: StudyMaterial) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(m)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setItemToDelete(m.id); setIsDeleteDialogOpen(true); }}>Delete</Button>
        </div>
      ) 
    }
  ];

  const handleEdit = (item: StudyMaterial) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', courseId: '', fileType: 'pdf', fileSize: '' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const course = mockCourses.find(c => c.id === formData.courseId);
    const dataToSave = {
      ...formData,
      courseName: course?.name,
      courseCode: course?.code,
      uploadedBy: editingItem ? editingItem.uploadedBy : user?.id || 'admin',
      uploaderName: editingItem ? editingItem.uploaderName : user?.name || 'Admin',
      uploadedAt: editingItem ? editingItem.uploadedAt : new Date().toISOString()
    } as StudyMaterial;

    if (editingItem) {
      updateItem(editingItem.id, dataToSave);
      showToast('success', 'Study material updated successfully');
    } else {
      addItem(dataToSave);
      showToast('success', 'Study material added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete);
      showToast('success', 'Study material deleted successfully');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Study Material Management" 
        actions={<Button onClick={handleOpenAdd}>Add Material</Button>} 
      />
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search materials..." />
        <FilterDropdown 
          label="Filter by Course" 
          options={[{label: 'All Courses', value: ''}, ...mockCourses.map(c => ({label: c.name, value: c.id}))]}
          value={courseFilter}
          onChange={setCourseFilter}
        />
        <FilterDropdown 
          label="Filter by Type" 
          options={[
            {label: 'All Types', value: ''},
            {label: 'PDF', value: 'pdf'},
            {label: 'Document', value: 'doc'},
            {label: 'Presentation', value: 'ppt'},
            {label: 'Video', value: 'video'},
            {label: 'Link', value: 'link'},
            {label: 'Notes', value: 'notes'}
          ]}
          value={fileTypeFilter}
          onChange={setFileTypeFilter}
        />
      </div>
      
      <DataTable 
        columns={columns as any} 
        data={paginatedData} 
        keyField="id" 
        emptyMessage="No study materials found." 
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
        title={editingItem ? 'Edit Material' : 'Add Material'}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <FormInput label="Title" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          <FormTextArea label="Description" value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          <FormSelect 
            label="Course" 
            options={mockCourses.map(c => ({label: c.name, value: c.id}))}
            value={formData.courseId || ''}
            onChange={(e) => setFormData({...formData, courseId: e.target.value})}
            placeholder="Select a course"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect 
              label="File Type" 
              options={[
                {label: 'PDF', value: 'pdf'}, {label: 'Document', value: 'doc'}, 
                {label: 'Presentation', value: 'ppt'}, {label: 'Video', value: 'video'}, 
                {label: 'Link', value: 'link'}, {label: 'Notes', value: 'notes'}
              ]}
              value={formData.fileType || 'pdf'}
              onChange={(e) => setFormData({...formData, fileType: e.target.value as any})}
              required
            />
            <FormInput label="File Size (e.g. 2.5 MB)" value={formData.fileSize || ''} onChange={(e) => setFormData({...formData, fileSize: e.target.value})} />
          </div>
        </div>
      </FormModal>
      
      <ConfirmDialog 
        isOpen={isDeleteDialogOpen} 
        title="Delete Material" 
        message="Are you sure you want to delete this study material? This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
