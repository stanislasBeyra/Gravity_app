import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // Sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  
  // Thème
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  
  // Modales
  modals: Record<string, boolean>
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
  toggleModal: (modalId: string) => void
  closeAllModals: () => void
  
  // Loading states
  loadingStates: Record<string, boolean>
  setLoading: (key: string, loading: boolean) => void
  clearAllLoading: () => void
  
  // Breadcrumbs
  breadcrumbs: Array<{ label: string; href?: string }>
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; href?: string }>) => void
  addBreadcrumb: (breadcrumb: { label: string; href?: string }) => void
  clearBreadcrumbs: () => void
  
  // Filtres et recherche
  searchQueries: Record<string, string>
  setSearchQuery: (key: string, query: string) => void
  clearSearchQuery: (key: string) => void
  
  filters: Record<string, unknown>
  setFilter: (key: string, value: unknown) => void
  clearFilter: (key: string) => void
  clearAllFilters: () => void
  
  // Pagination
  pagination: Record<string, { page: number; limit: number }>
  setPagination: (key: string, page: number, limit?: number) => void
  resetPagination: (key: string) => void
  
  // Notifications toast (en plus du store de notifications)
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info'; duration?: number }>
  addToast: (toast: Omit<UIState['toasts'][0], 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Sidebar
      sidebarCollapsed: false,
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
      },
      setSidebarCollapsed: (collapsed) => {
        set({ sidebarCollapsed: collapsed })
      },

      // Thème
      theme: 'system',
      setTheme: (theme) => {
        set({ theme })
      },

      // Modales
      modals: {},
      openModal: (modalId) => {
        set((state) => ({
          modals: { ...state.modals, [modalId]: true },
        }))
      },
      closeModal: (modalId) => {
        set((state) => ({
          modals: { ...state.modals, [modalId]: false },
        }))
      },
      toggleModal: (modalId) => {
        set((state) => ({
          modals: { ...state.modals, [modalId]: !state.modals[modalId] },
        }))
      },
      closeAllModals: () => {
        set({ modals: {} })
      },

      // Loading states
      loadingStates: {},
      setLoading: (key, loading) => {
        set((state) => ({
          loadingStates: { ...state.loadingStates, [key]: loading },
        }))
      },
      clearAllLoading: () => {
        set({ loadingStates: {} })
      },

      // Breadcrumbs
      breadcrumbs: [],
      setBreadcrumbs: (breadcrumbs) => {
        set({ breadcrumbs })
      },
      addBreadcrumb: (breadcrumb) => {
        set((state) => ({
          breadcrumbs: [...state.breadcrumbs, breadcrumb],
        }))
      },
      clearBreadcrumbs: () => {
        set({ breadcrumbs: [] })
      },

      // Recherche
      searchQueries: {},
      setSearchQuery: (key, query) => {
        set((state) => ({
          searchQueries: { ...state.searchQueries, [key]: query },
        }))
      },
      clearSearchQuery: (key) => {
        set((state) => {
          const newQueries = { ...state.searchQueries }
          delete newQueries[key]
          return { searchQueries: newQueries }
        })
      },

      // Filtres
      filters: {},
      setFilter: (key, value) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }))
      },
      clearFilter: (key) => {
        set((state) => {
          const newFilters = { ...state.filters }
          delete newFilters[key]
          return { filters: newFilters }
        })
      },
      clearAllFilters: () => {
        set({ filters: {} })
      },

      // Pagination
      pagination: {},
      setPagination: (key, page, limit = 10) => {
        set((state) => ({
          pagination: { ...state.pagination, [key]: { page, limit } },
        }))
      },
      resetPagination: (key) => {
        set((state) => ({
          pagination: { ...state.pagination, [key]: { page: 1, limit: 10 } },
        }))
      },

      // Toasts
      toasts: [],
      addToast: (toast) => {
        const id = Date.now().toString()
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id }],
        }))
        
        // Auto-remove après la durée spécifiée
        setTimeout(() => {
          get().removeToast(id)
        }, toast.duration || 5000)
      },
      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }))
      },
      clearToasts: () => {
        set({ toasts: [] })
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
        searchQueries: state.searchQueries,
        filters: state.filters,
        pagination: state.pagination,
      }),
    }
  )
) 