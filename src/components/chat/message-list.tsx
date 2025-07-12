'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Message } from '@/types/message';
import { User } from '@/types/user';
import { useAuth } from '@/hooks/use-auth';

interface MessageListProps {
  messages: Message[];
  onMessageClick?: (message: Message) => void;
}

export function MessageList({
  messages,
  onMessageClick,
}: MessageListProps) {
  const { user } = useAuth();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const getSenderName = (sender: User) => {
    return sender.name || `${sender.firstname} ${sender.lastname}`;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {Object.entries(messageGroups).map(([date, groupMessages]) => (
          <div key={date}>
            <div className="flex items-center justify-center mb-4">
              <Badge variant="secondary" className="text-xs">
                {new Date(date).toLocaleDateString([], {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Badge>
            </div>
            
            {groupMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender.id === user?.id ? 'justify-end' : 'justify-start'
                } mb-4`}
                onClick={() => onMessageClick?.(message)}
              >
                <div
                  className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                    message.sender.id === user?.id ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender.avatar} />
                    <AvatarFallback>
                      {getSenderName(message.sender)?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.sender.id === user?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium">
                        {getSenderName(message.sender)}
                      </span>
                      <span className="text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
} 