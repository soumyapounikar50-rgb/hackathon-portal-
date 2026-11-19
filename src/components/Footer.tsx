import { EVENT_CONFIG } from '@/lib/config';
import { Sparkles, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-emerald-500/20 bg-[#020e08] text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-black">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {EVENT_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-sm mb-4 leading-relaxed">
              {EVENT_CONFIG.description}
            </p>
            <div className="text-xs text-emerald-300 font-mono space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{EVENT_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dates: <strong>{EVENT_CONFIG.dates}</strong></span>
              </div>
            </div>

            {/* College Attribution Banner */}
            <div className="mt-5 pt-4 border-t border-emerald-500/20 flex items-center gap-3">
              <a
                href={EVENT_CONFIG.college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-2.5 py-1.5 rounded-xl shadow-md hover:opacity-90 transition-opacity shrink-0"
                title={EVENT_CONFIG.college.name}
              >
                <img
                  src={EVENT_CONFIG.college.logo}
                  alt={EVENT_CONFIG.college.name}
                  className="h-8 w-auto object-contain"
                />
              </a>
              <div className="text-[11px] leading-tight">
                <span className="text-white font-semibold block">{EVENT_CONFIG.college.name}</span>
                <span className="text-gray-400 font-mono text-[10px] block mt-0.5">
                  {EVENT_CONFIG.college.subtext} • <a href={EVENT_CONFIG.college.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">www.tgpcet.com</a>
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Student Coordinators</h4>
            <ul className="space-y-3 text-xs">
              {EVENT_CONFIG.coordinators.map((c, i) => (
                <li key={i} className="space-y-0.5">
                  <div className="text-white font-semibold">{c.name}</div>
                  <a
                    href={`tel:${c.rawPhone}`}
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono text-xs transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{c.phone} (Call)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#coordinators" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">📞 Call Coordinators</Link></li>
              <li><Link href="/admin" className="text-gray-300 hover:text-white transition-colors">🛡️ Organizer Admin Dashboard</Link></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Event Timeline (2 & 3 Dec)</a></li>
              <li><a href="#register" className="hover:text-white transition-colors">Register for Competitions</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-500/15 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {EVENT_CONFIG.name}. Organized by {EVENT_CONFIG.college.name}.</p>
          <p>Event Dates: <strong className="text-white">{EVENT_CONFIG.dates}</strong></p>
        </div>
      </div>
    </footer>
  );
}
