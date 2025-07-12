export interface ApiResponse<T = any> {
  statusCode: number
  message: string
  data?: T
  error?: string
  meta?: PaginationMeta
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResult<T> {
  data: T[]
  meta: PaginationMeta
}

export interface ApiError {
  statusCode: number
  message: string
  error: string
  timestamp?: string
  path?: string
}

export interface SearchParams {
  q?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface FilterParams extends SearchParams {
  [key: string]: any
}

// Configuration API
export interface ApiConfig {
  baseURL: string
  timeout: number
  headers: Record<string, string>
}

// Utilitaires de requête
export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  data?: any
  params?: any
  headers?: Record<string, string>
} 