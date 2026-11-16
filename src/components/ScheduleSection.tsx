import { EVENT_CONFIG } from '@/lib/config';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function ScheduleSection() {
  return (
    <section id="schedule" className="py-24 relative bg-black/20 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-accent bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Event Timeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Schedule: <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-indigo-300 to-indigo-500">2 & 3 December</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Full sequence of events, problem statement reveal, exhibition, and presentation slots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EVENT_CONFIG.schedule.map((dayItem, dIdx) => (
            <div key={dIdx} className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <span>{dayItem.day}</span>
                </h3>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {dayItem.events.length} Key Segments
                </span>
              </div>

              <div className="space-y-4">
                {dayItem.events.map((ev, eIdx) => (
                  <div key={eIdx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-gray-500" />
                          <span>{ev.venue}</span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-brand-accent px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <Clock className="w-3 h-3" />
                        {ev.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
