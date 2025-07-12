 'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';

interface PushNotificationSetupProps {
  onEnable?: () => Promise<void>;
  onDisable?: () => Promise<void>;
  className?: string;
}

export function PushNotificationSetup({
  onEnable,
  onDisable,
  className
}: PushNotificationSetupProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    setIsSupported('Notification' in window);
    
    // Get current permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const handleEnable = async () => {
    if (!onEnable) return;
    
    setLoading(true);
    try {
      await onEnable();
      setPermission(Notification.permission);
    } catch (error) {
      console.error('Failed to enable push notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async () => {
    if (!onDisable) return;
    
    setLoading(true);
    try {
      await onDisable();
      setPermission(Notification.permission);
    } catch (error) {
      console.error('Failed to disable push notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-yellow-500" />
          <h3 className="text-lg font-semibold">Notifications non supportées</h3>
          <p className="text-gray-600">
            Votre navigateur ne supporte pas les notifications push.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Smartphone className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold">Notifications push</h2>
          <Badge 
            variant={
              permission === 'granted' ? 'success' : 
              permission === 'denied' ? 'destructive' : 'secondary'
            }
          >
            {permission === 'granted' ? 'Activées' : 
             permission === 'denied' ? 'Refusées' : 'Non configurées'}
          </Badge>
        </div>

        <div className="space-y-4">
          {permission === 'default' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Activer les notifications</h4>
                  <p className="text-sm text-blue-700">
                    Recevez des notifications instantanées pour les mises à jour importantes.
                  </p>
                </div>
              </div>
              <Button onClick={handleEnable} disabled={loading} className="w-full">
                {loading ? 'Activation...' : 'Activer les notifications'}
              </Button>
            </div>
          )}

          {permission === 'granted' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Notifications activées</h4>
                  <p className="text-sm text-green-700">
                    Vous recevez maintenant les notifications push.
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleDisable} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Désactivation...' : 'Désactiver les notifications'}
              </Button>
            </div>
          )}

          {permission === 'denied' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900">Notifications refusées</h4>
                  <p className="text-sm text-red-700">
                    Vous avez refusé les notifications. Pour les activer, modifiez les paramètres de votre navigateur.
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => window.open('chrome://settings/content/notifications', '_blank')}
                className="w-full"
              >
                Ouvrir les paramètres
              </Button>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500 space-y-2">
          <p>Les notifications push vous permettent de :</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Recevoir des alertes en temps réel</li>
            <li>Être notifié des nouvelles tâches assignées</li>
            <li>Recevoir des mises à jour de projets</li>
            <li>Être alerté des mentions importantes</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}