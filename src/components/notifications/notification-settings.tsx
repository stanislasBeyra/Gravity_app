'use client';

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bell } from 'lucide-react'

interface NotificationSettingsProps {
  settings: {
    email: boolean
    push: boolean
    desktop: boolean
    sound: boolean
    mentions: boolean
    frequency: 'immediate' | 'hourly' | 'daily'
  }
  onSettingsChange: (settings: Record<string, unknown>) => void
  className?: string
}

export function NotificationSettings({
  settings,
  onSettingsChange,
  className
}: NotificationSettingsProps) {
  const handleSettingChange = (key: string, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value }
    onSettingsChange(newSettings)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Paramètres de notifications
        </CardTitle>
        <CardDescription>
          Configurez vos préférences de notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notifications par email */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Recevez les notifications par email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.email}
              onCheckedChange={(checked) => handleSettingChange('email', checked)}
            />
          </div>
        </div>

        {/* Notifications push */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Notifications push</Label>
              <p className="text-sm text-muted-foreground">
                Recevez les notifications push sur votre appareil
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.push}
              onCheckedChange={(checked) => handleSettingChange('push', checked)}
            />
          </div>
        </div>

        {/* Notifications desktop */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="desktop-notifications">Notifications desktop</Label>
              <p className="text-sm text-muted-foreground">
                Affichez les notifications sur votre bureau
              </p>
            </div>
            <Switch
              id="desktop-notifications"
              checked={settings.desktop}
              onCheckedChange={(checked) => handleSettingChange('desktop', checked)}
            />
          </div>
        </div>

        {/* Sons de notification */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sound-notifications">Sons de notification</Label>
              <p className="text-sm text-muted-foreground">
                Jouez un son pour les nouvelles notifications
              </p>
            </div>
            <Switch
              id="sound-notifications"
              checked={settings.sound}
              onCheckedChange={(checked) => handleSettingChange('sound', checked)}
            />
          </div>
        </div>

        {/* Mentions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="mention-notifications">Notifications de mentions</Label>
              <p className="text-sm text-muted-foreground">
                Soyez notifié quand quelqu&apos;un vous mentionne
              </p>
            </div>
            <Switch
              id="mention-notifications"
              checked={settings.mentions}
              onCheckedChange={(checked) => handleSettingChange('mentions', checked)}
            />
          </div>
        </div>

        {/* Fréquence */}
        <div className="space-y-2">
          <Label htmlFor="notification-frequency">Fréquence des notifications</Label>
          <Select
            value={settings.frequency}
            onValueChange={(value) => handleSettingChange('frequency', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immédiat</SelectItem>
              <SelectItem value="hourly">Toutes les heures</SelectItem>
              <SelectItem value="daily">Quotidien</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Choisissez la fréquence de vos notifications
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 