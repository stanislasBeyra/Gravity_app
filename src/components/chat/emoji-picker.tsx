'use client';

import { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

interface EmojiPickerButtonProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

export function EmojiPickerButton({
  onEmojiSelect,
  className = '',
  buttonClassName = '',
  disabled = false
}: EmojiPickerButtonProps) {
  const [showPicker, setShowPicker] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fermer le picker quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    onEmojiSelect(emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        disabled={disabled}
        className={`p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${buttonClassName}`}
        aria-label="Sélectionner un emoji"
      >
        <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {showPicker && (
        <div className="absolute bottom-full right-0 mb-2 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
            searchPlaceholder="Rechercher un emoji..."
            skinTonesDisabled
            lazyLoadEmojis
            autoFocusSearch={false}
          />
        </div>
      )}
    </div>
  );
} 