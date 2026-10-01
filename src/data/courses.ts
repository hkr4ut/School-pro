import type { Course } from '../types';

// ============================================================
// Mock Courses — Student AI
// ============================================================

export const mockCourses: Course[] = [
  {
    id: 'CS201',
    code: 'CS201',
    name: 'Data Structures and Algorithms',
    description:
      'Study of fundamental data structures including arrays, linked lists, stacks, queues, trees, graphs, and their algorithms. Emphasis on algorithm analysis and design techniques.',
    creditHours: 3,
    semester: 4,
    professorId: 'PROF001',
    professorName: 'Dr. Ram Prasad Khanal',
    department: 'Computer Science',
    enrolledStudents: ['STU001', 'STU002', 'STU003', 'STU004'],
    schedule: 'Sun, Tue, Thu — 10:00 AM',
    status: 'active',
  },
  {
    id: 'CS202',
    code: 'CS202',
    name: 'Object Oriented Programming',
    description:
      'Introduction to object-oriented programming concepts using Java/C++. Topics include classes, objects, inheritance, polymorphism, encapsulation, and abstraction.',
    creditHours: 3,
    semester: 4,
    professorId: 'PROF002',
    professorName: 'Prof. Sunita Devi Maharjan',
    department: 'Computer Science',
    enrolledStudents: ['STU001', 'STU002', 'STU005'],
    schedule: 'Mon, Wed, Fri — 11:00 AM',
    status: 'active',
  },
  {
    id: 'CS203',
    code: 'CS203',
    name: 'Database Management System',
    description:
      'Covers relational database concepts, SQL, normalization, transaction management, and introduction to NoSQL databases.',
    creditHours: 3,
    semester: 4,
    professorId: 'PROF003',
    professorName: 'Mr. Suresh Basnet',
    department: 'Computer Science',
    enrolledStudents: ['STU001', 'STU002'],
    schedule: 'Sun, Tue — 2:00 PM',
    status: 'active',
  },
  {
    id: 'CS204',
    code: 'CS204',
    name: 'Computer Networks',
    description:
      'Study of network architecture, protocols, TCP/IP model, routing, switching, and network security fundamentals.',
    creditHours: 3,
    semester: 4,
    professorId: 'PROF003',
    professorName: 'Mr. Suresh Basnet',
    department: 'Information Technology',
    enrolledStudents: ['STU001', 'STU004'],
    schedule: 'Mon, Wed — 9:00 AM',
    status: 'active',
  },
  {
    id: 'CS205',
    code: 'CS205',
    name: 'Web Technology',
    description:
      'Introduction to web development technologies including HTML, CSS, JavaScript, and modern frameworks. Covers both client-side and server-side development.',
    creditHours: 3,
    semester: 4,
    professorId: 'PROF003',
    professorName: 'Mr. Suresh Basnet',
    department: 'Computer Science',
    enrolledStudents: ['STU001', 'STU002'],
    schedule: 'Thu, Fri — 1:00 PM',
    status: 'active',
  },
  {
    id: 'CS301',
    code: 'CS301',
    name: 'Artificial Intelligence',
    description:
      'Introduction to AI concepts including search algorithms, knowledge representation, machine learning basics, and neural networks.',
    creditHours: 3,
    semester: 6,
    professorId: 'PROF001',
    professorName: 'Dr. Ram Prasad Khanal',
    department: 'Computer Science',
    enrolledStudents: ['STU003', 'STU005'],
    schedule: 'Mon, Wed, Fri — 10:00 AM',
    status: 'active',
  },
  {
    id: 'CS302',
    code: 'CS302',
    name: 'Software Engineering',
    description:
      'Software development life cycle, agile methodologies, requirements engineering, software design patterns, testing, and project management.',
    creditHours: 3,
    semester: 6,
    professorId: 'PROF002',
    professorName: 'Prof. Sunita Devi Maharjan',
    department: 'Computer Science',
    enrolledStudents: ['STU003', 'STU005'],
    schedule: 'Tue, Thu — 11:00 AM',
    status: 'active',
  },
];
