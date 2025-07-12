'use client';

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Trash2, Save, AlertTriangle, Users } from 'lucide-react'
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';

interface ProjectSettingsProps {
  project: Project;
  onSave: (data: Partial<Project>) => void;
  onDelete: () => void;
  loading?: boolean;
  className?: string;
}

export function ProjectSettings({
  project,
  onSave,
  onDelete,
  loading = false,
  className
}: ProjectSettingsProps) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const [status, setStatus] = useState(project.status || 'active');

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
        <h1 className="text-xl font-semibold">Paramètres du projet</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom du projet *
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom du projet"
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
                placeholder="Description du projet"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <Select value={status} onValueChange={(value: 'active' | 'completed' | 'archived') => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="archived">Archivé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Team Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Équipe</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Membres du projet</span>
              </div>
              <Badge variant="secondary">{project.members?.length || 0} membres</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Gérer les membres
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-200 bg-red-50">
          <h2 className="text-lg font-semibold mb-4 text-red-800">Zone dangereuse</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <div className="font-medium text-red-800">Supprimer le projet</div>
                <div className="text-sm text-red-600">
                  Cette action est irréversible. Toutes les données du projet seront supprimées.
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
              Supprimer le projet
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