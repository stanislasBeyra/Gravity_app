// Configuration de l'application
export const APP_CONFIG = {
  name: 'Gruvity',
  description: 'Plateforme de gestion de tâches collaborative',
  version: '1.0.0',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
  environment: process.env.NODE_ENV || 'development',
} as const

// Configuration des routes
export const ROUTES = {
  // Pages publiques
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  
  // Pages du dashboard
  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',
  
  // Groupes
  groups: '/groups',
  groupDetails: (id: string) => `/groups/${id}`,
  groupMembers: (id: string) => `/groups/${id}/members`,
  groupChat: (id: string) => `/groups/${id}/chat`,
  createGroup: '/groups/create',
  
  // Projets
  projects: '/projects',
  projectDetails: (id: string) => `/projects/${id}`,
  projectTasks: (id: string) => `/projects/${id}/tasks`,
  projectMembers: (id: string) => `/projects/${id}/members`,
  projectChat: (id: string) => `/projects/${id}/chat`,
  createProject: '/projects/create',
  
  // Tâches
  tasks: '/tasks',
  taskDetails: (id: string) => `/tasks/${id}`,
  createTask: '/tasks/create',
  
  // Notifications
  notifications: '/notifications',
} as const

// Configuration des statuts de tâches
export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'À faire',
  [TASK_STATUS.IN_PROGRESS]: 'En cours',
  [TASK_STATUS.DONE]: 'Terminé',
} as const

export const TASK_STATUS_COLORS = {
  [TASK_STATUS.TODO]: 'bg-gray-100 text-gray-800',
  [TASK_STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [TASK_STATUS.DONE]: 'bg-green-100 text-green-800',
} as const

// Configuration des priorités de tâches
export const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: 'Faible',
  [TASK_PRIORITY.MEDIUM]: 'Moyenne',
  [TASK_PRIORITY.HIGH]: 'Élevée',
  [TASK_PRIORITY.URGENT]: 'Urgente',
} as const

export const TASK_PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: 'bg-gray-100 text-gray-800',
  [TASK_PRIORITY.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [TASK_PRIORITY.HIGH]: 'bg-orange-100 text-orange-800',
  [TASK_PRIORITY.URGENT]: 'bg-red-100 text-red-800',
} as const

// Configuration des rôles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const

export const GROUP_ROLES = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN',
} as const

// Configuration des types de notifications
export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'TASK_ASSIGNED',
  TASK_COMMENT: 'TASK_COMMENT',
  PROJECT_MESSAGE: 'PROJECT_MESSAGE',
  GROUP_MESSAGE: 'GROUP_MESSAGE',
  TASK_DUE_SOON: 'TASK_DUE_SOON',
  TASK_OVERDUE: 'TASK_OVERDUE',
} as const

export const NOTIFICATION_LABELS = {
  [NOTIFICATION_TYPES.TASK_ASSIGNED]: 'Tâche assignée',
  [NOTIFICATION_TYPES.TASK_COMMENT]: 'Nouveau commentaire',
  [NOTIFICATION_TYPES.PROJECT_MESSAGE]: 'Message de projet',
  [NOTIFICATION_TYPES.GROUP_MESSAGE]: 'Message de groupe',
  [NOTIFICATION_TYPES.TASK_DUE_SOON]: 'Échéance proche',
  [NOTIFICATION_TYPES.TASK_OVERDUE]: 'Tâche en retard',
} as const

// Configuration de la pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZES: [10, 20, 50, 100],
} as const

// Configuration des timeouts
export const TIMEOUTS = {
  API_REQUEST: 10000,
  SOCKET_CONNECTION: 5000,
  DEBOUNCE_DELAY: 300,
  TYPING_INDICATOR: 3000,
  TOAST_DURATION: 5000,
} as const

// Configuration des limites
export const LIMITS = {
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_COMMENT_LENGTH: 500,
  MAX_MESSAGE_LENGTH: 1000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES_PER_UPLOAD: 10,
} as const

// Configuration des thèmes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

// Configuration des langues
export const LANGUAGES = {
  FR: 'fr',
  EN: 'en',
} as const

// Configuration des formats de date
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  DATETIME: 'dd/MM/yyyy HH:mm',
  TIME: 'HH:mm',
} as const

// Configuration des icônes
export const ICONS = {
  // Navigation
  DASHBOARD: 'dashboard',
  GROUPS: 'users',
  PROJECTS: 'folder',
  TASKS: 'check-square',
  NOTIFICATIONS: 'bell',
  SETTINGS: 'settings',
  PROFILE: 'user',
  
  // Actions
  ADD: 'plus',
  EDIT: 'edit',
  DELETE: 'trash',
  SAVE: 'save',
  CANCEL: 'x',
  SEARCH: 'search',
  FILTER: 'filter',
  SORT: 'sort',
  
  // Statuts
  CHECK: 'check',
  CLOCK: 'clock',
  ALERT: 'alert-triangle',
  INFO: 'info',
  SUCCESS: 'check-circle',
  ERROR: 'x-circle',
  WARNING: 'alert-circle',
  
  // Communication
  MESSAGE: 'message-circle',
  COMMENT: 'message-square',
  TYPING: 'loader',
  ONLINE: 'circle',
  OFFLINE: 'circle-off',
  
  // Fichiers
  FILE: 'file',
  IMAGE: 'image',
  DOCUMENT: 'file-text',
  DOWNLOAD: 'download',
  UPLOAD: 'upload',
} as const

// Configuration des couleurs
export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  SUCCESS: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  WARNING: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  ERROR: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
} as const

// Configuration des breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// Configuration des animations
export const ANIMATIONS = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    LINEAR: 'linear',
    IN: 'cubic-bezier(0.4, 0, 1, 1)',
    OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

// Configuration des messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez réessayer.',
  UNAUTHORIZED: 'Vous n\'êtes pas autorisé à accéder à cette ressource.',
  FORBIDDEN: 'Accès interdit.',
  NOT_FOUND: 'Ressource non trouvée.',
  VALIDATION_ERROR: 'Données invalides.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite.',
} as const

// Configuration des messages de succès
export const SUCCESS_MESSAGES = {
  CREATED: 'Créé avec succès.',
  UPDATED: 'Mis à jour avec succès.',
  DELETED: 'Supprimé avec succès.',
  SAVED: 'Enregistré avec succès.',
  SENT: 'Envoyé avec succès.',
} as const 