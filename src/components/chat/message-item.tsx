'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Message } from '@/types/message';
import { User } from '@/types/user';
import { MoreVertical, Reply, Edit, Trash2, Copy } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface MessageItemProps {
  message: Message;
  onReply?: (message: Message) => void;
  onEdit?: (message: Message) => void;
  onDelete?: (message: Message) => void;
  onCopy?: (message: Message) => void;
  isReplying?: boolean;
  replyTo?: Message;
}

export function MessageItem({
  message,
  onReply,
  onEdit,
  onDelete,
  onCopy,
  isReplying = false,
  replyTo,
}: MessageItemProps) {
  const { user } = useAuth();
  const isOwnMessage = message.sender.id === user?.id;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCopy = async () => {
    if (message.content) {
      try {
        // Vérifier si l'API Clipboard est supportée
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(message.content);
          onCopy?.(message);
        } else {
          // Fallback pour les navigateurs qui ne supportent pas l'API Clipboard
          const textArea = document.createElement('textarea');
          textArea.value = message.content;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            document.execCommand('copy');
            onCopy?.(message);
          } catch (err) {
            console.error('Impossible de copier le texte:', err);
          } finally {
            document.body.removeChild(textArea);
          }
        }
      } catch (err) {
        console.error('Erreur lors de la copie:', err);
        // Fallback final avec alert
        alert('Impossible de copier le texte. Veuillez le sélectionner manuellement.');
      }
    }
  };

  const getSenderName = (sender: User) => {
    return sender.name || `${sender.firstname} ${sender.lastname}`;
  };

  return (
    <div
      className={`flex ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      } mb-4 group`}
    >
      <div
        className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
          isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''
        }`}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback>
            {getSenderName(message.sender)?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="relative">
          {/* Reply indicator */}
          {isReplying && replyTo && (
            <div className="mb-2 p-2 bg-muted/50 rounded text-xs border-l-2 border-primary">
              <div className="font-medium">Replying to {getSenderName(replyTo.sender)}</div>
              <div className="text-muted-foreground truncate">
                {replyTo.content}
              </div>
            </div>
          )}
          
          <div
            className={`rounded-lg px-3 py-2 ${
              isOwnMessage
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {getSenderName(message.sender)}
                </span>
                {message.isEdited && (
                  <Badge variant="outline" className="text-xs">
                    edited
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onReply?.(message)}>
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopy}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </DropdownMenuItem>
                    {isOwnMessage && (
                      <>
                        <DropdownMenuItem onClick={() => onEdit?.(message)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete?.(message)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="text-sm whitespace-pre-wrap">
              {message.content}
            </div>
            
            <div className="text-xs opacity-70 mt-1">
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 