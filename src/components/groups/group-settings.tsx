'use client';

import React from 'react'
import { Card} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Textarea } from '@/components/ui/textarea'
import { AlertTriangle, Save, Settings, Trash2 } from 'lucide-react'
import { Group } from '@/types/group';

interface GroupSettingsProps {
  group: Group;
  onSave: (data: Partial<Group>) => void;
  onDelete: () => void;
  loading?: boolean;
  className?: string;
}

export function GroupSettings({ 
  group, 
  onSave, 
  onDelete, 
  loading = false, 
  className 
}: GroupSettingsProps) {
  const [name, setName] = React.useState(group.name);
  const [description, setDescription] = React.useState(group.description || '');
  const [status, setStatus] = React.useState(group.status || 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      status
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-gray-600" />
        <h1 className="text-xl font-semibold">Paramètres du groupe</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom du groupe *
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom du groupe"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description du groupe"
                rows={3}
              />
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Statut du groupe</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={status === 'active' ? 'default' : 'outline'}
                  onClick={() => setStatus('active')}
                >
                  Actif
                </Button>
                <Button
                  type="button"
                  variant={status === 'archived' ? 'default' : 'outline'}
                  onClick={() => setStatus('archived')}
                >
                  Archivé
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-200 bg-red-50">
          <h2 className="text-lg font-semibold mb-4 text-red-800">Zone dangereuse</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <div className="font-medium text-red-800">Supprimer le groupe</div>
                <div className="text-sm text-red-600">
                  Cette action est irréversible. Toutes les données du groupe seront supprimées.
                </div>
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer le groupe
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex gap-3">
          <Button type="submit" disabled={loading || !name.trim()}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
        </div>
      </form>
    </div>
  );
} 