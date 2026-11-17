import { EVENT_CONFIG } from '@/lib/config';
import { Terminal, Lightbulb, Video, ArrowUpRight, Sparkles } from 'lucide-react';

const ICONS: Record<string, any> = {
  Terminal,
  Lightbulb,
  Video
};

export default function CompetitionsSection() {
  return (
    <section id="competitions" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>3 Flagship Competitions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">Competition</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Compete across our 3 distinct arenas on 2 & 3 December at {EVENT_CONFIG.name}. Separate registrations and prizes for each event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {EVENT_CONFIG.competitions.map((comp) => {
            const IconComponent = ICONS[comp.icon] || Terminal;

            return (
              <div
                key={comp.id}
                id={comp.id}
                className="group relative p-8 rounded-3xl glass-panel glass-card-hover flex flex-col justify-between overflow-hidden border border-white/10"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${comp.accentColor} p-0.5 shadow-lg group-hover:scale-105 transition-transform`}>
                      <div className="w-full h-full bg-[#0b0f1a] rounded-[14px] flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-mono font-extrabold block text-emerald-400">
                        {comp.feeLabel}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {comp.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {comp.name}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1 mb-4">{comp.tagline}</p>

                  <p className="text-sm text-gray-300 leading-relaxed mb-6">
                    {comp.description}
                  </p>

                  {/* Rules Pill List */}
                  <div className="space-y-2 border-t border-white/10 pt-4 mb-6">
                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                      Key Guidelines:
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {comp.rules.slice(0, 3).map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">✔</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono">
                    Team: {comp.minMembers === comp.maxMembers ? `${comp.minMembers} Members` : `${comp.minMembers}-${comp.maxMembers} Members`}
                  </span>

                  <a
                    href="#register"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:opacity-95 transition-all shadow-md font-mono"
                  >
                    <span>Register Team</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
