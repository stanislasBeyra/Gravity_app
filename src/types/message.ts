import { User } from './user'

export type MessageType = 'text' | 'file' | 'image' | 'system' | 'group' | 'project';

export interface Message {
  id: string;
  type: MessageType;
  content?: string;
  fileName?: string;
  fileSize?: string;
  sender: User;
  timestamp: string;
  isEdited?: boolean;
  // ...other fields as needed
}

export interface CreateGroupMessageData {
  groupId: string
  message: string
}

export interface CreateProjectMessageData {
  projectId: string
  message: string
}

export interface MessageSearchFilters {
  search?: string
  type?: 'group' | 'project'
  page?: number
  limit?: number
}

export interface ChatRoom {
  id: string
  name: string
  type: 'group' | 'project'
  memberCount: number
  lastMessage?: {
    content: string
    sender: string
    timestamp: string
  }
  unreadCount?: number
}

export interface TypingUser {
  userId: string
  username: string
  isTyping: boolean
}

export interface OnlineUser {
  userId: string
  username: string
  avatar?: string
  status: 'online' | 'away' | 'busy'
} 