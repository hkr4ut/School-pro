import { NavLink } from 'react-router-dom';
import { X, GraduationCap } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cn } from '../../utils/helpers';

interface SidebarItem {
  label: string;
  path: string;
  icon: string;
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onClose: () => void;
  roleLabel: string;
}

function getIcon(name: string) {
  const IconComponent = (Icons as Record<string, any>)[name];
  return IconComponent || Icons.Circle;
}

export default function Sidebar({ items, isOpen, onClose, roleLabel }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-[#17213A] text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2C3B5C]">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-[#E29B3E]" />
            <div>
              <h1 className="font-display text-lg text-white">Student AI</h1>
              <p className="font-body text-xs text-[#AEB6C4]">{roleLabel} Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-[#243252]" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-80px)] font-body">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#E29B3E] text-[#17213A]'
                      : 'text-[#C4CAD5] hover:bg-[#243252] hover:text-white'
                  )
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}