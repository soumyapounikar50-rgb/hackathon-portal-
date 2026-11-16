import Navbar from '@/components/Navbar';
import CompetitionsSection from '@/components/CompetitionsSection';
import ScheduleSection from '@/components/ScheduleSection';
import FAQSection from '@/components/FAQSection';
import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  ArrowRight, Sparkles, Flame, Calendar, MapPin, 
  Trophy, CheckCircle2, QrCode, Shield 
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
            <span className="text-white font-medium">{EVENT_CONFIG.name}</span>
            <span className="text-gray-500">•</span>
            <span className="text-emerald-400 font-mono font-bold">{EVENT_CONFIG.dates}</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-indigo-300 to-indigo-500">
              {EVENT_CONFIG.name}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The grand inter-college tech & creativity fest featuring 4 power-packed competitions. 
            Test your problem solving, innovative pitching, cinematography, and scientific models!
          </p>

          {/* Event Dates & Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-6 text-xs text-gray-200 font-mono">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Event Date: <strong>2 & 3 December</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{EVENT_CONFIG.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Cash Prizes & Trophies</span>
            </div>
          </div>

          {/* 4 Competitions Quick Glance */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10">
            {EVENT_CONFIG.competitions.map((c) => (
              <a
                key={c.id}
                href="#register"
                className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-indigo-500/50 hover:scale-[1.02] transition-all text-center block group"
              >
                <span className="text-xs font-mono font-bold text-emerald-400 block">{c.feeLabel}</span>
                <span className="font-bold text-sm text-white group-hover:text-indigo-300 block mt-1">{c.name}</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">{c.badge}</span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-purple hover:scale-105 active:scale-95 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>Register for Competitions</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="#competitions"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore 4 Competitions</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 COMPETITIONS SECTION */}
      <CompetitionsSection />

      {/* SCHEDULE & ROADMAP SECTION */}
      <ScheduleSection />

      {/* REGISTRATION FORM SECTION */}
      <section id="register" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Online Registration Portal</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Register for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-accent to-indigo-400">{EVENT_CONFIG.name}</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              Select your competition, fill member details (Name, Email, Phone, Branch/Yr, College), and submit your UPI payment receipt.
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
