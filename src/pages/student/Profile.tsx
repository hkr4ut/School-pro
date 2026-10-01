import { useState } from 'react';
import { Mail, Phone, MapPin, BookOpen, GraduationCap } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/common/Button';
import FormInput from '../../components/forms/FormInput';
import Badge from '../../components/common/Badge';
import ToastContainer from '../../components/common/Toast';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useMockData';
import { mockCourses } from '../../data/courses';
import { getInitials } from '../../utils/helpers';
import type { Student } from '../../types';

export default function Profile() {
  const { user } = useAuth();
  const { toasts, showToast, removeToast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);

  const student = user as Student;
  const enrolledCourses = mockCourses.filter(c => c.enrolledStudents?.includes(student?.id || 'STU001'));

  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    address: student?.address || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSaveProfile = () => {
    showToast('success', 'Profile updated successfully!');
    setEditMode(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword.length < 6) {
      showToast('error', 'Password must be at least 6 characters.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('error', 'Passwords do not match.');
      return;
    }
    showToast('success', 'Password changed successfully!');
    setPasswordMode(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <PageHeader title="My Profile" />

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            {getInitials(student?.name || 'S')}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{student?.name}</h2>
            <p className="text-sm text-gray-500">{student?.email}</p>
            <Badge variant="info" className="mt-1">Student</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <GraduationCap className="h-4 w-4 text-gray-400" />
            <span>ID: {student?.studentId}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BookOpen className="h-4 w-4 text-gray-400" />
            <span>{student?.program} — Semester {student?.semester}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{student?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{student?.phone || 'Not set'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{student?.address || 'Not set'}</span>
          </div>
          {student?.gpa && (
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-gray-400 font-medium">GPA:</span>
              <span className="font-semibold text-indigo-600">{student.gpa}</span>
            </div>
          )}
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrolled Courses ({enrolledCourses.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {enrolledCourses.map(c => (
            <div key={c.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{c.name}</p>
                <p className="text-xs text-gray-500">{c.code} • {c.creditHours} credits</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
          <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
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

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          <Button variant="outline" size="sm" onClick={() => setPasswordMode(!passwordMode)}>
            {passwordMode ? 'Cancel' : 'Change'}
          </Button>
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
