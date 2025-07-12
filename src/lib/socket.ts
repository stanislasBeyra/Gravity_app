import { io, Socket } from 'socket.io-client'
import { APP_CONFIG } from './constants'
import { AuthUtils } from './auth'
import { SocketEvents, SocketConfig, ConnectionStatus } from '@/types/socket'

class SocketManager {
  private socket: Socket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  // Configuration par défaut
  private config: SocketConfig = {
    url: APP_CONFIG.socketUrl,
    options: {
      transports: ['websocket', 'polling'],
      timeout: 5000,
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    },
  }

  // État de connexion
  private connectionStatus: ConnectionStatus = 'disconnected'

  // Événements de connexion
  private onConnectCallbacks: (() => void)[] = []
  private onDisconnectCallbacks: (() => void)[] = []
  private onErrorCallbacks: ((error: any) => void)[] = []

  // Événements de messages
  private onGroupMessageCallbacks: ((message: any) => void)[] = []
  private onProjectMessageCallbacks: ((message: any) => void)[] = []
  private onUserTypingCallbacks: ((data: any) => void)[] = []
  private onUserConnectedCallbacks: ((user: any) => void)[] = []
  private onUserDisconnectedCallbacks: ((user: any) => void)[] = []
  private onNotificationCallbacks: ((notification: any) => void)[] = []

  constructor() {
    // Ne pas initialiser les event listeners côté serveur
    if (typeof window !== 'undefined') {
      this.setupEventListeners()
    }
  }

  // Configuration
  setConfig(config: Partial<SocketConfig>) {
    this.config = { ...this.config, ...config }
  }

  // Connexion
  connect(token: string): Socket {
    if (this.socket?.connected) {
      return this.socket
    }

    this.socket = io(this.config.url, {
      ...this.config.options,
      auth: {
        token,
      },
    })

    this.setupSocketEventListeners()
    return this.socket
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
    this.connectionStatus = 'disconnected'
    this.reconnectAttempts = 0
  }

  // État de connexion
  isConnected(): boolean {
    return this.socket?.connected || false
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus
  }

  // Événements de connexion
  onConnect(callback: () => void): void {
    this.onConnectCallbacks.push(callback)
  }

  onDisconnect(callback: () => void): void {
    this.onDisconnectCallbacks.push(callback)
  }

  onError(callback: (error: any) => void): void {
    this.onErrorCallbacks.push(callback)
  }

  // Événements de messages
  onGroupMessage(callback: (message: any) => void): void {
    this.onGroupMessageCallbacks.push(callback)
  }

  onProjectMessage(callback: (message: any) => void): void {
    this.onProjectMessageCallbacks.push(callback)
  }

  onUserTyping(callback: (data: any) => void): void {
    this.onUserTypingCallbacks.push(callback)
  }

  onUserConnected(callback: (user: any) => void): void {
    this.onUserConnectedCallbacks.push(callback)
  }

  onUserDisconnected(callback: (user: any) => void): void {
    this.onUserDisconnectedCallbacks.push(callback)
  }

  onNotification(callback: (notification: any) => void): void {
    this.onNotificationCallbacks.push(callback)
  }

  // Envoi de messages
  sendGroupMessage(groupId: string, message: string): void {
    if (this.socket?.connected) {
      this.socket.emit('sendGroupMessage', { groupId, message })
    }
  }

  sendProjectMessage(projectId: string, message: string): void {
    if (this.socket?.connected) {
      this.socket.emit('sendProjectMessage', { projectId, message })
    }
  }

  // Gestion des salons
  joinRoom(type: 'group' | 'project', id: string): void {
    if (this.socket?.connected) {
      this.socket.emit('joinRoom', { type, id })
    }
  }

  leaveRoom(type: 'group' | 'project', id: string): void {
    if (this.socket?.connected) {
      this.socket.emit('leaveRoom', { type, id })
    }
  }

  // Indicateurs de frappe
  startTyping(type: 'group' | 'project', id: string): void {
    if (this.socket?.connected) {
      this.socket.emit('typing', { type, id, isTyping: true })
    }
  }

  stopTyping(type: 'group' | 'project', id: string): void {
    if (this.socket?.connected) {
      this.socket.emit('typing', { type, id, isTyping: false })
    }
  }

  // Configuration des écouteurs d'événements socket
  private setupSocketEventListeners(): void {
    if (!this.socket) return

    // Événements de connexion
    this.socket.on('connect', () => {
      this.connectionStatus = 'connected'
      this.reconnectAttempts = 0
      this.onConnectCallbacks.forEach(callback => callback())
    })

    this.socket.on('disconnect', () => {
      this.connectionStatus = 'disconnected'
      this.onDisconnectCallbacks.forEach(callback => callback())
    })

    this.socket.on('connect_error', (error) => {
      this.connectionStatus = 'error'
      this.onErrorCallbacks.forEach(callback => callback(error))
    })

    // Événements de messages
    this.socket.on('newGroupMessage', (message) => {
      this.onGroupMessageCallbacks.forEach(callback => callback(message))
    })

    this.socket.on('newProjectMessage', (message) => {
      this.onProjectMessageCallbacks.forEach(callback => callback(message))
    })

    this.socket.on('userTyping', (data) => {
      this.onUserTypingCallbacks.forEach(callback => callback(data))
    })

    this.socket.on('userConnected', (user) => {
      this.onUserConnectedCallbacks.forEach(callback => callback(user))
    })

    this.socket.on('userDisconnected', (user) => {
      this.onUserDisconnectedCallbacks.forEach(callback => callback(user))
    })

    this.socket.on('notification', (notification) => {
      this.onNotificationCallbacks.forEach(callback => callback(notification))
    })

    // Événements de salons
    this.socket.on('roomJoined', (data) => {
      console.log('Room joined:', data)
    })

    this.socket.on('roomLeft', (data) => {
      console.log('Room left:', data)
    })

    // Événements d'utilisateurs
    this.socket.on('roomUsers', (data) => {
      console.log('Room users:', data)
    })
  }

  // Configuration des écouteurs d'événements globaux
  private setupEventListeners(): void {
    // Vérifier que nous sommes côté client
    if (typeof window === 'undefined') return

    // Gestion de la reconnexion automatique
    window.addEventListener('online', () => {
      const token = AuthUtils.getToken()
      if (token && !this.socket?.connected) {
        this.connect(token)
      }
    })

    window.addEventListener('offline', () => {
      this.connectionStatus = 'disconnected'
    })

    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.socket?.connected) {
        // Rejoindre les salons actifs si nécessaire
        this.socket.emit('rejoinRooms')
      }
    })
  }

  // Nettoyage des callbacks
  removeAllCallbacks(): void {
    this.onConnectCallbacks = []
    this.onDisconnectCallbacks = []
    this.onErrorCallbacks = []
    this.onGroupMessageCallbacks = []
    this.onProjectMessageCallbacks = []
    this.onUserTypingCallbacks = []
    this.onUserConnectedCallbacks = []
    this.onUserDisconnectedCallbacks = []
    this.onNotificationCallbacks = []
  }

  // Nettoyage des écouteurs d'événements
  cleanup(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', () => {})
      window.removeEventListener('offline', () => {})
      document.removeEventListener('visibilitychange', () => {})
    }
    this.removeAllCallbacks()
    this.disconnect()
  }

  // Getters
  getSocket(): Socket | null {
    return this.socket
  }

  getReconnectAttempts(): number {
    return this.reconnectAttempts
  }

  // Méthodes utilitaires
  emit(event: string, data?: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data)
    }
  }

  ping(): Promise<number> {
    return new Promise((resolve) => {
      if (this.socket?.connected) {
        const start = Date.now()
        this.socket.emit('ping', () => {
          resolve(Date.now() - start)
        })
      } else {
        resolve(-1)
      }
    })
  }
}

// Instance singleton
export const socketManager = new SocketManager()

// Export des types pour utilisation externe
export type { SocketEvents, SocketConfig, ConnectionStatus } 