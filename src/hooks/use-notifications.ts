import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { notificationsApi } from '@/lib/api'
import { useNotificationStore } from '@/store/notification-store'
import { UpdateNotificationSettingsData } from '@/types/notification'
import toast from 'react-hot-toast'

export function useNotifications() {
  const queryClient = useQueryClient()
  const { 
    notifications, 
    unreadCount, 
    settings,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    setNotifications,
    setUnreadCount,
    setSettings
  } = useNotificationStore()

  const { data: notificationsData, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.getAll().then(res => res.data),
  })

  useEffect(() => {
    if (notificationsData?.data) {
      setNotifications(notificationsData.data)
    }
  }, [notificationsData, setNotifications])

  const { data: unreadCountData } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: () => notificationsApi.getUnreadCount().then(res => res.data.data.count),
    refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
  })

  useEffect(() => {
    if (unreadCountData !== undefined) {
      setUnreadCount(unreadCountData)
    }
  }, [unreadCountData, setUnreadCount])

  const { data: settingsData } = useQuery({
    queryKey: ['notification-settings'],
    queryFn: () => notificationsApi.getSettings().then(res => res.data.data),
  })

  useEffect(() => {
    if (settingsData) {
      setSettings(settingsData)
    }
  }, [settingsData, setSettings])

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSettled: (_, __, id) => {
      markAsRead(id)
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] })
    },
  })

  const markAllAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSettled: (data, error) => {
      if (!error) {
        markAllAsRead()
        queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] })
        toast.success('Toutes les notifications ont été marquées comme lues')
      }
    },
  })

  const deleteNotificationMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.delete(id),
    onSettled: (_, __, id) => {
      removeNotification(id)
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      toast.success('Notification supprimée')
    },
  })

  const deleteAllNotificationsMutation = useMutation({
    mutationFn: notificationsApi.deleteAll,
    onSettled: (data, error) => {
      if (!error) {
        setNotifications([])
        setUnreadCount(0)
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
        toast.success('Toutes les notifications ont été supprimées')
      }
    },
  })

  const updateSettingsMutation = useMutation({
    mutationFn: (data: UpdateNotificationSettingsData) =>
      notificationsApi.updateSettings(data as Record<string, unknown>),
    onSettled: (response, error) => {
      if (!error && response) {
        setSettings(response.data.data)
        toast.success('Paramètres mis à jour')
      } else if (error) {
        toast.error((error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erreur lors de la mise à jour')
      }
    },
  })

  return {
    notifications,
    unreadCount,
    settings,
    isLoading,
    addNotification,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
    deleteAllNotifications: deleteAllNotificationsMutation.mutate,
    updateSettings: updateSettingsMutation.mutate,
    isMarkingAsRead: markAsReadMutation.isPending,
    isUpdatingSettings: updateSettingsMutation.isPending,
  }
} 