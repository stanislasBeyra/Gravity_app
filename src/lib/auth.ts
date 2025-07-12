import { User } from '@/types/user'

// Utilitaires d'authentification
export class AuthUtils {
  private static readonly TOKEN_KEY = 'access_token'
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token'
  private static readonly USER_KEY = 'user_data'

  // Gestion des tokens
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.TOKEN_KEY, token)
  }

  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  static setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
  }

  static removeTokens(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  // Gestion des données utilisateur
  static getUser(): User | null {
    if (typeof window === 'undefined') return null
    const userData = localStorage.getItem(this.USER_KEY)
    return userData ? JSON.parse(userData) : null
  }

  static setUser(user: User): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  // Vérification du token
  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expiry = payload.exp * 1000 // Convert to milliseconds
      return Date.now() >= expiry
    } catch {
      return true
    }
  }

  // Redirection après connexion
  static getRedirectUrl(): string {
    if (typeof window === 'undefined') return '/dashboard'
    return sessionStorage.getItem('redirectUrl') || '/dashboard'
  }

  static setRedirectUrl(url: string): void {
    if (typeof window === 'undefined') return
    sessionStorage.setItem('redirectUrl', url)
  }

  static clearRedirectUrl(): void {
    if (typeof window === 'undefined') return
    sessionStorage.removeItem('redirectUrl')
  }

  // Validation des droits
  static hasRole(user: User | null, requiredRole: string): boolean {
    if (!user) return false
    return user.role === requiredRole || user.role === 'ADMIN'
  }

  static canAccessResource(user: User | null, resourceOwner: string): boolean {
    if (!user) return false
    return user.id === resourceOwner || user.role === 'ADMIN'
  }
} 