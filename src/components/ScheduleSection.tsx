import { HACKATHON_CONFIG } from '@/lib/config';
import { Calendar, Clock } from 'lucide-react';

export default function ScheduleSection() {
  return (
    <section id="schedule" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-accent bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Event Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Schedule & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-indigo-300 to-indigo-500">Milestones</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Follow the 36-hour timeline from registration through final live demos.
          </p>
        </div>

        <div className="relative border-l-2 border-indigo-500/20 ml-4 sm:ml-32 space-y-10">
          {HACKATHON_CONFIG.schedule.map((item, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10 group">
              {/* Timeline marker */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#090d16] border-2 border-indigo-400 group-hover:border-brand-accent group-hover:scale-125 transition-all" />

              {/* Time display */}
              <div className="sm:absolute sm:-left-36 sm:top-1 sm:w-28 sm:text-right mb-1 sm:mb-0">
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-brand-accent px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
              </div>

              {/* Content card */}
              <div className="p-6 rounded-2xl glass-panel group-hover:border-indigo-500/40 transition-colors">
                <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
