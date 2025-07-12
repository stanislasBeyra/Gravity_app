'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TaskProgressData {
  completed: number;
  inProgress: number;
  overdue: number;
  total: number;
}

interface TaskProgressChartProps {
  data: TaskProgressData;
  className?: string;
}

export function TaskProgressChart({ data, className }: TaskProgressChartProps) {
  const completedPercentage = data.total > 0 ? (data.completed / data.total) * 100 : 0;
  const inProgressPercentage = data.total > 0 ? (data.inProgress / data.total) * 100 : 0;
  const overduePercentage = data.total > 0 ? (data.overdue / data.total) * 100 : 0;

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Progression des tâches</h3>
          <Badge variant="secondary">{data.total} total</Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression globale</span>
            <span>{Math.round(completedPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completedPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{data.completed}</div>
            <div className="text-xs text-gray-500">Terminées</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{data.inProgress}</div>
            <div className="text-xs text-gray-500">En cours</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mx-auto mb-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{data.overdue}</div>
            <div className="text-xs text-gray-500">En retard</div>
          </div>
        </div>

        {/* Detailed Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
              Terminées
            </span>
            <span>{data.completed} ({Math.round(completedPercentage)}%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <Clock className="h-3 w-3 text-blue-600 mr-1" />
              En cours
            </span>
            <span>{data.inProgress} ({Math.round(inProgressPercentage)}%)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <AlertCircle className="h-3 w-3 text-red-600 mr-1" />
              En retard
            </span>
            <span>{data.overdue} ({Math.round(overduePercentage)}%)</span>
          </div>
        </div>
      </div>
    </Card>
  );
} 