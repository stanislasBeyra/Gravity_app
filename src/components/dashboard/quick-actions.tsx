import Link from 'next/link';
import { Users, Folder, CheckSquare } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      name: 'Nouveau projet',
      description: 'Créer un nouveau projet',
      href: '/projects/create',
      icon: Folder,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Nouveau groupe',
      description: 'Créer un nouveau groupe',
      href: '/groups/create',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Nouvelle tâche',
      description: 'Créer une nouvelle tâche',
      href: '/tasks/create',
      icon: CheckSquare,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {actions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className={`flex items-center space-x-3 p-3 rounded-lg text-white transition-colors ${action.color}`}
            >
              <action.icon className="h-5 w-5" />
              <div>
                <p className="font-medium">{action.name}</p>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 