import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ApiConfig } from '@/types/api'

// API Configuration
const apiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}

// Create axios instance
const api: AxiosInstance = axios.create(apiConfig)

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; firstname: string; lastname: string }) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  changePassword: (data: { currentPassword: string; newPassword: string }) => api.post('/auth/change-password', data),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: { token: string; password: string }) => api.post('/auth/reset-password', data),
  refreshToken: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
}

// Notifications API
export const notificationsApi = {
  getAll: (filters?: Record<string, unknown>) => api.get('/notifications', { params: filters }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  getSettings: () => api.get('/notifications/settings'),
  markAsRead: (id: string) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/mark-all-read'),
  delete: (id: string) => api.delete(`/notifications/${id}`),
  deleteAll: () => api.delete('/notifications'),
  updateSettings: (data: Record<string, unknown>) => api.put('/notifications/settings', data),
  sendTest: () => api.post('/notifications/test'),
}

// Groups API
export const groupsApi = {
  getAll: (filters?: Record<string, unknown>) => api.get('/groups', { params: filters }),
  getById: (id: string) => api.get(`/groups/${id}`),
  create: (data: { name: string; description?: string }) => api.post('/groups', data),
  update: (id: string, data: { name?: string; description?: string }) => api.put(`/groups/${id}`, data),
  delete: (id: string) => api.delete(`/groups/${id}`),
  addMember: (id: string, data: { userId: string; role?: string }) => api.post(`/groups/${id}/members`, data),
  removeMember: (groupId: string, memberId: string) => api.delete(`/groups/${groupId}/members/${memberId}`),
  getStats: (id: string) => api.get(`/groups/${id}/stats`),
}

// Projects API
export const projectsApi = {
  getAll: (filters?: Record<string, unknown>) => api.get('/projects', { params: filters }),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: { name: string; description?: string; groupId?: string }) => api.post('/projects', data),
  update: (id: string, data: { name?: string; description?: string }) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  addMember: (id: string, data: { userId: string; role?: string }) => api.post(`/projects/${id}/members`, data),
  removeMember: (projectId: string, memberId: string) => api.delete(`/projects/${projectId}/members/${memberId}`),
  getStats: (id: string) => api.get(`/projects/${id}/stats`),
}

// Tasks API
export const tasksApi = {
  getAll: (filters?: Record<string, unknown>) => api.get('/tasks', { params: filters }),
  getById: (id: string) => api.get(`/tasks/${id}`),
  create: (data: { title: string; description?: string; projectId?: string; assigneeId?: string; priority?: string; status?: string }) => api.post('/tasks', data),
  update: (id: string, data: { title?: string; description?: string; assigneeId?: string; priority?: string; status?: string }) => api.put(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
  addComment: (id: string, data: { content: string }) => api.post(`/tasks/${id}/comments`, data),
  getComments: (id: string) => api.get(`/tasks/${id}/comments`),
  getStats: () => api.get('/tasks/stats'),
}

// Messages API
export const messagesApi = {
  getGroupMessages: (groupId: string, filters?: Record<string, unknown>) => api.get(`/messages/groups/${groupId}`, { params: filters }),
  getProjectMessages: (projectId: string, filters?: Record<string, unknown>) => api.get(`/messages/projects/${projectId}`, { params: filters }),
  sendGroupMessage: (groupId: string, data: { content: string; type?: string }) => api.post(`/messages/groups/${groupId}`, data),
  sendProjectMessage: (projectId: string, data: { content: string; type?: string }) => api.post(`/messages/projects/${projectId}`, data),
}

// Users API
export const usersApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: { firstname?: string; lastname?: string; avatar?: string }) => api.put('/users/profile', data),
  search: (query: string) => api.get('/users/search', { params: { q: query } }),
  getStats: () => api.get('/users/stats'),
}

export { api } 