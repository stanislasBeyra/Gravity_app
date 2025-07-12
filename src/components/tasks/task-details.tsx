'use client';

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, MessageSquare, Edit } from 'lucide-react'
import { TaskStatusBadge } from './task-status-badge';
import { TaskPriorityBadge } from './task-priority-badge';
import { Task, TaskStatus } from '@/types/task';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TaskDetailsProps {
  task: Task;
  onEdit?: () => void;
  onStatusChange?: (status: TaskStatus) => void;
  onComments?: () => void;
  className?: string;
}

export function TaskDetails({ 
  task, 
  onEdit, 
  onStatusChange, 
  onComments, 
  className 
}: TaskDetailsProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <TaskStatusBadge status={task.status} />
            {task.priority && <TaskPriorityBadge priority={task.priority} />}
          </div>
          {task.description && (
            <p className="text-gray-600 mb-4">{task.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          {onComments && (
            <Button onClick={onComments} variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Commentaires
            </Button>
          )}
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Informations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Statut</span>
              <TaskStatusBadge status={task.status} />
            </div>
            {task.priority && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Priorité</span>
                <TaskPriorityBadge priority={task.priority} />
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Créée</span>
              <span className="text-sm">
                {formatDistanceToNow(new Date(task.createdAt), {
                  addSuffix: true,
                  locale: fr
                })}
              </span>
            </div>
            {task.dueDate && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Échéance</span>
                <span className="text-sm">
                  {formatDistanceToNow(new Date(task.dueDate), {
                    addSuffix: true,
                    locale: fr
                  })}
                </span>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Assignation</h3>
          {task.assignee ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={task.assignee.avatar} alt={task.assignee.firstname} />
                <AvatarFallback>
                  {getInitials(`${task.assignee.firstname} ${task.assignee.lastname}`)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">
                  {task.assignee.firstname} {task.assignee.lastname}
                </div>
                <div className="text-sm text-gray-500">{task.assignee.email}</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <User className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>Aucun assigné</p>
            </div>
          )}
        </Card>
      </div>

      {/* Status Actions */}
      {onStatusChange && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Actions</h3>
          <div className="flex gap-2">
            {task.status !== 'TODO' && (
              <Button 
                variant="outline" 
                onClick={() => onStatusChange('TODO')}
              >
                Marquer comme à faire
              </Button>
            )}
            {task.status !== 'IN_PROGRESS' && (
              <Button 
                variant="outline" 
                onClick={() => onStatusChange('IN_PROGRESS')}
              >
                Marquer en cours
              </Button>
            )}
            {task.status !== 'DONE' && (
              <Button 
                variant="outline" 
                onClick={() => onStatusChange('DONE')}
              >
                Marquer comme terminée
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
} 