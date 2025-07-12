'use client';

import { Bell, Search, Menu, User, ChevronDown, LogOut, Settings, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export function Header({ onMenuClick, sidebarOpen }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Marquer comme côté client après l'hydratation
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-focus sur la recherche mobile
  useEffect(() => {
    if (showSearchMobile && searchInputRef.current && isClient) {
      searchInputRef.current.focus();
    }
  }, [showSearchMobile, isClient]);

  // Fermer les menus avec Escape
  useEffect(() => {
    if (!isClient) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowUserMenu(false);
        setShowNotifications(false);
        setShowSearchMobile(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isClient]);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
          {/* Section gauche */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            {/* Bouton menu mobile */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </button>

            {/* Titre de la page */}
            <div className="hidden sm:block min-w-0">
              <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Tableau de bord
              </h1>
            </div>
          </div>

          {/* Barre de recherche - Desktop */}
          <div className="hidden sm:flex flex-1 max-w-md lg:max-w-lg mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-9 lg:pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              />
            </div>
          </div>

          {/* Section droite */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
            {/* Bouton recherche mobile - seulement affiché côté client */}
            {isClient && (
              <button
                onClick={() => setShowSearchMobile(true)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors sm:hidden flex-shrink-0"
                aria-label="Rechercher"
              >
                <Search className="w-4 h-4 text-gray-600" />
              </button>
            )}

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {/* Badge de notification */}
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center text-[10px] sm:text-xs">
                  3
                </span>
              </button>

              {/* Menu déroulant des notifications */}
              {showNotifications && isClient && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-hidden">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-900">Nouvelle tâche assignée</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 5 minutes</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-900">Projet mis à jour</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 1 heure</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-900">Nouveau membre dans l'équipe</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profil utilisateur */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors min-w-0"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium flex-shrink-0">
                  J
                </div>
                <div className="hidden lg:block text-left min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 truncate">Admin</p>
                </div>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hidden sm:block" />
              </button>

              {/* Menu déroulant utilisateur */}
              {showUserMenu && isClient && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200 lg:hidden">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                  
                  <div className="py-1">
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Mon profil</span>
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Paramètres</span>
                    </a>
                  </div>
                  
                  <div className="border-t border-gray-200 py-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        /* Logique de déconnexion */
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3 flex-shrink-0" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay de recherche mobile - seulement côté client */}
      {showSearchMobile && isClient && (
        <div className="fixed inset-0 z-50 bg-white sm:hidden">
          <div className="flex items-center h-14 px-4 border-b border-gray-200">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Rechercher..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <button
              onClick={() => setShowSearchMobile(false)}
              className="ml-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Fermer la recherche"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* Résultats de recherche - placeholder */}
          <div className="p-4">
            <p className="text-sm text-gray-500">Commencez à taper pour rechercher...</p>
          </div>
        </div>
      )}

      {/* Overlay pour fermer les menus - seulement côté client */}
      {(showUserMenu || showNotifications) && isClient && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </>
  );
}