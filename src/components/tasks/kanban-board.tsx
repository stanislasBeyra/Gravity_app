'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Task } from '@/types/task';
import { TaskCard } from './task-card';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: string) => void;
  onTaskMove?: (taskId: string, newStatus: string) => void;
  className?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
}

const columns: KanbanColumn[] = [
  { id: 'todo', title: 'À faire', color: 'bg-gray-100' },
  { id: 'in_progress', title: 'En cours', color: 'bg-blue-100' },
  { id: 'completed', title: 'Terminées', color: 'bg-green-100' }
];

export function KanbanBoard({
  tasks,
  onTaskClick,
  onAddTask,
  onTaskMove,
  className
}: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault();
    if (draggedTask && onTaskMove) {
      onTaskMove(draggedTask, status);
    }
    setDraggedTask(null);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <div key={column.id} className="space-y-4">
              <div className={`p-4 rounded-lg ${column.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="secondary">{columnTasks.length}</Badge>
                </div>
                {onAddTask && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddTask(column.id)}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une tâche
                  </Button>
                )}
              </div>

              <div
                className="min-h-[400px] space-y-2"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="cursor-move"
                  >
                    <TaskCard
                      task={task}
                      onClick={() => onTaskClick?.(task)}
                      className="mb-2"
                    />
                  </div>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">Aucune tâche</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 