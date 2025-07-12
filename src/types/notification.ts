export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  relatedId?: string
  relatedType?: string
  isRead: boolean
  isSent: boolean
  createdAt: string
  readAt?: string
}

export type NotificationType = 
  | 'TASK_ASSIGNED'
  | 'TASK_COMMENT'
  | 'PROJECT_MESSAGE'
  | 'GROUP_MESSAGE'
  | 'TASK_DUE_SOON'
  | 'TASK_OVERDUE'

export interface NotificationSettings {
  id: string
  userId: string
  pushEnabled: boolean
  emailEnabled: boolean
  taskAssignments: boolean
  taskComments: boolean
  projectMessages: boolean
  groupMessages: boolean
  taskDueReminders: boolean
  createdAt: string
  updatedAt: string
}

export interface UpdateNotificationSettingsData {
  pushEnabled?: boolean
  emailEnabled?: boolean
  taskAssignments?: boolean
  taskComments?: boolean
  projectMessages?: boolean
  groupMessages?: boolean
  taskDueReminders?: boolean
}

export interface PushSubscriptionData {
  endpoint: string
  p256dhKey: string
  authKey: string
  userAgent?: string
}

export interface NotificationSearchFilters {
  page?: number
  limit?: number
  type?: NotificationType
  isRead?: boolean
}

export interface PushNotificationPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  data?: any
  actions?: Array<{
    action: string
    title: string
    icon?: string
  }>
  timestamp?: number
  requireInteraction?: boolean
  tag?: string
} 