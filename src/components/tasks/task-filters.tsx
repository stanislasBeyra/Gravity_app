'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/common/date-picker';
import { UserSelect } from '@/components/common/user-select';
import { User } from '@/types/user';

interface TaskFiltersProps {
  users?: User[];
  onFiltersChange: (filters: any) => void;
  className?: string;
}

export function TaskFilters({ users = [], onFiltersChange, className }: TaskFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [priority, setPriority] = useState<string>('all');
  const [assignee, setAssignee] = useState<string>('all');
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const handleFilterChange = () => {
    onFiltersChange({
      search: searchQuery,
      status: status === 'all' ? undefined : status,
      priority: priority === 'all' ? undefined : priority,
      assignee: assignee === 'all' ? undefined : assignee,
      dueDate: dueDate?.toISOString()
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatus('all');
    setPriority('all');
    setAssignee('all');
    setDueDate(undefined);
    onFiltersChange({});
  };

  const hasActiveFilters = searchQuery || status !== 'all' || priority !== 'all' || assignee !== 'all' || dueDate;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-600" />
        <h3 className="font-medium">Filtres</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Effacer
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleFilterChange();
            }}
            className="pl-10"
          />
        </div>

        <Select value={status} onValueChange={(value) => {
          setStatus(value);
          handleFilterChange();
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="todo">À faire</SelectItem>
            <SelectItem value="in_progress">En cours</SelectItem>
            <SelectItem value="completed">Terminées</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priority} onValueChange={(value) => {
          setPriority(value);
          handleFilterChange();
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Priorité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes priorités</SelectItem>
            <SelectItem value="low">Faible</SelectItem>
            <SelectItem value="medium">Moyenne</SelectItem>
            <SelectItem value="high">Élevée</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
          </SelectContent>
        </Select>

        <Select value={assignee} onValueChange={(value) => {
          setAssignee(value);
          handleFilterChange();
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Assigné à" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les assignés</SelectItem>
            <SelectItem value="unassigned">Non assignées</SelectItem>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.firstname} {user.lastname}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date d'échéance
          </label>
          <DatePicker
            value={dueDate}
            onValueChange={(date) => {
              setDueDate(date);
              handleFilterChange();
            }}
            placeholder="Filtrer par date"
          />
        </div>
      </div>
    </div>
  );
} 