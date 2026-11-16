import Navbar from '@/components/Navbar';
import Countdown from '@/components/Countdown';
import TracksSection from '@/components/TracksSection';
import PrizesSection from '@/components/PrizesSection';
import ScheduleSection from '@/components/ScheduleSection';
import FAQSection from '@/components/FAQSection';
import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';
import { HACKATHON_CONFIG } from '@/lib/config';
import { 
  ArrowRight, Sparkles, Terminal, Flame, Shield, 
  MapPin, Calendar, Users, Trophy 
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section id="overview" className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Dynamic Glow Orbs in Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-brand-600/20 via-indigo-500/15 to-brand-accent/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/10 text-gray-300 backdrop-blur-md mb-8 hover:border-indigo-500/40 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white font-medium">{HACKATHON_CONFIG.name}</span>
            <span className="text-gray-500">•</span>
            <span className="text-brand-accent">Official 2026 Edition</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Build the Future with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-indigo-300 to-indigo-500">
              Code, AI & Innovation
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {HACKATHON_CONFIG.description}
          </p>

          {/* Key Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-gray-300 font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Dec 05 – Dec 07, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{HACKATHON_CONFIG.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{HACKATHON_CONFIG.prizePool} Prizes</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-purple hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>Register Your Spot</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="#tracks"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Challenges</span>
            </Link>
          </div>

          {/* Live Countdown Clock */}
          <div className="mt-14 pt-8 border-t border-white/5 max-w-xl mx-auto">
            <Countdown />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {HACKATHON_CONFIG.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-panel text-center">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white block">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKS SECTION */}
      <TracksSection />

      {/* PRIZES SECTION */}
      <PrizesSection />

      {/* SCHEDULE & ROADMAP SECTION */}
      <ScheduleSection />

      {/* REGISTRATION FORM SECTION */}
      <section id="register" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Registration • Global & Hybrid</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-accent to-indigo-400">{HACKATHON_CONFIG.name}</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-400">
              Submit your team or register solo. Instant confirmation and printable digital pass upon submission.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>

      {/* FAQ SECTION */}
      <FAQSection />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
