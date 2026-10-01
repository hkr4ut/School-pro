// ============================================================
// Student AI — TypeScript Interfaces
// ============================================================

export type UserRole = 'student' | 'professor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Student extends User {
  role: 'student';
  studentId: string;
  program: string;
  semester: number;
  enrolledCourses: string[]; // course IDs
  gpa?: number;
}

export interface Professor extends User {
  role: 'professor';
  professorId: string;
  department: string;
  designation: string;
  assignedCourses: string[]; // course IDs
}

export interface Admin extends User {
  role: 'admin';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  creditHours: number;
  semester: number;
  professorId: string;
  professorName: string;
  department: string;
  enrolledStudents: string[]; // student IDs
  schedule?: string;
  status: 'active' | 'inactive';
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  professorId: string;
  professorName: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  instructions: string;
  maxMarks: number;
  createdAt: string;
  status: 'active' | 'closed';
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  submittedAt: string;
  fileName?: string;
  fileUrl?: string;
  notes?: string;
  status: 'pending' | 'submitted' | 'late' | 'graded';
  grade?: number;
  maxMarks?: number;
  feedback?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  department: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  publishedBy: string;
  publisherName: string;
  publishedAt: string;
  expiresAt?: string;
  isRead?: boolean;
  attachmentUrl?: string;
}

export interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  examType: 'midterm' | 'final' | 'internal' | 'practical';
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  semester: number;
  instructions?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  uploadedBy: string;
  uploaderName: string;
  uploadedAt: string;
  fileType: 'pdf' | 'doc' | 'ppt' | 'video' | 'link' | 'notes';
  fileUrl?: string;
  fileSize?: string;
}

export interface SportEvent {
  id: string;
  title: string;
  description: string;
  eventType: 'sports' | 'cultural' | 'academic' | 'workshop' | 'seminar';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  organizerName: string;
  maxParticipants?: number;
  registeredStudents: string[]; // student IDs
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  imageUrl?: string;
}

export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  semester: number;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  gradePoint: number;
  remarks?: string;
  publishedAt: string;
}

// Navigation item for sidebar
export interface NavItem {
  label: string;
  path: string;
  icon: string; // lucide icon name
}

// Translation dictionary entry
export interface TranslationEntry {
  english: string;
  nepali: string;
  category: string;
}

// Toast notification
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

// Table column definition
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

// Filter option
export interface FilterOption {
  label: string;
  value: string;
}

// Pagination state
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
