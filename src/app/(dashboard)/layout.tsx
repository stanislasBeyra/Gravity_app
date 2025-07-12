'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Détecter si nous sommes sur mobile et ajuster l'état initial
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      // Sur mobile, sidebar fermée par défaut. Sur desktop, ouverte par défaut
      setSidebarOpen(!mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      {/* Conteneur principal qui s'adapte à l'état de la sidebar */}
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:pl-64' : 'lg:pl-16'
      }`}>
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      
      {/* <MobileNav /> */}
    </div>
  );
}