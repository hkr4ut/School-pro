/* eslint-disable react/only-export-components */
import React, { createContext, useState, useCallback } from 'react';
import type { UserRole, User, Student, Professor, Admin } from '../types';
import { mockStudents, mockProfessors, mockAdmins } from '../data/users';

// ============================================================
// Auth Context — Mock Authentication for Student AI
// ============================================================

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Get a demo user for a given role
function getDemoUser(role: UserRole): Student | Professor | Admin {
  switch (role) {
    case 'student':
      return mockStudents[0]; // Aarav Sharma
    case 'professor':
      return mockProfessors[0]; // Dr. Ram Prasad Khanal
    case 'admin':
      return mockAdmins[0]; // Admin User
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const login = useCallback((selectedRole: UserRole) => {
    const demoUser = getDemoUser(selectedRole);
    setUser(demoUser);
    setRole(selectedRole);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
