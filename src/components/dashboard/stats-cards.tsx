import { Users, Folder, CheckSquare, TrendingUp } from 'lucide-react';

export function StatsCards() {
  const stats = [
    {
      name: 'Projets actifs',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Folder,
      color: 'bg-blue-500'
    },
    {
      name: 'Tâches en cours',
      value: '34',
      change: '+8',
      changeType: 'positive',
      icon: CheckSquare,
      color: 'bg-green-500'
    },
    {
      name: 'Membres d\'équipe',
      value: '28',
      change: '+3',
      changeType: 'positive',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      name: 'Progression globale',
      value: '78%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs mois dernier</span>
          </div>
        </div>
      ))}
    </div>
  );
} 