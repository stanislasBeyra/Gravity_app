'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, Target, Edit, Settings } from 'lucide-react';
import { Project } from '@/types/project';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProjectDetailsProps {
  project: Project;
  onEdit?: () => void;
  onSettings?: () => void;
  className?: string;
}

export function ProjectDetails({ project, onEdit, onSettings, className }: ProjectDetailsProps) {
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'active':
        return <Badge variant="success">En cours</Badge>;
      case 'completed':
        return <Badge variant="default">Terminé</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archivé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
            {getStatusBadge(project.status)}
          </div>
          {project.description && (
            <p className="text-gray-600 mb-4">{project.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Créé {formatDistanceToNow(new Date(project.createdAt), {
                addSuffix: true,
                locale: fr
              })}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {project.members?.length || 0} membre{(project.members?.length || 0) !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
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

      {/* Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Progression</h2>
          <Badge variant="secondary">75%</Badge>
        </div>
        <Progress value={75} className="mb-4" />
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-500">Tâches terminées</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">4</div>
            <div className="text-sm text-gray-500">En cours</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-sm text-gray-500">En retard</div>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Informations</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Créé le</div>
                <div className="text-sm text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Membres</div>
                <div className="text-sm text-gray-500">
                  {project.members?.length || 0} membre{(project.members?.length || 0) !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 