'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { 
  Folder, 
  Users, 
  Settings, 
  MessageSquare, 
  CheckSquare, 
  TrendingUp, 
  MoreVertical,
  Clock,
  AlertTriangle
} from 'lucide-react';
import BackButton from '@/components/common/back-button';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params);
  const [showMobileActions, setShowMobileActions] = useState(false);

  const mockProject = {
    id: id,
    name: 'Refonte Site Web',
    description: 'Refonte complète du site web de l&apos;entreprise avec une interface moderne et responsive. Le projet inclut la conception, le développement frontend et backend, ainsi que l&apos;intégration avec les systèmes existants.',
    status: 'En cours',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    memberCount: 6,
    taskCount: 24,
    completedTasks: 16,
    color: 'bg-blue-500',
    priority: 'high',
    budget: 25000,
    spent: 16250,
    members: [
      { id: '1', name: 'John Doe', role: 'Chef de projet', avatar: 'JD', status: 'online' },
      { id: '2', name: 'Jane Smith', role: 'Designer UI/UX', avatar: 'JS', status: 'away' },
      { id: '3', name: 'Bob Johnson', role: 'Développeur Frontend', avatar: 'BJ', status: 'offline' },
      { id: '4', name: 'Alice Brown', role: 'Développeur Backend', avatar: 'AB', status: 'online' }
    ],
    recentTasks: [
      { id: '1', title: 'Créer la maquette de la page d&apos;accueil', status: 'En cours', assignee: 'Jane Smith', priority: 'high' },
      { id: '2', title: 'Implémenter l&apos;authentification', status: 'À faire', assignee: 'Bob Johnson', priority: 'medium' },
      { id: '3', title: 'Configurer la base de données', status: 'Terminé', assignee: 'John Doe', priority: 'high' },
      { id: '4', title: 'Tests d&apos;intégration API', status: 'En cours', assignee: 'Alice Brown', priority: 'low' }
    ],
    timeline: [
      { date: '2024-01-15', event: 'Projet démarré', type: 'milestone' },
      { date: '2024-02-01', event: 'Phase de conception terminée', type: 'completed' },
      { date: '2024-02-15', event: 'Développement frontend démarré', type: 'progress' },
      { date: '2024-03-15', event: 'Livraison prévue', type: 'deadline' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'Planifié':
        return 'bg-yellow-100 text-yellow-800';
      case 'En pause':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStatusColor = (status: string) => {
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
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const isOverdue = () => {
    return new Date(mockProject.endDate) < new Date() && mockProject.status !== 'Terminé';
  };

  const daysLeft = () => {
    const today = new Date();
    const endDate = new Date(mockProject.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header responsive */}
      <div className="flex flex-col space-y-4 sm:space-y-0">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <BackButton className="mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start space-x-3 mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${mockProject.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Folder className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      {mockProject.name}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-3 sm:line-clamp-none">
                      {mockProject.description}
                    </p>
                  </div>
                  
                  {/* Actions - Desktop */}
                  <div className="hidden sm:flex space-x-2 ml-4 flex-shrink-0">
                    <Link
                      href={`/projects/${id}/chat`}
                      className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden lg:inline">Chat</span>
                    </Link>
                    <Link
                      href={`/projects/${id}/members`}
                      className="flex items-center space-x-2 px-3 lg:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Users className="h-4 w-4" />
                      <span className="hidden lg:inline">Membres</span>
                    </Link>
                    <Link
                      href={`/projects/${id}/settings`}
                      className="flex items-center space-x-2 px-3 lg:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Settings className="h-4 w-4" />
                      <span className="hidden lg:inline">Paramètres</span>
                    </Link>
                  </div>

                  {/* Menu mobile */}
                  <div className="sm:hidden relative ml-2">
                    <button
                      onClick={() => setShowMobileActions(!showMobileActions)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    {showMobileActions && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowMobileActions(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                          <Link
                            href={`/projects/${id}/chat`}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowMobileActions(false)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>Chat</span>
                          </Link>
                          <Link
                            href={`/projects/${id}/members`}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowMobileActions(false)}
                          >
                            <Users className="h-4 w-4" />
                            <span>Membres</span>
                          </Link>
                          <Link
                            href={`/projects/${id}/settings`}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setShowMobileActions(false)}
                          >
                            <Settings className="h-4 w-4" />
                            <span>Paramètres</span>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Métriques rapides */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>{mockProject.memberCount} membre{mockProject.memberCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>{mockProject.completedTasks}/{mockProject.taskCount} tâches</span>
              </div>
              <div className={`flex items-center ${isOverdue() ? 'text-red-500' : ''}`}>
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">
                  {new Date(mockProject.startDate).toLocaleDateString('fr-FR')} - {new Date(mockProject.endDate).toLocaleDateString('fr-FR')}
                </span>
                <span className="sm:hidden">
                  {daysLeft() > 0 ? `${daysLeft()}j restants` : `${Math.abs(daysLeft())}j de retard`}
                </span>
              </div>
              {isOverdue() && (
                <div className="flex items-center text-red-500">
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>En retard</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions rapides mobile */}
        <div className="sm:hidden">
          <div className="grid grid-cols-3 gap-2">
            <Link
              href={`/projects/${id}/chat`}
              className="flex flex-col items-center space-y-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs font-medium">Chat</span>
            </Link>
            <Link
              href={`/projects/${id}/members`}
              className="flex flex-col items-center space-y-1 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span className="text-xs font-medium">Membres</span>
            </Link>
            <Link
              href={`/projects/${id}/settings`}
              className="flex flex-col items-center space-y-1 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs font-medium">Paramètres</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{mockProject.progress}%</div>
              <div className="text-xs sm:text-sm text-gray-500">Progression</div>
            </div>
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-green-600">{mockProject.completedTasks}</div>
              <div className="text-xs sm:text-sm text-gray-500">Terminées</div>
            </div>
            <CheckSquare className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{mockProject.memberCount}</div>
              <div className="text-xs sm:text-sm text-gray-500">Membres</div>
            </div>
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-orange-600">{Math.abs(daysLeft())}</div>
              <div className="text-xs sm:text-sm text-gray-500">{daysLeft() > 0 ? 'Jours restants' : 'Jours de retard'}</div>
            </div>
            <Clock className={`h-6 w-6 sm:h-8 sm:w-8 ${daysLeft() > 0 ? 'text-orange-600' : 'text-red-600'}`} />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Section principale */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Progression détaillée */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Progression détaillée</h3>
              <span className={`text-xl sm:text-2xl font-bold ${mockProject.progress >= 70 ? 'text-green-600' : mockProject.progress >= 40 ? 'text-blue-600' : 'text-orange-600'}`}>
                {mockProject.progress}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-4">
              <div
                className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
                  mockProject.progress >= 70 ? 'bg-green-500' : 
                  mockProject.progress >= 40 ? 'bg-blue-500' : 'bg-orange-500'
                }`}
                style={{ width: `${mockProject.progress}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-500">Début:</span>
                <span className="ml-2 font-medium">{new Date(mockProject.startDate).toLocaleDateString('fr-FR')}</span>
              </div>
              <div>
                <span className="text-gray-500">Fin prévue:</span>
                <span className={`ml-2 font-medium ${isOverdue() ? 'text-red-500' : ''}`}>
                  {new Date(mockProject.endDate).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
          </div>

          {/* Tâches récentes */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tâches récentes</h3>
              <Link
                href={`/projects/${id}/tasks`}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Voir toutes →
              </Link>
            </div>
            <div className="space-y-3">
              {mockProject.recentTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{task.title}</p>
                      <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)} flex-shrink-0`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{task.assignee}</p>
                      <span className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget (mobile uniquement) */}
          <div className="lg:hidden bg-white rounded-lg shadow border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Budget</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Budget total</span>
                <span className="text-base font-semibold text-gray-900">{mockProject.budget.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Dépensé</span>
                <span className="text-base font-semibold text-orange-600">{mockProject.spent.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(mockProject.spent / mockProject.budget) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{Math.round((mockProject.spent / mockProject.budget) * 100)}% utilisé</span>
                <span>{(mockProject.budget - mockProject.spent).toLocaleString('fr-FR')} € restants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Statut du projet */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Statut</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">État actuel</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mockProject.status)}`}>
                  {mockProject.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Priorité</span>
                <span className={`text-sm font-medium ${getPriorityColor(mockProject.priority)}`}>
                  {mockProject.priority === 'high' ? 'Haute' : mockProject.priority === 'medium' ? 'Moyenne' : 'Basse'}
                </span>
              </div>
            </div>
          </div>

          {/* Budget - Desktop */}
          <div className="hidden lg:block bg-white rounded-lg shadow border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Budget total</span>
                <span className="text-lg font-semibold text-gray-900">{mockProject.budget.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Dépensé</span>
                <span className="text-lg font-semibold text-orange-600">{mockProject.spent.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(mockProject.spent / mockProject.budget) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{Math.round((mockProject.spent / mockProject.budget) * 100)}% utilisé</span>
                <span>{(mockProject.budget - mockProject.spent).toLocaleString('fr-FR')} € restants</span>
              </div>
            </div>
          </div>

          {/* Équipe */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Équipe</h3>
            <div className="space-y-3">
              {mockProject.members.slice(0, 4).map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">{member.avatar}</span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusIcon(member.status)}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                    <p className="text-xs text-gray-500 truncate">{member.role}</p>
                  </div>
                </div>
              ))}
              {mockProject.members.length > 4 && (
                <div className="text-xs text-gray-500 text-center pt-2">
                  +{mockProject.members.length - 4} autres membres
                </div>
              )}
              <Link
                href={`/projects/${id}/members`}
                className="block text-sm text-blue-600 hover:text-blue-500 font-medium pt-2"
              >
                Voir tous les membres →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}