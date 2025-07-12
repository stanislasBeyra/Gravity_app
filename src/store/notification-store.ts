import { create } from 'zustand'
import { Notification, NotificationSettings } from '@/types/notification'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  settings: NotificationSettings | null
  
  // Actions pour les notifications
  addNotification: (notification: Notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  setNotifications: (notifications: Notification[]) => void
  clearNotifications: () => void
  
  // Actions pour le compteur
  setUnreadCount: (count: number) => void
  incrementUnreadCount: () => void
  decrementUnreadCount: () => void
  
  // Actions pour les paramètres
  setSettings: (settings: NotificationSettings) => void
  updateSettings: (settings: Partial<NotificationSettings>) => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  settings: null,

  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }))
  },

  markAsRead: (id) => {
    set((state) => {
      const notification = state.notifications.find(n => n.id === id)
      const wasUnread = notification && !notification.isRead
      
      return {
        notifications: state.notifications.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        ),
        unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
      }
    })
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notif) => ({
        ...notif,
        isRead: true,
      })),
      unreadCount: 0,
    }))
  },

  removeNotification: (id) => {
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id)
      const wasUnread = notification && !notification.isRead
      
      return {
        notifications: state.notifications.filter((notif) => notif.id !== id),
        unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
      }
    })
  },

  setNotifications: (notifications) => {
    set({ notifications })
  },

  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 })
  },

  setUnreadCount: (count) => {
    set({ unreadCount: Math.max(0, count) })
  },

  incrementUnreadCount: () => {
    set((state) => ({ unreadCount: state.unreadCount + 1 }))
  },

  decrementUnreadCount: () => {
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) }))
  },

  setSettings: (settings) => {
    set({ settings })
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: state.settings ? { ...state.settings, ...newSettings } : null,
    }))
  },
})) 