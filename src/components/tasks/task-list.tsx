'use client';

import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TaskCard } from './task-card';
import { EmptyState } from '@/components/common/empty-state';
import { Task, TaskStatus, TaskPriority } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  onCreateTask?: () => void;
  onTaskClick?: (task: Task) => void;
  className?: string;
}

export function TaskList({
  tasks,
  loading = false,
  onCreateTask,
  onTaskClick,
  className = ''
}: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | TaskStatus>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | TaskPriority>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tâches</h1>
          <p className="text-gray-600">
            Gérez vos tâches et projets
          </p>
        </div>
        {onCreateTask && (
          <Button onClick={onCreateTask} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Créer une tâche
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher des tâches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            Toutes
          </Button>
          <Button
            variant={filterStatus === 'TODO' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('TODO')}
          >
            À faire
          </Button>
          <Button
            variant={filterStatus === 'IN_PROGRESS' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('IN_PROGRESS')}
          >
            En cours
          </Button>
          <Button
            variant={filterStatus === 'DONE' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('DONE')}
          >
            Terminées
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterPriority === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterPriority('all')}
          >
            Toutes priorités
          </Button>
          <Button
            variant={filterPriority === 'URGENT' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterPriority('URGENT')}
          >
            Urgente
          </Button>
          <Button
            variant={filterPriority === 'HIGH' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterPriority('HIGH')}
          >
            Élevée
          </Button>
          <Button
            variant={filterPriority === 'MEDIUM' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterPriority('MEDIUM')}
          >
            Moyenne
          </Button>
          <Button
            variant={filterPriority === 'LOW' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterPriority('LOW')}
          >
            Faible
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {filteredTasks.length} tâche{filteredTasks.length !== 1 ? 's' : ''} trouvée{filteredTasks.length !== 1 ? 's' : ''}
        </span>
        {searchQuery && (
          <span>pour &quot;{searchQuery}&quot;</span>
        )}
      </div>

      {/* Tasks Grid */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick?.(task)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Filter}
          title="Aucune tâche trouvée"
          description={
            searchQuery
              ? `Aucune tâche ne correspond à "${searchQuery}"`
              : "Vous n'avez pas encore créé de tâches"
          }
          actionLabel={onCreateTask ? "Créer une tâche" : undefined}
          onAction={onCreateTask}
        />
      )}
    </div>
  );
} 