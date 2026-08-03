import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';

export const AlternativePlanner: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(300);
  const [timeHorizonMonths, setTimeHorizonMonths] = useState<number>(24);

  // Generate comparison data
  const comparisonData = [];
  let speculativeBalance = 1000;
  let regulatedIndexBalance = 1000;
  let cashPreservation = 1000;

  for (let m = 0; m <= timeHorizonMonths; m++) {
    if (m === 0) {
      comparisonData.push({
        month: 'Start',
        speculative: 1000,
        regulatedIndex: 1000,
        cashPreservation: 1000,
      });
    } else {
      // Speculative binary options: negative expected return (-15% per month due to high friction and house edge)
      speculativeBalance = Math.max(0, (speculativeBalance + monthlyContribution) * 0.85);
      // Regulated index fund: positive expected return (~8% APY -> ~0.67% per month)
      regulatedIndexBalance = (regulatedIndexBalance + monthlyContribution) * 1.0067;
      // Cash preservation / high yield savings: (~4.5% APY -> ~0.375% per month)
      cashPreservation = (cashPreservation + monthlyContribution) * 1.00375;

      comparisonData.push({
        month: `M${m}`,
        speculative: Math.round(speculativeBalance),
        regulatedIndex: Math.round(regulatedIndexBalance),
        cashPreservation: Math.round(cashPreservation),
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] p-6 rounded-xl border border-[#1e293b] shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-[#0a0c10] border border-[#1e293b] text-emerald-400">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">Wealth Trajectory Engine</div>
            <h2 className="text-xl font-bold text-white">Capital Allocation & Positive-Expectation Comparison</h2>
            <p className="text-sm text-[#94a3b8]">Compare long-term wealth trajectories between high-friction speculative trading and regulated positive-expectation assets.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-5 bg-[#0a0c10] p-5 rounded-xl border border-[#1e293b]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748b]">Allocation Parameters</h3>

            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1">Monthly Reallocation Amount ($)</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Math.max(50, Number(e.target.value)))}
                className="w-full bg-[#111827] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <p className="text-xs text-[#64748b] mt-1">Capital saved from avoiding speculative subscriptions and high-risk trades.</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#94a3b8] font-medium">Time Horizon</span>
                <span className="font-bold text-white font-mono">{timeHorizonMonths} Months</span>
              </div>
              <input
                type="range"
                min="6"
                max="60"
                step="6"
                value={timeHorizonMonths}
                onChange={(e) => setTimeHorizonMonths(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-900/40 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Strategy Recommendation</span>
              </div>
              <p className="text-xs text-emerald-300/80 leading-relaxed">
                Redirecting funds from asymmetric speculative products into diversified index funds or secure interest-bearing instruments preserves capital and aligns with positive expected utility.
              </p>
            </div>
          </div>

          {/* Chart Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0a0c10] border border-[#1e293b] rounded-xl p-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748b] mb-3">Portfolio Growth Trajectory Comparison</h4>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={comparisonData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: '1px solid #1e293b' }}
                      formatter={(value: any) => [`$${value}`, '']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                    <Line type="monotone" dataKey="regulatedIndex" name="Regulated Index Fund (~8% APY)" stroke="#38bdf8" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="cashPreservation" name="High-Yield Savings (~4.5%)" stroke="#34d399" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="speculative" name="Speculative Binary Signals" stroke="#f87171" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
