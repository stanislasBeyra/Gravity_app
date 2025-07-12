'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Calendar, Target, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectStatsProps {
  project: Project;
  className?: string;
}

export function ProjectStats({ project, className }: ProjectStatsProps) {
  // Mock data - in real app, these would come from the project data
  const totalTasks = 24;
  const completedTasks = 18;
  const inProgressTasks = 4;
  const overdueTasks = 2;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const daysRemaining = project.endDate 
    ? Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Overview */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Progression du projet</h3>
            <Badge variant="secondary">{progressPercentage}%</Badge>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              <div className="text-sm text-gray-500">Terminées</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
              <div className="text-sm text-gray-500">En cours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
              <div className="text-sm text-gray-500">En retard</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{project.members?.length || 0}</div>
              <div className="text-sm text-gray-500">Membres</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <div className="text-sm text-gray-500">Tâches terminées</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{inProgressTasks}</div>
              <div className="text-sm text-gray-500">En cours</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{overdueTasks}</div>
              <div className="text-sm text-gray-500">En retard</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Timeline */}
      {project.startDate && project.endDate && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Échéances</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium">Date de début</div>
                  <div className="text-sm text-gray-500">
                    {new Date(project.startDate).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">Date de fin</div>
                  <div className="text-sm text-gray-500">
                    {new Date(project.endDate).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
              {daysRemaining !== null && (
                <Badge variant={daysRemaining > 0 ? 'success' : 'destructive'}>
                  {daysRemaining > 0 ? `${daysRemaining} jours restants` : 'Échéance dépassée'}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 