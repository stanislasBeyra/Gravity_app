'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Search, MoreVertical, Crown, User } from 'lucide-react';
import { GroupMember } from '@/types/group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MemberListProps {
  members: GroupMember[];
  onRemoveMember?: (memberId: string) => void;
  onChangeRole?: (memberId: string, role: 'ADMIN' | 'MEMBER') => void;
  className?: string;
}

export function MemberList({ 
  members, 
  onRemoveMember, 
  onChangeRole, 
  className 
}: MemberListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(member =>
    member.user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Membres</h2>
            <Badge variant="secondary">{members.length}</Badge>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un membre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-2">
          {filteredMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.user.avatar} alt={member.user.firstname} />
                  <AvatarFallback>
                    {getInitials(`${member.user.firstname} ${member.user.lastname}`)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {member.user.firstname} {member.user.lastname}
                    </span>
                    {member.role === 'ADMIN' && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{member.user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={member.role === 'ADMIN' ? 'default' : 'secondary'}>
                  {member.role === 'ADMIN' ? 'Administrateur' : 'Membre'}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onChangeRole && member.role === 'MEMBER' && (
                      <DropdownMenuItem onClick={() => onChangeRole(member.id, 'ADMIN')}>
                        Promouvoir administrateur
                      </DropdownMenuItem>
                    )}
                    {onChangeRole && member.role === 'ADMIN' && (
                      <DropdownMenuItem onClick={() => onChangeRole(member.id, 'MEMBER')}>
                        Rétrograder membre
                      </DropdownMenuItem>
                    )}
                    {onRemoveMember && (
                      <DropdownMenuItem 
                        onClick={() => onRemoveMember(member.id)}
                        className="text-red-600"
                      >
                        Retirer du groupe
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <User className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>
              {searchQuery 
                ? 'Aucun membre ne correspond à votre recherche'
                : 'Aucun membre dans ce groupe'
              }
            </p>
          </div>
        )}
      </div>
    </Card>
  );
} 