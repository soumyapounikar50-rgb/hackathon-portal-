import type { Metadata } from 'next';
import './globals.css';
import { EVENT_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: `${EVENT_CONFIG.name} (2 & 3 Dec) — ${EVENT_CONFIG.tagline}`,
  description: EVENT_CONFIG.description,
  keywords: ['El Nino Synapse', 'Hackathon', 'Ideathon', 'Reel Making', 'college fest registration', 'Vercel'],
  openGraph: {
    title: EVENT_CONFIG.name,
    description: EVENT_CONFIG.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#090d16] text-[#f3f4f6] font-sans antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
