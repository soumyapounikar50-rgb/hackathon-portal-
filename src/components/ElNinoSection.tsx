import { Waves, Wind, Zap, Sparkles, Globe, Sun, CloudRain, Leaf, ShieldAlert } from 'lucide-react';

export default function ElNinoSection() {
  const effects = [
    {
      title: "Oceanic Thermal Surge",
      subtitle: "Equatorial Pacific Warming",
      icon: Waves,
      gradient: "from-emerald-400 to-teal-500",
      accent: "text-emerald-400",
      bgBorder: "border-emerald-500/35",
      badge: "Ocean Dynamics",
      description: "Trade winds weaken, allowing a colossal surge of warm water to migrate eastward across the central and eastern Pacific. This suppresses the cold, nutrient-rich Humboldt current and raises sea surface temperatures by up to 3°C to 5°C.",
      impact: "Triggers marine ecosystem shifts and injects tremendous thermal energy into the upper troposphere."
    },
    {
      title: "Atmospheric Jet Stream Shift",
      subtitle: "Global Teleconnections",
      icon: Wind,
      gradient: "from-teal-400 to-cyan-500",
      accent: "text-cyan-400",
      bgBorder: "border-cyan-500/35",
      badge: "Atmospheric Winds",
      description: "The massive atmospheric convection center shifts thousands of miles east, bending high-altitude subtropical jet streams. This rewires how atmospheric moisture travels across continents and oceans worldwide.",
      impact: "Alters cyclone genesis alleys, jet stream trajectories, and transcontinental storm patterns."
    },
    {
      title: "Biosphere & Eco-Conservation",
      subtitle: "Climate Resilience & Earth Protection",
      icon: Leaf,
      gradient: "from-emerald-500 to-green-600",
      accent: "text-emerald-300",
      bgBorder: "border-green-500/35",
      badge: "Eco Conservation",
      description: "As climate anomalies stress fragile coral reefs, rainforests, and agricultural watersheds, our focus turns to ecological restoration. We champion tech-driven conservation, renewable mitigation, and biodiversity protection.",
      impact: "Inspires students to build green-tech and climate-resilience solutions for our shared living planet."
    },
    {
      title: "The 'Synapse' Metaphor",
      subtitle: "Disruption as a Catalyst for Innovation",
      icon: Zap,
      gradient: "from-cyan-400 via-teal-300 to-emerald-400",
      accent: "text-cyan-300",
      bgBorder: "border-emerald-400/40",
      badge: "Fest Philosophy",
      description: "Just as El Niño is Nature's most powerful reminder of interconnected global systems and sudden energy releases, El Nino Synapse is the neural spark where bright minds connect to build solutions for real-world complexity.",
      impact: "Channeling raw creative disruption into working code, startup pitches, and cinematic viral reels."
    }
  ];

  return (
    <section id="about-el-nino" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#02130c] via-[#031d13] to-[#02130c] border-y border-emerald-500/20">
      {/* Background emerald-teal atmospheric glow effects */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-600/18 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-teal-600/18 via-green-600/12 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Wave SVG Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#10b981" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 mb-4 shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>The Science & Spirit Behind Our Name</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What is <span className="text-elnino-gradient">El Niño</span>?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
            <strong>El Niño</strong> (&ldquo;The Little Boy&rdquo;) is one of Earth&rsquo;s most formidable climate phenomena — a periodic warming of ocean surface waters in the equatorial Pacific that unleashes profound atmospheric ripples across the entire globe.
          </p>
        </div>

        {/* Narrative Banner: Connecting El Nino with Synapse */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/35 bg-gradient-to-r from-emerald-950/50 via-teal-950/30 to-black/50 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                <Globe className="w-4 h-4" />
                <span>Planetary Mechanics Meets Neural Power</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                When Earth Energy Ignites Neural Synapses
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                In meteorology, <em>El Niño</em> disrupts regular thermodynamic equilibriums to forge new planetary pathways. 
                In neuroscience, a <em>Synapse</em> is the junction across which electric impulses leap to form thought, cognition, and breakthrough. 
                <strong> El Nino Synapse</strong> represents this exact collision: a supercharged festival where raw young talent disrupts the routine and sparks new paradigms in technology and science!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto shrink-0 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/20 text-center">
                <span className="text-emerald-400 font-extrabold text-2xl block">+3°C–5°C</span>
                <span className="text-gray-400 text-[11px] uppercase tracking-wider mt-1 block">Oceanic Warming</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/20 text-center">
                <span className="text-teal-300 font-extrabold text-2xl block">12,000 km</span>
                <span className="text-gray-400 text-[11px] uppercase tracking-wider mt-1 block">Pacific Basin Span</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/20 text-center">
                <span className="text-cyan-300 font-extrabold text-2xl block">5 Continents</span>
                <span className="text-gray-400 text-[11px] uppercase tracking-wider mt-1 block">Atmospheric Impact</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/20 text-center">
                <span className="text-emerald-400 font-extrabold text-2xl block">3 Arenas</span>
                <span className="text-gray-400 text-[11px] uppercase tracking-wider mt-1 block">Flagship Contests</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Effects Grid with Hologram Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {effects.map((eff, idx) => {
            const Icon = eff.icon;
            return (
              <div
                key={idx}
                className={`p-7 rounded-3xl hologram-card flex flex-col justify-between group relative`}
              >
                <span className="hud-corner-tl" />
                <span className="hud-corner-br" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${eff.gradient} p-0.5 shadow-lg group-hover:scale-105 transition-transform`}>
                      <div className="w-full h-full bg-[#011a10] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full hologram-badge ${eff.accent}`}>
                      {eff.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {eff.title}
                  </h3>
                  <span className="text-xs font-mono text-gray-400 block mb-3">{eff.subtitle}</span>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {eff.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-500/20 text-xs text-gray-400 flex items-start gap-2">
                  <span className={`${eff.accent} font-bold`}>✦ Key Focus:</span>
                  <span>{eff.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout: Bring Your Energy on 2 & 3 December */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-black/50 to-teal-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Experience the Energy at El Nino Synapse</h4>
              <p className="text-xs text-gray-300">Join 400+ innovators across Hackathon, Ideathon, and Reel Making on 2 & 3 December.</p>
            </div>
          </div>
          <a
            href="#register"
            className="shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:opacity-90 transition-all shadow-md shadow-emerald-500/20"
          >
            Register Your Team Now →
          </a>
        </div>
      </div>
    </section>
  );
}
