import { useState, useCallback } from 'react';
import { generateId } from '../utils/helpers';
import type { ToastMessage } from '../types';

// ============================================================
// useMockData — Generic CRUD hook for mock data management
// ============================================================

interface UseMockDataReturn<T extends { id: string }> {
  items: T[];
  addItem: (item: Omit<T, 'id'>) => T;
  updateItem: (id: string, updates: Partial<T>) => void;
  deleteItem: (id: string) => void;
  getById: (id: string) => T | undefined;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
}

export function useMockData<T extends { id: string }>(
  initialData: T[],
  idPrefix: string = 'ID'
): UseMockDataReturn<T> {
  const [items, setItems] = useState<T[]>(initialData);

  const addItem = useCallback(
    (item: Omit<T, 'id'>) => {
      const newItem = { ...item, id: generateId(idPrefix) } as T;
      setItems((prev) => [newItem, ...prev]);
      return newItem;
    },
    [idPrefix]
  );

  const updateItem = useCallback((id: string, updates: Partial<T>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getById = useCallback(
    (id: string) => {
      return items.find((item) => item.id === id);
    },
    [items]
  );

  return { items, addItem, updateItem, deleteItem, getById, setItems };
}

// ============================================================
// useToast — Toast notification hook
// ============================================================

interface UseToastReturn {
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], message: string) => void;
  removeToast: (id: string) => void;
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (type: ToastMessage['type'], message: string) => {
      const id = generateId('toast');
      const toast: ToastMessage = { id, type, message };
      setToasts((prev) => [...prev, toast]);

      // Auto-remove after 4 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}
