'use client';
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg z-50 flex items-center space-x-3">
      <p className="text-sm text-gray-600">
        Installez l&apos;application pour un accès plus rapide
      </p>
      <button
        onClick={handleInstall}
        className="ml-2 px-3 py-1 bg-blue-600 rounded text-white hover:bg-blue-700"
      >
        Installer
      </button>
      <button
        onClick={() => setShowPrompt(false)}
        className="ml-2 px-3 py-1 bg-gray-600 rounded text-white hover:bg-gray-700"
      >
        Plus tard
      </button>
    </div>
  );
} 