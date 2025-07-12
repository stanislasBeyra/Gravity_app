'use client';

import { useState, useRef, useEffect, use } from 'react';
import { Send, Paperclip, Smile, Users, X, Phone, Video, MoreVertical } from 'lucide-react';
import BackButton from '@/components/common/back-button';

interface ProjectChatPageProps {
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

interface User {
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  role?: string;
}

export default function ProjectChatPage({ params }: ProjectChatPageProps) {
  use(params); // id non utilisé
  const [message, setMessage] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'John Doe',
      content: 'Salut l&apos;équipe ! Comment avance le développement de la page d&apos;accueil ?',
      timestamp: '10:30',
      avatar: 'JD',
      isCurrentUser: false
    },
    {
      id: '2',
      user: 'Jane Smith',
      content: 'J&apos;ai terminé la maquette de la page d&apos;accueil. Je l&apos;ai envoyée pour validation.',
      timestamp: '10:32',
      avatar: 'JS',
      isCurrentUser: false
    },
    {
      id: '3',
      user: 'Vous',
      content: 'Parfait ! Je vais commencer l&apos;implémentation dès que j&apos;aurai la validation.',
      timestamp: '10:35',
      avatar: 'VO',
      isCurrentUser: true
    },
    {
      id: '4',
      user: 'Alice Brown',
      content: 'J&apos;ai configuré la base de données. L&apos;API est prête pour l&apos;intégration.',
      timestamp: '10:40',
      avatar: 'AB',
      isCurrentUser: false
    },
    {
      id: '5',
      user: 'System',
      content: 'Bob Johnson a rejoint le chat du projet',
      timestamp: '10:42',
      avatar: '',
      type: 'system'
    }
  ]);

  const onlineUsers: User[] = [
    { name: 'John Doe', avatar: 'JD', status: 'online', role: 'Chef de projet' },
    { name: 'Jane Smith', avatar: 'JS', status: 'online', role: 'Designer UI/UX' },
    { name: 'Bob Johnson', avatar: 'BJ', status: 'away', role: 'Développeur Frontend' },
    { name: 'Alice Brown', avatar: 'AB', status: 'online', role: 'Développeur Backend' },
    { name: 'Charlie Wilson', avatar: 'CW', status: 'offline', role: 'QA Engineer' }
  ];

  const emojis = ['😀', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '🚀'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        user: 'Vous',
        content: message.trim(),
        timestamp: new Date().toLocaleTimeString('fr-FR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        avatar: 'VO',
        isCurrentUser: true
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate response
        const response: Message = {
          id: (Date.now() + 1).toString(),
          user: 'John Doe',
          content: 'Merci pour le message !',
          timestamp: new Date().toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          avatar: 'JD',
          isCurrentUser: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    if (inputRef.current) {
      (inputRef.current as HTMLTextAreaElement).focus();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'En ligne';
      case 'away': return 'Absent';
      case 'offline': return 'Hors ligne';
      default: return 'Inconnu';
    }
  };

  const onlineCount = onlineUsers.filter(user => user.status === 'online').length;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header responsive */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <BackButton className="sm:hidden flex-shrink-0" />
            
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Chat du projet
              </h1>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>{onlineCount} membres en ligne</span>
                {isTyping && (
                  <>
                    <span>•</span>
                    <span className="text-green-600">John tape...</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Actions header */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Avatars des membres - Desktop */}
            <div className="hidden lg:flex items-center space-x-1 mr-2">
              {onlineUsers.filter(u => u.status === 'online').slice(0, 4).map((user, index) => (
                <div
                  key={user.name}
                  className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 relative"
                  style={{ marginLeft: index > 0 ? '-8px' : '0', zIndex: 10 - index }}
                  title={user.name}
                >
                  {user.avatar}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${getStatusColor(user.status)}`} />
                </div>
              ))}
              {onlineCount > 4 && (
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 ml-1">
                  +{onlineCount - 4}
                </div>
              )}
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Container principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Zone de chat */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
            {messages.map((msg, index) => {
              const isSystem = msg.type === 'system';
              const isCurrentUser = msg.isCurrentUser;
              const showAvatar = !isSystem && (!messages[index - 1] || messages[index - 1].user !== msg.user || messages[index - 1].isCurrentUser !== msg.isCurrentUser);
              
              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <div className="bg-gray-200 text-gray-600 text-xs sm:text-sm px-3 py-1 rounded-full">
                      {msg.content}
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end space-x-2 max-w-[85%] sm:max-w-[70%] ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    {showAvatar && !isCurrentUser && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">{msg.avatar}</span>
                      </div>
                    )}
                    {!showAvatar && !isCurrentUser && (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"></div>
                    )}

                    {/* Message bubble */}
                    <div className={`relative ${isCurrentUser ? 'order-first' : ''}`}>
                      {showAvatar && !isCurrentUser && (
                        <div className="text-xs text-gray-500 mb-1 ml-1">{msg.user}</div>
                      )}
                      <div className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl ${
                        isCurrentUser 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}>
                        <p className="text-sm sm:text-base leading-relaxed break-words">{msg.content}</p>
                      </div>
                      <div className={`text-xs text-gray-400 mt-1 ${isCurrentUser ? 'text-right mr-1' : 'ml-1'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2 max-w-[70%]">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">JD</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
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

          {/* Input area */}
          <div className="bg-white border-t border-gray-200 p-3 sm:p-4 flex-shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-2 sm:space-x-3">
              {/* Attachment button */}
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 mb-1"
              >
                <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Message input */}
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none max-h-32 min-h-[40px] leading-relaxed"
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '40px',
                    maxHeight: '120px'
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e as React.KeyboardEvent<HTMLTextAreaElement>);
                    }
                  }}
                />
              </div>

              {/* Emoji button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 mb-1"
                >
                  <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Emoji picker */}
                {showEmojiPicker && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowEmojiPicker(false)}
                    />
                    <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 grid grid-cols-5 gap-1 z-20">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleEmojiClick(emoji)}
                          className="p-2 hover:bg-gray-100 rounded text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Send button */}
              <button
                type="submit"
                disabled={!message.trim()}
                className="p-2 sm:p-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 mb-1"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar des membres - Desktop */}
        <div className={`hidden lg:block w-64 bg-white border-l border-gray-200 flex-shrink-0 transition-all duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Membres ({onlineUsers.length})</h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-3">
              {onlineUsers.map((user) => (
                <div key={user.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">{user.avatar}</span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.role}</p>
                    <p className="text-xs text-gray-400">{getStatusText(user.status)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal membres - Mobile */}
      {showSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Membres ({onlineUsers.length})</h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.name} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">{user.avatar}</span>
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                      <p className="text-xs text-gray-400">{getStatusText(user.status)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}