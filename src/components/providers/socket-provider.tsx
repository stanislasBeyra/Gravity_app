'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSocket } from '@/hooks/use-socket';

interface SocketContextType {
  socket: any;
  isConnected: boolean;
  sendGroupMessage: (groupId: string, message: string) => void;
  sendProjectMessage: (projectId: string, message: string) => void;
  joinRoom: (type: 'group' | 'project', id: string) => void;
  leaveRoom: (type: 'group' | 'project', id: string) => void;
  startTyping: (type: 'group' | 'project', id: string) => void;
  stopTyping: (type: 'group' | 'project', id: string) => void;
  onGroupMessage: (callback: (message: any) => void) => void;
  onProjectMessage: (callback: (message: any) => void) => void;
  onUserTyping: (callback: (data: any) => void) => void;
  onUserConnected: (callback: (user: any) => void) => void;
  onUserDisconnected: (callback: (user: any) => void) => void;
  onNotification: (callback: (notification: any) => void) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const socket = useSocket();

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
} 