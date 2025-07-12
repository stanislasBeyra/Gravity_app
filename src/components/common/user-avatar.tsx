'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/user';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

export function UserAvatar({ user, size = 'md', showName = false, className }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const fullName = `${user.firstname} ${user.lastname}`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.avatar} alt={fullName} />
        <AvatarFallback>
          {getInitials(fullName)}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-medium text-sm">
          {fullName}
        </span>
      )}
    </div>
  );
} 