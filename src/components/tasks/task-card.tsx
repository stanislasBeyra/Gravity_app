'use client';

import { Calendar, Clock, User, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Task, TaskStatus } from '@/types/task';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusChange?: (status: TaskStatus) => void;
  className?: string;
}

export function TaskCard({
  task,
  onClick,
  onEdit,
  onDelete,
  onStatusChange,
  className = ''
}: TaskCardProps) {
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'TODO':
        return <Badge variant="outline">À faire</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="secondary">En cours</Badge>;
      case 'DONE':
        return <Badge variant="success">Terminée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    
    switch (priority) {
      case 'URGENT':
        return <Badge variant="destructive">Urgente</Badge>;
      case 'HIGH':
        return <Badge variant="default">Élevée</Badge>;
      case 'MEDIUM':
        return <Badge variant="secondary">Moyenne</Badge>;
      case 'LOW':
        return <Badge variant="outline">Faible</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card 
      className={`p-6 hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {task.title}
            </h3>
            {getPriorityBadge(task.priority)}
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mb-3">
            {getStatusBadge(task.status)}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onEdit && (
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                Modifier
              </DropdownMenuItem>
            )}
            {onStatusChange && task.status !== 'DONE' && (
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onStatusChange('DONE'); }}>
                Marquer comme terminée
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-red-600"
              >
                Supprimer
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Assignee */}
      {task.assignee && (
        <div className="flex items-center gap-2 mb-4">
          <User className="h-4 w-4 text-gray-400" />
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignee.avatar} alt={task.assignee.firstname} />
            <AvatarFallback className="text-xs">
              {getInitials(`${task.assignee.firstname} ${task.assignee.lastname}`)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">
            {task.assignee.firstname} {task.assignee.lastname}
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>
            Créée {formatDistanceToNow(new Date(task.createdAt), {
              addSuffix: true,
              locale: fr
            })}
          </span>
        </div>
        
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              Échéance {formatDistanceToNow(new Date(task.dueDate), {
                addSuffix: true,
                locale: fr
              })}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
} 