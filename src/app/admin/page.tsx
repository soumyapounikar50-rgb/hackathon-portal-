"use client";

import { useEffect, useState } from 'react';
import { Registration } from '@/types';
import { HACKATHON_CONFIG } from '@/lib/config';
import { 
  Shield, KeyRound, Download, Search, Users, User, 
  ExternalLink, ArrowLeft, RefreshCw, Eye, CheckCircle2, Clock
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Selected Detail Modal
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  const fetchAdminData = async (key: string) => {
    setLoading(true);
    setAuthError(null);

    try {
      const res = await fetch(`/api/admin?key=${encodeURIComponent(key)}`);
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Invalid Admin Secret Passkey.');
        }
        throw new Error('Failed to load data.');
      }

      const data = await res.json();
      setRegistrations(data.registrations || []);
      setMetrics(data.metrics || null);
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hack_admin_key', key);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = sessionStorage.getItem('hack_admin_key');
      if (savedKey) {
        setPasskey(savedKey);
        fetchAdminData(savedKey);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdminData(passkey);
  };

  const handleExportCSV = () => {
    window.open(`/api/admin?key=${encodeURIComponent(passkey)}&format=csv`, '_blank');
  };

  const handleStatusChange = async (id: string, newStatus: 'confirmed' | 'pending' | 'waitlisted') => {
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${passkey}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (res.ok) {
        setRegistrations(prev =>
          prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
        );
        if (selectedReg && selectedReg.id === id) {
          setSelectedReg({ ...selectedReg, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch =
      r.leaderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.leaderEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.teamName && r.teamName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.collegeOrCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack = trackFilter === 'all' || r.primaryTrack === trackFilter;
    const matchesType = typeFilter === 'all' || r.registrationType === typeFilter;

    return matchesSearch && matchesTrack && matchesType;
  });

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <Shield className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-white text-center">Organizer Dashboard</h2>
          <p className="text-xs text-gray-400 text-center mt-1 mb-6">
            Enter the admin passkey to review registrations and export CSV.
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Secret Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter secret (Default: admin123)"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
                />
                <KeyRound className="w-4 h-4 text-gray-500 absolute right-3.5 top-3" />
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Tip: Default local secret is <code className="text-indigo-300">admin123</code> (customizable via <code className="text-indigo-300">ADMIN_SECRET</code> env).
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-1">
              <Shield className="w-4 h-4" />
              <span>Organizer Management Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {HACKATHON_CONFIG.name} Applicants
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Landing Page</span>
            </Link>

            <button
              onClick={() => fetchAdminData(passkey)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:opacity-90 transition-all shadow-md flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV for Sheets</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Total Submissions</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block font-mono">
                {metrics.totalRegistrations}
              </span>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Total Hackers (with teams)</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mt-1 block font-mono">
                {metrics.totalParticipants}
              </span>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Teams Registered</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-accent mt-1 block font-mono">
                {metrics.teamsCount}
              </span>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Solo Hackers</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 block font-mono">
                {metrics.solosCount}
              </span>
            </div>
          </div>
        )}

        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, email, team, college, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Tracks</option>
            {HACKATHON_CONFIG.tracks.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Formats</option>
            <option value="solo">Solo Only</option>
            <option value="team">Teams Only</option>
          </select>
        </div>

        {/* REGISTRATIONS TABLE */}
        <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 uppercase font-mono text-gray-400">
                <tr>
                  <th className="py-3 px-4">Pass ID</th>
                  <th className="py-3 px-4">Applicant / Team</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4">College / Org</th>
                  <th className="py-3 px-4">Members</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No registrations match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-300">
                        {reg.id}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{reg.leaderName}</div>
                        <div className="text-[11px] text-gray-400">{reg.leaderEmail}</div>
                        {reg.teamName && (
                          <span className="inline-block mt-0.5 text-[10px] text-indigo-400 font-mono">
                            Team: {reg.teamName}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-mono font-semibold bg-white/5 border border-white/10 text-brand-accent">
                          {reg.primaryTrack}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-gray-300 max-w-[160px] truncate">
                        {reg.collegeOrCompany}
                      </td>

                      <td className="py-3 px-4 text-gray-300">
                        {reg.registrationType === 'team' ? (
                          <span className="inline-flex items-center gap-1 font-mono text-indigo-300">
                            <Users className="w-3.5 h-3.5" />
                            {reg.members.length + 1}
                          </span>
                        ) : (
                          <span className="text-gray-500 font-mono">Solo</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          reg.status === 'confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : reg.status === 'waitlisted'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}>
                          ● {reg.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedReg(reg)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                            title="Inspect details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/ticket/${reg.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-indigo-400 hover:text-indigo-300 transition-colors"
                            title="Open digital pass"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAIL MODAL */}
        {selectedReg && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b101e] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block">
                    Registration Record
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedReg.leaderName}</h3>
                </div>
                <button
                  onClick={() => setSelectedReg(null)}
                  className="text-gray-400 hover:text-white text-xs font-mono px-2 py-1 rounded bg-white/5"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Pass ID:</span>
                  <span className="font-mono font-bold text-white">{selectedReg.id}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Format:</span>
                  <span className="text-white capitalize">{selectedReg.registrationType} {selectedReg.teamName ? `(${selectedReg.teamName})` : ''}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Email:</span>
                  <a href={`mailto:${selectedReg.leaderEmail}`} className="text-indigo-400 underline">{selectedReg.leaderEmail}</a>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Phone:</span>
                  <span className="text-white">{selectedReg.leaderPhone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">College / Org:</span>
                  <span className="text-white">{selectedReg.collegeOrCompany} ({selectedReg.graduationYear || 'N/A'})</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Experience:</span>
                  <span className="text-white capitalize">{selectedReg.experienceLevel}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">T-Shirt / Dietary:</span>
                  <span className="text-white">{selectedReg.tshirtSize || 'L'} / {selectedReg.dietaryRestrictions || 'None'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Submitted:</span>
                  <span className="text-white">{new Date(selectedReg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {selectedReg.skills && selectedReg.skills.length > 0 && (
                <div>
                  <span className="text-xs text-gray-400 block mb-2">Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedReg.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedReg.members && selectedReg.members.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-xs font-semibold text-white block mb-2">Teammates:</span>
                  <div className="space-y-2">
                    {selectedReg.members.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-white">{m.name}</span>
                          <span className="text-gray-400 ml-2">({m.role})</span>
                          <span className="text-gray-500 block text-[11px]">{m.email}</span>
                        </div>
                        {m.github && (
                          <a href={m.github} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline text-[11px]">
                            GitHub →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedReg.projectPitch && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-xs text-gray-400 block mb-1">Project Idea:</span>
                  <p className="text-xs text-gray-300 italic bg-black/30 p-3 rounded-xl border border-white/5">
                    &quot;{selectedReg.projectPitch}&quot;
                  </p>
                </div>
              )}

              {/* Status Update Controller */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Update Status:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedReg.id, 'confirmed')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${selectedReg.status === 'confirmed' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedReg.id, 'waitlisted')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${selectedReg.status === 'waitlisted' ? 'bg-amber-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
