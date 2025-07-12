import Link from 'next/link';
import { use } from 'react';
import { CheckSquare, User, Calendar, AlertTriangle, Edit } from 'lucide-react';

interface TaskPageProps {
  params: Promise<{ id: string }>;
}

export default function TaskPage({ params }: TaskPageProps) {
  const { id } = use(params);
  const mockTask = {
    id: id,
    title: 'Créer la maquette de la page d\'accueil',
    description: 'Designer la maquette de la nouvelle page d\'accueil avec une interface moderne et responsive.',
    status: 'En cours',
    priority: 'Haute',
    assignee: 'John Doe',
    dueDate: '2024-02-15',
    project: 'Refonte Site Web',
    createdAt: '2024-01-20'
  };

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
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{mockTask.title}</h1>
          <p className="text-gray-600">Projet : {mockTask.project}</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/tasks/${id}/edit`}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Edit className="h-4 w-4" />
            <span>Modifier</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700">{mockTask.description}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Task Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Statut</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mockTask.status)}`}>
                    {mockTask.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Priorité</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(mockTask.priority)}`}>
                    {mockTask.priority}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Assigné à</p>
                  <p className="text-sm text-gray-600">{mockTask.assignee}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Date d&apos;échéance</p>
                  <p className="text-sm text-gray-600">{new Date(mockTask.dueDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 