import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { pushNotificationManager } from '@/lib/push-notifications'
import { notificationsApi } from '@/lib/api'
import { useAuth } from './use-auth'
import toast from 'react-hot-toast'

export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isPermissionGranted, setIsPermissionGranted] = useState(false)
  const { token } = useAuth()

  useEffect(() => {
    const checkSupport = () => {
      const supported = 'Notification' in window && 'serviceWorker' in navigator
      setIsSupported(supported)
      
      if (supported) {
        setIsPermissionGranted(Notification.permission === 'granted')
        checkSubscriptionStatus()
      }
    }

    const checkSubscriptionStatus = async () => {
      try {
        const subscribed = await pushNotificationManager.isSubscribed()
        setIsSubscribed(subscribed)
      } catch (error) {
        console.error('Error checking subscription status:', error)
      }
    }

    checkSupport()
  }, [])

  const subscribeMutation = useMutation({
    mutationFn: async () => {
      if (!token) throw new Error('Non authentifié')
      
      const hasPermission = await pushNotificationManager.requestPermission()
      if (!hasPermission) {
        throw new Error('Permission refusée')
      }

      await pushNotificationManager.subscribeToPush(token)
      return true
    },
    onSuccess: () => {
      setIsSubscribed(true)
      setIsPermissionGranted(true)
      toast.success('Notifications push activées')
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || 'Erreur lors de l\'activation des notifications')
    },
  })

  const unsubscribeMutation = useMutation({
    mutationFn: () => pushNotificationManager.unsubscribeFromPush(),
    onSuccess: () => {
      setIsSubscribed(false)
      toast.success('Notifications push désactivées')
    },
    onError: (error: { message?: string }) => {
      toast.error(error.message || 'Erreur lors de la désactivation')
    },
  })

  const testNotificationMutation = useMutation({
    mutationFn: notificationsApi.sendTest,
    onSuccess: () => {
      toast.success('Notification de test envoyée')
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'envoi du test')
    },
  })

  return {
    isSupported,
    isSubscribed,
    isPermissionGranted,
    subscribe: subscribeMutation.mutate,
    unsubscribe: unsubscribeMutation.mutate,
    sendTest: testNotificationMutation.mutate,
    isSubscribing: subscribeMutation.isPending,
    isUnsubscribing: unsubscribeMutation.isPending,
    isSendingTest: testNotificationMutation.isPending,
  }
} 