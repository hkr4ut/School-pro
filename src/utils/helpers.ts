// ============================================================
// Student AI — Utility Helpers
// ============================================================

/**
 * Format a date string to a readable format.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date string to include time.
 */
export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get relative time (e.g., "2 days ago", "in 3 days").
 */
export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0) return `In ${diffDays} days`;
  return `${Math.abs(diffDays)} days ago`;
}

/**
 * Check if a date is in the past.
 */
export function isPastDate(dateStr: string): boolean {
  return new Date(dateStr) < new Date();
}

/**
 * Check if a date is in the future.
 */
export function isFutureDate(dateStr: string): boolean {
  return new Date(dateStr) > new Date();
}

/**
 * Filter items by search text across multiple fields.
 */
export function searchFilter<T>(
  items: T[],
  searchText: string,
  fields: (keyof T)[]
): T[] {
  if (!searchText.trim()) return items;
  const lower = searchText.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lower);
      }
      return false;
    })
  );
}

/**
 * Generate a unique ID for mock data.
 */
export function generateId(prefix: string = 'ID'): string {
  return `${prefix}${Date.now()}${Math.random().toString(36).substring(2, 6)}`;
}

/**
 * Truncate text to a maximum length.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trimEnd() + '...';
}

/**
 * Get initials from a name (for avatars).
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Calculate percentage.
 */
export function calcPercentage(obtained: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((obtained / total) * 100);
}

/**
 * Get grade color class based on grade.
 */
export function getGradeColor(grade: string): string {
  switch (grade) {
    case 'A+':
    case 'A':
      return 'text-emerald-600';
    case 'A-':
    case 'B+':
      return 'text-blue-600';
    case 'B':
    case 'B-':
      return 'text-indigo-600';
    case 'C+':
    case 'C':
      return 'text-amber-600';
    default:
      return 'text-rose-600';
  }
}

/**
 * Get priority color class.
 */
export function getPriorityColor(priority: 'low' | 'medium' | 'high'): string {
  switch (priority) {
    case 'high':
      return 'bg-rose-100 text-rose-700';
    case 'medium':
      return 'bg-amber-100 text-amber-700';
    case 'low':
      return 'bg-emerald-100 text-emerald-700';
  }
}

/**
 * Get urgency color class.
 */
export function getUrgencyColor(
  urgency: 'low' | 'medium' | 'high' | 'urgent'
): string {
  switch (urgency) {
    case 'urgent':
      return 'bg-rose-100 text-rose-700';
    case 'high':
      return 'bg-orange-100 text-orange-700';
    case 'medium':
      return 'bg-amber-100 text-amber-700';
    case 'low':
      return 'bg-sky-100 text-sky-700';
  }
}

/**
 * Get submission status color class.
 */
export function getStatusColor(
  status: 'pending' | 'submitted' | 'late' | 'graded'
): string {
  switch (status) {
    case 'graded':
      return 'bg-emerald-100 text-emerald-700';
    case 'submitted':
      return 'bg-blue-100 text-blue-700';
    case 'late':
      return 'bg-rose-100 text-rose-700';
    case 'pending':
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Get event type color class.
 */
export function getEventTypeColor(
  type: 'sports' | 'cultural' | 'academic' | 'workshop' | 'seminar'
): string {
  switch (type) {
    case 'sports':
      return 'bg-emerald-100 text-emerald-700';
    case 'cultural':
      return 'bg-purple-100 text-purple-700';
    case 'academic':
      return 'bg-blue-100 text-blue-700';
    case 'workshop':
      return 'bg-amber-100 text-amber-700';
    case 'seminar':
      return 'bg-indigo-100 text-indigo-700';
  }
}

/**
 * Get file type icon color.
 */
export function getFileTypeColor(
  type: 'pdf' | 'doc' | 'ppt' | 'video' | 'link' | 'notes'
): string {
  switch (type) {
    case 'pdf':
      return 'text-rose-500';
    case 'doc':
      return 'text-blue-500';
    case 'ppt':
      return 'text-orange-500';
    case 'video':
      return 'text-purple-500';
    case 'link':
      return 'text-emerald-500';
    case 'notes':
      return 'text-gray-500';
  }
}

/**
 * Paginate an array.
 */
export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): { data: T[]; totalPages: number } {
  const totalPages = Math.ceil(items.length / perPage);
  const start = (page - 1) * perPage;
  const data = items.slice(start, start + perPage);
  return { data, totalPages };
}

/**
 * Class name helper — join class names, filtering falsy values.
 */
export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
