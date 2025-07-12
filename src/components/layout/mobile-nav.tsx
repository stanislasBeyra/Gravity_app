'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  User,
  Plus
} from 'lucide-react';

const mobileNavigation = [
  {
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Projets',
    href: '/projects',
    icon: FolderOpen,
  },
  {
    name: 'Nouveau',
    href: '/nouveau',
    icon: Plus,
    isAction: true,
  },
  {
    name: 'Tâches',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    name: 'Profil',
    href: '/profile',
    icon: User,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {mobileNavigation.map((item) => {
          const isActive = pathname === item.href;
          const isAction = item.isAction;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors relative",
                isAction
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  isAction
                    ? "text-white"
                    : isActive
                    ? "text-blue-600"
                    : "text-gray-400"
                )}
              />
              {/* <span className={cn(
                "text-xs",
                isAction && "text-white",
                isActive && !isAction && "text-blue-600"
              )}>
                {item.name}
              </span> */}
              
              {/* Indicateur actif */}
              {isActive && !isAction && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b-full" />
              )}
            </Link>
          );
        })}
      </div>
      
      {/* Safe area pour les appareils avec encoche */}
      <div className="h-2 bg-white" />
    </nav>
  );
}