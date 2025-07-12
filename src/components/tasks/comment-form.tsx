'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, X } from 'lucide-react';
import { User } from '@/types/user';

interface CommentFormProps {
  currentUser: User;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

export function CommentForm({
  currentUser,
  onSubmit,
  onCancel,
  loading = false,
  placeholder = "Ajouter un commentaire...",
  className
}: CommentFormProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await onSubmit(content);
      setContent('');
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={`p-4 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={currentUser.avatar} alt={currentUser.firstname} />
            <AvatarFallback className="text-xs">
              {getInitials(`${currentUser.firstname} ${currentUser.lastname}`)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder={placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="resize-none"
            />
            
            <div className="flex justify-end gap-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                >
                  <X className="h-4 w-4 mr-2" />
                  Annuler
                </Button>
              )}
              <Button 
                type="submit" 
                disabled={loading || !content.trim()}
                size="sm"
              >
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'Envoi...' : 'Envoyer'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
} 