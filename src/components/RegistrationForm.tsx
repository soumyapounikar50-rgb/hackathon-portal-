"use client";

import { useState } from 'react';
import { HACKATHON_CONFIG } from '@/lib/config';
import { Registration, TeamMember } from '@/types';
import confetti from 'canvas-confetti';
import { 
  Users, User, Sparkles, CheckCircle2, AlertCircle, 
  Plus, Trash2, ArrowRight, Check, ExternalLink, Ticket 
} from 'lucide-react';
import Link from 'next/link';

const QUICK_SKILLS = [
  "React / Next.js", "Python", "TypeScript", "AI / LLMs", 
  "Tailwind CSS", "FastAPI / Node.js", "PyTorch / TensorFlow",
  "Solidity / Web3", "UI/UX Design", "Docker / Cloud", "Mobile (React Native/Flutter)"
];

const TSHIRT_SIZES = ["S", "M", "L", "XL", "2XL"];
const DIETARY_OPTIONS = ["None", "Vegetarian", "Vegan", "Halal", "Kosher", "Gluten-Free"];

export default function RegistrationForm() {
  const [registrationType, setRegistrationType] = useState<'solo' | 'team'>('solo');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRegistration, setSuccessRegistration] = useState<Registration | null>(null);

  // Form Fields
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderPhone, setLeaderPhone] = useState('');
  const [collegeOrCompany, setCollegeOrCompany] = useState('');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [primaryTrack, setPrimaryTrack] = useState<string>('ai-agents');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["React / Next.js", "Python"]);
  const [customSkill, setCustomSkill] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [projectPitch, setProjectPitch] = useState('');
  const [tshirtSize, setTshirtSize] = useState('L');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('None');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Additional Team Members
  const [members, setMembers] = useState<TeamMember[]>([]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const addCustomSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customSkill.trim()) {
      e.preventDefault();
      if (!selectedSkills.includes(customSkill.trim())) {
        setSelectedSkills([...selectedSkills, customSkill.trim()]);
      }
      setCustomSkill('');
    }
  };

  const addMember = () => {
    if (members.length >= 3) return; // Max 4 members total including leader
    setMembers([...members, { name: '', email: '', role: 'Developer', github: '' }]);
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!leaderName.trim() || !leaderEmail.trim() || !collegeOrCompany.trim()) {
      setErrorMsg("Please fill out all required personal information fields.");
      return;
    }
    if (registrationType === 'team' && !teamName.trim()) {
      setErrorMsg("Please provide a team name.");
      return;
    }
    if (!agreedToTerms) {
      setErrorMsg("You must accept the hackathon Code of Conduct and Terms to register.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        registrationType,
        teamName: registrationType === 'team' ? teamName : undefined,
        leaderName,
        leaderEmail,
        leaderPhone,
        collegeOrCompany,
        graduationYear,
        experienceLevel,
        primaryTrack,
        skills: selectedSkills,
        githubUrl,
        linkedinUrl,
        portfolioUrl,
        projectPitch,
        members: registrationType === 'team' ? members : [],
        tshirtSize,
        dietaryRestrictions,
        agreedToTerms
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

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback if canvas-confetti is not rendered
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
      <div className="max-w-3xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 text-center animate-fade-in shadow-2xl shadow-emerald-950/20">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-emerald-400">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Registration Confirmed!
        </span>

        <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-4">
          Welcome to {HACKATHON_CONFIG.name}, {successRegistration.leaderName}!
        </h3>

        <p className="mt-3 text-base text-gray-300 max-w-lg mx-auto">
          Your spot is secured. We&apos;ve generated your personalized Digital Hacker Ticket.
        </p>

        {/* Ticket Snippet */}
        <div className="my-8 p-6 rounded-2xl bg-[#080d1a] border border-white/10 max-w-md mx-auto text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Event</span>
              <span className="font-bold text-white">{HACKATHON_CONFIG.name}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Pass ID</span>
              <span className="font-mono font-bold text-indigo-400">{successRegistration.id}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Participant:</span>
              <span className="font-semibold text-white">{successRegistration.leaderName}</span>
            </div>
            {successRegistration.teamName && (
              <div className="flex justify-between">
                <span className="text-gray-400">Team:</span>
                <span className="font-semibold text-indigo-300">{successRegistration.teamName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400">Track:</span>
              <span className="font-semibold text-brand-accent uppercase">{successRegistration.primaryTrack}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-emerald-400 font-bold uppercase">● Confirmed</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/ticket/${successRegistration.id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:opacity-90 transition-all shadow-lg shadow-indigo-600/30"
          >
            <Ticket className="w-4 h-4" />
            <span>View & Download Digital Pass</span>
          </Link>

          <button
            onClick={() => {
              setSuccessRegistration(null);
              setLeaderName('');
              setLeaderEmail('');
              setLeaderPhone('');
              setTeamName('');
              setMembers([]);
            }}
            className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Register Another Participant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-12 rounded-3xl border border-white/10 relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Mode Selector (Solo vs Team) */}
      <div className="mb-10 text-center">
        <label className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-3">
          Select Registration Format
        </label>
        <div className="inline-flex p-1.5 rounded-2xl bg-black/40 border border-white/10 max-w-sm w-full">
          <button
            type="button"
            onClick={() => setRegistrationType('solo')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              registrationType === 'solo'
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Solo Hacker</span>
          </button>
          <button
            type="button"
            onClick={() => setRegistrationType('team')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              registrationType === 'team'
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team (2 - 4 Hackers)</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* TEAM NAME (If Team Mode) */}
        {registrationType === 'team' && (
          <div className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
            <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Team Profile</span>
            </h4>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Team Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. CyberVanguard, ByteForge, QuantumLeap"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* SECTION 1: PRIMARY APPLICANT / TEAM LEADER */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            <span>{registrationType === 'team' ? "Team Leader Details" : "Hacker Information"}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                placeholder="e.g. Samantha Wu"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                required
                value={leaderEmail}
                onChange={(e) => setLeaderEmail(e.target.value)}
                placeholder="samantha@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Phone / WhatsApp <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={leaderPhone}
                onChange={(e) => setLeaderPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                College / University / Company <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={collegeOrCompany}
                onChange={(e) => setCollegeOrCompany(e.target.value)}
                placeholder="e.g. Stanford University or Independent"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Graduation / Batch Year
              </label>
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="Graduated / Professional">Graduated / Working Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setExperienceLevel(level)}
                    className={`py-2 rounded-xl text-xs font-medium capitalize border transition-all ${
                      experienceLevel === level
                        ? 'border-indigo-500 bg-indigo-500/20 text-white'
                        : 'border-white/10 bg-black/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TEAM MEMBERS (If Team Mode) */}
        {registrationType === 'team' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <span>Teammates (Up to 3 additional members)</span>
                </h4>
                <p className="text-xs text-gray-400">Total team size: {members.length + 1} / 4 members</p>
              </div>

              {members.length < 3 && (
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

            {members.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center text-xs text-gray-400">
                No extra members added yet. Click &quot;Add Member&quot; to invite your teammates now, or add them later during check-in.
              </div>
            ) : (
              <div className="space-y-4">
                {members.map((member, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-semibold text-indigo-400">
                        Member #{idx + 2}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeMember(idx)}
                        className="text-gray-400 hover:text-rose-400 p-1 transition-colors"
                        title="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Member Name"
                          value={member.name}
                          onChange={(e) => updateMember(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Member Email"
                          value={member.email}
                          onChange={(e) => updateMember(idx, 'email', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Role (e.g. Frontend, ML)"
                          value={member.role}
                          onChange={(e) => updateMember(idx, 'role', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: TRACK PREFERENCE */}
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Select Preferred Challenge Track</span>
          </h4>
          <p className="text-xs text-gray-400 mb-4">
            You can still refine or switch your track during kickoff.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {HACKATHON_CONFIG.tracks.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setPrimaryTrack(t.id)}
                className={`p-4 rounded-2xl text-left border transition-all relative ${
                  primaryTrack === t.id
                    ? 'border-indigo-500 bg-indigo-500/15 shadow-lg shadow-indigo-500/10'
                    : 'border-white/10 bg-black/20 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-white">{t.name}</span>
                  {primaryTrack === t.id && (
                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2">{t.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 3: SKILLS & TECH STACK */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
            Primary Skills & Interests
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_SKILLS.map((skill) => {
              const active = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    active
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          <input
            type="text"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyDown={addCustomSkill}
            placeholder="Type other skills and press Enter (e.g. GraphQL, Solidity, PyTorch)"
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* SECTION 4: LINKS & PROJECT PITCH */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              GitHub URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-username"
              className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              LinkedIn Profile
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Portfolio / Devpost (Optional)
            </label>
            <input
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://yourportfolio.dev"
              className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Preliminary Project Pitch / What do you plan to build? (Optional)
          </label>
          <textarea
            rows={3}
            value={projectPitch}
            onChange={(e) => setProjectPitch(e.target.value)}
            placeholder="A short sentence or summary of your idea or what problem you'd like to tackle..."
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* SECTION 5: LOGISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              T-Shirt Size (Swag Pack)
            </label>
            <select
              value={tshirtSize}
              onChange={(e) => setTshirtSize(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
            >
              {TSHIRT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Dietary Restrictions (If In-Person / Hub)
            </label>
            <select
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
            >
              {DIETARY_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* CODE OF CONDUCT CHECKBOX */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-indigo-600 bg-black/40 border-white/20 focus:ring-0"
            />
            <span className="text-xs text-gray-300 leading-relaxed">
              I agree to the <span className="text-white font-semibold">Hackathon Code of Conduct</span>, understand that all code must be written during the event, and consent to receiving official hackathon announcements and team communication.
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
                <span>Submitting Registration...</span>
              </>
            ) : (
              <>
                <span>Complete Registration & Claim Pass</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
