"use client";

import { useEffect, useState } from 'react';
import { CompetitionRegistration } from '@/types';
import { EVENT_CONFIG } from '@/lib/config';
import { 
  Shield, KeyRound, Download, Search, Users, User, 
  ExternalLink, ArrowLeft, RefreshCw, Eye, CheckCircle2, 
  IndianRupee, Image as ImageIcon, Filter, Share2
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState<CompetitionRegistration[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('all');

  // Selected Detail Modal
  const [selectedReg, setSelectedReg] = useState<CompetitionRegistration | null>(null);
  const [viewScreenshot, setViewScreenshot] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchAdminData = async (key: string, comp = competitionFilter) => {
    setLoading(true);
    setAuthError(null);

    try {
      const url = `/api/admin?key=${encodeURIComponent(key)}${comp !== 'all' ? `&competition=${comp}` : ''}`;
      const res = await fetch(url);
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
      const urlParams = new URLSearchParams(window.location.search);
      const urlKey = urlParams.get('key');
      const savedKey = sessionStorage.getItem('hack_admin_key');

      const activeKey = urlKey || savedKey;
      if (activeKey) {
        setPasskey(activeKey);
        fetchAdminData(activeKey);
      }
    }
  }, []);

  const handleShareAdminLink = () => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/admin?key=${encodeURIComponent(passkey || 'Synapse#Fest2026')}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdminData(passkey);
  };

  const handleExportCSV = () => {
    const url = `/api/admin?key=${encodeURIComponent(passkey)}&format=csv${competitionFilter !== 'all' ? `&competition=${competitionFilter}` : ''}`;
    window.open(url, '_blank');
  };

  const handleStatusChange = async (id: string, newStatus: 'confirmed' | 'pending_verification' | 'rejected') => {
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

  // Filtered registrations by search
  const filteredRegistrations = registrations.filter(r => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      r.leader.name.toLowerCase().includes(term) ||
      r.leader.email.toLowerCase().includes(term) ||
      r.leader.phone.includes(term) ||
      r.teamName.toLowerCase().includes(term) ||
      r.leader.college.toLowerCase().includes(term) ||
      r.id.toLowerCase().includes(term) ||
      r.payment.transactionId.toLowerCase().includes(term);

    const matchesComp = competitionFilter === 'all' || r.competitionId === competitionFilter;

    return matchesSearch && matchesComp;
  });

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
            <Shield className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-white text-center">{EVENT_CONFIG.name}</h2>
          <p className="text-xs text-gray-400 text-center mt-1 mb-6">
            Organizer Management & Payment Verification Console
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Secret Passkey
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter secret key (e.g. Synapse#Fest2026)"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500"
                />
                <KeyRound className="w-4 h-4 text-gray-500 absolute right-3.5 top-3" />
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Organizer security passkey: <code className="text-emerald-400">Synapse#Fest2026</code>
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
              <span>Back to Public Portal</span>
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
              <span>{EVENT_CONFIG.name} — 2 & 3 December</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Registrations & Payment Verification
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </Link>

            <button
              onClick={() => fetchAdminData(passkey, competitionFilter)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            </button>

            <button
              onClick={handleShareAdminLink}
              className="px-3.5 py-2 rounded-xl bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 text-xs font-semibold hover:bg-indigo-600/50 transition-all flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-indigo-300" />
              <span>{copiedLink ? "✓ Link Copied for Friends!" : "Share Admin Link"}</span>
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
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Total Teams / Entries</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1 block font-mono">
                {metrics.totalRegistrations}
              </span>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Total Students Participating</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mt-1 block font-mono">
                {metrics.totalStudents}
              </span>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Total Fee Amount</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 block font-mono">
                ₹{metrics.totalFeeCollected}/-
              </span>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">By Competition</span>
              <span className="text-xs text-gray-300 mt-1.5 block font-mono">
                HACK: {metrics.byCompetition?.hackathon || 0} • IDEA: {metrics.byCompetition?.ideathon || 0} • REEL: {metrics.byCompetition?.['reel-making'] || 0} • SCI: {metrics.byCompetition?.['science-exhibition'] || 0}
              </span>
            </div>
          </div>
        )}

        {/* COMPETITION SELECTOR FILTER & SEARCH */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by student name, email, phone, team name, college, UTR..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={competitionFilter}
              onChange={(e) => {
                setCompetitionFilter(e.target.value);
                fetchAdminData(passkey, e.target.value);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
            >
              <option value="all">All 4 Competitions</option>
              <option value="hackathon">Hackathon (₹300)</option>
              <option value="ideathon">Ideathon (₹200)</option>
              <option value="reel-making">Reel Making (₹150)</option>
              <option value="science-exhibition">Science Exhibition (₹150)</option>
            </select>
          </div>
        </div>

        {/* REGISTRATIONS TABLE */}
        <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 uppercase font-mono text-gray-400">
                <tr>
                  <th className="py-3 px-4">Pass ID</th>
                  <th className="py-3 px-4">Competition</th>
                  <th className="py-3 px-4">Team & Leader</th>
                  <th className="py-3 px-4">Branch / Yr & College</th>
                  <th className="py-3 px-4">Members</th>
                  <th className="py-3 px-4">Payment UTR</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400">
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
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono font-bold bg-indigo-500/10 border border-indigo-500/20 text-brand-accent">
                          {reg.competitionName}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                          ₹{reg.fee}/-
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{reg.teamName}</div>
                        <div className="text-[11px] text-gray-300 font-semibold">{reg.leader.name}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{reg.leader.phone}</div>
                      </td>

                      <td className="py-3 px-4 text-gray-300">
                        <div className="text-white text-[11px]">{reg.leader.branchAndYear}</div>
                        <div className="text-gray-400 text-[10px] max-w-[180px] truncate">{reg.leader.college}</div>
                      </td>

                      <td className="py-3 px-4 text-gray-300 font-mono">
                        <span className="inline-flex items-center gap-1 text-indigo-300 font-bold">
                          <Users className="w-3.5 h-3.5" />
                          {1 + reg.members.length}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-mono text-xs text-white">{reg.payment.transactionId}</div>
                        {reg.payment.screenshotUrl ? (
                          <button
                            onClick={() => setViewScreenshot(reg.payment.screenshotUrl || null)}
                            className="inline-flex items-center gap-1 text-[10px] text-brand-accent hover:underline mt-0.5"
                          >
                            <ImageIcon className="w-3 h-3" />
                            <span>View Screenshot</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-500">No image</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          reg.status === 'confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : reg.status === 'rejected'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          ● {reg.status === 'pending_verification' ? 'Pending' : reg.status}
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
                    {selectedReg.competitionName} • ID: {selectedReg.id}
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedReg.teamName}</h3>
                </div>
                <button
                  onClick={() => setSelectedReg(null)}
                  className="text-gray-400 hover:text-white text-xs font-mono px-2 py-1 rounded bg-white/5"
                >
                  ✕ Close
                </button>
              </div>

              {/* Leader Details */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase text-gray-400 block">Member #1 (Team Leader)</span>
                <div className="grid grid-cols-2 gap-2">
                  <div><strong>Name:</strong> {selectedReg.leader.name}</div>
                  <div><strong>Phone:</strong> {selectedReg.leader.phone}</div>
                  <div><strong>Email:</strong> {selectedReg.leader.email}</div>
                  <div><strong>Branch / Yr:</strong> {selectedReg.leader.branchAndYear}</div>
                  <div className="col-span-2"><strong>College:</strong> {selectedReg.leader.college}</div>
                </div>
              </div>

              {/* Other Members Details */}
              {selectedReg.members && selectedReg.members.length > 0 && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-white block">Teammates ({selectedReg.members.length}):</span>
                  {selectedReg.members.map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs grid grid-cols-2 gap-2">
                      <div><strong>Member #{i + 2}:</strong> {m.name}</div>
                      <div><strong>Phone:</strong> {m.phone}</div>
                      <div><strong>Email:</strong> {m.email}</div>
                      <div><strong>Branch / Yr:</strong> {m.branchAndYear}</div>
                      <div className="col-span-2"><strong>College:</strong> {m.college}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Payment Section */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs space-y-2">
                <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">Payment Information</span>
                <div className="flex justify-between">
                  <span>Payable Fee:</span>
                  <span className="font-mono font-bold text-emerald-400">₹{selectedReg.fee}/-</span>
                </div>
                <div className="flex justify-between">
                  <span>UTR / Transaction ID:</span>
                  <span className="font-mono font-bold text-white select-all">{selectedReg.payment.transactionId}</span>
                </div>
                {selectedReg.payment.screenshotUrl && (
                  <div className="pt-2">
                    <button
                      onClick={() => setViewScreenshot(selectedReg.payment.screenshotUrl || null)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 transition-colors"
                    >
                      View Payment Screenshot
                    </button>
                  </div>
                )}
              </div>

              {/* Status Update Controller */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-400">Update Status:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedReg.id, 'confirmed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedReg.status === 'confirmed' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Confirm & Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedReg.id, 'pending_verification')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedReg.status === 'pending_verification' ? 'bg-amber-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Pending Verification
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedReg.id, 'rejected')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${selectedReg.status === 'rejected' ? 'bg-rose-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREENSHOT FULL MODAL */}
        {viewScreenshot && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="max-w-xl w-full bg-[#0b101e] border border-white/20 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">Payment Screenshot</span>
                <button
                  onClick={() => setViewScreenshot(null)}
                  className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded bg-white/5"
                >
                  ✕ Close
                </button>
              </div>
              <div className="max-h-[75vh] overflow-auto rounded-lg">
                <img
                  src={viewScreenshot}
                  alt="Payment Receipt"
                  className="w-full object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
