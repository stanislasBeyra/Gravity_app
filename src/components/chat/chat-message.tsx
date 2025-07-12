'use client';

import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Message } from '@/types/message';
import { User } from '@/types/user';
import Image from 'next/image';

interface ChatMessageProps {
  message: Message;
  currentUser: User;
}

export function ChatMessage({ message, currentUser }: ChatMessageProps) {
  const isOwnMessage = message.sender.id === currentUser.id;
  const isSystemMessage = message.type === 'system';

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isOwnMessage && (
          <div className="flex-shrink-0 mr-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
              {message.sender.firstname.charAt(0)}{message.sender.lastname.charAt(0)}
            </div>
          </div>
        )}
        
        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          {!isOwnMessage && (
            <div className="text-xs text-gray-500 mb-1">
              {message.sender.firstname} {message.sender.lastname}
            </div>
          )}
          
          <div
            className={`px-4 py-2 rounded-lg ${
              isOwnMessage
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {message.type === 'text' && (
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            )}
            
            {message.type === 'file' && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">{message.fileName}</p>
                  <p className="text-xs opacity-75">{message.fileSize}</p>
                </div>
              </div>
            )}
            
            {message.type === 'image' && (
              <div className="max-w-xs">
                <Image
                  src={message.content || ''}
                  alt="Image"
                  width={400}
                  height={300}
                  className="rounded-lg max-w-full h-auto"
                />
              </div>
            )}
          </div>
          
          <div className={`text-xs text-gray-400 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
            {formatDistanceToNow(new Date(message.timestamp), {
              addSuffix: true,
              locale: fr
            })}
            
            {message.isEdited && (
              <span className="ml-1">(modifié)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 