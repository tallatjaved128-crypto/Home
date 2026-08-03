import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Calculator, Info, AlertTriangle, TrendingDown, CheckCircle2 } from 'lucide-react';

export const EVCalculator: React.FC = () => {
  const [winRate, setWinRate] = useState<number>(50); // percentage 0-100
  const [payoutRatio, setPayoutRatio] = useState<number>(80); // percentage 50-100
  const [stake, setStake] = useState<number>(50); // USD per trade
  const [initialCapital, setInitialCapital] = useState<number>(1000); // USD
  const [totalTrades, setTotalTrades] = useState<number>(50);

  // Calculations
  const pWin = winRate / 100;
  const pLoss = 1 - pWin;
  const payoutMultiplier = payoutRatio / 100;
  
  const winAmount = stake * payoutMultiplier;
  const lossAmount = stake;

  const expectedValuePerTrade = (pWin * winAmount) - (pLoss * lossAmount);
  const breakEvenRate = (1 / (1 + payoutMultiplier)) * 100;
  
  const isProfitable = expectedValuePerTrade > 0;

  // Generate simulation curve data
  const simulationData = [];
  let currentBalance = initialCapital;
  
  for (let i = 0; i <= totalTrades; i++) {
    if (i === 0) {
      simulationData.push({ trade: 0, balance: initialCapital, expectedBalance: initialCapital });
    } else {
      // Deterministic expected value growth
      currentBalance += expectedValuePerTrade;
      // Also calculate a realistic volatile path approximation
      simulationData.push({
        trade: i,
        balance: Math.max(0, Math.round(currentBalance * 10) / 10),
        expectedBalance: Math.max(0, Math.round((initialCapital + (i * expectedValuePerTrade)) * 10) / 10),
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] p-6 rounded-xl border border-[#1e293b] shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-[#0a0c10] border border-[#1e293b] text-sky-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">Financial Modeling Engine</div>
            <h2 className="text-xl font-bold text-white">Binary Options Expected Value ($E[V]$) Simulator</h2>
            <p className="text-sm text-[#94a3b8]">Calculate mathematical edge, required break-even win rates, and projected capital trajectory.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="space-y-5 bg-[#0a0c10] p-5 rounded-xl border border-[#1e293b]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748b]">Parameters</h3>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#94a3b8] font-medium">Estimated Win Rate</span>
                <span className="font-bold text-white font-mono">{winRate}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="1"
                value={winRate}
                onChange={(e) => setWinRate(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-[#64748b] mt-1 font-mono">
                <span>20% (Random)</span>
                <span>50%</span>
                <span>90% (Unrealistic)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#94a3b8] font-medium">Broker Payout Ratio</span>
                <span className="font-bold text-white font-mono">{payoutRatio}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                step="1"
                value={payoutRatio}
                onChange={(e) => setPayoutRatio(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <p className="text-xs text-[#64748b] mt-1">Typical binary options payout on win (loss is 100%).</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1">Stake Per Trade ($)</label>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#111827] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-1">Starting Capital ($)</label>
              <input
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(Math.max(100, Number(e.target.value)))}
                className="w-full bg-[#111827] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Results Summary & Key Metrics */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0a0c10] p-4 rounded-xl border border-[#1e293b]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b]">Break-Even Win Rate</span>
                <div className="text-2xl font-bold text-white mt-1 font-mono">{breakEvenRate.toFixed(1)}%</div>
                <p className="text-xs text-[#94a3b8] mt-1">Minimum win rate needed just to cover 100% losses on failed trades.</p>
              </div>

              <div className={`p-4 rounded-xl border ${isProfitable ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-300' : 'bg-red-950/30 border-red-900/50 text-red-300'}`}>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
                  Expected Value / Trade
                </span>
                <div className={`text-2xl font-bold mt-1 font-mono ${isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
                  {expectedValuePerTrade >= 0 ? `+$${expectedValuePerTrade.toFixed(2)}` : `-$${Math.abs(expectedValuePerTrade).toFixed(2)}`}
                </div>
                <p className={`text-xs mt-1 ${isProfitable ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
                  {isProfitable ? 'Positive mathematical expectation' : 'Negative expected return per trade'}
                </p>
              </div>

              <div className="bg-[#0a0c10] p-4 rounded-xl border border-[#1e293b]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b]">Asymmetric Risk Ratio</span>
                <div className="text-2xl font-bold text-white mt-1 font-mono">1 : {(1 / payoutMultiplier).toFixed(2)}</div>
                <p className="text-xs text-[#94a3b8] mt-1">Risking $1.00 to win ${payoutMultiplier.toFixed(2)}.</p>
              </div>
            </div>

            {/* Recharts Simulation Curve */}
            <div className="bg-[#0a0c10] p-4 rounded-xl border border-[#1e293b]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748b]">Projected Capital Trajectory ({totalTrades} Trades)</h4>
                <div className="flex items-center space-x-2 text-xs text-[#94a3b8]">
                  <span className="inline-block w-3 h-3 bg-sky-500 rounded-sm"></span>
                  <span>Expected Value Path</span>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={simulationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="trade" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: '1px solid #1e293b' }}
                      formatter={(value: any) => [`$${value}`, 'Capital']}
                    />
                    <ReferenceLine y={initialCapital} stroke="#475569" strokeDasharray="3 3" label={{ value: 'Initial Capital', fill: '#94a3b8', fontSize: 10 }} />
                    <Line type="monotone" dataKey="expectedBalance" stroke="#38bdf8" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {!isProfitable && (
              <div className="flex items-start space-x-3 bg-red-950/20 border border-red-900/30 rounded-xl p-4 text-red-300">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm">
                  <strong>Mathematical Reality Check:</strong> At a {winRate}% win rate and {payoutRatio}% payout, your expected value is negative. Continuous trading under these parameters guarantees capital depletion over time due to the asymmetric house edge.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
