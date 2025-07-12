'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { AuthProvider } from './auth-provider';
import { QueryProvider } from './query-provider';
import { NotificationProvider } from './notification-provider';
import { SocketProvider } from './socket-provider';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="gruvity-ui-theme">
      <QueryProvider>
        <AuthProvider>
          <NotificationProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </NotificationProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
} 