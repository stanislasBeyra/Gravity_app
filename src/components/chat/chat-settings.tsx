'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Bell, Settings, Users, MessageSquare } from 'lucide-react';

interface ChatSettingsProps {
  roomName: string;
  onSettingsChange?: (settings: ChatSettings) => void;
}

interface ChatSettings {
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
    mentions: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'auto';
    fontSize: 'small' | 'medium' | 'large';
    compactMode: boolean;
  };
  privacy: {
    showStatus: boolean;
    showTyping: boolean;
    allowDirectMessages: boolean;
  };
}

export function ChatSettings({
  roomName,
  onSettingsChange,
}: ChatSettingsProps) {
  const [settings, setSettings] = useState<ChatSettings>({
    notifications: {
      enabled: true,
      sound: true,
      desktop: true,
      mentions: true,
    },
    appearance: {
      theme: 'auto',
      fontSize: 'medium',
      compactMode: false,
    },
    privacy: {
      showStatus: true,
      showTyping: true,
      allowDirectMessages: true,
    },
  });

  const handleSettingChange = (
    category: keyof ChatSettings,
    key: string,
    value: boolean | string
  ) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value,
      },
    };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Chat Settings</DialogTitle>
          <DialogDescription>
            Configure your chat preferences for {roomName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications-enabled">Enable notifications</Label>
                <Switch
                  id="notifications-enabled"
                  checked={settings.notifications.enabled}
                  onCheckedChange={(checked) =>
                    handleSettingChange('notifications', 'enabled', checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-notifications">Sound notifications</Label>
                <Switch
                  id="sound-notifications"
                  checked={settings.notifications.sound}
                  onCheckedChange={(checked) =>
                    handleSettingChange('notifications', 'sound', checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="desktop-notifications">Desktop notifications</Label>
                <Switch
                  id="desktop-notifications"
                  checked={settings.notifications.desktop}
                  onCheckedChange={(checked) =>
                    handleSettingChange('notifications', 'desktop', checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="mention-notifications">Mention notifications</Label>
                <Switch
                  id="mention-notifications"
                  checked={settings.notifications.mentions}
                  onCheckedChange={(checked) =>
                    handleSettingChange('notifications', 'mentions', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) =>
                    handleSettingChange('appearance', 'theme', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select
                  value={settings.appearance.fontSize}
                  onValueChange={(value) =>
                    handleSettingChange('appearance', 'fontSize', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-mode">Compact mode</Label>
                <Switch
                  id="compact-mode"
                  checked={settings.appearance.compactMode}
                  onCheckedChange={(checked) =>
                    handleSettingChange('appearance', 'compactMode', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show-status">Show online status</Label>
                <Switch
                  id="show-status"
                  checked={settings.privacy.showStatus}
                  onCheckedChange={(checked) =>
                    handleSettingChange('privacy', 'showStatus', checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="show-typing">Show typing indicator</Label>
                <Switch
                  id="show-typing"
                  checked={settings.privacy.showTyping}
                  onCheckedChange={(checked) =>
                    handleSettingChange('privacy', 'showTyping', checked)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="allow-dms">Allow direct messages</Label>
                <Switch
                  id="allow-dms"
                  checked={settings.privacy.allowDirectMessages}
                  onCheckedChange={(checked) =>
                    handleSettingChange('privacy', 'allowDirectMessages', checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
} 