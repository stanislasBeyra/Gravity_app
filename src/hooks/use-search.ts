import { useState, useMemo } from 'react'
import { useDebounce } from './use-debounce'

interface UseSearchProps<T> {
  data: T[]
  searchFields: (keyof T)[]
  debounceMs?: number
}

export function useSearch<T>({ data, searchFields, debounceMs = 300 }: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs)

  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return data
    }

    const searchLower = debouncedSearchTerm.toLowerCase()
    
    return data.filter(item => {
      return searchFields.some(field => {
        const fieldValue = item[field]
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchLower)
        }
        if (typeof fieldValue === 'number') {
          return fieldValue.toString().includes(searchLower)
        }
        return false
      })
    })
  }, [data, debouncedSearchTerm, searchFields])

  const clearSearch = () => {
    setSearchTerm('')
  }

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    filteredData,
    clearSearch,
    resultCount: filteredData.length,
  }
} 