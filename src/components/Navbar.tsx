"use client";

import { useState } from 'react';
import Link from 'next/link';
import { EVENT_CONFIG } from '@/lib/config';
import { Waves, Shield, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-emerald-500/20 bg-[#02130c]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-green-400 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#02180f] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400 group-hover:text-mint-neon transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-100 to-emerald-400">
                {EVENT_CONFIG.name}
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                ● 2 & 3 Dec • 4 Competitions
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7 text-sm font-medium text-gray-300">
            <Link href="#about-el-nino" className="hover:text-emerald-400 transition-colors">
              The El Niño Effect
            </Link>
            <Link href="#competitions" className="hover:text-emerald-400 transition-colors">
              Competitions
            </Link>
            <Link href="#schedule" className="hover:text-emerald-400 transition-colors">
              Timeline (2 & 3 Dec)
            </Link>
            <Link href="#coordinators" className="hover:text-emerald-400 transition-colors">
              Coordinators
            </Link>
            <Link href="#faq" className="hover:text-emerald-400 transition-colors">
              FAQ
            </Link>
            <Link href="/admin" className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-emerald-300 transition-colors py-1 px-2.5 rounded-full bg-emerald-950/30 border border-emerald-500/30">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Organizer Admin
            </Link>
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="#register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:opacity-95 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-emerald-950/40 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-emerald-500/20 bg-[#02180f] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="#about-el-nino"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-emerald-300 hover:bg-emerald-950/30"
          >
            The El Niño Effect
          </Link>
          <Link
            href="#competitions"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-emerald-300 hover:bg-emerald-950/30"
          >
            Competitions
          </Link>
          <Link
            href="#schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-emerald-300 hover:bg-emerald-950/30"
          >
            Schedule
          </Link>
          <Link
            href="#coordinators"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-emerald-300 hover:text-white hover:bg-emerald-950/30 font-semibold"
          >
            📞 Contact Coordinators
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-emerald-300 hover:bg-emerald-950/30"
          >
            FAQ
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-emerald-300 hover:text-white hover:bg-emerald-950/30"
          >
            🛡️ Organizer Admin Portal
          </Link>
          <div className="pt-2">
            <Link
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-center text-sm font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 shadow-md"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
