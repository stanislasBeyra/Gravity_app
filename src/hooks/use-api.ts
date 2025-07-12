import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { api } from '@/lib/api'

import toast from 'react-hot-toast'

interface UseApiQueryOptions<T> {
  queryKey: string[]
  url: string
  params?: Record<string, unknown>
  enabled?: boolean
  staleTime?: number
  refetchInterval?: number
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
}

export function useApiQuery<T = unknown>({
  queryKey,
  url,
  params,
  enabled = true,
  staleTime = 5 * 60 * 1000,
  refetchInterval,
  onSuccess,
  onError,
}: UseApiQueryOptions<T>) {
  const query = useQuery({
    queryKey,
    queryFn: () => api.get(url, { params }).then(res => res.data.data),
    enabled,
    staleTime,
    refetchInterval,
  })

  useEffect(() => {
    if (query.data && onSuccess) {
      onSuccess(query.data)
    }
  }, [query.data, onSuccess])

  useEffect(() => {
    if (query.error && onError) {
      onError(query.error)
    }
  }, [query.error, onError])

  return query
}

interface UseApiMutationOptions<TData = unknown, TVariables = unknown> {
  url: string
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: unknown) => void
  successMessage?: string
  errorMessage?: string
  invalidateQueries?: string[][]
}

export function useApiMutation<TData = unknown, TVariables = unknown>({
  url,
  method = 'POST',
  onSuccess,
  onError,
  successMessage,
  errorMessage,
  invalidateQueries = [],
}: UseApiMutationOptions<TData, TVariables>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: TVariables) => {

      
      switch (method) {
        case 'POST':
          return api.post(url, variables)
        case 'PUT':
          return api.put(url, variables)
        case 'PATCH':
          return api.patch(url, variables)
        case 'DELETE':
          return api.delete(url)
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
    },
    onSettled: (response, error, variables) => {
      if (!error && response) {
        if (successMessage) {
          toast.success(successMessage)
        }
        
        // Invalider les queries spécifiées
        invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey })
        })
        
        onSuccess?.(response.data.data, variables)
      } else if (error) {
        const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || errorMessage || 'Une erreur est survenue'
        toast.error(message)
        onError?.(error)
      }
    },
  })
} 