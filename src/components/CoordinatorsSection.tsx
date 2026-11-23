import { EVENT_CONFIG } from '@/lib/config';
import { Phone, MessageSquare, UserCheck, Sparkles } from 'lucide-react';

export default function CoordinatorsSection() {
  return (
    <section id="coordinators" className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-emerald-950/25 to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 mb-4 shadow-sm">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Helpdesk & Student Coordinators</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Have Questions? <span className="text-elnino-gradient">Contact Coordinators</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            For registration guidance, competition rules, or payment verification, reach out directly to our student organizers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CONFIG.coordinators.map((c, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl hologram-card flex flex-col justify-between group shadow-xl relative"
            >
              <span className="hud-corner-tl" />
              <span className="hud-corner-br" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-[#02180f] rounded-[14px] flex items-center justify-center">
                      <Phone className="w-5 h-5 text-cyan-300" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full hologram-badge text-emerald-300">
                    Coordinator #{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {c.name}
                </h3>
                <span className="text-xs font-mono text-emerald-400/90 block mt-0.5 mb-3">
                  {c.role}
                </span>

                <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/20 mb-6 font-mono text-base font-bold text-white flex items-center justify-between">
                  <span>{c.phone}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-emerald-500/15">
                {/* DIRECT CALL BUTTON */}
                <a
                  href={`tel:${c.rawPhone}`}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:opacity-95 shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Phone className="w-4 h-4 text-black fill-current" />
                  <span>Direct Call Now</span>
                </a>

                {/* WHATSAPP CHAT BUTTON */}
                <a
                  href={`https://wa.me/${c.rawPhone.replace('+', '')}?text=Hi%20${encodeURIComponent(c.name)},%20I%20have%20a%20query%20regarding%20El%20Ni%C3%B1o%20Awareness%20Program%20registration.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
