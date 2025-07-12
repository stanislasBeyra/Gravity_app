import { useEffect, useRef, useCallback } from 'react'
import { useAuthStore } from '@/store/auth-store'
import { socketManager } from '@/lib/socket'
import { Socket } from 'socket.io-client'
import { SocketMessage, TypingData, ConnectedUser } from '@/types/socket'

export function useSocket() {
  const { token, isAuthenticated } = useAuthStore()
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (isAuthenticated && token) {
      socketRef.current = socketManager.connect(token)
    } else {
      socketManager.disconnect()
      socketRef.current = null
    }

    return () => {
      if (!isAuthenticated) {
        socketManager.disconnect()
      }
    }
  }, [isAuthenticated, token])

  const sendGroupMessage = useCallback((groupId: string, message: string) => {
    socketManager.sendGroupMessage(groupId, message)
  }, [])

  const sendProjectMessage = useCallback((projectId: string, message: string) => {
    socketManager.sendProjectMessage(projectId, message)
  }, [])

  const joinRoom = useCallback((type: 'group' | 'project', id: string) => {
    socketManager.joinRoom(type, id)
  }, [])

  const leaveRoom = useCallback((type: 'group' | 'project', id: string) => {
    socketManager.leaveRoom(type, id)
  }, [])

  const startTyping = useCallback((type: 'group' | 'project', id: string) => {
    socketManager.startTyping(type, id)
  }, [])

  const stopTyping = useCallback((type: 'group' | 'project', id: string) => {
    socketManager.stopTyping(type, id)
  }, [])

  const onGroupMessage = useCallback((callback: (message: SocketMessage) => void) => {
    socketManager.onGroupMessage((msg: unknown) => callback(msg as SocketMessage))
  }, [])

  const onProjectMessage = useCallback((callback: (message: SocketMessage) => void) => {
    socketManager.onProjectMessage((msg: unknown) => callback(msg as SocketMessage))
  }, [])

  const onUserTyping = useCallback((callback: (data: TypingData) => void) => {
    socketManager.onUserTyping((data: unknown) => callback(data as TypingData))
  }, [])

  const onUserConnected = useCallback((callback: (user: ConnectedUser) => void) => {
    socketManager.onUserConnected((user: unknown) => callback(user as ConnectedUser))
  }, [])

  const onUserDisconnected = useCallback((callback: (user: ConnectedUser) => void) => {
    socketManager.onUserDisconnected((user: unknown) => callback(user as ConnectedUser))
  }, [])

  const onNotification = useCallback((callback: (notification: { id: string; message: string; type: string }) => void) => {
    socketManager.onNotification(callback)
  }, [])

  return {
    socket: socketRef.current,
    isConnected: socketRef.current?.connected || false,
    sendGroupMessage,
    sendProjectMessage,
    joinRoom,
    leaveRoom,
    startTyping,
    stopTyping,
    onGroupMessage,
    onProjectMessage,
    onUserTyping,
    onUserConnected,
    onUserDisconnected,
    onNotification,
  }
} 