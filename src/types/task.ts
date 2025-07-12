import { User } from './user'
import { Project } from './project'

export interface Task {
  id: string
  projectId?: string
  assignedTo?: string
  title: string
  description?: string
  status: TaskStatus
  priority?: TaskPriority
  dueDate?: string
  createdAt: string
  project?: Project
  assignee?: User
  comments: TaskComment[]
  _count: {
    comments: number
  }
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface TaskComment {
  id: string
  taskId: string
  userId: string
  comment: string
  createdAt: string
  user: User
}

export interface CreateTaskData {
  title: string
  description?: string
  projectId?: string
  assignedTo?: string
  dueDate?: string
  priority?: TaskPriority
}

export interface UpdateTaskData {
  title?: string
  description?: string
  assignedTo?: string
  dueDate?: string
  status?: TaskStatus
  priority?: TaskPriority
}

export interface AddTaskCommentData {
  comment: string
}

export interface TaskSearchFilters {
  search?: string
  projectId?: string
  status?: TaskStatus
  assignedTo?: string
  priority?: TaskPriority
  overdue?: boolean
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface TaskStats {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  overdueTasks: number
  completionRate: number
}

export interface KanbanColumn {
  id: TaskStatus
  title: string
  tasks: Task[]
} 