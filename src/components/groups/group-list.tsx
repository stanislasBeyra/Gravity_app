'use client';

import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { GroupCard } from './group-card';
import { EmptyState } from '@/components/common/empty-state';
import { Group } from '@/types/group';

interface GroupListProps {
  groups: Group[];
  loading?: boolean;
  onCreateGroup?: () => void;
  onGroupClick?: (group: Group) => void;
  className?: string;
}

export function GroupList({
  groups,
  loading = false,
  onCreateGroup,
  onGroupClick,
  className = ''
}: GroupListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived'>('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || group.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Groupes</h1>
          <p className="text-gray-600">
            Gérez vos équipes et collaborateurs
          </p>
        </div>
        {onCreateGroup && (
          <Button onClick={onCreateGroup} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Créer un groupe
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher des groupes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            Tous
          </Button>
          <Button
            variant={filterStatus === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('active')}
          >
            Actifs
          </Button>
          <Button
            variant={filterStatus === 'archived' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('archived')}
          >
            Archivés
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {filteredGroups.length} groupe{filteredGroups.length !== 1 ? 's' : ''} trouvé{filteredGroups.length !== 1 ? 's' : ''}
        </span>
        {searchQuery && (
          <span>pour &quot;{searchQuery}&quot;</span>
        )}
      </div>

      {/* Groups Grid */}
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={() => onGroupClick?.(group)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Filter}
          title="Aucun groupe trouvé"
          description={
            searchQuery
              ? `Aucun groupe ne correspond à &quot;${searchQuery}&quot;`
              : "Vous n&apos;avez pas encore créé de groupes"
          }
          actionLabel={onCreateGroup ? "Créer un groupe" : undefined}
          onAction={onCreateGroup}
        />
      )}
    </div>
  );
} 