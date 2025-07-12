'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Save, TestTube } from 'lucide-react';

interface NotificationSettingsProps {
  settings: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    taskUpdates: boolean;
    projectUpdates: boolean;
    mentions: boolean;
    messages: boolean;
  };
  onSave: (settings: any) => void;
  onTest?: () => void;
  loading?: boolean;
  className?: string;
}

export function NotificationSettings({
  settings,
  onSave,
  onTest,
  loading = false,
  className
}: NotificationSettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleToggle = (key: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    onSave(localSettings);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-gray-600" />
        <h1 className="text-xl font-semibold">Paramètres de notifications</h1>
      </div>

      <div className="space-y-6">
        {/* Notification Channels */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Canaux de notification</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notifications par email</div>
                <div className="text-sm text-gray-500">
                  Recevoir les notifications par email
                </div>
              </div>
              <Switch
                checked={localSettings.email}
                onCheckedChange={() => handleToggle('email')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notifications push</div>
                <div className="text-sm text-gray-500">
                  Recevoir les notifications push sur votre appareil
                </div>
              </div>
              <Switch
                checked={localSettings.push}
                onCheckedChange={() => handleToggle('push')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notifications dans l'app</div>
                <div className="text-sm text-gray-500">
                  Afficher les notifications dans l'application
                </div>
              </div>
              <Switch
                checked={localSettings.inApp}
                onCheckedChange={() => handleToggle('inApp')}
              />
            </div>
          </div>
        </Card>

        {/* Notification Types */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Types de notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Mises à jour de tâches</div>
                <div className="text-sm text-gray-500">
                  Notifications lors de changements de statut de tâches
                </div>
              </div>
              <Switch
                checked={localSettings.taskUpdates}
                onCheckedChange={() => handleToggle('taskUpdates')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Mises à jour de projets</div>
                <div className="text-sm text-gray-500">
                  Notifications lors de changements dans les projets
                </div>
              </div>
              <Switch
                checked={localSettings.projectUpdates}
                onCheckedChange={() => handleToggle('projectUpdates')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Mentions</div>
                <div className="text-sm text-gray-500">
                  Notifications quand quelqu'un vous mentionne
                </div>
              </div>
              <Switch
                checked={localSettings.mentions}
                onCheckedChange={() => handleToggle('mentions')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Messages</div>
                <div className="text-sm text-gray-500">
                  Notifications pour les nouveaux messages
                </div>
              </div>
              <Switch
                checked={localSettings.messages}
                onCheckedChange={() => handleToggle('messages')}
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          {onTest && (
            <Button variant="outline" onClick={onTest}>
              <TestTube className="h-4 w-4 mr-2" />
              Tester les notifications
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 