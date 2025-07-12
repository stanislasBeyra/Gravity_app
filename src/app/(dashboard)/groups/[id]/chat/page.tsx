'use client';

import { useState, useRef, useEffect, use } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Users, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/common/back-button';

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
  const { id } = use(params);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
    { name: 'John Doe', avatar: 'JD' },
    { name: 'Jane Smith', avatar: 'JS' },
    { name: 'Bob Johnson', avatar: 'BJ' }
  ];

  const emojis = ['😀', '😂', '❤️', '👍', '👎', '😢', '😮', '😡'];

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
    inputRef.current?.focus();
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      {/* Header responsive */}
      <div className="bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex-shrink-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <BackButton className="sm:hidden flex-shrink-0" />
            
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Chat du groupe
              </h1>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                <span>{onlineMembers.length} membres en ligne</span>
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
            {/* Membres en ligne - Desktop */}
            <div className="hidden lg:flex items-center space-x-1 mr-2">
              {onlineMembers.slice(0, 3).map((member, index) => (
                <div
                  key={member.name}
                  className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600"
                  style={{ marginLeft: index > 0 ? '-8px' : '0' }}
                  title={member.name}
                >
                  {member.avatar}
                </div>
              ))}
              {onlineMembers.length > 3 && (
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 ml-1">
                  +{onlineMembers.length - 3}
                </div>
              )}
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-hidden bg-gray-50 min-h-0">
        <div className="h-full overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
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
                      {formatTime(msg.timestamp)}
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
      </div>

      {/* Input area - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 p-3 sm:p-4 flex-shrink-0 safe-area-bottom">
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
              ref={inputRef as any}
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
                  handleSendMessage(e as any);
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
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 grid grid-cols-4 gap-1 z-20">
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
        
        {/* Safe area for devices with home indicator */}
        <div className="h-safe-area-inset-bottom sm:hidden"></div>
      </div>
    </div>
  );
}