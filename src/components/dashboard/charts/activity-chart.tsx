'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface ActivityData {
  date: string;
  tasks: number;
  projects: number;
  messages: number;
}

interface ActivityChartProps {
  data: ActivityData[];
  className?: string;
}

export function ActivityChart({ data, className }: ActivityChartProps) {
  const totalTasks = data.reduce((sum, item) => sum + item.tasks, 0);
  const totalProjects = data.reduce((sum, item) => sum + item.projects, 0);
  const totalMessages = data.reduce((sum, item) => sum + item.messages, 0);

  const maxValue = Math.max(totalTasks, totalProjects, totalMessages);

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Activité récente</h3>
          <Badge variant="secondary">7 jours</Badge>
        </div>

        {/* Chart Bars */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-blue-600" />
                Tâches
              </span>
              <span className="font-medium">{totalTasks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(totalTasks / maxValue) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                Projets
              </span>
              <span className="font-medium">{totalProjects}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(totalProjects / maxValue) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <TrendingDown className="h-4 w-4 mr-2 text-purple-600" />
                Messages
              </span>
              <span className="font-medium">{totalMessages}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(totalMessages / maxValue) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Activité récente</h4>
          <div className="space-y-2">
            {data.slice(-3).reverse().map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{item.date}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-blue-600">{item.tasks} tâches</span>
                  <span className="text-green-600">{item.projects} projets</span>
                  <span className="text-purple-600">{item.messages} messages</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
} 