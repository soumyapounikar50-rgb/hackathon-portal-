import Navbar from '@/components/Navbar';
import ElNinoSection from '@/components/ElNinoSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import ScheduleSection from '@/components/ScheduleSection';
import CoordinatorsSection from '@/components/CoordinatorsSection';
import FAQSection from '@/components/FAQSection';
import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  ArrowRight, Sparkles, Flame, Calendar, MapPin, 
  Trophy, Waves, Leaf, Compass 
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#01120a] relative overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* 🌿 Environmental Conservation Cinematic Wallpaper Layer */}
      <div className="conservation-bg-layer" />
      <div className="conservation-overlay" />

      {/* 🌐 Hologram Coordinate Mesh & Projector Scanner Beam */}
      <div className="elnino-hologram-mesh" />
      <div className="hologram-scanner-beam" />

      <Navbar />

      {/* HERO SECTION */}
      <section id="overview" className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Dynamic Bioluminescent Oceanic & Atmosphere Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[480px] bg-gradient-to-tr from-emerald-600/25 via-teal-500/20 to-cyan-500/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-16 left-5 w-[450px] h-[450px] bg-emerald-500/18 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-20 right-5 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Official Organizing College Banner - Seamless Background Blend */}
          <div className="mb-6 inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-2.5 sm:px-5 sm:py-2.5 rounded-2xl bg-black/60 border border-emerald-500/35 backdrop-blur-md shadow-2xl">
            <a
              href={EVENT_CONFIG.college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/30 flex items-center justify-center hover:scale-105 hover:border-emerald-400/50 transition-all shadow-md"
              title={EVENT_CONFIG.college.name}
            >
              <img
                src={EVENT_CONFIG.college.logo}
                alt={EVENT_CONFIG.college.name}
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              />
            </a>
            <div className="text-center sm:text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block font-bold">
                Organized & Hosted By
              </span>
              <h2 className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                {EVENT_CONFIG.college.name}
              </h2>
              <span className="text-[10px] text-gray-300 block font-mono">
                {EVENT_CONFIG.college.subtext} • Nagpur
              </span>
            </div>
          </div>

          {/* Top Pill with Hologram Badge Style */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold hologram-badge text-emerald-200 mb-8 transition-all shadow-lg">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-white font-medium">{EVENT_CONFIG.name}</span>
            <span className="text-emerald-400">•</span>
            <span className="text-cyan-300 font-mono font-bold">{EVENT_CONFIG.dates}</span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-300 font-mono">Earth & Climate Tech</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Main Headline with Hologram Prismatic Gradient */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Experience the Energy of{" "}
            <span className="text-hologram">
              {EVENT_CONFIG.name}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Harnessing planetary climate energy, environmental conservation, and futuristic technology.
          </p>

          {/* Event Dates & Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-6 text-xs text-gray-200 font-mono">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/35 backdrop-blur-md shadow-sm">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Event Date: <strong>2 & 3 December</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-teal-500/35 backdrop-blur-md shadow-sm">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>{EVENT_CONFIG.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-cyan-500/35 backdrop-blur-md shadow-sm">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <span>Prizes & Trophies in All 3 Competitions</span>
            </div>
          </div>

          {/* 3 Competitions Hologram Quick Glance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mt-10">
            {EVENT_CONFIG.competitions.map((c) => (
              <a
                key={c.id}
                href="#register"
                className="p-4 rounded-2xl hologram-card text-center block group"
              >
                <span className="hud-corner-tl" />
                <span className="hud-corner-br" />
                <span className="text-xs font-mono font-bold text-cyan-300 block">{c.feeLabel}</span>
                <span className="font-bold text-sm text-white group-hover:text-emerald-300 block mt-1">{c.name}</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">{c.badge}</span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 glow-hologram"
            >
              <Sparkles className="w-5 h-5 text-black" />
              <span>Register Your Team</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="#about-el-nino"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-gray-200 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
            >
              <Waves className="w-4 h-4 text-emerald-400" />
              <span>The El Niño Phenomenon</span>
            </Link>
          </div>
        </div>
      </section>

      {/* THE SCIENCE & SPIRIT OF EL NIÑO (Phenomenon & Effects) */}
      <ElNinoSection />

      {/* 3 COMPETITIONS ARENAS (HACKATHON, IDEATHON, REEL MAKING) */}
      <CompetitionsSection />

      {/* SCHEDULE & ROADMAP SECTION */}
      <ScheduleSection />

      {/* REGISTRATION FORM SECTION */}
      <section id="register" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Online Registration & UPI Payment</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Register for <span className="text-elnino-gradient">{EVENT_CONFIG.name}</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              Select your competition (Hackathon, Ideathon, or Reel Making), enter student details, and submit your UPI payment receipt.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>

      {/* STUDENT COORDINATORS & HELPDESK WITH DIRECT CALL */}
      <CoordinatorsSection />

      {/* FAQ SECTION */}
      <FAQSection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
