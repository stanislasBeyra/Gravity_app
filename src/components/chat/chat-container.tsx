'use client';

import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, MoreVertical, Settings, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSocket } from '@/hooks/use-socket';
import { useAuth } from '@/hooks/use-auth';
import { Message } from '@/types/message';
import { User } from '@/types/user';
import { Button } from '../ui/button';

interface ChatContainerProps {
  roomId: string;
  roomName: string;
}

export function ChatContainer({
  roomId,
  roomName,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { socket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (!socket) return;

    // Join room
    socket.emit('join-room', { roomId, userId: user?.id });

    // Listen for messages
    socket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen for typing events
    socket.on('typing', (data: { userId: string; isTyping: boolean }) => {
      setIsTyping(data.isTyping);
    });

    // Listen for online users
    socket.on('online-users', (users: User[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.emit('leave-room', { roomId, userId: user?.id });
      socket.off('message');
      socket.off('typing');
      socket.off('online-users');
    };
  }, [socket, roomId, user?.id]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: newMessage,
      sender: user,
      timestamp: new Date().toISOString(),
    };

    socket?.emit('send-message', message);
    setNewMessage('');
  };

  const handleTyping = (value: string) => {
    setNewMessage(value);
    socket?.emit('typing', { roomId, userId: user?.id, isTyping: value.length > 0 });
  };

  const getSenderName = (sender: { name?: string; firstname?: string; lastname?: string }) => {
    return sender.name || `${sender.firstname} ${sender.lastname}`;
  };

  return (
    <div className="flex h-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-lg">{roomName}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  {onlineUsers.length} online
                </span>
                {isTyping && (
                  <span className="text-sm text-muted-foreground">
                    Someone is typing...
                  </span>
                )}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Chat Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-0">
          <ScrollArea className="h-full px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender.id === user?.id ? 'justify-end' : 'justify-start'
                  }`}
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
                      <div className="text-sm font-medium mb-1">
                        {getSenderName(message.sender)}
                      </div>
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => handleTyping(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Online Users Sidebar */}
      <div className="w-64 border-l">
        <div className="border-b">
          <h3 className="text-sm flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Online Users
          </h3>
        </div>
        <div className="p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {getSenderName(user)?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{getSenderName(user)}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-auto" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
} 