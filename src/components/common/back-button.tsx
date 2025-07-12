'use client';

import { useRouter } from 'next/navigation';

export default function BackButton({ className = '' }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition-colors ${className}`}
      aria-label="Retour"
      style={{ background: '#111', color: '#fff' }}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
} 