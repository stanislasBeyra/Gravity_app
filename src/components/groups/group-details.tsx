'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, Edit, Settings, MessageSquare } from 'lucide-react';
import { Group } from '@/types/group';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface GroupDetailsProps {
  group: Group;
  onEdit?: () => void;
  onSettings?: () => void;
  onChat?: () => void;
  className?: string;
}

export function GroupDetails({ 
  group, 
  onEdit, 
  onSettings, 
  onChat, 
  className 
}: GroupDetailsProps) {
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
            <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
            <Badge variant="success">Actif</Badge>
          </div>
          {group.description && (
            <p className="text-gray-600 mb-4">{group.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Créé {formatDistanceToNow(new Date(group.createdAt), {
                addSuffix: true,
                locale: fr
              })}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {group.members?.length || 0} membre{(group.members?.length || 0) !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {onChat && (
            <Button onClick={onChat} variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
          )}
          {onEdit && (
            <Button onClick={onEdit} variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
          {onSettings && (
            <Button onClick={onSettings} variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          )}
        </div>
      </div>

      {/* Members Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Membres du groupe</h2>
          <Badge variant="secondary">{group.members?.length || 0} membres</Badge>
        </div>

        {group.members && group.members.length > 0 ? (
          <div className="space-y-3">
            {group.members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.user.avatar} alt={member.user.firstname} />
                    <AvatarFallback>
                      {getInitials(`${member.user.firstname} ${member.user.lastname}`)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {member.user.firstname} {member.user.lastname}
                    </div>
                    <div className="text-sm text-gray-500">{member.user.email}</div>
                  </div>
                </div>
                <Badge variant={member.role === 'ADMIN' ? 'default' : 'secondary'}>
                  {member.role === 'ADMIN' ? 'Administrateur' : 'Membre'}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Aucun membre dans ce groupe</p>
          </div>
        )}
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Nouveau membre ajouté</p>
              <p className="text-xs text-gray-500">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Tâche terminée</p>
              <p className="text-xs text-gray-500">Il y a 4 heures</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Nouveau message</p>
              <p className="text-xs text-gray-500">Il y a 6 heures</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 