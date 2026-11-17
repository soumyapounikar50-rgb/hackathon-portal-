"use client";

import { useState } from 'react';
import { EVENT_CONFIG } from '@/lib/config';
import { CompetitionId, StudentMember, CompetitionRegistration } from '@/types';
import confetti from 'canvas-confetti';
import { 
  Terminal, Lightbulb, Video, Atom, Users, User, 
  CheckCircle2, AlertCircle, Plus, Trash2, ArrowRight, 
  QrCode, Ticket, Upload, ShieldCheck, IndianRupee, Clock, Presentation, Film
} from 'lucide-react';
import Link from 'next/link';

const COMPETITION_ICONS: Record<string, any> = {
  Terminal,
  Lightbulb,
  Video,
  Atom
};

export default function RegistrationForm({ initialCompetition = 'hackathon' }: { initialCompetition?: CompetitionId }) {
  const competitions = EVENT_CONFIG.competitions;
  const safeInitial = competitions.some(c => c.id === initialCompetition) ? initialCompetition : 'hackathon';
  const [selectedCompId, setSelectedCompId] = useState<CompetitionId>(safeInitial);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRegistration, setSuccessRegistration] = useState<CompetitionRegistration | null>(null);

  // Active competition info
  const compInfo = competitions.find(c => c.id === selectedCompId) || competitions[0];

  // Team Details
  const [teamName, setTeamName] = useState('');

  // Leader / Student 1
  const [leader, setLeader] = useState<StudentMember>({
    name: '',
    email: '',
    phone: '',
    branchAndYear: '',
    college: ''
  });

  // Additional Members (Members 2, 3, etc.)
  // For Ideathon: needs exactly 2 additional (total 3)
  // For Reel: needs exactly 1 additional (total 2)
  // For Hackathon: 1 to 3 additional (total 2 to 4)
  const getInitialMembers = (id: CompetitionId): StudentMember[] => {
    if (id === 'ideathon') {
      return [
        { name: '', email: '', phone: '', branchAndYear: '', college: '' },
        { name: '', email: '', phone: '', branchAndYear: '', college: '' }
      ];
    }
    if (id === 'reel-making') {
      return [
        { name: '', email: '', phone: '', branchAndYear: '', college: '' }
      ];
    }
    return [
      { name: '', email: '', phone: '', branchAndYear: '', college: '' }
    ]; // Hackathon default (2 members initially)
  };

  const [members, setMembers] = useState<StudentMember[]>(getInitialMembers(selectedCompId));

  // Payment Details
  const [transactionId, setTransactionId] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Switch competition handler
  const handleSelectCompetition = (id: CompetitionId) => {
    setSelectedCompId(id);
    setMembers(getInitialMembers(id));
    setErrorMsg(null);
  };

  const updateLeader = (field: keyof StudentMember, value: string) => {
    setLeader(prev => ({ ...prev, [field]: value }));
  };

  const updateMember = (index: number, field: keyof StudentMember, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const addMember = () => {
    const totalMembers = 1 + members.length;
    if (totalMembers >= compInfo.maxMembers) return;
    setMembers([...members, { name: '', email: '', phone: '', branchAndYear: '', college: leader.college || '' }]);
  };

  const removeMember = (index: number) => {
    const totalMembers = 1 + members.length;
    if (totalMembers <= compInfo.minMembers) return;
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("Screenshot size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation Leader
    if (!teamName.trim()) {
      setErrorMsg("Please enter your Team Name / Project Title.");
      return;
    }
    if (!leader.name.trim() || !leader.email.trim() || !leader.phone.trim() || !leader.branchAndYear.trim() || !leader.college.trim()) {
      setErrorMsg("Please fill out all required fields for Member #1 (Team Leader).");
      return;
    }

    // Validation Members
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      if (!m.name.trim() || !m.email.trim() || !m.phone.trim() || !m.branchAndYear.trim() || !m.college.trim()) {
        setErrorMsg(`Please fill out all required details (Name, Email, Phone, Branch/Yr, College) for Member #${i + 2}.`);
        return;
      }
    }

    const totalCount = 1 + members.length;
    if (totalCount < compInfo.minMembers || totalCount > compInfo.maxMembers) {
      setErrorMsg(`For ${compInfo.name}, total team size must be ${compInfo.minMembers === compInfo.maxMembers ? compInfo.minMembers : `${compInfo.minMembers} to ${compInfo.maxMembers}`} members.`);
      return;
    }

    if (!transactionId.trim()) {
      setErrorMsg("Please enter your UPI UTR / Transaction Reference ID.");
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg("Please accept the event terms and competition rules.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        competitionId: selectedCompId,
        competitionName: compInfo.name,
        teamName: teamName.trim(),
        fee: compInfo.fee,
        leader,
        members,
        payment: {
          method: 'upi',
          transactionId: transactionId.trim(),
          screenshotUrl: screenshotPreview || undefined,
          amount: compInfo.fee
        }
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setSuccessRegistration(data.registration);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (successRegistration) {
    return (
      <div className="max-w-3xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Registration Submitted!
        </span>

        <h3 className="text-3xl font-extrabold text-white mt-4">
          Welcome to {EVENT_CONFIG.name}!
        </h3>

        <p className="mt-2 text-sm text-gray-300 max-w-lg mx-auto">
          Your entry for <span className="text-indigo-400 font-bold">{successRegistration.competitionName}</span> has been received.
        </p>

        {/* Digital Pass Preview Card */}
        <div className="my-8 p-6 rounded-2xl bg-[#080d1a] border border-white/10 max-w-md mx-auto text-left relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Event</span>
              <span className="font-bold text-white text-base">{EVENT_CONFIG.name}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Pass ID</span>
              <span className="font-mono font-bold text-indigo-400">{successRegistration.id}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Competition:</span>
              <span className="font-bold text-amber-300">{successRegistration.competitionName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Team Name:</span>
              <span className="font-semibold text-white">{successRegistration.teamName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Team Leader:</span>
              <span className="font-semibold text-white">{successRegistration.leader.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Members:</span>
              <span className="font-mono text-indigo-300">{1 + successRegistration.members.length} Members</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fee Paid:</span>
              <span className="font-mono font-bold text-emerald-400">₹{successRegistration.fee}/-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">UTR / Ref:</span>
              <span className="font-mono text-gray-300 text-[11px]">{successRegistration.payment.transactionId}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/ticket/${successRegistration.id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:opacity-95 shadow-lg shadow-indigo-600/30"
          >
            <Ticket className="w-4 h-4" />
            <span>View & Download Event Pass</span>
          </Link>

          <button
            onClick={() => {
              setSuccessRegistration(null);
              setTeamName('');
              setLeader({ name: '', email: '', phone: '', branchAndYear: '', college: '' });
              setMembers(getInitialMembers(selectedCompId));
              setTransactionId('');
              setScreenshotPreview(null);
            }}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Register for Another Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto hologram-card p-6 sm:p-10 rounded-3xl relative">
      <span className="hud-corner-tl" />
      <span className="hud-corner-br" />

      {/* COMPETITIONS SELECTOR TABS (3 REGISTERABLE COMPETITIONS) */}
      <div className="mb-8">
        <label className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3 text-center">
          Step 1: Select Competition to Register
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {competitions.map((comp) => {
            const isSelected = comp.id === selectedCompId;
            const IconComp = COMPETITION_ICONS[comp.icon] || Terminal;
            return (
              <button
                key={comp.id}
                type="button"
                onClick={() => handleSelectCompetition(comp.id)}
                className={`p-4 rounded-2xl text-left border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-500'
                    : 'border-white/10 bg-black/30 hover:border-white/20'
                }`}
              >
                <div>
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${comp.accentColor} p-0.5 mb-2.5 flex items-center justify-center`}>
                    <div className="w-full h-full bg-[#0b0f1a] rounded-[10px] flex items-center justify-center">
                      <IconComp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-white leading-snug">{comp.name}</h4>
                  <span className="text-[10px] font-mono text-gray-400 block mt-0.5">{comp.badge}</span>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">{comp.feeLabel}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* COMPETITION RULES & HIGHLIGHT BANNER */}
      <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-black/40 border border-indigo-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">Selected Event Rules</span>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{compInfo.name}</span>
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Fee: ₹{compInfo.fee}/-
              </span>
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-300">
            Team Size: {compInfo.minMembers === compInfo.maxMembers ? `${compInfo.minMembers} Members` : `${compInfo.minMembers} to ${compInfo.maxMembers} Members`}
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
          {compInfo.rules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold shrink-0">✦</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* TEAM NAME */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Team Name / Project Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="e.g. Synapse Pioneers, Team Alpha, Quantum Coders"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* MEMBER 1 / TEAM LEADER */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Student #1 (Team Leader)</span>
            </h4>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Primary Contact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                Name of Student <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={leader.name}
                onChange={(e) => updateLeader('name', e.target.value)}
                placeholder="Full Name"
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                required
                value={leader.email}
                onChange={(e) => updateLeader('email', e.target.value)}
                placeholder="student@example.com"
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                Phone Number (WhatsApp) <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={leader.phone}
                onChange={(e) => updateLeader('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                Branch / Yr <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={leader.branchAndYear}
                onChange={(e) => updateLeader('branchAndYear', e.target.value)}
                placeholder="e.g. CSE / 3rd Year"
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                College Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={leader.college}
                onChange={(e) => updateLeader('college', e.target.value)}
                placeholder="Your College / Institution Name"
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        {/* ADDITIONAL TEAM MEMBERS */}
        {members.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>Teammates Details ({members.length + 1} / {compInfo.maxMembers} Total)</span>
                </h4>
                <p className="text-[11px] text-gray-400">Same details required for all members</p>
              </div>

              {/* Add member button if not at limit and allowed */}
              {1 + members.length < compInfo.maxMembers && compInfo.minMembers !== compInfo.maxMembers && (
                <button
                  type="button"
                  onClick={addMember}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl hover:bg-cyan-500/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              )}
            </div>

            {members.map((member, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-semibold text-indigo-300">
                    Student #{idx + 2} (Member)
                  </span>

                  {/* Allow remove only if within min members constraint */}
                  {1 + members.length > compInfo.minMembers && (
                    <button
                      type="button"
                      onClick={() => removeMember(idx)}
                      className="text-gray-400 hover:text-rose-400 transition-colors p-1"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                      Name of Student <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={member.name}
                      onChange={(e) => updateMember(idx, 'name', e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={member.email}
                      onChange={(e) => updateMember(idx, 'email', e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                      Phone Number (WhatsApp) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={member.phone}
                      onChange={(e) => updateMember(idx, 'phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                      Branch / Yr <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={member.branchAndYear}
                      onChange={(e) => updateMember(idx, 'branchAndYear', e.target.value)}
                      placeholder="e.g. ECE / 2nd Year"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                      College Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={member.college}
                      onChange={(e) => updateMember(idx, 'college', e.target.value)}
                      placeholder="College Name"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAYMENT OPTIONS & PAYMENT SCREENSHOT */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/20 via-black/40 to-indigo-950/20 border border-emerald-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">Step 2: Registration Fee</span>
              <h4 className="text-lg font-bold text-white flex items-center gap-1.5">
                <span>Payment Details for {compInfo.name}</span>
              </h4>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block">Payable Amount</span>
              <span className="text-2xl font-mono font-extrabold text-emerald-400">₹{compInfo.fee}/-</span>
            </div>
          </div>

          {/* QR Code and UPI ID box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-4 rounded-xl bg-black/50 border border-emerald-500/20 flex items-center gap-4">
              <div className="w-28 h-28 rounded-xl bg-white p-2 shrink-0 flex items-center justify-center shadow-lg overflow-hidden relative group">
                <img
                  src="/qr-code.png"
                  alt="UPI Payment QR Code"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Try .svg or .jpg before showing icon fallback
                    const target = e.target as HTMLImageElement;
                    if (target.src.endsWith('/qr-code.png')) {
                      target.src = '/qr-code.svg';
                    } else if (target.src.endsWith('/qr-code.svg')) {
                      target.src = '/qr-code.jpg';
                    } else {
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-full h-full items-center justify-center hidden">
                  <QrCode className="w-full h-full text-black" />
                </div>
              </div>
              <div className="text-xs space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">Official UPI Payment QR</span>
                <span className="text-gray-300 block text-[11px]">Payee: {EVENT_CONFIG.upiDetails.payeeName}</span>
                <span className="text-emerald-300 font-mono text-[10px] block">GPay • PhonePe • Paytm • BHIM</span>
                <span className="text-gray-400 text-[10px] block mt-1">Scan QR code using any UPI app to pay</span>
              </div>
            </div>

            <div className="text-xs text-gray-300 space-y-2">
              <p className="font-semibold text-white">Payment Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-400 text-[11px]">
                <li>Scan the QR code to pay <strong>₹{compInfo.fee}/-</strong> using any UPI app.</li>
                <li>Add your <strong>Team Name</strong> in the payment description/note.</li>
                <li>Copy the <strong>12-digit UTR / Transaction ID</strong> and paste below.</li>
                <li>Take a screenshot of the successful payment and upload it.</li>
              </ol>

              {/* Quick Coordinator Help */}
              <div className="mt-2 pt-2 border-t border-emerald-500/20 text-[11px] text-gray-300">
                <span className="text-emerald-400 font-semibold block mb-1">Payment Helpdesk:</span>
                <div className="flex flex-wrap gap-2">
                  {EVENT_CONFIG.coordinators.map((c, i) => (
                    <a
                      key={i}
                      href={`tel:${c.rawPhone}`}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 hover:text-white transition-colors"
                    >
                      <span>📞 {c.name}: {c.phone}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* UTR Input & Screenshot Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                UTR / UPI Transaction ID <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g. 412984920192 (12 digits)"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Payment Screenshot (Receipt) <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  required={!screenshotPreview}
                  onChange={handleScreenshotUpload}
                  className="w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {screenshotPreview && (
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
              <img
                src={screenshotPreview}
                alt="Payment Screenshot Preview"
                className="w-16 h-16 object-cover rounded-lg border border-white/10"
              />
              <div className="text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Payment Screenshot Attached</span>
                </span>
                <span className="text-gray-400 text-[11px] block mt-0.5">Ready for verification</span>
              </div>
            </div>
          )}
        </div>

        {/* CODE OF CONDUCT / AGREEMENT */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-indigo-600 bg-black/40 border-white/20 focus:ring-0"
            />
            <span className="text-xs text-gray-300 leading-relaxed">
              I certify that all member details are correct, we agree to abide by the event rules of <span className="text-white font-semibold">{EVENT_CONFIG.name}</span>, and have completed the payment of <strong className="text-emerald-400">₹{compInfo.fee}/-</strong> for <strong>{compInfo.name}</strong>.
            </span>
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-purple hover:opacity-95 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Registering & Generating Pass...</span>
              </>
            ) : (
              <>
                <span>Complete Registration for {compInfo.name} (₹{compInfo.fee}/-)</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
