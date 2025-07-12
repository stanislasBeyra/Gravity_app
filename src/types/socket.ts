import { NotificationType } from './notification'

export interface SocketEvents {
  // Événements de connexion
  connect: () => void
  disconnect: () => void
  connected: (data: { message: string; userId: string }) => void
  error: (error: { message: string }) => void

  // Événements de messages
  sendGroupMessage: (data: { groupId: string; message: string }) => void
  sendProjectMessage: (data: { projectId: string; message: string }) => void
  newGroupMessage: (message: SocketMessage) => void
  newProjectMessage: (message: SocketMessage) => void

  // Événements de salons
  joinRoom: (data: { type: 'group' | 'project'; id: string }) => void
  leaveRoom: (data: { type: 'group' | 'project'; id: string }) => void
  roomJoined: (data: { room: string; type: string; id: string }) => void
  roomLeft: (data: { room: string; type: string; id: string }) => void

  // Événements de frappe
  typing: (data: { type: 'group' | 'project'; id: string; isTyping: boolean }) => void
  userTyping: (data: TypingData) => void

  // Événements d'utilisateurs
  userConnected: (user: ConnectedUser) => void
  userDisconnected: (user: { userId: string; timestamp: string }) => void
  getRoomUsers: (data: { type: 'group' | 'project'; id: string }) => void
  roomUsers: (data: { room: string; users: ConnectedUser[]; count: number }) => void

  // Événements de notifications
  notification: (notification: SocketNotification) => void
}

export interface SocketMessage {
  id: string
  message: string
  sender: {
    id: string
    firstname: string
    lastname: string
  }
  groupId?: string
  projectId?: string
  groupName?: string
  projectName?: string
  createdAt: string
  type: 'group' | 'project'
}

export interface TypingData {
  userId: string
  isTyping: boolean
  roomType: 'group' | 'project'
  roomId: string
  timestamp: string
}

export interface ConnectedUser {
  userId: string
  socketId: string
  username?: string
  connectedAt?: string
}

export interface SocketNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  data?: any
  timestamp: string
}

export interface WebSocketClient {
  userId: string
  socketId: string
  connectedAt: Date
}

export interface ChatRoomInfo {
  id: string
  name: string
  type: 'group' | 'project'
  memberCount: number
  onlineCount: number
  lastActivity?: string
}

// États de connexion
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

export interface SocketState {
  isConnected: boolean
  connectionStatus: ConnectionStatus
  error?: string
  lastConnected?: string
  reconnectAttempts: number
}

// Configuration Socket
export interface SocketConfig {
  url: string
  options: {
    transports: string[]
    timeout: number
    autoConnect: boolean
    reconnection: boolean
    reconnectionAttempts: number
    reconnectionDelay: number
  }
} 