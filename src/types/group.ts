import { User } from './user'
import { Project } from './project'

export interface Group {
  id: string
  name: string
  description?: string
  ownerId: string
  owner: User
  members: GroupMember[]
  projects: Project[]
  createdAt: string
  updatedAt?: string;
  status?: 'active' | 'archived';
  _count: {
    members: number
    projects: number
    messages?: number
  }
}

export interface GroupMember {
  id: string
  groupId: string
  userId: string
  role: 'ADMIN' | 'MEMBER'
  user: User
  joinedAt?: string
}

export interface CreateGroupData {
  name: string
  description?: string
}

export interface UpdateGroupData {
  name?: string
  description?: string
}

export interface AddGroupMemberData {
  email: string
  role?: 'ADMIN' | 'MEMBER'
}

export interface GroupSearchFilters {
  search?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface GroupStats {
  totalMembers: number
  totalProjects: number
  totalTasks: number
  activeProjects: number
  completedTasks: number
} 