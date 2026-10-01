/* eslint-disable react/static-components */
import * as Icons from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  subtitle?: string;
}

function getIcon(name: string) {
  const IconComponent = (Icons as Record<string, any>)[name];
  return IconComponent || Icons.Circle;
}

export default function StatCard({ label, value, icon, color, subtitle }: StatCardProps) {
  const Icon = getIcon(icon);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
