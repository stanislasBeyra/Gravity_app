'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Paperclip, X } from 'lucide-react';
import { Message } from '@/types/message';
import { EmojiPickerButton } from './emoji-picker';

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: File[]) => void;
  onTyping?: (isTyping: boolean) => void;
  replyTo?: Message;
  onCancelReply?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({
  onSendMessage,
  onTyping,
  replyTo,
  onCancelReply,
  placeholder = "Tapez votre message...",
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(40);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        onTyping?.(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [message, isTyping, onTyping]);

  const handleMessageChange = (value: string) => {
    setMessage(value);
    if (!isTyping) {
      setIsTyping(true);
      onTyping?.(true);
    }
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, 40), 120);
      setTextareaHeight(newHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    
    onSendMessage(message, attachments);
    setMessage('');
    setAttachments([]);
    setIsTyping(false);
    setTextareaHeight(40);
    onTyping?.(false);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSenderName = (sender: { name?: string; firstname?: string; lastname?: string }) => {
    return sender.name || `${sender.firstname ?? ''} ${sender.lastname ?? ''}`.trim();
  };

  return (
    <div className="bg-white border-t border-gray-200 p-3 sm:p-4 flex-shrink-0">
      <div className="space-y-3">
        {/* Reply indicator */}
        {replyTo && (
          <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Avatar className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0">
                <AvatarImage src={replyTo.sender.avatar} />
                <AvatarFallback className="text-xs">
                  {getSenderName(replyTo.sender)?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs sm:text-sm min-w-0 flex-1">
                <div className="font-medium text-gray-900 truncate">
                  Réponse à {getSenderName(replyTo.sender)}
                </div>
                <div className="text-gray-500 truncate">
                  {replyTo.content}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelReply}
              className="h-6 w-6 p-0 flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Attachments preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <Badge key={index} variant="secondary" className="flex items-center space-x-1 max-w-full">
                <span className="text-xs truncate max-w-24 sm:max-w-32">{file.name}</span>
                <span className="text-xs opacity-70 flex-shrink-0">
                  ({formatFileSize(file.size)})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttachment(index)}
                  className="h-4 w-4 p-0 ml-1 flex-shrink-0"
                >
                  <X className="h-2 w-2" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="flex items-end space-x-2 sm:space-x-3">
          {/* Attachment button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="h-9 w-9 sm:h-10 sm:w-10 p-0 flex-shrink-0 mb-1"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          {/* Message input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => handleMessageChange(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none leading-relaxed transition-all duration-200"
              style={{
                height: `${textareaHeight}px`,
                minHeight: '40px',
                maxHeight: '120px'
              }}
            />
          </div>
          
          {/* Emoji button */}
          <EmojiPickerButton
            onEmojiSelect={(emoji) => {
              setMessage(prev => prev + emoji);
              textareaRef.current?.focus();
            }}
            disabled={disabled}
            buttonClassName="h-9 w-9 sm:h-10 sm:w-10 p-0 flex-shrink-0 mb-1"
          />
          
          {/* Send button */}
          <Button
            onClick={handleSend}
            disabled={disabled || (!message.trim() && attachments.length === 0)}
            className="h-9 w-9 sm:h-10 sm:w-10 p-0 flex-shrink-0 mb-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
      />
      
      {/* Safe area for mobile devices */}
      <div className="h-safe-area-inset-bottom sm:hidden"></div>
    </div>
  );
}