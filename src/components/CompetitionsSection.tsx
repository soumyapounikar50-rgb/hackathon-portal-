import { EVENT_CONFIG } from '@/lib/config';
import { Terminal, Lightbulb, Video, ArrowUpRight, Sparkles, Clock, AlertCircle, Zap, Film, Camera, CheckCircle2 } from 'lucide-react';

const ICONS: Record<string, any> = {
  Terminal,
  Lightbulb,
  Video
};

export default function CompetitionsSection() {
  const dailyCompetitions = EVENT_CONFIG.competitions.filter(c => !c.isOutOfTheBox);
  const outOfTheBoxComp = EVENT_CONFIG.competitions.find(c => c.isOutOfTheBox);

  return (
    <section id="competitions" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>3 Flagship Competitions • 2 & 3 December</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">Competition</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Compete across our flagship arenas at <strong className="text-white">{EVENT_CONFIG.name}</strong>. Day 1 is dedicated to the Hackathon, Day 2 hosts the Ideathon, and Reel Making runs Out-of-the-Box across both days!
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/35 text-xs font-mono font-bold text-amber-300 shadow-lg">
            <span>⚡ Ideathon Topics: Released 5 Days Before on WhatsApp • Hackathon: At 10 AM Kickoff</span>
          </div>
        </div>

        {/* 1. DAILY FLAGSHIP COMPETITIONS: HACKATHON (DAY 1) & IDEATHON (DAY 2) */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-1 rounded-full bg-emerald-400" />
            <h3 className="text-sm font-mono uppercase tracking-widest text-emerald-300 font-bold">
              Daily Flagship Events (Day 1 & Day 2)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {dailyCompetitions.map((comp) => {
              const IconComponent = ICONS[comp.icon] || Terminal;
              const isDay1 = comp.id === 'hackathon';

              return (
                <div
                  key={comp.id}
                  id={comp.id}
                  className="group relative p-7 sm:p-8 rounded-3xl hologram-card flex flex-col justify-between overflow-hidden"
                >
                  <span className="hud-corner-tl" />
                  <span className="hud-corner-br" />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${comp.accentColor} p-0.5 shadow-lg group-hover:scale-105 transition-transform`}>
                        <div className="w-full h-full bg-[#011a10] rounded-[14px] flex items-center justify-center">
                          <IconComponent className="w-7 h-7 text-cyan-300" />
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-2xl font-mono font-extrabold block text-cyan-300">
                          {comp.feeLabel}
                        </span>
                        <span className={`text-[11px] uppercase font-mono font-bold tracking-wider px-3 py-1 rounded-full inline-block mt-1 ${
                          isDay1 
                            ? 'bg-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                            : 'bg-purple-500/20 text-pink-300 border border-pink-500/40 shadow-sm'
                        }`}>
                          {comp.badge}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                        isDay1 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                      }`}>
                        {isDay1 ? 'Day 1 Flagship • 2 Dec' : 'Day 2 Flagship • 3 Dec'}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {comp.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mt-1 mb-4">{comp.tagline}</p>

                    <p className="text-sm text-gray-300 leading-relaxed mb-5">
                      {comp.description}
                    </p>

                    {/* Reporting & Schedule Details Box */}
                    {comp.timingDetails && (
                      <div className="mb-4 p-4 rounded-2xl bg-black/60 border border-cyan-500/30 text-xs space-y-2 font-mono shadow-inner">
                        <div className="flex items-center justify-between text-cyan-300">
                          <span className="font-bold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Reporting Time:</span>
                          </span>
                          <span className="text-white font-semibold">{comp.timingDetails.reporting}</span>
                        </div>
                        <div className="flex items-center justify-between text-emerald-300">
                          <span className="font-bold">Starts At:</span>
                          <span className="text-white font-semibold">{comp.timingDetails.startsAt}</span>
                        </div>
                        <p className="text-[11px] text-gray-300 font-sans leading-tight pt-1 border-t border-white/5">
                          {comp.timingDetails.briefing}
                        </p>
                        <div className="text-[11px] text-amber-300 font-sans font-medium pt-0.5">
                          Departure: {comp.timingDetails.departure}
                        </div>
                      </div>
                    )}

                    {/* Important to be Noted Section */}
                    {comp.importantNotes && (
                      <div className="mb-5 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/35 space-y-2.5">
                        <span className="text-[11px] font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Important to be noted:</span>
                        </span>
                        <ol className="space-y-1.5 text-xs text-gray-200 list-decimal list-inside font-medium">
                          {comp.importantNotes.map((note, nIdx) => (
                            <li key={nIdx} className="leading-snug">
                              <span>{note}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Key Guidelines */}
                    <div className="space-y-2 border-t border-emerald-500/20 pt-4 mb-6">
                      <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider block">
                        Key Guidelines:
                      </span>
                      <ul className="space-y-1.5 text-xs text-gray-300">
                        {comp.rules.slice(0, 4).map((r, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">✦</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between">
                    <span className="text-xs text-gray-300 font-mono">
                      Team: {comp.minMembers === comp.maxMembers ? `${comp.minMembers} Members` : `${comp.minMembers}-${comp.maxMembers} Members`}
                    </span>

                    <a
                      href="#register"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 transition-all shadow-md font-mono"
                    >
                      <span>Register for {comp.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. OUT OF THE BOX SPECIAL SHOWCASE: REEL MAKING COMPETITION */}
        {outOfTheBoxComp && (
          <div className="mt-14 relative" id="reel-making">
            {/* Ambient radiant glow behind the out of the box card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-rose-500/30 to-purple-600/30 rounded-[34px] blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative p-7 sm:p-10 rounded-3xl bg-gradient-to-b from-[#071d15] via-[#051610] to-[#020e09] border-2 border-emerald-400/60 shadow-2xl overflow-hidden hologram-card">
              <span className="hud-corner-tl" />
              <span className="hud-corner-br" />

              {/* OUT OF THE BOX TOP RIBBON / BANNER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-500/30 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 via-fuchsia-500 to-amber-400 p-0.5 shadow-lg shadow-rose-950/50 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-[#02180f] rounded-[14px] flex items-center justify-center">
                      <Camera className="w-6 h-6 text-amber-300" />
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider text-amber-300 bg-amber-500/20 border border-amber-500/40 uppercase mb-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400 fill-current animate-pulse" />
                      <span>⚡ OUT-OF-THE-BOX SPECIAL FEATURE • CONDUCTED ON BOTH DAYS (2 & 3 DECEMBER)</span>
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                      {outOfTheBoxComp.name}
                    </h3>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-3xl font-mono font-extrabold text-amber-300 block">
                    {outOfTheBoxComp.feeLabel}
                  </span>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 inline-block mt-1">
                    Team: {outOfTheBoxComp.minMembers === outOfTheBoxComp.maxMembers ? `${outOfTheBoxComp.minMembers} Members` : `${outOfTheBoxComp.minMembers}-${outOfTheBoxComp.maxMembers} Members`}
                  </span>
                </div>
              </div>

              {/* Description & Out of the box highlight note */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                    Unlike the single-day competitions, <strong>Reel Making is an Out-of-the-Box competition conducted across BOTH Day 1 (2 Dec) and Day 2 (3 Dec)</strong>. 
                    Creators capture the electric energy, intense hacking rounds, revolutionary idea pitches, and climate conservation themes throughout official event hours.
                  </p>

                  {/* Dual Days Track Breakdown Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Day 1 Track */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-2">
                      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                        <span className="text-xs font-mono font-bold uppercase text-cyan-300 flex items-center gap-1.5">
                          <Film className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Day 1 Track (2 Dec)</span>
                        </span>
                        <span className="text-[10px] font-mono text-gray-300">Hackathon Day</span>
                      </div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• <strong>Reporting:</strong> 9:00 AM - 9:30 AM</li>
                        <li>• <strong>Shoot Starts:</strong> 10:00 AM Sharp</li>
                        <li>• <strong>Focus:</strong> Hackathon behind-the-scenes, student builds & El Niño themes</li>
                        <li>• <strong>Coverage:</strong> Real-time capture in event hours</li>
                      </ul>
                    </div>

                    {/* Day 2 Track */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-fuchsia-500/30 space-y-2">
                      <div className="flex items-center justify-between border-b border-fuchsia-500/20 pb-2">
                        <span className="text-xs font-mono font-bold uppercase text-pink-300 flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-pink-400" />
                          <span>Day 2 Track (3 Dec)</span>
                        </span>
                        <span className="text-[10px] font-mono text-gray-300">Ideathon & Finale</span>
                      </div>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• <strong>Reporting:</strong> 9:00 AM - 9:30 AM</li>
                        <li>• <strong>Shoot & Edit:</strong> 10:00 AM on your own laptops</li>
                        <li>• <strong>Grand Screening:</strong> 2:00 PM in Main Auditorium</li>
                        <li>• <strong>Prizes & Awards:</strong> During Valedictory Ceremony</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Timing details summary box */}
                <div className="p-5 rounded-2xl bg-black/50 border border-amber-500/30 flex flex-col justify-between font-mono text-xs space-y-3">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                      Reel Schedule & Dispatch:
                    </span>
                    <div className="flex items-center justify-between text-gray-200 pt-1">
                      <span className="text-gray-400">Reporting Time:</span>
                      <span className="font-bold text-white">{outOfTheBoxComp.timingDetails?.reporting}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-200">
                      <span className="text-gray-400">Competition Starts:</span>
                      <span className="font-bold text-emerald-300">{outOfTheBoxComp.timingDetails?.startsAt}</span>
                    </div>
                    <div className="text-[11px] text-gray-300 font-sans pt-2 border-t border-white/10 leading-snug">
                      {outOfTheBoxComp.timingDetails?.briefing}
                    </div>
                    <div className="text-[10px] text-amber-300/90 font-sans pt-1">
                      {outOfTheBoxComp.timingDetails?.departure}
                    </div>
                  </div>

                  <a
                    href="#register"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400 hover:opacity-95 shadow-lg shadow-amber-500/20 text-center flex items-center justify-center gap-1.5 transition-transform active:scale-95 font-mono"
                  >
                    <span>Register for Reel Making (₹150)</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 6 IMPORTANT THINGS TO BE NOTED (EXACT USER SPECIFICATION) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-black/60 border border-emerald-500/40">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-amber-300">
                    Important to be noted regarding Reel Making:
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {outOfTheBoxComp.importantNotes?.map((note, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-xs text-gray-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-medium leading-snug">{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Regulations Footer */}
              <div className="mt-6 pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-400 gap-3">
                <div className="flex items-center gap-2 text-cyan-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>All instructions and regulations are given upon reporting. Vertical format (9:16) up to 60 seconds.</span>
                </div>
                <span className="font-mono text-emerald-300">
                  Venue: Across Campus Grounds & Main Auditorium
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
