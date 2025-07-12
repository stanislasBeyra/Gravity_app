import { User } from './user'
import { Group } from './group'

export interface Project {
  id: string
  groupId?: string
  name: string
  description?: string
  createdBy: string
  creator: User
  group?: Group
  members: ProjectMember[]
  tasks: Task[]
  createdAt: string
  status?: 'active' | 'completed' | 'archived';
  _count: {
    members: number
    tasks: number
    messages?: number
  }
}

export interface ProjectMember {
  id: string
  projectId: string
  userId: string
  user: User
  joinedAt?: string
}

export interface CreateProjectData {
  name: string
  description?: string
  groupId?: string
}

export interface UpdateProjectData {
  name?: string
  description?: string
}

export interface AddProjectMemberData {
  email: string
}

export interface ProjectSearchFilters {
  search?: string
  groupId?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ProjectStats {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  overdueTasks: number
  totalMembers: number
  completionRate: number
}

import { Task, TaskStatus, TaskPriority, TaskComment } from './task' 