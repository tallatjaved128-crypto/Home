import React from 'react';
import { BookOpen, CheckCircle2, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export const EducationalGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#111827] p-6 sm:p-8 rounded-xl border border-[#1e293b] shadow-sm max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-[#0a0c10] border border-[#1e293b] text-sky-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">Reference Documentation</div>
            <h2 className="text-xl font-bold text-white">Economic & Risk Framework Guide</h2>
            <p className="text-sm text-[#94a3b8]">Understanding asymmetric payouts, market microstructure, and expected utility.</p>
          </div>
        </div>

        <div className="space-y-6 text-[#94a3b8] text-sm leading-relaxed">
          <section className="bg-[#0a0c10] p-5 rounded-xl border border-[#1e293b]">
            <h3 className="text-base font-bold text-white mb-2">1. The Mathematics of Binary Payout Asymmetry</h3>
            <p className="mb-3 text-[#94a3b8]">
              In binary options trading, payouts on winning trades are typically capped between 70% and 85%, whereas losing trades result in a 100% loss of the staked capital. This creates an asymmetric payoff structure where the required break-even win rate is given by:
            </p>
            <div className="bg-[#111827] p-3 rounded-lg border border-[#1e293b] font-mono text-xs text-sky-400 mb-3 text-center">
              Break-Even Win Rate = 1 / (1 + Payout Ratio)
            </div>
            <p className="text-[#94a3b8]">
              With an 80% payout ($0.80 return on $1.00 risk), a trader must achieve a sustained win rate of at least <strong className="text-white">55.56%</strong> simply to break even. Short-term price noise in 15-second to 1-minute intervals makes sustaining this win rate through static visual screenshots statistically improbable.
            </p>
          </section>

          <section className="bg-[#0a0c10] p-5 rounded-xl border border-[#1e293b]">
            <h3 className="text-base font-bold text-white mb-2">2. Limitations of Screenshot-Based AI Signals</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-1" />
                <span><strong className="text-white">Absence of Order Book Depth:</strong> Static chart images lack real-time bid-ask queues, institutional liquidity imbalances, and DOM (Depth of Market) telemetry.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-1" />
                <span><strong className="text-white">Broker Execution Spreads:</strong> OTC brokers frequently inject simulated tick variance and spread widening that invalidate pattern-matching models.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-1" />
                <span><strong className="text-white">Stochastic Noise:</strong> High-frequency price action over ultra-short timeframes is dominated by randomness rather than deterministic technical formations.</span>
              </li>
            </ul>
          </section>

          <section className="bg-[#0a0c10] p-5 rounded-xl border border-[#1e293b]">
            <h3 className="text-base font-bold text-white mb-2">3. Principles of Positive Expected Utility</h3>
            <p className="mb-3 text-[#94a3b8]">
              To maximize long-term financial security and well-being, capital allocation should adhere to sound economic principles:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-[#111827] p-4 rounded-xl border border-[#1e293b]">
                <h4 className="font-bold text-white text-sm mb-1">Positive Expectation</h4>
                <p className="text-xs text-[#94a3b8]">Allocate funds into assets where historical expected return ($E[V] &gt; 0$) is supported by underlying economic productivity.</p>
              </div>
              <div className="bg-[#111827] p-4 rounded-xl border border-[#1e293b]">
                <h4 className="font-bold text-white text-sm mb-1">Minimize Friction</h4>
                <p className="text-xs text-[#94a3b8]">Avoid platforms with high house edges, hidden subscription fees, or asymmetric payout structures.</p>
              </div>
              <div className="bg-[#111827] p-4 rounded-xl border border-[#1e293b]">
                <h4 className="font-bold text-white text-sm mb-1">Risk Management</h4>
                <p className="text-xs text-[#94a3b8]">Preserve core capital against high-frequency speculative drain to protect financial stability.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
