'use client';
import { useEffect, useState } from 'react';

export default function InstallPWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
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
      <span>Installer l'application Gruvity&nbsp;?</span>
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