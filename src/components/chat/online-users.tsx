'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MoreVertical, MessageCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types/user';

interface OnlineUsersProps {
  users: User[];
  currentUser?: User;
  onUserClick?: (user: User) => void;
  onStartChat?: (user: User) => void;
}

export function OnlineUsers({
  users,
  currentUser,
  onUserClick,
  onStartChat,
}: OnlineUsersProps) {
  const onlineUsers = users.filter(user => user.isOnline || false);
  const offlineUsers = users.filter(user => !(user.isOnline || false));

  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <CardTitle className="text-sm flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Users ({users.length})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {/* Online Users */}
            {onlineUsers.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-green-600">
                    Online ({onlineUsers.length})
                  </span>
                </div>
                
                <div className="space-y-2">
                  {onlineUsers.map((user) => (
                    <OnlineUserItem
                      key={user.id}
                      user={user}
                      currentUser={currentUser}
                      onUserClick={onUserClick}
                      onStartChat={onStartChat}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Offline Users */}
            {offlineUsers.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-sm font-medium text-gray-600">
                    Offline ({offlineUsers.length})
                  </span>
                </div>
                
                <div className="space-y-2">
                  {offlineUsers.map((user) => (
                    <OnlineUserItem
                      key={user.id}
                      user={user}
                      currentUser={currentUser}
                      onUserClick={onUserClick}
                      onStartChat={onStartChat}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface OnlineUserItemProps {
  user: User;
  currentUser?: User;
  onUserClick?: (user: User) => void;
  onStartChat?: (user: User) => void;
}

function OnlineUserItem({
  user,
  currentUser,
  onUserClick,
  onStartChat,
}: OnlineUserItemProps) {
  const isCurrentUser = user.id === currentUser?.id;
  const userName = user.name || `${user.firstname} ${user.lastname}`;

  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <div
        className="flex items-center space-x-3 flex-1 cursor-pointer"
        onClick={() => onUserClick?.(user)}
      >
        <div className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {userName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium truncate">
              {userName}
              {isCurrentUser && (
                <Badge variant="outline" className="ml-1 text-xs">
                  You
                </Badge>
              )}
            </span>
          </div>
          
          {user.status && (
            <div className="text-xs text-muted-foreground truncate">
              {user.status}
            </div>
          )}
        </div>
      </div>
      
      {!isCurrentUser && (
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onStartChat?.(user)}
            className="h-6 w-6 p-0"
          >
            <MessageCircle className="h-3 w-3" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStartChat?.(user)}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Chat
              </DropdownMenuItem>
              <DropdownMenuItem>
                View Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
} 