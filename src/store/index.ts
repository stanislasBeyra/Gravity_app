// Import des stores
import { useAuthStore } from './auth-store'
import { useNotificationStore } from './notification-store'
import { useSocketStore } from './socket-store'
import { useUIStore } from './ui-store'

// Export de tous les stores pour faciliter les imports
export { useAuthStore } from './auth-store'
export { useNotificationStore } from './notification-store'
export { useSocketStore } from './socket-store'
export { useUIStore } from './ui-store'

// Types des stores pour une meilleure intégration TypeScript
export type AuthStore = ReturnType<typeof useAuthStore>
export type NotificationStore = ReturnType<typeof useNotificationStore>
export type SocketStore = ReturnType<typeof useSocketStore>
export type UIStore = ReturnType<typeof useUIStore>

// Selecteurs utiles pour optimiser les rendus
export const authSelectors = {
  user: (state: ReturnType<typeof useAuthStore.getState>) => state.user,
  isAuthenticated: (state: ReturnType<typeof useAuthStore.getState>) => state.isAuthenticated,
  token: (state: ReturnType<typeof useAuthStore.getState>) => state.token,
}

export const notificationSelectors = {
  unreadCount: (state: ReturnType<typeof useNotificationStore.getState>) => state.unreadCount,
  notifications: (state: ReturnType<typeof useNotificationStore.getState>) => state.notifications,
  settings: (state: ReturnType<typeof useNotificationStore.getState>) => state.settings,
}

export const socketSelectors = {
  isConnected: (state: ReturnType<typeof useSocketStore.getState>) => state.isConnected,
  connectionStatus: (state: ReturnType<typeof useSocketStore.getState>) => state.connectionStatus,
  onlineUsers: (state: ReturnType<typeof useSocketStore.getState>) => state.onlineUsers,
}

export const uiSelectors = {
  sidebarCollapsed: (state: ReturnType<typeof useUIStore.getState>) => state.sidebarCollapsed,
  theme: (state: ReturnType<typeof useUIStore.getState>) => state.theme,
  modals: (state: ReturnType<typeof useUIStore.getState>) => state.modals,
}

// Hooks personnalisés pour utiliser les selecteurs
export const useAuthUser = () => useAuthStore(authSelectors.user)
export const useIsAuthenticated = () => useAuthStore(authSelectors.isAuthenticated)
export const useUnreadCount = () => useNotificationStore(notificationSelectors.unreadCount)
export const useSocketConnection = () => useSocketStore(socketSelectors.isConnected)
export const useSidebarState = () => useUIStore(uiSelectors.sidebarCollapsed) 