import { HACKATHON_CONFIG } from '@/lib/config';
import { Terminal, Github, Twitter, Disc as Discord } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060910] text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sponsors Banner */}
        <div className="mb-14 pb-12 border-b border-white/5 text-center">
          <p className="text-xs uppercase font-mono tracking-widest text-gray-400 mb-6">
            Supported & Sponsored by Industry Innovators
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {HACKATHON_CONFIG.sponsors.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-lg sm:text-xl font-bold font-mono tracking-wider text-gray-200">
                  {s.name}
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
                  {s.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {HACKATHON_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm mb-6 leading-relaxed">
              {HACKATHON_CONFIG.description}
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Discord">
                <Discord className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#overview" className="hover:text-white transition-colors">Overview</Link></li>
              <li><Link href="#tracks" className="hover:text-white transition-colors">Tracks</Link></li>
              <li><Link href="#prizes" className="hover:text-white transition-colors">Prizes</Link></li>
              <li><Link href="#schedule" className="hover:text-white transition-colors">Timeline</Link></li>
              <li><Link href="#register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Organizer Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/admin" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">🛡️ Admin Dashboard</Link></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Rules & Code of Conduct</a></li>
              <li><a href="mailto:sponsors@hackspark.org" className="hover:text-white transition-colors">Sponsorship Inquiries</a></li>
              <li><a href="mailto:organizers@hackspark.org" className="hover:text-white transition-colors">Contact Organizers</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {HACKATHON_CONFIG.name}. Built for innovators worldwide.</p>
          <p>Ready to deploy seamlessly on <span className="text-white font-semibold">▲ Vercel</span></p>
        </div>
      </div>
    </footer>
  );
}
