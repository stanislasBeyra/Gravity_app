import Link from 'next/link';
import { Clock, User } from 'lucide-react';

export function RecentTasks() {
  const recentTasks = [
    {
      id: '1',
      title: 'Créer la maquette de la page d&apos;accueil',
      status: 'En cours',
      assignee: 'John Doe',
      dueDate: '2024-02-15',
      priority: 'Haute'
    },
    {
      id: '2',
      title: 'Implémenter l&apos;authentification',
      status: 'À faire',
      assignee: 'Jane Smith',
      dueDate: '2024-02-20',
      priority: 'Moyenne'
    },
    {
      id: '3',
      title: 'Rédiger le contenu marketing',
      status: 'Terminé',
      assignee: 'Bob Johnson',
      dueDate: '2024-01-31',
      priority: 'Basse'
    },
    {
      id: '4',
      title: 'Configurer la base de données',
      status: 'En cours',
      assignee: 'Alice Brown',
      dueDate: '2024-02-18',
      priority: 'Haute'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'À faire':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Haute':
        return 'bg-red-100 text-red-800';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800';
      case 'Basse':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Tâches récentes</h3>
          <Link
            href="/tasks"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Voir toutes →
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {recentTasks.map((task) => (
          <div key={task.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Link
                    href={`/tasks/${task.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600"
                  >
                    {task.title}
                  </Link>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {task.assignee}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 