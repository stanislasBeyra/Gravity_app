'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskStatusBadgeProps {
  status: string;
  className?: string;
}

export function TaskStatusBadge({ status, className }: TaskStatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'todo':
        return {
          label: 'À faire',
          variant: 'outline' as const,
          className: 'border-gray-300 text-gray-700'
        };
      case 'in_progress':
        return {
          label: 'En cours',
          variant: 'secondary' as const,
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'completed':
        return {
          label: 'Terminée',
          variant: 'success' as const,
          className: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'cancelled':
        return {
          label: 'Annulée',
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200'
        };
      default:
        return {
          label: status,
          variant: 'outline' as const,
          className: ''
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
} 