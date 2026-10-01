import Badge from './Badge';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

function getVariant(status: string): 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' {
  switch (status.toLowerCase()) {
    case 'active':
    case 'completed':
    case 'graded':
    case 'published':
      return 'success';
    case 'submitted':
    case 'upcoming':
    case 'ongoing':
      return 'info';
    case 'pending':
    case 'medium':
      return 'warning';
    case 'late':
    case 'overdue':
    case 'urgent':
    case 'high':
    case 'cancelled':
    case 'inactive':
    case 'closed':
      return 'danger';
    case 'low':
      return 'default';
    default:
      return 'default';
  }
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant={getVariant(status)} className={className}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
