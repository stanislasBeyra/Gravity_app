import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationsPage() {
  const mockNotifications = [
    {
      id: '1',
      type: 'success',
      title: 'Tâche terminée',
      message: 'La tâche "Créer la maquette" a été marquée comme terminée',
      time: 'Il y a 2 heures',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Échéance approche',
      message: 'La tâche "Implémenter l\'authentification" est due dans 2 jours',
      time: 'Il y a 4 heures',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Nouveau membre',
      message: 'Jane Smith a rejoint le projet "Refonte Site Web"',
      time: 'Il y a 1 jour',
      read: true
    },
    {
      id: '4',
      type: 'success',
      title: 'Projet créé',
      message: 'Le projet "Application Mobile" a été créé avec succès',
      time: 'Il y a 2 jours',
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Gérez vos notifications et alertes</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900">
          <Bell className="h-4 w-4" />
          <span>Marquer tout comme lu</span>
        </button>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${getNotificationBg(notification.type)} ${
              !notification.read ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
          <p className="text-gray-600">Vous n'avez aucune notification pour le moment</p>
        </div>
      )}
    </div>
  );
} 