'use client';

import { Users, Calendar, MoreVertical } from 'lucide-react';
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
import { Group } from '@/types/group';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface GroupCardProps {
  group: Group;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  className?: string;
}

export function GroupCard({
  group,
  onClick,
  onEdit,
  onDelete,
  onArchive,
  className = ''
}: GroupCardProps) {
  const getStatusBadge = () => {
    // Groups are always active in this implementation
    return <Badge variant="success">Actif</Badge>;
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
              {group.name}
            </h3>
            {getStatusBadge()}
          </div>
          {group.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {group.description}
            </p>
          )}
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
            {onArchive && (
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onArchive(); }}>
                Archiver
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

      {/* Members */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {group.members?.length || 0} membre{(group.members?.length || 0) !== 1 ? 's' : ''}
          </span>
        </div>
        
        {group.members && group.members.length > 0 && (
          <div className="flex -space-x-2">
            {group.members.slice(0, 3).map((member) => (
              <Avatar key={member.id} className="h-6 w-6 -ml-1 border-2 border-white">
                <AvatarImage src={member.user.avatar} alt={`${member.user.firstname} ${member.user.lastname}`} />
                <AvatarFallback className="text-xs">
                  {member.user.firstname.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {group.members.length > 5 && (
              <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-gray-600 font-medium">
                  +{group.members.length - 5}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>
            Créé {formatDistanceToNow(new Date(group.createdAt), {
              addSuffix: true,
              locale: fr
            })}
          </span>
        </div>
        
        {group.updatedAt && (
          <span>
            Modifié {formatDistanceToNow(new Date(group.updatedAt), {
              addSuffix: true,
              locale: fr
            })}
          </span>
        )}
      </div>
    </Card>
  );
} 