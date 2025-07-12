'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMembers: (emails: string[]) => void;
  loading?: boolean;
}

export function AddMemberDialog({ 
  open, 
  onOpenChange, 
  onAddMembers, 
  loading = false 
}: AddMemberDialogProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');

  const addEmail = () => {
    if (newEmail && !emails.includes(newEmail)) {
      setEmails([...emails, newEmail]);
      setNewEmail('');
    }
  };

  const removeEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email));
  };

  const handleSubmit = () => {
    if (emails.length > 0) {
      onAddMembers(emails);
      setEmails([]);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setEmails([]);
    setNewEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Ajouter des membres
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresses email
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="email@exemple.com"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEmail())}
                />
                <Button type="button" onClick={addEmail} variant="outline">
                  Ajouter
                </Button>
              </div>

              {emails.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    {emails.length} email{emails.length > 1 ? 's' : ''} à inviter
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {emails.map((email, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {email}
                        <button
                          type="button"
                          onClick={() => removeEmail(email)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Les membres recevront une invitation par email pour rejoindre le groupe.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading || emails.length === 0}
          >
            {loading ? 'Envoi...' : `Inviter ${emails.length} membre${emails.length !== 1 ? 's' : ''}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 