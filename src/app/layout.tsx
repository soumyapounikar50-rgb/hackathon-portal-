import type { Metadata } from 'next';
import './globals.css';
import { EVENT_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: `${EVENT_CONFIG.name} (2 & 3 Dec) — ${EVENT_CONFIG.tagline}`,
  description: EVENT_CONFIG.description,
  keywords: ['El Niño Awareness Program', 'El Nino Awareness', 'Hackathon', 'Ideathon', 'Reel Making', 'college fest registration', 'TGPCET', 'Vercel'],
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
      <body className="min-h-screen bg-[#01120a] text-[#f3f4f6] font-sans antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
