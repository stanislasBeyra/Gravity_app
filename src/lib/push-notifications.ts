import { APP_CONFIG } from './constants'
import { PushSubscriptionData, PushNotificationPayload } from '@/types/notification'

class PushNotificationManager {
  private swRegistration: ServiceWorkerRegistration | null = null
  private isSupported: boolean = false

  constructor() {
    this.checkSupport() 
  }

  // Vérification du support
  private checkSupport(): void {
    this.isSupported = 'Notification' in window && 'serviceWorker' in navigator
  }

  // Vérification du support
  getSupportStatus(): boolean {
    return this.isSupported
  }

  // Enregistrement du service worker
  async registerServiceWorker(): Promise<ServiceWorkerRegistration> {
    if (!this.isSupported) {
      throw new Error('Push notifications not supported')
    }

    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', this.swRegistration)
      return this.swRegistration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      throw error
    }
  }

  // Demande de permission
  async requestPermission(): Promise<boolean> {
    if (!this.isSupported) {
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('Permission request failed:', error)
      return false
    }
  }

  // Vérification de la permission
  getPermissionStatus(): NotificationPermission {
    if (!this.isSupported) {
      return 'denied'
    }
    return Notification.permission
  }

  // Vérification de l'abonnement
  async isSubscribed(): Promise<boolean> {
    if (!this.isSupported || !this.swRegistration) {
      return false
    }

    try {
      const subscription = await this.swRegistration.pushManager.getSubscription()
      return !!subscription
    } catch (error) {
      console.error('Error checking subscription:', error)
      return false
    }
  }

  // Abonnement aux notifications push
  async subscribeToPush(token: string): Promise<PushSubscription | null> {
    if (!this.isSupported) {
      throw new Error('Push notifications not supported')
    }

    if (!this.swRegistration) {
      await this.registerServiceWorker()
    }

    try {
      // Vérifier la permission
      const permission = await this.requestPermission()
      if (!permission) {
        throw new Error('Permission denied')
      }

      // Obtenir la clé VAPID depuis le serveur
      const vapidKey = await this.getVapidKey()

      // Créer l'abonnement
      const subscription = await this.swRegistration!.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidKey),
      })

      // Envoyer l'abonnement au serveur
      await this.sendSubscriptionToServer(subscription, token)

      console.log('Push subscription created:', subscription)
      return subscription
    } catch (error) {
      console.error('Push subscription failed:', error)
      throw error
    }
  }

  // Désabonnement des notifications push
  async unsubscribeFromPush(): Promise<boolean> {
    if (!this.isSupported || !this.swRegistration) {
      return false
    }

    try {
      const subscription = await this.swRegistration.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        await this.removeSubscriptionFromServer(subscription)
        console.log('Push subscription removed')
        return true
      }
      return false
    } catch (error) {
      console.error('Push unsubscription failed:', error)
      return false
    }
  }

  // Envoi d'une notification locale
  async showLocalNotification(payload: PushNotificationPayload): Promise<void> {
    if (!this.isSupported) {
      throw new Error('Push notifications not supported')
    }

    try {
      const permission = this.getPermissionStatus()
      if (permission !== 'granted') {
        throw new Error('Permission not granted')
      }

      const notification = new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/icons/icon-192x192.png',
        badge: payload.badge || '/icons/badge-72x72.png',
        data: payload.data,
        tag: payload.tag,
        requireInteraction: payload.requireInteraction || false,
      })

      // Auto-fermeture après 5 secondes par défaut
      if (!payload.requireInteraction) {
        setTimeout(() => {
          notification.close()
        }, 5000)
      }

      // Gestion des clics sur la notification
      notification.onclick = (event) => {
        event.preventDefault()
        window.focus()
        
        if (payload.data?.url) {
          window.open(payload.data.url, '_blank')
        }
        
        notification.close()
      }

      return Promise.resolve()
    } catch (error) {
      console.error('Local notification failed:', error)
      throw error
    }
  }

  // Test de notification
  async testNotification(): Promise<void> {
    const payload: PushNotificationPayload = {
      title: 'Test de notification',
      body: 'Ceci est un test de notification push',
      icon: '/icons/icon-192x192.png',
      data: {
        url: '/dashboard',
      },
    }

    await this.showLocalNotification(payload)
  }

  // Obtenir la clé VAPID depuis le serveur
  private async getVapidKey(): Promise<string> {
    try {
      const response = await fetch(`${APP_CONFIG.apiUrl}/notifications/vapid-key`)
      const data = await response.json()
      return data.publicKey
    } catch (error) {
      console.error('Failed to get VAPID key:', error)
      throw new Error('Failed to get VAPID key')
    }
  }

  // Envoyer l'abonnement au serveur
  private async sendSubscriptionToServer(subscription: PushSubscription, token: string): Promise<void> {
    try {
      const response = await fetch(`${APP_CONFIG.apiUrl}/notifications/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send subscription to server')
      }
    } catch (error) {
      console.error('Failed to send subscription to server:', error)
      throw error
    }
  }

  // Supprimer l'abonnement du serveur
  private async removeSubscriptionFromServer(subscription: PushSubscription): Promise<void> {
    try {
      const response = await fetch(`${APP_CONFIG.apiUrl}/notifications/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      })

      if (!response.ok) {
        console.warn('Failed to remove subscription from server')
      }
    } catch (error) {
      console.error('Failed to remove subscription from server:', error)
    }
  }

  // Conversion de la clé VAPID
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  // Obtenir les informations d'abonnement
  async getSubscriptionInfo(): Promise<PushSubscriptionData | null> {
    if (!this.isSupported || !this.swRegistration) {
      return null
    }

    try {
      const subscription = await this.swRegistration.pushManager.getSubscription()
      if (!subscription) {
        return null
      }

      const subscriptionJson = subscription.toJSON()
      return {
        endpoint: subscriptionJson.endpoint || '',
        p256dhKey: subscriptionJson.keys?.p256dh || '',
        authKey: subscriptionJson.keys?.auth || '',
        userAgent: navigator.userAgent,
      }
    } catch (error) {
      console.error('Failed to get subscription info:', error)
      return null
    }
  }

  // Mise à jour de l'abonnement
  async updateSubscription(token: string): Promise<boolean> {
    try {
      await this.unsubscribeFromPush()
      await this.subscribeToPush(token)
      return true
    } catch (error) {
      console.error('Failed to update subscription:', error)
      return false
    }
  }

  // Nettoyage
  destroy(): void {
    this.swRegistration = null
  }
}

// Instance singleton
export const pushNotificationManager = new PushNotificationManager()

// Export des types pour utilisation externe
export type { PushSubscriptionData, PushNotificationPayload } 