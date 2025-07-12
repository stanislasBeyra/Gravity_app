'use client';

import { Users, Plus, Mail, Phone, MoreVertical, Search, Filter, Crown, Shield, User as UserIcon } from 'lucide-react';
import { useState, use } from 'react';
import BackButton from '@/components/common/back-button';

interface GroupMembersPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GroupMembersPage({ params }: GroupMembersPageProps) {
  const { id } = use(params);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showMobileActions, setShowMobileActions] = useState<string | null>(null);

  const mockMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      avatar: 'JD',
      status: 'online',
      joinedAt: '2024-01-15',
      lastSeen: 'En ligne'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Moderator',
      avatar: 'JS',
      status: 'away',
      joinedAt: '2024-01-10',
      lastSeen: 'Il y a 5 min'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Member',
      avatar: 'BJ',
      status: 'offline',
      joinedAt: '2024-01-08',
      lastSeen: 'Il y a 2h'
    },
    {
      id: '4',
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'Member',
      avatar: 'AB',
      status: 'online',
      joinedAt: '2024-01-12',
      lastSeen: 'En ligne'
    },
    {
      id: '5',
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'Member',
      avatar: 'CW',
      status: 'offline',
      joinedAt: '2024-01-05',
      lastSeen: 'Il y a 1j'
    }
  ];

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase() === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Crown className="h-3 w-3" />;
      case 'Moderator': return <Shield className="h-3 w-3" />;
      default: return <UserIcon className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Moderator': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const handleAddMember = () => {
    console.log('Ajouter un membre');
  };

  const handleEmailMember = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleCallMember = (phone: string) => {
    console.log('Appeler:', phone);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header responsive */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
          <BackButton className="mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Membres du groupe
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Gérez les membres de votre équipe
            </p>
          </div>
        </div>
        
        {/* Bouton ajouter - Desktop */}
        <button 
          onClick={handleAddMember}
          className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base flex-shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden lg:inline">Ajouter un membre</span>
          <span className="lg:hidden">Ajouter</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-gray-900">{mockMembers.length}</div>
          <div className="text-xs sm:text-sm text-gray-500">Membres</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-green-600">
            {mockMembers.filter(m => m.status === 'online').length}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">En ligne</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-red-600">
            {mockMembers.filter(m => m.role === 'Admin').length}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Admins</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-yellow-600">
            {mockMembers.filter(m => m.role === 'Moderator').length}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Modérateurs</div>
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
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base bg-white"
          >
            <option value="all">Tous les rôles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Modérateur</option>
            <option value="member">Membre</option>
          </select>
          
          {/* Bouton ajouter - Mobile */}
          <button 
            onClick={handleAddMember}
            className="sm:hidden flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      {/* Liste des membres */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Membres ({filteredMembers.length})
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
                      <p className="text-xs text-gray-400 mt-1">{member.lastSeen}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-2">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {getRoleIcon(member.role)}
                        <span>{member.role}</span>
                      </span>
                      
                      <div className="relative">
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
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
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
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">{member.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{member.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{member.lastSeen}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 sm:space-x-4 ml-4">
                  <span className={`inline-flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {getRoleIcon(member.role)}
                    <span>{member.role}</span>
                  </span>
                  
                  <div className="flex space-x-1 sm:space-x-2">
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
        <button
          onClick={handleAddMember}
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}