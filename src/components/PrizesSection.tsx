import { HACKATHON_CONFIG } from '@/lib/config';
import { Trophy, Award, Gift, CheckCircle2 } from 'lucide-react';

export default function PrizesSection() {
  const topPrizes = HACKATHON_CONFIG.prizes.slice(0, 3);
  const otherPrizes = HACKATHON_CONFIG.prizes.slice(3);

  return (
    <section id="prizes" className="py-24 relative bg-black/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <Trophy className="w-3.5 h-3.5" />
            <span>Over {HACKATHON_CONFIG.prizePool} in Prizes & Perks</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Compete, Win, & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">Get Funded</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Cash bounties, cloud credits, venture capital introductions, and direct fast-track accelerator interviews.
          </p>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topPrizes.map((prize, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 glass-panel transition-all flex flex-col justify-between ${
                  isFirst
                    ? "border-amber-500/50 bg-gradient-to-b from-amber-950/20 to-transparent shadow-xl shadow-amber-500/10 md:-translate-y-4"
                    : "border-white/10"
                }`}
              >
                {isFirst && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-black shadow-md flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    Grand Winner
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
                      {prize.rank}
                    </span>
                    <Award className={`w-6 h-6 ${isFirst ? "text-amber-400" : "text-gray-400"}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{prize.title}</h3>
                  <div className="text-4xl font-extrabold font-mono text-white mb-6">
                    <span className={isFirst ? "text-amber-400" : "text-indigo-300"}>
                      {prize.amount}
                    </span>
                    <span className="text-xs font-normal text-gray-400 block mt-1">Cash + Credits</span>
                  </div>

                  <ul className="space-y-2.5 text-sm text-gray-300">
                    {prize.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isFirst ? "text-amber-400" : "text-indigo-400"}`} />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-center">
                  <a
                    href="#register"
                    className={`block w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      isFirst
                        ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20"
                        : "bg-white/10 hover:bg-white/15 text-white"
                    }`}
                  >
                    Claim Your Spot
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category & Beginner Prizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherPrizes.map((prize, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider block mb-1">
                  {prize.rank}
                </span>
                <h4 className="text-lg font-bold text-white">{prize.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{prize.perks.join(" • ")}</p>
              </div>
              <div className="text-right pl-4">
                <span className="text-2xl font-mono font-bold text-emerald-400">{prize.amount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Swag & Perks for all */}
        <div className="mt-8 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Every Participant Receives</h4>
              <p className="text-xs text-gray-300">
                Official Hackathon Swag Pack, $200+ in API credits, digital verified certificate of participation, and access to hiring sponsor workshops.
              </p>
            </div>
          </div>
          <a
            href="#register"
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors"
          >
            Register to Receive Perks
          </a>
        </div>
      </div>
    </section>
  );
}
