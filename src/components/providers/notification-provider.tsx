'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useNotifications } from '@/hooks/use-notifications';

interface NotificationContextType {
  notifications: any[];
  unreadCount: number;
  settings: any;
  isLoading: boolean;
  addNotification: (notification: any) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  deleteAllNotifications: () => void;
  updateSettings: (data: any) => void;
  isMarkingAsRead: boolean;
  isUpdatingSettings: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const notifications = useNotifications();

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
} 