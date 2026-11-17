import { Atom, Sparkles, MapPin, Calendar, Clock, Trophy, Phone, Zap, Cpu, Leaf, Eye } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/config';

export default function ScienceExhibitionSection() {
  const coordinatorYash = EVENT_CONFIG.coordinators[0];
  const coordinatorArpit = EVENT_CONFIG.coordinators[1];

  const highlights = [
    {
      icon: Zap,
      title: "Renewable Energy & Green Tech",
      desc: "Live solar trackers, wind dynamos, sustainable power storage, and energy conservation models."
    },
    {
      icon: Cpu,
      title: "Robotics & Hardware Prototypes",
      desc: "Microcontroller automation, sensor arrays, obstacle-avoiding rovers, and smart electronics."
    },
    {
      icon: Atom,
      title: "Applied Science & Physics",
      desc: "Electromagnetic demonstrators, optical laser apparatus, mechanics, and physical experiments."
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Tech Solutions",
      desc: "Water purification units, air filters, waste management models, and smart environment monitors."
    }
  ];

  return (
    <section id="science-exhibition" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#02130c] via-[#031d13] to-[#02130c]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-300 bg-teal-500/10 border border-teal-500/20 mb-4 shadow-sm">
            <Atom className="w-4 h-4 text-emerald-400" />
            <span>Campus Live Showcase • 2 & 3 December</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Grand <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-green-400">Science Exhibition</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
            Witness the sparks of innovation and scientific discovery! An on-campus open exhibition featuring working physical models, robotics prototypes, and experimental demonstrations.
          </p>

          {/* Open Showcase Notice Badge */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-mono">
            <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Open for all Students, Faculty & Visitors — No Online Portal Registration Required!</span>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-emerald-500/20 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Exhibition Logistics & Details Banner */}
        <div className="rounded-3xl glass-panel border border-emerald-500/30 p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left 2 Cols: Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Exhibition Guidelines & Schedule</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  How the Exhibition Works on Campus
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3 text-gray-200">
                  <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Dates</span>
                    <strong className="text-white text-sm">2 & 3 December</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3 text-gray-200">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Timings</span>
                    <strong className="text-white text-sm">10:30 AM to 05:00 PM</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3 text-gray-200">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Venue</span>
                    <strong className="text-white text-sm">Campus Exhibition Hall</strong>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3 text-gray-200">
                  <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase">Recognition</span>
                    <strong className="text-white text-sm">Jury Excellence Awards</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-300">
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✔</span>
                  <span><strong>On-Campus Tables & Power:</strong> Display tables, 230V AC power supply, and presentation space will be assigned directly in the Exhibition Hall.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✔</span>
                  <span><strong>Open Demonstration:</strong> Teams present their working projects directly to visiting juries, college delegates, and fellow students.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✔</span>
                  <span><strong>Grand Valedictory:</strong> The most innovative scientific exhibits will be honored on stage during the Valedictory ceremony on 3 December!</span>
                </p>
              </div>
            </div>

            {/* Right Col: Coordinator Contact for Space Allocation */}
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <Atom className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white">Exhibition Helpdesk</h4>
                <p className="text-xs text-gray-300 mt-1">
                  Have an exhibit or project model to showcase? Contact our coordinators for table allotment!
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                {coordinatorYash && (
                  <a
                    href={`tel:${coordinatorYash.rawPhone}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Yash Jadhav: {coordinatorYash.phone}</span>
                  </a>
                )}
                {coordinatorArpit && (
                  <a
                    href={`tel:${coordinatorArpit.rawPhone}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Arpit Dambhare: {coordinatorArpit.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
