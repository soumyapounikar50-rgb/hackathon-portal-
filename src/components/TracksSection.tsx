import { HACKATHON_CONFIG } from '@/lib/config';
import { Bot, Cpu, Leaf, Activity, Sparkles, ArrowUpRight } from 'lucide-react';

const TRACK_ICONS: Record<string, any> = {
  Bot,
  Cpu,
  Leaf,
  Activity,
  Sparkles
};

export default function TracksSection() {
  return (
    <section id="tracks" className="py-24 relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <span>5 Specialized Challenges</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-brand-accent to-emerald-400">Battleground</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Submit your solution in one of the following tracks or combine elements for open innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HACKATHON_CONFIG.tracks.map((track) => {
            const IconComponent = TRACK_ICONS[track.icon] || Sparkles;
            return (
              <div
                key={track.id}
                className="group relative p-8 rounded-3xl glass-panel glass-card-hover flex flex-col justify-between overflow-hidden"
              >
                {/* Glow border gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.color} p-0.5 mb-6 flex items-center justify-center shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform`}>
                    <div className="w-full h-full bg-[#0b0f1a] rounded-[14px] flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                    <span>{track.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                  </h3>

                  <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <span className="font-mono text-indigo-400 font-semibold">$1,000 Track Bounty</span>
                  <span className="text-gray-500 group-hover:text-gray-300">Learn more →</span>
                </div>
              </div>
            );
          })}

          {/* Quick Bonus track callout */}
          <div className="p-8 rounded-3xl border border-dashed border-indigo-500/40 bg-indigo-950/20 flex flex-col justify-center items-center text-center">
            <Sparkles className="w-10 h-10 text-brand-accent mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-white mb-2">Have a Wild Idea?</h3>
            <p className="text-sm text-gray-300 mb-6">
              Don&apos;t feel boxed in. Build cross-track or open source utilities. Every creative project qualifies for Grand Prizes.
            </p>
            <a
              href="#register"
              className="text-xs font-semibold text-brand-accent hover:underline flex items-center gap-1"
            >
              Sign up today and get hacking →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
