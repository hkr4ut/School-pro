import type { Student, Professor, Admin, User } from '../types';

export const mockStudents: Student[] = [
  { id: 'STU001', name: 'Aarav Sharma', email: 'aarav.sharma@student.edu.np', role: 'student', studentId: 'STU001', program: 'Computer Science', semester: 4, enrolledCourses: ['CS201', 'CS202', 'CS203', 'CS204', 'CS205'], gpa: 3.6, createdAt: '2024-08-15T10:00:00Z', status: 'active' },
  { id: 'STU002', name: 'Sita Adhikari', email: 'sita.adhikari@student.edu.np', role: 'student', studentId: 'STU002', program: 'Computer Science', semester: 4, enrolledCourses: ['CS201', 'CS202', 'CS203'], gpa: 3.8, createdAt: '2024-08-15T10:00:00Z', status: 'active' },
  { id: 'STU003', name: 'Bikash Thapa', email: 'bikash.thapa@student.edu.np', role: 'student', studentId: 'STU003', program: 'Computer Science', semester: 4, enrolledCourses: ['CS201', 'CS204', 'CS205'], gpa: 3.2, createdAt: '2024-08-15T10:00:00Z', status: 'active' },
  { id: 'STU004', name: 'Priya Gurung', email: 'priya.gurung@student.edu.np', role: 'student', studentId: 'STU004', program: 'IT', semester: 6, enrolledCourses: ['CS301', 'CS302'], gpa: 3.5, createdAt: '2024-02-10T10:00:00Z', status: 'active' },
  { id: 'STU005', name: 'Rajan Poudel', email: 'rajan.poudel@student.edu.np', role: 'student', studentId: 'STU005', program: 'Computer Science', semester: 6, enrolledCourses: ['CS301', 'CS302'], gpa: 3.1, createdAt: '2024-02-10T10:00:00Z', status: 'active' },
  { id: 'STU006', name: 'Anisha Rai', email: 'anisha.rai@student.edu.np', role: 'student', studentId: 'STU006', program: 'IT', semester: 2, enrolledCourses: [], gpa: 3.9, createdAt: '2025-08-15T10:00:00Z', status: 'active' },
  { id: 'STU007', name: 'Dipesh Karki', email: 'dipesh.karki@student.edu.np', role: 'student', studentId: 'STU007', program: 'Mathematics', semester: 4, enrolledCourses: ['CS203'], gpa: 2.8, createdAt: '2024-08-15T10:00:00Z', status: 'inactive' },
  { id: 'STU008', name: 'Kabita Shrestha', email: 'kabita.shrestha@student.edu.np', role: 'student', studentId: 'STU008', program: 'Engineering', semester: 2, enrolledCourses: [], gpa: 3.4, createdAt: '2025-08-15T10:00:00Z', status: 'active' },
];

export const mockProfessors: Professor[] = [
  { id: 'PROF001', name: 'Dr. Ram Prasad Khanal', email: 'ram.khanal@college.edu.np', role: 'professor', professorId: 'PROF001', department: 'Computer Science', designation: 'Professor', assignedCourses: ['CS201', 'CS301'], createdAt: '2020-01-10T10:00:00Z', status: 'active' },
  { id: 'PROF002', name: 'Dr. Sunita Maharjan', email: 'sunita.maharjan@college.edu.np', role: 'professor', professorId: 'PROF002', department: 'Computer Science', designation: 'Associate Professor', assignedCourses: ['CS202', 'CS302'], createdAt: '2019-06-15T10:00:00Z', status: 'active' },
  { id: 'PROF003', name: 'Suresh Basnet', email: 'suresh.basnet@college.edu.np', role: 'professor', professorId: 'PROF003', department: 'Computer Science', designation: 'Assistant Professor', assignedCourses: ['CS203', 'CS204', 'CS205'], createdAt: '2021-03-20T10:00:00Z', status: 'active' },
  { id: 'PROF004', name: 'Dr. Meena Tamang', email: 'meena.tamang@college.edu.np', role: 'professor', professorId: 'PROF004', department: 'Mathematics', designation: 'Professor', assignedCourses: [], createdAt: '2018-07-01T10:00:00Z', status: 'active' },
  { id: 'PROF005', name: 'Rajesh Bhandari', email: 'rajesh.bhandari@college.edu.np', role: 'professor', professorId: 'PROF005', department: 'Engineering', designation: 'Lecturer', assignedCourses: [], createdAt: '2022-09-01T10:00:00Z', status: 'inactive' },
];

export const mockAdmins: Admin[] = [
  { id: 'ADM001', name: 'Prakash Acharya', email: 'admin@college.edu.np', role: 'admin', createdAt: '2019-01-01T10:00:00Z', status: 'active' },
  { id: 'ADM002', name: 'Kamala Devi Pandit', email: 'kamala.pandit@college.edu.np', role: 'admin', createdAt: '2020-06-15T10:00:00Z', status: 'active' },
];

// Combined list for admin user management
export const mockAllUsers: User[] = [...mockStudents, ...mockProfessors, ...mockAdmins];
