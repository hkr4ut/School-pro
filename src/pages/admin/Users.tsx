import { useState, useMemo } from 'react';
import type { User, UserRole } from '../../types';
import { mockStudents, mockProfessors, mockAdmins } from '../../data/users';
import { useMockData, useToast } from '../../hooks/useMockData';
import { searchFilter } from '../../utils/helpers';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterDropdown from '../../components/common/FilterDropdown';
import Button from '../../components/common/Button';
import DataTable from '../../components/tables/DataTable';
import FormModal from '../../components/modals/FormModal';
import FormInput from '../../components/forms/FormInput';
import FormSelect from '../../components/forms/FormSelect';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import StatusBadge from '../../components/common/StatusBadge';
import ToastContainer from '../../components/common/Toast';

const allMockUsers: User[] = [...mockStudents, ...mockProfessors, ...mockAdmins];

export default function Users() {
  const { items: users, addItem, updateItem, deleteItem } = useMockData<User>(allMockUsers, 'USR');
  const { toasts, showToast, removeToast } = useToast();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', email: '', role: 'student' as string, status: 'active' as string,
  });

  const filteredUsers = useMemo(() => {
    let result = searchFilter(users, search, ['name', 'email']);
    if (roleFilter) result = result.filter(u => u.role === roleFilter);
    return result;
  }, [users, search, roleFilter]);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'student', status: 'active' });
    setIsFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      ...formData,
      role: formData.role as UserRole,
      status: formData.status as 'active' | 'inactive',
      createdAt: editingUser ? editingUser.createdAt : new Date().toISOString(),
    } as User;

    if (editingUser) {
      updateItem(editingUser.id, userData);
      showToast('success', 'User updated successfully');
    } else {
      addItem(userData);
      showToast('success', 'User created successfully');
    }
    setIsFormOpen(false);
  };

  const handleDelete = () => {
    if (userToDelete) {
      deleteItem(userToDelete);
      showToast('success', 'User deleted successfully');
      setIsDeleteOpen(false);
      setUserToDelete(null);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (u: User) => <span className="capitalize">{u.role}</span> },
    { key: 'status', label: 'Status', render: (u: User) => <StatusBadge status={u.status} /> },
    {
      key: 'actions', label: 'Actions', render: (u: User) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(u)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => { setUserToDelete(u.id); setIsDeleteOpen(true); }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        subtitle="Manage all students, professors, and admins"
        actions={<Button onClick={handleOpenAdd}>Add User</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search users..." />
        <FilterDropdown
          label="Filter by Role"
          options={[
            { label: 'All Roles', value: '' },
            { label: 'Student', value: 'student' },
            { label: 'Professor', value: 'professor' },
            { label: 'Admin', value: 'admin' },
          ]}
          value={roleFilter}
          onChange={setRoleFilter}
        />
      </div>

      <DataTable columns={columns as any} data={filteredUsers} keyField="id" emptyMessage="No users found." />

      <FormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingUser ? 'Edit User' : 'Add User'}
        onSubmit={handleSubmit}
        submitLabel={editingUser ? 'Update' : 'Create'}
      >
        <div className="space-y-4">
          <FormInput label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <FormInput label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <FormSelect
            label="Role"
            options={[{ label: 'Student', value: 'student' }, { label: 'Professor', value: 'professor' }, { label: 'Admin', value: 'admin' }]}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <FormSelect
            label="Status"
            options={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
        </div>
      </FormModal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setUserToDelete(null); }}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        variant="danger"
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
