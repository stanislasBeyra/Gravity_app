'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  CheckSquare,
  Bell,
  User,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: 'Tableau de bord',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Groupes',
    href: '/groups',
    icon: Users,
  },
  {
    name: 'Projets',
    href: '/projects',
    icon: FolderOpen,
  },
  {
    name: 'Tâches',
    href: '/tasks',
    icon: CheckSquare,
  },
  {
    name: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
];

const accountNavigation = [
  {
    name: 'Profil',
    href: '/profile',
    icon: User,
  },
  {
    name: 'Paramètres',
    href: '/settings',
    icon: Settings,
  },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Marquer comme côté client après l'hydratation
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* Overlay pour mobile quand sidebar ouverte - seulement côté client */}
      {isOpen && isClient && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-30 h-screen transition-all duration-300 bg-white border-r border-gray-200 shadow-lg flex flex-col",
          // Responsive behavior
          "md:translate-x-0", // Toujours visible sur desktop
          isOpen 
            ? "w-56 sm:w-64 translate-x-0" // Plus étroite sur mobile
            : "w-56 sm:w-64 -translate-x-full md:w-14 lg:w-16 md:translate-x-0"
        )}
      >
        {/* Header de la sidebar */}
        <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 border-b border-gray-200 flex-shrink-0">
          {/* Logo et titre - toujours visible quand sidebar ouverte */}
          {isOpen && (
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">G</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                Gruvity
              </h2>
            </div>
          )}
          
          {/* Logo seul quand sidebar fermée */}
          {!isOpen && isClient && (
            <div className="flex items-center justify-center w-full">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">G</span>
              </div>
            </div>
          )}
          
          {/* Bouton toggle - visible sur mobile ou desktop selon l'état */}
          <button
            onClick={onToggle}
            className={cn(
              "p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0",
              !isOpen && isClient && "absolute top-3 sm:top-4 right-3 sm:right-4"
            )}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation principale */}
        <nav className="flex-1 px-2 sm:px-3 py-3 sm:py-4 space-y-1 overflow-y-auto">
          {/* Section Navigation */}
          {isOpen && (
            <div className="px-2 sm:px-3 mb-3 sm:mb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Navigation
              </h3>
            </div>
          )}
          
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    (!isOpen && isClient) && "justify-center px-2 mx-auto"
                  )}
                  title={(!isOpen && isClient) ? item.name : undefined}
                >
                  {/* Indicateur actif pour sidebar fermée */}
                  {isActive && (!isOpen && isClient) && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-700 rounded-r-full" />
                  )}
                  
                  <item.icon
                    className={cn(
                      "flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5",
                      isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500",
                      isOpen && "mr-2 sm:mr-3"
                    )}
                  />
                  
                  {/* Texte visible selon l'état */}
                  {isOpen && (
                    <span className="truncate">{item.name}</span>
                  )}
                  
                  {/* Indicateur actif pour sidebar ouverte */}
                  {isActive && isOpen && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-700 rounded-l-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Section Compte */}
          <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200">
            {isOpen && (
              <div className="px-2 sm:px-3 mb-3 sm:mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Compte
                </h3>
              </div>
            )}
            
            <div className="space-y-1">
              {accountNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative",
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      (!isOpen && isClient) && "justify-center px-2 mx-auto"
                    )}
                    title={(!isOpen && isClient) ? item.name : undefined}
                  >
                    {/* Indicateur actif pour sidebar fermée */}
                    {isActive && (!isOpen && isClient) && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-700 rounded-r-full" />
                    )}
                    
                    <item.icon
                      className={cn(
                        "flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5",
                        isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500",
                        isOpen && "mr-2 sm:mr-3"
                      )}
                    />
                    
                    {/* Texte visible selon l'état */}
                    {isOpen && (
                      <span className="truncate">{item.name}</span>
                    )}
                    
                    {/* Indicateur actif pour sidebar ouverte */}
                    {isActive && isOpen && (
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-700 rounded-l-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* User info en bas - fixé en bas */}
        <div className="border-t border-gray-200 p-2 sm:p-4 flex-shrink-0">
          <div className={cn(
            "flex items-center transition-all duration-200",
            isOpen ? "space-x-2 sm:space-x-3" : "justify-center"
          )}>
            {/* Avatar */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium flex-shrink-0">
              J
            </div>
            
            {/* Info utilisateur */}
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 truncate">
                  john@example.com
                </p>
              </div>
            )}
          </div>
          
          {/* Status indicator - seulement sur sidebar fermée */}
          {(!isOpen && isClient) && (
            <div className="mt-2 flex justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}