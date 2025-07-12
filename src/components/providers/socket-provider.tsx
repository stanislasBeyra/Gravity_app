'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSocket } from '@/hooks/use-socket';
import { Socket } from 'socket.io-client';
import { SocketMessage, TypingData, ConnectedUser } from '@/types/socket';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  sendGroupMessage: (groupId: string, message: string) => void;
  sendProjectMessage: (projectId: string, message: string) => void;
  joinRoom: (type: 'group' | 'project', id: string) => void;
  leaveRoom: (type: 'group' | 'project', id: string) => void;
  startTyping: (type: 'group' | 'project', id: string) => void;
  stopTyping: (type: 'group' | 'project', id: string) => void;
  onGroupMessage: (callback: (message: SocketMessage) => void) => void;
  onProjectMessage: (callback: (message: SocketMessage) => void) => void;
  onUserTyping: (callback: (data: TypingData) => void) => void;
  onUserConnected: (callback: (user: ConnectedUser) => void) => void;
  onUserDisconnected: (callback: (user: ConnectedUser) => void) => void;
  onNotification: (callback: (notification: { id: string; message: string; type: string }) => void) => void;
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