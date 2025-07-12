'use client';

import { useState, useRef, useEffect, use } from 'react';
import { Phone, Video, Users, MoreVertical } from 'lucide-react';
import BackButton from '@/components/common/back-button';
import { MessageInput } from '@/components/chat/message-input';

interface GroupChatPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  avatar: string;
  isCurrentUser?: boolean;
  type?: 'text' | 'system' | 'file';
}

export default function GroupChatPage({ params }: GroupChatPageProps) {
  use(params); // id non utilisé pour l'instant
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'John Doe',
      content: 'Salut tout le monde ! Comment ça va ?',
      timestamp: '10:30',
      avatar: 'JD',
      isCurrentUser: false
    },
    {
      id: '2',
      user: 'Jane Smith',
      content: 'Très bien, merci ! J\'ai terminé la maquette de la page d\'accueil. Qu\'est-ce que vous en pensez ?',
      timestamp: '10:32',
      avatar: 'JS',
      isCurrentUser: false
    },
    {
      id: '3',
      user: 'Vous',
      content: 'Parfait ! Je vais la revoir cet après-midi.',
      timestamp: '10:35',
      avatar: 'VO',
      isCurrentUser: true
    },
    {
      id: '4',
      user: 'System',
      content: 'Bob Johnson a rejoint le groupe',
      timestamp: '10:36',
      avatar: '',
      type: 'system'
    },
    {
      id: '5',
      user: 'Bob Johnson',
      content: 'Hello ! Désolé pour le retard, j\'étais en réunion.',
      timestamp: '10:37',
      avatar: 'BJ',
      isCurrentUser: false
    }
  ]);

  const onlineMembers = [
    { name: 'John Doe', avatar: 'JD', status: 'online' },
    { name: 'Jane Smith', avatar: 'JS', status: 'online' },
    { name: 'Bob Johnson', avatar: 'BJ', status: 'online' },
    { name: 'Alice Cooper', avatar: 'AC', status: 'away' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string, attachments?: File[]) => {
    if (!content.trim() && !attachments?.length) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'Vous',
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      avatar: 'VO',
      isCurrentUser: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'Merci pour le message !',
        'C\'est une excellente idée !',
        'Je suis d\'accord avec toi.',
        'Parfait, continuons comme ça !',
        'Très intéressant, dis-moi en plus.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const response: Message = {
        id: (Date.now() + 1).toString(),
        user: 'John Doe',
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        avatar: 'JD',
        isCurrentUser: false
      };
      setMessages(prev => [...prev, response]);
    }, 1500 + Math.random() * 1000);
  };

  const handleTyping = (typing: boolean) => {
    // Handle typing indicator from other users
    console.log('User is typing:', typing);
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <BackButton className="sm:hidden flex-shrink-0" />
            
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                Chat du groupe
              </h1>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>
                  {onlineMembers.filter(m => m.status === 'online').length} membres en ligne
                </span>
                {isTyping && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">John tape...</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Online Members - Desktop */}
            <div className="hidden lg:flex items-center space-x-1 mr-3">
              {onlineMembers.slice(0, 4).map((member, index) => (
                <div
                  key={member.name}
                  className="relative"
                  style={{ marginLeft: index > 0 ? '-12px' : '0' }}
                >
                  <div
                    className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white border-2 border-white shadow-sm"
                    title={member.name}
                  >
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
              ))}
              {onlineMembers.length > 4 && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-600 border-2 border-white shadow-sm ml-1">
                  +{onlineMembers.length - 4}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden min-h-0">
        <div className="h-full overflow-y-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 space-y-4">
          {messages.map((msg, index) => {
            const isSystem = msg.type === 'system';
            const isCurrentUser = msg.isCurrentUser;
            const showAvatar = !isSystem && (!messages[index - 1] || 
              messages[index - 1].user !== msg.user || 
              messages[index - 1].isCurrentUser !== msg.isCurrentUser);
            
            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center py-2">
                  <div className="bg-gray-200 text-gray-600 text-xs sm:text-sm px-3 py-1.5 rounded-full">
                    {msg.content}
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-2 max-w-[85%] sm:max-w-[75%] lg:max-w-[60%] ${
                  isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {/* Avatar */}
                  {showAvatar && !isCurrentUser && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                      <span className="text-xs sm:text-sm font-semibold text-white">{msg.avatar}</span>
                    </div>
                  )}
                  {!showAvatar && !isCurrentUser && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 mb-1"></div>
                  )}

                  {/* Message Content */}
                  <div className={`relative ${isCurrentUser ? 'order-first' : ''}`}>
                    {showAvatar && !isCurrentUser && (
                      <div className="text-xs sm:text-sm text-gray-600 mb-1 ml-1 font-medium">
                        {msg.user}
                      </div>
                    )}
                    <div className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-sm ${
                      isCurrentUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      <p className="text-sm sm:text-base leading-relaxed break-words">
                        {msg.content}
                      </p>
                    </div>
                    <div className={`text-xs text-gray-400 mt-1 ${
                      isCurrentUser ? 'text-right mr-1' : 'ml-1'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-2 max-w-[75%]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-1">
                  <span className="text-xs sm:text-sm font-semibold text-white">JD</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        placeholder="Tapez votre message..."
        disabled={false}
      />
    </div>
  );
}