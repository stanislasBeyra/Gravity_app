import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/auth-store'
import { authApi } from '@/lib/api'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { LoginCredentials, RegisterData, ChangePasswordRequest } from '@/types/auth'

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user, token, isAuthenticated, login, logout, updateUser } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (response) => {
      const { user, accessToken } = response.data.data
      login(user, accessToken)
      toast.success('Connexion réussie')
      router.push('/dashboard')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur de connexion')
    },
  })

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterData) => authApi.register(userData),
    onSuccess: () => {
      toast.success('Inscription réussie. Vous pouvez maintenant vous connecter.')
      router.push('/login')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur d\'inscription')
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout()
      queryClient.clear()
      toast.success('Déconnexion réussie')
      router.push('/login')
    },
    onError: () => {
      logout()
      queryClient.clear()
      router.push('/login')
    },
  })

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
    onSuccess: () => {
      toast.success('Mot de passe modifié avec succès')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Erreur lors du changement de mot de passe')
    },
  })

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => authApi.me().then(res => res.data.data),
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000,
  })

  return {
    user,
    token,
    isAuthenticated,
    profile,
    isLoadingProfile,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    updateUser,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
  }
} 