import Link from 'next/link';
import { Plus, Users, Calendar, Filter, Search } from 'lucide-react';
import BackButton from '@/components/common/back-button';

export default function GroupsPage() {
  const mockGroups = [
    {
      id: '1',
      name: 'Équipe Marketing',
      description: 'Groupe pour l\'équipe marketing et communication',
      memberCount: 8,
      createdAt: '2024-01-15',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Développement Frontend',
      description: 'Équipe de développement frontend et interfaces utilisateur',
      memberCount: 5,
      createdAt: '2024-01-10',
      color: 'bg-green-500'
    },
    {
      id: '3',
      name: 'Design UI/UX',
      description: 'Équipe de design et expérience utilisateur',
      memberCount: 4,
      createdAt: '2024-01-05',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Backend Development',
      description: 'Équipe de développement backend et APIs',
      memberCount: 6,
      createdAt: '2024-01-12',
      color: 'bg-red-500'
    },
    {
      id: '5',
      name: 'Product Management',
      description: 'Équipe de gestion produit et stratégie',
      memberCount: 3,
      createdAt: '2024-01-08',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header responsive */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
        {/* Section gauche avec back button et titre */}
        <div className="flex items-start space-x-3 sm:space-x-4 min-w-0 flex-1">
          <BackButton className="mt-1 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Groupes
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Gérez vos équipes et collaborateurs
            </p>
          </div>
        </div>
        
        {/* Bouton nouveau groupe - Desktop */}
        <div className="hidden sm:block flex-shrink-0">
          <Link
            href="/groups/create"
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden lg:inline">Nouveau groupe</span>
            <span className="lg:hidden">Nouveau</span>
          </Link>
        </div>
      </div>

      {/* Barre de recherche et filtres - Mobile/Tablet */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Barre de recherche */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un groupe..."
            className="block w-full pl-9 sm:pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>
        
        {/* Filtres */}
        <div className="flex space-x-2 sm:space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filtres</span>
          </button>
          
          {/* Bouton nouveau groupe - Mobile */}
          <Link
            href="/groups/create"
            className="sm:hidden flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau</span>
          </Link>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-gray-900">{mockGroups.length}</div>
          <div className="text-xs sm:text-sm text-gray-500">Groupes</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-gray-900">
            {mockGroups.reduce((acc, group) => acc + group.memberCount, 0)}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Membres</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-gray-900">3</div>
          <div className="text-xs sm:text-sm text-gray-500">Actifs</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
          <div className="text-lg sm:text-2xl font-bold text-gray-900">12</div>
          <div className="text-xs sm:text-sm text-gray-500">Messages</div>
        </div>
      </div>

      {/* Grille des groupes responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {mockGroups.map((group) => (
          <Link
            key={group.id}
            href={`/groups/${group.id}`}
            className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
          >
            {/* Header de la carte */}
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${group.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 text-right">
                <div className="flex items-center justify-end">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">
                    {new Date(group.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <span className="sm:hidden">
                    {new Date(group.createdAt).toLocaleDateString('fr-FR', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Contenu de la carte */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {group.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                {group.description}
              </p>
            </div>
            
            {/* Footer de la carte */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs sm:text-sm text-gray-500">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{group.memberCount} membre{group.memberCount > 1 ? 's' : ''}</span>
                </div>
                
                {/* Indicateur d'activité */}
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 hidden sm:inline">Actif</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* État vide responsive */}
      {mockGroups.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Aucun groupe
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
            Créez votre premier groupe pour commencer à collaborer avec votre équipe
          </p>
          <Link
            href="/groups/create"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <Plus className="h-4 w-4" />
            <span>Créer un groupe</span>
          </Link>
        </div>
      )}

      {/* Bouton flottant pour mobile */}
      <div className="fixed bottom-20 right-4 sm:hidden">
        <Link
          href="/groups/create"
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}