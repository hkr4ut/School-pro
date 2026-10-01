import { useState } from 'react';
import { Mail, Phone, MapPin, BookOpen } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/common/Button';
import FormInput from '../../components/forms/FormInput';
import Badge from '../../components/common/Badge';
import CourseCard from '../../components/cards/CourseCard';
import ToastContainer from '../../components/common/Toast';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useMockData';
import { mockCourses } from '../../data/courses';
import { getInitials } from '../../utils/helpers';
import type { Professor } from '../../types';

export default function Profile() {
  const { user } = useAuth();
  const { toasts, showToast, removeToast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  const professor = user as Professor;
  const myCourses = mockCourses.filter(c => c.professorId === (professor?.id || 'PROF001'));

  const [formData, setFormData] = useState({
    name: professor?.name || '',
    email: professor?.email || '',
    phone: professor?.phone || '',
    address: professor?.address || '',
  });

  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const handleSaveProfile = () => { showToast('success', 'Profile updated!'); setEditMode(false); };

  const handleChangePassword = () => {
    if (passwordData.newPassword.length < 6) { showToast('error', 'Password must be at least 6 characters.'); return; }
    if (passwordData.newPassword !== passwordData.confirmPassword) { showToast('error', 'Passwords do not match.'); return; }
    showToast('success', 'Password changed!');
    setPasswordMode(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="My Profile" />

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            {getInitials(professor?.name || 'P')}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{professor?.name}</h2>
            <p className="text-sm text-gray-500">{professor?.email}</p>
            <Badge variant="purple" className="mt-1">Professor</Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-gray-400" />ID: {professor?.professorId}</div>
          <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-gray-400" />{professor?.department}</div>
          <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-gray-400" />{professor?.designation}</div>
          <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-400" />{professor?.email}</div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-400" />{professor?.phone || 'Not set'}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-400" />{professor?.address || 'Not set'}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Courses ({myCourses.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {myCourses.map(c => <CourseCard key={c.id} course={c} linkPrefix="/professor/courses" />)}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
          <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel' : 'Edit'}</Button>
        </div>
        {editMode && (
          <div className="space-y-4">
            <FormInput label="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <FormInput label="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            <FormInput label="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            <FormInput label="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          <Button variant="outline" size="sm" onClick={() => setPasswordMode(!passwordMode)}>{passwordMode ? 'Cancel' : 'Change'}</Button>
        </div>
        {passwordMode && (
          <div className="space-y-4">
            <FormInput label="Current Password" type="password" value={passwordData.currentPassword} onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
            <FormInput label="New Password" type="password" value={passwordData.newPassword} onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
            <FormInput label="Confirm Password" type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} />
            <Button onClick={handleChangePassword}>Update Password</Button>
          </div>
        )}
      </div>
    </div>
  );
}
