'use client';

import Link from 'next/link';
import { Users, Calendar, Settings, MessageSquare, MoreVertical } from 'lucide-react';
import { useState, use } from 'react';

interface GroupPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GroupPage({ params }: GroupPageProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Unwrap params avec React.use()
  const { id } = use(params);
  
  const mockGroup = {
    id: id,
    name: 'Équipe Marketing',
    description: 'Groupe pour l&apos;équipe marketing et communication',
    memberCount: 8,
    createdAt: '2024-01-15',
    color: 'bg-blue-500',
    members: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Member' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Member' }
    ]
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* En-tête du groupe */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
        {/* Informations du groupe */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start space-x-3 mb-3 sm:mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${mockGroup.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                {mockGroup.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 line-clamp-2">
                {mockGroup.description}
              </p>
            </div>
          </div>
          
          {/* Statistiques du groupe */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span>{mockGroup.memberCount} membre{mockGroup.memberCount > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
              <span className="hidden sm:inline">Créé le </span>
              <span>{new Date(mockGroup.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>
        
        {/* Actions - Desktop */}
        <div className="hidden sm:flex sm:space-x-2 sm:ml-4 flex-shrink-0">
          <Link
            href={`/groups/${id}/chat`}
            className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="hidden lg:inline">Chat</span>
          </Link>
          <Link
            href={`/groups/${id}/members`}
            className="flex items-center space-x-2 px-3 lg:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Users className="h-4 w-4" />
            <span className="hidden lg:inline">Membres</span>
          </Link>
          <Link
            href={`/groups/${id}/settings`}
            className="flex items-center space-x-2 px-3 lg:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden lg:inline">Paramètres</span>
          </Link>
        </div>

        {/* Menu mobile */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MoreVertical className="h-4 w-4 text-gray-600" />
          </button>
          
          {showMobileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMobileMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <Link
                  href={`/groups/${id}/chat`}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </Link>
                <Link
                  href={`/groups/${id}/members`}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Users className="h-4 w-4" />
                  <span>Membres</span>
                </Link>
                <Link
                  href={`/groups/${id}/settings`}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Settings className="h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Actions rapides mobile */}
      <div className="sm:hidden">
        <div className="grid grid-cols-3 gap-2">
          <Link
            href={`/groups/${id}/chat`}
            className="flex flex-col items-center space-y-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs font-medium">Chat</span>
          </Link>
          <Link
            href={`/groups/${id}/members`}
            className="flex flex-col items-center space-y-1 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Membres</span>
          </Link>
          <Link
            href={`/groups/${id}/settings`}
            className="flex flex-col items-center space-y-1 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs font-medium">Paramètres</span>
          </Link>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Activité récente */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Activité récente
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nouveau membre ajouté
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Il y a 2 heures
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="h-4 w-4 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Nouveau message
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Il y a 4 heures
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Settings className="h-4 w-4 text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Paramètres mis à jour
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Il y a 1 jour
                  </p>
                </div>
              </div>
            </div>
            
            {/* Voir plus - mobile */}
            <div className="mt-4 sm:hidden">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-500 font-medium">
                Voir plus d&apos;activités
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Membres récents */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Membres récents
            </h3>
            <div className="space-y-3">
              {mockGroup.members.slice(0, 3).map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
              <Link
                href={`/groups/${id}/members`}
                className="block text-sm text-blue-600 hover:text-blue-500 font-medium pt-2"
              >
                Voir tous les membres →
              </Link>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Statistiques
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Messages aujourd&apos;hui</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Membres actifs</span>
                <span className="text-sm font-medium text-gray-900">6</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fichiers partagés</span>
                <span className="text-sm font-medium text-gray-900">24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}