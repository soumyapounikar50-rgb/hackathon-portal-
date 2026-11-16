"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Registration } from '@/types';
import { HACKATHON_CONFIG } from '@/lib/config';
import { 
  Terminal, ShieldCheck, Download, Share2, ArrowLeft, 
  Users, CheckCircle2, QrCode, Calendar, MapPin, Sparkles 
} from 'lucide-react';
import Link from 'next/link';

export default function TicketPage() {
  const params = useParams();
  const router = useRouter();
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!params?.id) return;

    fetch(`/api/register?id=${params.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Ticket not found or invalid registration ID.");
        const data = await res.json();
        setRegistration(data.registration);
      })
      .catch((err) => {
        setError(err.message || "Failed to load ticket.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params?.id]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090d16] text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-mono text-gray-400">Loading Hacker Pass...</p>
        </div>
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090d16] px-4">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl text-center border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Ticket Not Found</h2>
          <p className="text-sm text-gray-400 mb-6">{error || "We could not find a registration matching this ID."}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portal</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] py-16 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background glow lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top action controls */}
      <div className="w-full max-w-md flex items-center justify-between mb-8 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share"}</span>
          </button>
          <button
            onClick={handlePrint}
            className="p-2 px-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-600/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download / Print</span>
          </button>
        </div>
      </div>

      {/* TICKET CARD */}
      <div className="w-full max-w-md rounded-3xl overflow-hidden glass-panel border border-indigo-500/30 shadow-2xl shadow-indigo-950/40 relative">
        {/* Top Header Badge */}
        <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-purple p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black/30 backdrop-blur-md flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold tracking-tight text-base leading-none">
                  {HACKATHON_CONFIG.name}
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-indigo-200 uppercase">
                  Official Hacker Pass
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 block">
                Badge
              </span>
              <span className="text-xs font-bold font-mono bg-white/20 px-2 py-0.5 rounded-full">
                {registration.experienceLevel.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#0a0f1d]/90">
          {/* Participant Info */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-1">
              Participant Name
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {registration.leaderName}
            </h2>
            <p className="text-sm text-indigo-300 mt-0.5">
              {registration.collegeOrCompany}
            </p>
          </div>

          {/* Team / Solo Badge */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                Format
              </span>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-white capitalize">
                {registration.registrationType === 'team' ? (
                  <>
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Team: {registration.teamName}</span>
                  </>
                ) : (
                  <span>Solo Hacker</span>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                Track
              </span>
              <span className="text-xs font-semibold text-brand-accent uppercase block">
                {registration.primaryTrack.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Dec 05 – Dec 07, 2026 (36 Hours)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{HACKATHON_CONFIG.location}</span>
            </div>
          </div>

          {/* Ticket Barcode / ID Section */}
          <div className="pt-6 border-t border-dashed border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                Registration ID
              </span>
              <span className="text-base font-mono font-extrabold text-white tracking-wider">
                {registration.id}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-semibold text-emerald-400 uppercase">Confirmed Hacker</span>
              </div>
            </div>

            {/* Simulated QR Code / Security Hologram */}
            <div className="w-16 h-16 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center">
              <QrCode className="w-full h-full text-black" />
            </div>
          </div>
        </div>

        {/* Card Footer Tear-off simulated line */}
        <div className="bg-[#070b14] px-6 py-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-mono">
          <span>HACKSPARK // 2026</span>
          <span className="text-indigo-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            ADMIT ONE
          </span>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center max-w-sm print:hidden">
        Please present this pass or Registration ID upon checking in at the opening ceremony or on the Discord server.
      </p>
    </div>
  );
}
