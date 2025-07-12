import Link from 'next/link';
import { Plus, CheckCircle, Clock, AlertCircle, User } from 'lucide-react';

export default function TasksPage() {
  const mockTasks = [
    {
      id: '1',
      title: 'Créer la maquette de la page d\'accueil',
      description: 'Designer la maquette de la nouvelle page d\'accueil',
      status: 'En cours',
      priority: 'Haute',
      assignee: 'John Doe',
      dueDate: '2024-02-15',
      project: 'Refonte Site Web'
    },
    {
      id: '2',
      title: 'Implémenter l\'authentification',
      description: 'Développer le système d\'authentification JWT',
      status: 'À faire',
      priority: 'Moyenne',
      assignee: 'Jane Smith',
      dueDate: '2024-02-20',
      project: 'Application Mobile'
    },
    {
      id: '3',
      title: 'Rédiger le contenu marketing',
      description: 'Créer le contenu pour la campagne Q1',
      status: 'Terminé',
      priority: 'Basse',
      assignee: 'Bob Johnson',
      dueDate: '2024-01-31',
      project: 'Campagne Marketing Q1'
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tâches</h1>
          <p className="text-gray-600">Gérez vos tâches et priorités</p>
        </div>
        <Link
          href="/tasks/create"
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle tâche</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Toutes les tâches</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {mockTasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600"
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
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-blue-600">{task.project}</div>
                  </div>
                </div>
                <div className="ml-4">
                  <Link
                    href={`/tasks/${task.id}`}
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    Voir détails →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {mockTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune tâche</h3>
          <p className="text-gray-600 mb-6">Créez votre première tâche pour commencer à organiser votre travail</p>
          <Link
            href="/tasks/create"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Créer une tâche</span>
          </Link>
        </div>
      )}
    </div>
  );
} 