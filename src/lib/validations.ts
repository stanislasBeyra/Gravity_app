import { z } from 'zod'

// Schémas d'authentification
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalide'),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token requis'),
  newPassword: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
  newPassword: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

// Schémas de groupes
export const createGroupSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  description: z.string().max(500, 'La description ne peut pas dépasser 500 caractères').optional(),
})

export const updateGroupSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50, 'Le nom ne peut pas dépasser 50 caractères').optional(),
  description: z.string().max(500, 'La description ne peut pas dépasser 500 caractères').optional(),
})

export const addGroupMemberSchema = z.object({
  email: z.string().email('Email invalide'),
  role: z.enum(['ADMIN', 'MEMBER']).default('MEMBER'),
})

// Schémas de projets
export const createProjectSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  description: z.string().max(500, 'La description ne peut pas dépasser 500 caractères').optional(),
  groupId: z.string().optional(),
})

export const updateProjectSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50, 'Le nom ne peut pas dépasser 50 caractères').optional(),
  description: z.string().max(500, 'La description ne peut pas dépasser 500 caractères').optional(),
})

export const addProjectMemberSchema = z.object({
  email: z.string().email('Email invalide'),
})

// Schémas de tâches
export const createTaskSchema = z.object({
  title: z.string().min(2, 'Le titre doit contenir au moins 2 caractères').max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: z.string().max(1000, 'La description ne peut pas dépasser 1000 caractères').optional(),
  projectId: z.string().optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
})

export const updateTaskSchema = z.object({
  title: z.string().min(2, 'Le titre doit contenir au moins 2 caractères').max(100, 'Le titre ne peut pas dépasser 100 caractères').optional(),
  description: z.string().max(1000, 'La description ne peut pas dépasser 1000 caractères').optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
})

export const addTaskCommentSchema = z.object({
  comment: z.string().min(1, 'Le commentaire ne peut pas être vide').max(500, 'Le commentaire ne peut pas dépasser 500 caractères'),
})

// Schémas de messages
export const createGroupMessageSchema = z.object({
  message: z.string().min(1, 'Le message ne peut pas être vide').max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
})

export const createProjectMessageSchema = z.object({
  message: z.string().min(1, 'Le message ne peut pas être vide').max(1000, 'Le message ne peut pas dépasser 1000 caractères'),
})

// Schémas de profil utilisateur
export const updateProfileSchema = z.object({
  firstname: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères').max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastname: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z.string().email('Email invalide'),
})

// Schémas de paramètres de notifications
export const notificationSettingsSchema = z.object({
  pushEnabled: z.boolean(),
  emailEnabled: z.boolean(),
  taskAssignments: z.boolean(),
  taskComments: z.boolean(),
  projectMessages: z.boolean(),
  groupMessages: z.boolean(),
  taskDueReminders: z.boolean(),
})

// Schémas de recherche et filtres
export const searchSchema = z.object({
  q: z.string().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const taskFiltersSchema = z.object({
  search: z.string().optional(),
  projectId: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  assignedTo: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  overdue: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Types exportés pour utilisation dans les composants
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type CreateGroupFormData = z.infer<typeof createGroupSchema>
export type UpdateGroupFormData = z.infer<typeof updateGroupSchema>
export type AddGroupMemberFormData = z.infer<typeof addGroupMemberSchema>
export type CreateProjectFormData = z.infer<typeof createProjectSchema>
export type UpdateProjectFormData = z.infer<typeof updateProjectSchema>
export type AddProjectMemberFormData = z.infer<typeof addProjectMemberSchema>
export type CreateTaskFormData = z.infer<typeof createTaskSchema>
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>
export type AddTaskCommentFormData = z.infer<typeof addTaskCommentSchema>
export type CreateGroupMessageFormData = z.infer<typeof createGroupMessageSchema>
export type CreateProjectMessageFormData = z.infer<typeof createProjectMessageSchema>
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
export type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>
export type SearchFormData = z.infer<typeof searchSchema>
export type TaskFiltersFormData = z.infer<typeof taskFiltersSchema> 