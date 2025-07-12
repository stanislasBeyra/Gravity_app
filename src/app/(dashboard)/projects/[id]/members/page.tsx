'use client';

import { Users, Plus, Mail, Phone, Calendar, Search, Filter, MoreVertical, MessageSquare, Crown, Shield, User as UserIcon, TrendingUp } from 'lucide-react';
import { useState, use } from 'react';
import BackButton from '@/components/common/back-button';

interface ProjectMembersPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  joinedDate: string;
  taskCount: number;
  completedTasks: number;
  permission: 'admin' | 'moderator' | 'member';
  lastActive?: string;
}

export default function ProjectMembersPage({ params }: ProjectMembersPageProps) {
  const { id } = use(params);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMobileActions, setShowMobileActions] = useState<string | null>(null);

  const mockMembers: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Chef de projet',
      avatar: 'JD',
      status: 'online',
      joinedDate: '2024-01-15',
      taskCount: 8,
      completedTasks: 6,
      permission: 'admin',
      lastActive: 'En ligne'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Designer UI/UX',
      avatar: 'JS',
      status: 'away',
      joinedDate: '2024-01-20',
      taskCount: 5,
      completedTasks: 3,
      permission: 'moderator',
      lastActive: 'Il y a 5 min'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Développeur Frontend',
      avatar: 'BJ',
      status: 'online',
      joinedDate: '2024-01-25',
      taskCount: 6,
      completedTasks: 4,
      permission: 'member',
      lastActive: 'En ligne'
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'Développeur Backend',
      avatar: 'AB',
      status: 'online',
      joinedDate: '2024-02-01',
      taskCount: 4,
      completedTasks: 2,
      permission: 'member',
      lastActive: 'En ligne'
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'QA Engineer',
      avatar: 'CW',
      status: 'offline',
      joinedDate: '2024-02-05',
      taskCount: 3,
      completedTasks: 1,
      permission: 'member',
      lastActive: 'Il y a 2h'
    }
  ];

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Chef de projet':
        return 'bg-red-100 text-red-800';
      case 'Designer UI/UX':
        return 'bg-purple-100 text-purple-800';
      case 'Développeur Frontend':
        return 'bg-blue-100 text-blue-800';
      case 'Développeur Backend':
        return 'bg-green-100 text-green-800';
      case 'QA Engineer':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
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

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'admin':
        return <Crown className="h-3 w-3 text-red-600" />;
      case 'moderator':
        return <Shield className="h-3 w-3 text-yellow-600" />;
      case 'member':
        return <UserIcon className="h-3 w-3 text-gray-600" />;
      default:
        return <UserIcon className="h-3 w-3 text-gray-600" />;
    }
  };

  const getPermissionText = (permission: string) => {
    switch (permission) {
      case 'admin':
        return 'Admin';
      case 'moderator':
        return 'Modérateur';
      case 'member':
        return 'Membre';
      default:
        return 'Membre';
    }
  };

  const getCompletionRate = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const handleEmailMember = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCallMember = (phone: string) => {
    console.log('Appeler:', phone);
  };

  const handleMessageMember = (memberId: string) => {
    console.log('Envoyer un message à:', memberId);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header responsive */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
          <BackButton className="mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Membres du projet
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Gérez l'équipe de votre projet
            </p>
          </div>
        </div>
        
        {/* Bouton ajouter - Desktop */}
        <button className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex-shrink-0">
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">Ajouter un membre</span>
          <span className="lg:hidden">Ajouter</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{mockMembers.length}</div>
              <div className="text-xs sm:text-sm text-gray-500">Membres</div>
            </div>
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {mockMembers.filter(m => m.status === 'online').length}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">En ligne</div>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-purple-600">
                {mockMembers.reduce((acc, m) => acc + m.completedTasks, 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Tâches faites</div>
            </div>
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-orange-600">
                {Math.round(mockMembers.reduce((acc, m) => acc + getCompletionRate(m.completedTasks, m.taskCount), 0) / mockMembers.length)}%
              </div>
              <div className="text-xs sm:text-sm text-gray-500">Progression</div>
            </div>
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
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
            placeholder="Rechercher un membre..."
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
            <option value="online">En ligne</option>
            <option value="away">Absent</option>
            <option value="offline">Hors ligne</option>
          </select>
          
          {/* Bouton ajouter - Mobile */}
          <button className="sm:hidden flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Plus className="h-4 w-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      {/* Liste des membres */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Équipe ({filteredMembers.length})
          </h2>
        </div>

        {/* Version mobile - Cartes */}
        <div className="sm:hidden divide-y divide-gray-200">
          {filteredMembers.map((member) => (
            <div key={member.id} className="p-4">
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{member.avatar}</span>
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium text-gray-900 truncate">{member.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{member.email}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                          <span>{member.role}</span>
                        </span>
                        <span className="inline-flex items-center space-x-1 text-xs text-gray-600">
                          {getPermissionIcon(member.permission)}
                          <span>{getPermissionText(member.permission)}</span>
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>Rejoint le {new Date(member.joinedDate).toLocaleDateString('fr-FR')}</span>
                        <span>{member.completedTasks}/{member.taskCount} tâches ({getCompletionRate(member.completedTasks, member.taskCount)}%)</span>
                      </div>
                    </div>
                    
                    <div className="relative ml-2">
                      <button
                        onClick={() => setShowMobileActions(showMobileActions === member.id ? null : member.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      
                      {showMobileActions === member.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setShowMobileActions(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                            <button
                              onClick={() => {
                                handleMessageMember(member.id);
                                setShowMobileActions(null);
                              }}
                              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>Message</span>
                            </button>
                            <button
                              onClick={() => {
                                handleEmailMember(member.email);
                                setShowMobileActions(null);
                              }}
                              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Mail className="h-4 w-4" />
                              <span>Email</span>
                            </button>
                            <button
                              onClick={() => {
                                handleCallMember(member.email);
                                setShowMobileActions(null);
                              }}
                              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Phone className="h-4 w-4" />
                              <span>Appeler</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Version desktop - Liste */}
        <div className="hidden sm:block divide-y divide-gray-200">
          {filteredMembers.map((member) => (
            <div key={member.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">{member.avatar}</span>
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{member.name}</h3>
                      {getPermissionIcon(member.permission)}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{member.email}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                      <span className="text-xs text-gray-500">
                        Rejoint le {new Date(member.joinedDate).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="text-xs text-gray-400">
                        {member.lastActive}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 sm:space-x-6 ml-4">
                  {/* Statistiques tâches */}
                  <div className="text-center hidden lg:block">
                    <p className="text-sm font-medium text-gray-900">
                      {member.completedTasks}/{member.taskCount}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getCompletionRate(member.completedTasks, member.taskCount)}%
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-1 sm:space-x-2">
                    <button 
                      onClick={() => handleMessageMember(member.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Envoyer un message"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleEmailMember(member.email)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Envoyer un email"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleCallMember(member.email)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Appeler"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* État vide */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Users className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              Aucun membre trouvé
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {searchTerm ? 'Essayez une autre recherche' : 'Aucun membre correspondant aux filtres'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                Effacer la recherche
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bouton flottant - Mobile */}
      <div className="sm:hidden fixed bottom-20 right-4">
        <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}