'use client';

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-react'

interface TaskFiltersProps {
  filters: {
    search: string
    status: string
    priority: string
    assignee: string
  }
  onFiltersChange: (filters: Record<string, unknown>) => void
  onClearFilters: () => void
  className?: string
}

export function TaskFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  className
}: TaskFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      status: '',
      priority: '',
      assignee: ''
    }
    setLocalFilters(clearedFilters)
    onClearFilters()
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recherche */}
        <div className="space-y-2">
          <Label htmlFor="search">Rechercher</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Rechercher une tâche..."
              value={localFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Statut */}
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select
            value={localFilters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les statuts</SelectItem>
              <SelectItem value="todo">À faire</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="done">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priorité */}
        <div className="space-y-2">
          <Label htmlFor="priority">Priorité</Label>
          <Select
            value={localFilters.priority}
            onValueChange={(value) => handleFilterChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Toutes les priorités" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les priorités</SelectItem>
              <SelectItem value="low">Basse</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Haute</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Assigné */}
        <div className="space-y-2">
          <Label htmlFor="assignee">Assigné</Label>
          <Select
            value={localFilters.assignee}
            onValueChange={(value) => handleFilterChange('assignee', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tous les assignés" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les assignés</SelectItem>
              <SelectItem value="me">Moi</SelectItem>
              <SelectItem value="unassigned">Non assigné</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Boutons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Effacer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 