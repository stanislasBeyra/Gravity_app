import { Activity, Users, CheckSquare, Folder } from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      id: '1',
      type: 'task_completed',
      message: 'Tâche "Créer la maquette" marquée comme terminée',
      user: 'John Doe',
      time: 'Il y a 2 heures',
      icon: CheckSquare,
      color: 'text-green-600'
    },
    {
      id: '2',
      type: 'member_added',
      message: 'Jane Smith a rejoint le projet "Refonte Site Web"',
      user: 'Admin',
      time: 'Il y a 4 heures',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: '3',
      type: 'project_created',
      message: 'Nouveau projet "Application Mobile" créé',
      user: 'Bob Johnson',
      time: 'Il y a 1 jour',
      icon: Folder,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'task_assigned',
      message: 'Tâche "Implémenter l\'authentification" assignée à Alice Brown',
      user: 'John Doe',
      time: 'Il y a 1 jour',
      icon: CheckSquare,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Activité récente</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{activity.user}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 