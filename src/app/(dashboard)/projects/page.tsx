'use client';

import Link from 'next/link';
import { Plus, Folder, Calendar, Users, Clock, Search, Filter, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import BackButton from '@/components/common/back-button';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const mockProjects = [
    {
      id: '1',
      name: 'Refonte Site Web',
      description: 'Refonte complète du site web de l\'entreprise avec nouvelles fonctionnalités',
      status: 'En cours',
      progress: 65,
      dueDate: '2024-03-15',
      memberCount: 6,
      color: 'bg-blue-500',
      priority: 'high',
      tasksCompleted: 13,
      totalTasks: 20
    },
    {
      id: '2',
      name: 'Application Mobile',
      description: 'Développement d\'une application mobile iOS/Android native',
      status: 'Planifié',
      progress: 25,
      dueDate: '2024-05-20',
      memberCount: 8,
      color: 'bg-green-500',
      priority: 'medium',
      tasksCompleted: 5,
      totalTasks: 25
    },
    {
      id: '3',
      name: 'Campagne Marketing Q1',
      description: 'Campagne marketing digitale pour le premier trimestre 2024',
      status: 'Terminé',
      progress: 100,
      dueDate: '2024-01-31',
      memberCount: 4,
      color: 'bg-purple-500',
      priority: 'low',
      tasksCompleted: 15,
      totalTasks: 15
    },
    {
      id: '4',
      name: 'Migration Cloud',
      description: 'Migration des serveurs vers une infrastructure cloud moderne',
      status: 'En cours',
      progress: 80,
      dueDate: '2024-04-10',
      memberCount: 3,
      color: 'bg-red-500',
      priority: 'high',
      tasksCompleted: 12,
      totalTasks: 15
    },
    {
      id: '5',
      name: 'Formation Équipe',
      description: 'Programme de formation continue pour l\'équipe développement',
      status: 'Planifié',
      progress: 10,
      dueDate: '2024-06-30',
      memberCount: 12,
      color: 'bg-orange-500',
      priority: 'medium',
      tasksCompleted: 2,
      totalTasks: 18
    }
  ];

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status.toLowerCase().replace(' ', '-') === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'Planifié':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Terminé':
        return <CheckCircle className="h-3 w-3" />;
      case 'En cours':
        return <TrendingUp className="h-3 w-3" />;
      case 'Planifié':
        return <Clock className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !mockProjects.find(p => p.dueDate === dueDate)?.status.includes('Terminé');
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header responsive */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
          <BackButton className="mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Projets
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Gérez vos projets et équipes
            </p>
          </div>
        </div>
        
        {/* Bouton nouveau projet - Desktop */}
        <Link
          href="/projects/create"
          className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex-shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">Nouveau projet</span>
          <span className="lg:hidden">Nouveau</span>
        </Link>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-gray-900">{mockProjects.length}</div>
          <div className="text-xs sm:text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-blue-600">
            {mockProjects.filter(p => p.status === 'En cours').length}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">En cours</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-green-600">
            {mockProjects.filter(p => p.status === 'Terminé').length}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Terminés</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-red-600">
            {mockProjects.filter(p => isOverdue(p.dueDate)).length}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">En retard</div>
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
            placeholder="Rechercher un projet..."
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
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="en-cours">En cours</option>
            <option value="planifié">Planifié</option>
            <option value="terminé">Terminé</option>
          </select>
          
          {/* Bouton nouveau projet - Mobile */}
          <Link
            href="/projects/create"
            className="sm:hidden flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau</span>
          </Link>
        </div>
      </div>

      {/* Grille des projets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={`bg-white rounded-lg shadow border-l-4 ${getPriorityColor(project.priority)} p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group relative`}
          >
            {/* Badge de retard */}
            {isOverdue(project.dueDate) && project.status !== 'Terminé' && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <AlertCircle className="h-2 w-2 text-white" />
              </div>
            )}

            {/* Header de la carte */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${project.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <Folder className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span>{project.status}</span>
              </span>
            </div>
            
            {/* Contenu */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {project.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {/* Progression */}
            <div className="mt-3 sm:mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-500">Progression</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              
              {/* Tâches */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{project.tasksCompleted}/{project.totalTasks} tâches</span>
                <span>{Math.round((project.tasksCompleted / project.totalTasks) * 100)}%</span>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{project.memberCount}</span>
                </div>
                <div className={`flex items-center ${isOverdue(project.dueDate) && project.status !== 'Terminé' ? 'text-red-500' : ''}`}>
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">
                    {new Date(project.dueDate).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="sm:hidden">
                    {new Date(project.dueDate).toLocaleDateString('fr-FR', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* État vide */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'Aucun projet trouvé' : 'Aucun projet'}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' 
              ? 'Essayez de modifier vos filtres de recherche'
              : 'Créez votre premier projet pour commencer à organiser votre travail'
            }
          </p>
          {(!searchTerm && filterStatus === 'all') && (
            <Link
              href="/projects/create"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <Plus className="h-4 w-4" />
              <span>Créer un projet</span>
            </Link>
          )}
          {(searchTerm || filterStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      )}

      {/* Bouton flottant - Mobile */}
      <div className="sm:hidden fixed bottom-20 right-4">
        <Link
          href="/projects/create"
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}