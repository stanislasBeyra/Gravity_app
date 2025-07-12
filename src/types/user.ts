export interface User {
  id: string
  email: string
  firstname: string
  lastname: string
  name?: string
  avatar?: string
  role: 'USER' | 'ADMIN'
  isOnline?: boolean
  status?: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile extends User {
  notificationSettings?: UserNotificationSettings
}

export interface UserStats {
  totalGroups: number
  totalProjects: number
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  overdueTasks: number
  completionRate: number
}

export interface UpdateUserProfile {
  firstname?: string
  lastname?: string
  email?: string
}

export interface UserSearchResult {
  id: string
  email: string
  firstname: string
  lastname: string
}

export interface UserNotificationSettings {
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