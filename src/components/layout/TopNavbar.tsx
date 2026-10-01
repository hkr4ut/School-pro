import { Menu, Bell } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

interface TopNavbarProps {
  onMenuClick: () => void;
  title?: string;
}

export default function TopNavbar({ onMenuClick, title }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#DCDFD8] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-[#5B6472] hover:bg-[#EFF1EE]"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          {title && <h1 className="font-display text-lg text-[#17213A] hidden sm:block">{title}</h1>}
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg text-[#5B6472] hover:bg-[#EFF1EE]" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-rose-500 rounded-full" />
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}