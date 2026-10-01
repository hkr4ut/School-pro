import { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/common/Button';
import FormInput from '../../components/forms/FormInput';
import ToastContainer from '../../components/common/Toast';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useMockData';

export default function Settings() {
  const { user } = useAuth();
  const { toasts, showToast, removeToast } = useToast();
  
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@university.edu',
    phone: user?.phone || '+1 234 567 8900',
    address: user?.address || '123 University Ave, City, Country'
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowStudentRegistration, setAllowStudentRegistration] = useState(true);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditProfile(false);
    showToast('success', 'Profile updated successfully');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showToast('error', 'Password must be at least 6 characters long');
      return;
    }
    setEditPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast('success', 'Password updated successfully');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title="Settings" />
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
          <Button variant="secondary" size="sm" onClick={() => setEditProfile(!editProfile)}>
            {editProfile ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
        
        {editProfile ? (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              <FormInput label="Email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
              <FormInput label="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <FormInput label="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{formData.address}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
          <Button variant="secondary" size="sm" onClick={() => setEditPassword(!editPassword)}>
            {editPassword ? 'Cancel' : 'Change Password'}
          </Button>
        </div>
        
        {editPassword && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            <FormInput label="Current Password" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} required />
            <FormInput label="New Password" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} required />
            <FormInput label="Confirm New Password" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} required />
            <div className="flex justify-end">
              <Button type="submit">Update Password</Button>
            </div>
          </form>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Enable email notifications</p>
              <p className="text-sm text-gray-500">Receive emails for system alerts and user reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={enableEmailNotifications} onChange={(e) => setEnableEmailNotifications(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Allow student registration</p>
              <p className="text-sm text-gray-500">Allow new students to register accounts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={allowStudentRegistration} onChange={(e) => setAllowStudentRegistration(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">Maintenance mode</p>
              <p className="text-sm text-gray-500">Disable access for non-admin users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
