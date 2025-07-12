import type { Metadata } from "next";
import "./globals.css";
import InstallPWAPrompt from '@/components/common/install-pwa-prompt';

export const metadata: Metadata = {
  title: "Gruvity",
  description: "Task management app",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/windows11/Square44x44Logo.targetsize-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/ios/180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <InstallPWAPrompt />
        {children}
      </body>
    </html>
  );
}
