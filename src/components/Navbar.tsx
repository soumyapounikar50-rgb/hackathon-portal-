"use client";

import { useState } from 'react';
import Link from 'next/link';
import { HACKATHON_CONFIG } from '@/lib/config';
import { Terminal, Shield, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 bg-[#090d16]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-brand-accent p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b0f1a] rounded-[10px] flex items-center justify-center">
                <Terminal className="w-5 h-5 text-indigo-400 group-hover:text-brand-accent transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                {HACKATHON_CONFIG.name}
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                ● Registrations Live
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            <Link href="#overview" className="hover:text-indigo-400 transition-colors">
              Overview
            </Link>
            <Link href="#tracks" className="hover:text-indigo-400 transition-colors">
              Tracks
            </Link>
            <Link href="#prizes" className="hover:text-indigo-400 transition-colors">
              Prizes
            </Link>
            <Link href="#schedule" className="hover:text-indigo-400 transition-colors">
              Timeline
            </Link>
            <Link href="#faq" className="hover:text-indigo-400 transition-colors">
              FAQ
            </Link>
            <Link href="/admin" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-300 transition-colors py-1 px-2.5 rounded-full bg-white/5 border border-white/10">
              <Shield className="w-3.5 h-3.5" />
              Organizer Admin
            </Link>
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="#register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-purple hover:opacity-95 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0c1220] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            Overview
          </Link>
          <Link
            href="#tracks"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            Tracks
          </Link>
          <Link
            href="#prizes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            Prizes
          </Link>
          <Link
            href="#schedule"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            Timeline
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
          >
            FAQ
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-white/5"
          >
            🛡️ Organizer Admin Portal
          </Link>
          <div className="pt-2">
            <Link
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-center text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 shadow-md"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
