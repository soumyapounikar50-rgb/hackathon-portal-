import type { Metadata } from 'next';
import './globals.css';
import { HACKATHON_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: `${HACKATHON_CONFIG.name} — ${HACKATHON_CONFIG.tagline}`,
  description: HACKATHON_CONFIG.description,
  keywords: ['hackathon', 'hackathon registration', 'AI agents', 'coding contest', 'developer prizes', 'Vercel'],
  openGraph: {
    title: HACKATHON_CONFIG.name,
    description: HACKATHON_CONFIG.description,
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
