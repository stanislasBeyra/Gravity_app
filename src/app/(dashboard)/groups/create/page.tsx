'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, X, ArrowLeft, Check } from 'lucide-react';
import BackButton from '@/components/common/back-button';

export default function CreateGroupPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const colors = [
    { class: 'bg-blue-500', name: 'Bleu' },
    { class: 'bg-green-500', name: 'Vert' },
    { class: 'bg-purple-500', name: 'Violet' },
    { class: 'bg-red-500', name: 'Rouge' },
    { class: 'bg-yellow-500', name: 'Jaune' },
    { class: 'bg-pink-500', name: 'Rose' },
    { class: 'bg-indigo-500', name: 'Indigo' },
    { class: 'bg-gray-500', name: 'Gris' }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement group creation logic
    setTimeout(() => {
      setIsLoading(false);
      router.push('/groups');
    }, 1000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header responsive */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <BackButton className="flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Créer un groupe
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Créez un nouveau groupe pour collaborer
          </p>
        </div>
        
        {/* Bouton aperçu - Desktop */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="hidden lg:flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Users className="h-4 w-4" />
          <span>Aperçu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Formulaire principal */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Nom du groupe */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du groupe *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors"
                  placeholder="Ex: Équipe Marketing"
                  maxLength={50}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.name.length}/50 caractères
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-colors resize-none"
                  placeholder="Description du groupe et de ses objectifs..."
                  maxLength={200}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.description.length}/200 caractères
                </div>
              </div>

              {/* Sélecteur de couleur responsive */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Couleur du groupe
                </label>
                
                {/* Version mobile - Grid compacte */}
                <div className="grid grid-cols-4 sm:hidden gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.class}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.class })}
                      className={`relative w-full aspect-square ${color.class} rounded-lg border-2 ${
                        formData.color === color.class ? 'border-gray-900 ring-2 ring-gray-300' : 'border-transparent'
                      } hover:scale-105 transition-all duration-200 active:scale-95`}
                      aria-label={`Couleur ${color.name}`}
                    >
                      {formData.color === color.class && (
                        <Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Version desktop - Grid étendue avec labels */}
                <div className="hidden sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.class}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.class })}
                      className={`relative w-full aspect-square ${color.class} rounded-lg border-2 ${
                        formData.color === color.class ? 'border-gray-900 ring-2 ring-gray-300' : 'border-transparent'
                      } hover:scale-105 transition-all duration-200 group`}
                      title={color.name}
                    >
                      {formData.color === color.class && (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions du formulaire - Mobile sticky */}
              <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !formData.name.trim()}
                  className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Création...</span>
                    </div>
                  ) : (
                    'Créer le groupe'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Aperçu du groupe - Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6 sticky top-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Aperçu
            </h3>
            
            {/* Carte d'aperçu */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${formData.color} rounded-lg flex items-center justify-center`}>
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-xs text-gray-500">
                  Maintenant
                </div>
              </div>
              
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                  {formData.name || 'Nom du groupe'}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                  {formData.description || 'Description du groupe...'}
                </p>
              </div>
              
              <div className="flex items-center text-xs sm:text-sm text-gray-500 pt-2 border-t border-gray-100">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span>1 membre</span>
              </div>
            </div>

            {/* Conseils */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                💡 Conseils
              </h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Choisissez un nom court et descriptif</li>
                <li>• La description aide les membres à comprendre l'objectif</li>
                <li>• Les couleurs aident à identifier rapidement les groupes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Aperçu mobile - Modal */}
      {showPreview && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
          <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Aperçu</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              {/* Même contenu que l'aperçu desktop */}
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 ${formData.color} rounded-lg flex items-center justify-center`}>
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-xs text-gray-500">
                    Maintenant
                  </div>
                </div>
                
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {formData.name || 'Nom du groupe'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.description || 'Description du groupe...'}
                  </p>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 pt-2 border-t border-gray-100">
                  <Users className="h-4 w-4 mr-1" />
                  <span>1 membre</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bouton aperçu flottant - Mobile */}
      <button
        onClick={() => setShowPreview(true)}
        className="lg:hidden fixed bottom-20 right-4 w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors"
      >
        <Users className="h-5 w-5" />
      </button>
    </div>
  );
}