import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';

export default function ProfileDropdown() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (!user) return null;

  const profilePath = role === 'admin' ? '/admin/settings' : `/${role}/profile`;

  return (
    <div className="relative font-body" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#EFF1EE]"
      >
        <div className="h-8 w-8 rounded-full bg-[#17213A] text-white flex items-center justify-center text-sm font-medium">
          {getInitials(user.name)}
        </div>
        <span className="text-sm font-medium text-[#17213A] hidden sm:block">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#DCDFD8] py-1 z-50">
          <div className="px-4 py-3 border-b border-[#EFF1EE]">
            <p className="text-sm font-medium text-[#17213A]">{user.name}</p>
            <p className="text-xs text-[#8B93A0]">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-[#FCE9CE] text-[#8A5A17] text-xs rounded-full capitalize">{role}</span>
          </div>
          <button
            onClick={() => { navigate(profilePath); setIsOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#17213A] hover:bg-[#EFF1EE]"
          >
            <User className="h-4 w-4" /> Profile
          </button>
          {role === 'admin' && (
            <button
              onClick={() => { navigate('/admin/settings'); setIsOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#17213A] hover:bg-[#EFF1EE]"
            >
              <Settings className="h-4 w-4" /> Settings
            </button>
          )}
          <div className="border-t border-[#EFF1EE]">
            <button
              onClick={() => { logout(); navigate('/login'); setIsOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}