import { EVENT_CONFIG } from '@/lib/config';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060910] text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {EVENT_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm mb-4 leading-relaxed">
              {EVENT_CONFIG.description}
            </p>
            <div className="text-xs text-indigo-300 font-mono space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{EVENT_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-accent" />
                <span>{EVENT_CONFIG.upiDetails.phone}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Competitions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="#register" className="hover:text-white transition-colors">Hackathon (₹300)</Link></li>
              <li><Link href="#register" className="hover:text-white transition-colors">Ideathon (₹200)</Link></li>
              <li><Link href="#register" className="hover:text-white transition-colors">Reel Making (₹150)</Link></li>
              <li><Link href="#register" className="hover:text-white transition-colors">Science Exhibition (₹150)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Administration</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/admin" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">🛡️ Organizer Admin Dashboard</Link></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Schedule: 2 & 3 December</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Rules & Regulations</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {EVENT_CONFIG.name}. Official Inter-College Fest Portal.</p>
          <p>Dates: <strong className="text-white">{EVENT_CONFIG.dates}</strong></p>
        </div>
      </div>
    </footer>
  );
}
