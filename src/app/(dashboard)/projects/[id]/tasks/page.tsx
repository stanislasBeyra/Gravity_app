'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  User, 
  Calendar, 
  AlertTriangle, 
  Search, 
  Filter,
  Clock,
  Target,
  TrendingUp,
  MoreVertical,
  Edit,
  Trash2,
  Flag
} from 'lucide-react';
import BackButton from '@/components/common/back-button';

interface ProjectTasksPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'À faire' | 'En cours' | 'Terminé' | 'En attente';
  priority: 'Basse' | 'Moyenne' | 'Haute' | 'Critique';
  assignee: string;
  assigneeAvatar: string;
  dueDate: string;
  progress: number;
  createdDate: string;
  estimatedHours?: number;
  tags?: string[];
}

export default function ProjectTasksPage({ params }: ProjectTasksPageProps) {
  const { id } = use(params);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showMobileActions, setShowMobileActions] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Créer la maquette de la page d\'accueil',
      description: 'Designer la maquette de la nouvelle page d\'accueil avec les nouvelles spécifications UX',
      status: 'En cours',
      priority: 'Haute',
      assignee: 'Jane Smith',
      assigneeAvatar: 'JS',
      dueDate: '2024-02-15',
      progress: 75,
      createdDate: '2024-01-20',
      estimatedHours: 16,
      tags: ['Design', 'UI/UX']
    },
    {
      id: '2',
      title: 'Implémenter l\'authentification',
      description: 'Développer le système d\'authentification JWT avec refresh tokens',
      status: 'À faire',
      priority: 'Moyenne',
      assignee: 'Bob Johnson',
      assigneeAvatar: 'BJ',
      dueDate: '2024-02-20',
      progress: 0,
      createdDate: '2024-01-22',
      estimatedHours: 24,
      tags: ['Backend', 'Sécurité']
    },
    {
      id: '3',
      title: 'Configurer la base de données',
      description: 'Mettre en place la base de données PostgreSQL avec les migrations',
      status: 'Terminé',
      priority: 'Basse',
      assignee: 'John Doe',
      assigneeAvatar: 'JD',
      dueDate: '2024-01-31',
      progress: 100,
      createdDate: '2024-01-15',
      estimatedHours: 8,
      tags: ['Backend', 'Database']
    },
    {
      id: '4',
      title: 'Développer l\'API REST',
      description: 'Créer les endpoints de l\'API backend avec documentation Swagger',
      status: 'En cours',
      priority: 'Haute',
      assignee: 'Alice Brown',
      assigneeAvatar: 'AB',
      dueDate: '2024-02-25',
      progress: 45,
      createdDate: '2024-01-25',
      estimatedHours: 32,
      tags: ['Backend', 'API']
    },
    {
      id: '5',
      title: 'Tests d\'intégration',
      description: 'Écrire et exécuter les tests d\'intégration pour l\'ensemble du système',
      status: 'En attente',
      priority: 'Critique',
      assignee: 'Charlie Wilson',
      assigneeAvatar: 'CW',
      dueDate: '2024-03-01',
      progress: 10,
      createdDate: '2024-01-30',
      estimatedHours: 40,
      tags: ['Testing', 'QA']
    }
  ];

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status.toLowerCase().replace(' ', '-') === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority.toLowerCase() === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'À faire':
        return 'bg-gray-100 text-gray-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critique':
        return 'bg-red-200 text-red-900';
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Critique':
        return <AlertTriangle className="h-3 w-3 text-red-600" />;
      case 'Haute':
        return <Flag className="h-3 w-3 text-red-500" />;
      case 'Moyenne':
        return <Flag className="h-3 w-3 text-yellow-500" />;
      case 'Basse':
        return <Flag className="h-3 w-3 text-green-500" />;
      default:
        return <Flag className="h-3 w-3 text-gray-500" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    if (progress >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Terminé':
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case 'En cours':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'À faire':
        return <Clock className="h-4 w-4 text-gray-600" />;
      case 'En attente':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const taskStats = {
    total: mockTasks.length,
    completed: mockTasks.filter(t => t.status === 'Terminé').length,
    inProgress: mockTasks.filter(t => t.status === 'En cours').length,
    overdue: mockTasks.filter(t => isOverdue(t.dueDate) && t.status !== 'Terminé').length
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header responsive */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
          <BackButton className="mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Tâches du projet
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Gérez les tâches de votre projet
            </p>
          </div>
        </div>
        
        {/* Bouton nouvelle tâche - Desktop */}
        <Link
          href={`/projects/${id}/tasks/create`}
          className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex-shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">Nouvelle tâche</span>
          <span className="lg:hidden">Nouvelle</span>
        </Link>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{taskStats.total}</div>
              <div className="text-xs sm:text-sm text-gray-500">Total</div>
            </div>
            <Target className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{taskStats.inProgress}</div>
              <div className="text-xs sm:text-sm text-gray-500">En cours</div>
            </div>
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-green-600">{taskStats.completed}</div>
              <div className="text-xs sm:text-sm text-gray-500">Terminées</div>
            </div>
            <CheckSquare className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-red-600">{taskStats.overdue}</div>
              <div className="text-xs sm:text-sm text-gray-500">En retard</div>
            </div>
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Barre de recherche */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une tâche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-9 sm:pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>
        
        {/* Filtres */}
        <div className="flex space-x-2 sm:space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm bg-white min-w-0"
          >
            <option value="all">Tous</option>
            <option value="à-faire">À faire</option>
            <option value="en-cours">En cours</option>
            <option value="terminé">Terminé</option>
            <option value="en-attente">En attente</option>
          </select>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm bg-white min-w-0"
          >
            <option value="all">Priorité</option>
            <option value="critique">Critique</option>
            <option value="haute">Haute</option>
            <option value="moyenne">Moyenne</option>
            <option value="basse">Basse</option>
          </select>
          
          {/* Bouton nouvelle tâche - Mobile */}
          <Link
            href={`/projects/${id}/tasks/create`}
            className="sm:hidden flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle</span>
          </Link>
        </div>
      </div>

      {/* Liste des tâches */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Toutes les tâches ({filteredTasks.length})
          </h2>
        </div>

        {/* Version mobile - Cartes */}
        <div className="sm:hidden divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4">
              <div className="space-y-3">
                {/* Header de la tâche */}
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="text-base font-medium text-gray-900 hover:text-blue-600 line-clamp-2 block"
                    >
                      {task.title}
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{task.description}</p>
                  </div>
                  
                  <div className="relative ml-2">
                    <button
                      onClick={() => setShowMobileActions(showMobileActions === task.id ? null : task.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    
                    {showMobileActions === task.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowMobileActions(null)}
                        />
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                          <Link
                            href={`/tasks/${task.id}`}
                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowMobileActions(null)}
                          >
                            <Edit className="h-4 w-4" />
                            <span>Modifier</span>
                          </Link>
                          <button
                            className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                    <span>{task.status}</span>
                  </span>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {getPriorityIcon(task.priority)}
                    <span>{task.priority}</span>
                  </span>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progression</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>

                {/* Assigné et date */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">{task.assigneeAvatar}</span>
                    </div>
                    <span>{task.assignee}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${isOverdue(task.dueDate) && task.status !== 'Terminé' ? 'text-red-500' : ''}`}>
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                    {task.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{task.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Version desktop - Liste */}
        <div className="hidden sm:block divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="text-base sm:text-lg font-medium text-gray-900 hover:text-blue-600 truncate"
                    >
                      {task.title}
                    </Link>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      <span>{task.status}</span>
                    </span>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {getPriorityIcon(task.priority)}
                      <span>{task.priority}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
                  
                  {/* Progress bar */}
                  <div className="mb-3 max-w-md">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progression</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">{task.assigneeAvatar}</span>
                      </div>
                      <span>{task.assignee}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${isOverdue(task.dueDate) && task.status !== 'Terminé' ? 'text-red-500' : ''}`}>
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                      {isOverdue(task.dueDate) && task.status !== 'Terminé' && (
                        <span className="text-red-500 font-medium">(En retard)</span>
                      )}
                    </div>
                    {task.estimatedHours && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{task.estimatedHours}h</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {task.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex-shrink-0">
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

        {/* État vide */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <CheckSquare className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' ? 'Aucune tâche trouvée' : 'Aucune tâche'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' 
                ? 'Essayez de modifier vos filtres de recherche'
                : 'Créez votre première tâche pour commencer à organiser votre projet'
              }
            </p>
            {(!searchTerm && filterStatus === 'all' && filterPriority === 'all') && (
              <Link
                href={`/projects/${id}/tasks/create`}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <Plus className="h-4 w-4" />
                <span>Créer une tâche</span>
              </Link>
            )}
            {(searchTerm || filterStatus !== 'all' || filterPriority !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setFilterPriority('all');
                }}
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bouton flottant - Mobile */}
      <div className="sm:hidden fixed bottom-20 right-4">
        <Link
          href={`/projects/${id}/tasks/create`}
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}