import { create } from 'zustand'
import { ConnectionStatus, SocketState } from '@/types/socket'

interface SocketStore extends SocketState {
  // Actions de connexion
  setConnectionStatus: (status: ConnectionStatus) => void
  setConnected: (connected: boolean) => void
  setError: (error: string | undefined) => void
  incrementReconnectAttempts: () => void
  resetReconnectAttempts: () => void
  setLastConnected: (timestamp: string | undefined) => void
  
  // Actions pour les salons
  joinedRooms: Set<string>
  addJoinedRoom: (room: string) => void
  removeJoinedRoom: (room: string) => void
  clearJoinedRooms: () => void
  
  // Utilisateurs en ligne
  onlineUsers: Map<string, { id: string; name: string; avatar?: string }>
  setOnlineUsers: (users: Map<string, { id: string; name: string; avatar?: string }>) => void
  addOnlineUser: (userId: string, user: { id: string; name: string; avatar?: string }) => void
  removeOnlineUser: (userId: string) => void
  
  // Utilisateurs en train de taper
  typingUsers: Map<string, boolean>
  setUserTyping: (userId: string, isTyping: boolean) => void
  clearTypingUsers: () => void
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  // État initial
  isConnected: false,
  connectionStatus: 'disconnected',
  error: undefined,
  lastConnected: undefined,
  reconnectAttempts: 0,
  joinedRooms: new Set(),
  onlineUsers: new Map(),
  typingUsers: new Map(),

  // Actions de connexion
  setConnectionStatus: (status) => {
    set({ connectionStatus: status })
  },

  setConnected: (connected) => {
    set({ 
      isConnected: connected,
      connectionStatus: connected ? 'connected' : 'disconnected',
      error: connected ? undefined : get().error,
    })
  },

  setError: (error: string | undefined) => set({ error }),

  incrementReconnectAttempts: () => {
    set((state) => ({ reconnectAttempts: state.reconnectAttempts + 1 }))
  },

  resetReconnectAttempts: () => {
    set({ reconnectAttempts: 0 })
  },

  setLastConnected: (timestamp: string | undefined) => set({ lastConnected: timestamp }),

  // Actions pour les salons
  addJoinedRoom: (room) => {
    set((state) => ({
      joinedRooms: new Set(state.joinedRooms).add(room),
    }))
  },

  removeJoinedRoom: (room) => {
    set((state) => {
      const newRooms = new Set(state.joinedRooms)
      newRooms.delete(room)
      return { joinedRooms: newRooms }
    })
  },

  clearJoinedRooms: () => {
    set({ joinedRooms: new Set() })
  },

  // Utilisateurs en ligne
  setOnlineUsers: (users) => {
    set({ onlineUsers: users })
  },

  addOnlineUser: (userId, user) => {
    set((state) => {
      const newUsers = new Map(state.onlineUsers)
      newUsers.set(userId, user)
      return { onlineUsers: newUsers }
    })
  },

  removeOnlineUser: (userId) => {
    set((state) => {
      const newUsers = new Map(state.onlineUsers)
      newUsers.delete(userId)
      return { onlineUsers: newUsers }
    })
  },

  // Utilisateurs en train de taper
  setUserTyping: (userId, isTyping) => {
    set((state) => {
      const newTypingUsers = new Map(state.typingUsers)
      if (isTyping) {
        newTypingUsers.set(userId, true)
      } else {
        newTypingUsers.delete(userId)
      }
      return { typingUsers: newTypingUsers }
    })
  },

  clearTypingUsers: () => {
    set({ typingUsers: new Map() })
  },
})) 