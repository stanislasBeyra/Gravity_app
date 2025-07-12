'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskPriorityBadgeProps {
  priority: string;
  className?: string;
}

export function TaskPriorityBadge({ priority, className }: TaskPriorityBadgeProps) {
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'low':
        return {
          label: 'Faible',
          variant: 'outline' as const,
          className: 'border-gray-300 text-gray-600'
        };
      case 'medium':
        return {
          label: 'Moyenne',
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'high':
        return {
          label: 'Élevée',
          variant: 'default' as const,
          className: 'bg-orange-100 text-orange-800 border-orange-200'
        };
      case 'urgent':
        return {
          label: 'Urgente',
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 border-red-200'
        };
      default:
        return {
          label: priority,
          variant: 'outline' as const,
          className: ''
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
} 