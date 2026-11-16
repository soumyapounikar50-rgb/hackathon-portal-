"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CompetitionRegistration } from '@/types';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  Sparkles, Download, Share2, ArrowLeft, 
  Users, CheckCircle2, QrCode, Calendar, MapPin, IndianRupee 
} from 'lucide-react';
import Link from 'next/link';

export default function TicketPage() {
  const params = useParams();
  const [registration, setRegistration] = useState<CompetitionRegistration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!params?.id) return;

    fetch(`/api/register?id=${params.id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Pass not found or invalid registration ID.");
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
          <p className="text-sm font-mono text-gray-400">Loading Event Pass...</p>
        </div>
      </div>
    );
  }

  if (error || !registration) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090d16] px-4">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl text-center border border-white/10">
          <h2 className="text-xl font-bold text-white mb-2">Pass Not Found</h2>
          <p className="text-sm text-gray-400 mb-6">{error || "We could not find an entry matching this ID."}</p>
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
    <div className="min-h-screen bg-[#090d16] py-12 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background glow lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top action controls */}
      <div className="w-full max-w-lg flex items-center justify-between mb-8 print:hidden">
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
            <span>Download / Print Pass</span>
          </button>
        </div>
      </div>

      {/* TICKET CARD */}
      <div className="w-full max-w-lg rounded-3xl overflow-hidden glass-panel border border-indigo-500/30 shadow-2xl shadow-indigo-950/40 relative">
        {/* Top Header Badge */}
        <div className="bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-purple p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-black/30 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold tracking-tight text-lg leading-none">
                  {EVENT_CONFIG.name}
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-indigo-200 uppercase mt-0.5 block">
                  Official Participant Pass • 2 & 3 Dec
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold font-mono bg-emerald-500/90 text-white px-2.5 py-1 rounded-full shadow">
                ₹{registration.fee}/- PAID
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#0a0f1d]/90">
          {/* Competition & Team Info */}
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                Competition Event
              </span>
              <h2 className="text-2xl font-extrabold text-amber-300">
                {registration.competitionName}
              </h2>
              <span className="text-sm font-semibold text-white block mt-0.5">
                Team: {registration.teamName}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5">
                Total Team Size
              </span>
              <span className="text-sm font-bold font-mono text-indigo-300">
                {1 + registration.members.length} Members
              </span>
            </div>
          </div>

          {/* Leader Details */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Leader: {registration.leader.name}</span>
              <span className="text-indigo-400 font-mono text-[11px]">{registration.leader.branchAndYear}</span>
            </div>
            <div className="text-gray-300">{registration.leader.college}</div>
            <div className="text-gray-400 text-[11px] font-mono">
              {registration.leader.phone} • {registration.leader.email}
            </div>
          </div>

          {/* Other Members Details */}
          {registration.members.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                Teammates
              </span>
              <div className="grid grid-cols-1 gap-2">
                {registration.members.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white">#{idx + 2} {m.name}</span>
                      <span className="text-gray-400 block text-[11px]">{m.college}</span>
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <span className="text-indigo-300 block">{m.branchAndYear}</span>
                      <span className="text-gray-500">{m.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Venue & Date */}
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>{EVENT_CONFIG.dates}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{EVENT_CONFIG.location}</span>
            </div>
          </div>

          {/* Barcode & Verification */}
          <div className="pt-4 border-t border-dashed border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                Registration ID
              </span>
              <span className="text-lg font-mono font-extrabold text-white tracking-wider">
                {registration.id}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-semibold text-emerald-400 uppercase font-mono">
                  UTR: {registration.payment.transactionId}
                </span>
              </div>
            </div>

            <div className="w-16 h-16 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center">
              <QrCode className="w-full h-full text-black" />
            </div>
          </div>
        </div>

        {/* Card Footer Tear-off simulated line */}
        <div className="bg-[#070b14] px-6 py-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-mono">
          <span>EL NINO SYNAPSE // 2 & 3 DEC</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            ADMIT TEAM
          </span>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center max-w-sm print:hidden">
        Please present this digital pass or Registration ID at the event registration desk on 2 December.
      </p>
    </div>
  );
}
