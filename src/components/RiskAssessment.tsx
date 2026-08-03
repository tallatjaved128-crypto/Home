import React, { useState } from 'react';
import { INITIAL_RISK_DIMENSIONS } from '../data/evaluationData';
import { ShieldAlert, CheckCircle, AlertTriangle, HelpCircle, Layers, Lock, Cpu, DollarSign } from 'lucide-react';

export const RiskAssessment: React.FC = () => {
  const [dimensions, setDimensions] = useState(INITIAL_RISK_DIMENSIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Technical', 'Financial', 'Security', 'Vendor'];

  const filteredDimensions = selectedCategory === 'All'
    ? dimensions
    : dimensions.filter(d => d.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical': return <Cpu className="w-4 h-4 text-sky-500" />;
      case 'Financial': return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'Security': return <Lock className="w-4 h-4 text-amber-500" />;
      case 'Vendor': return <Layers className="w-4 h-4 text-purple-500" />;
      default: return <ShieldAlert className="w-4 h-4 text-slate-500" />;
    }
  };

  const getScoreColor = (score: number, category: string) => {
    if (category === 'Vendor') {
      // For vendor risk, high score means high risk
      return score >= 7 ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    // For others, low score means high risk
    return score <= 4 ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] p-6 rounded-xl border border-[#1e293b] shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">Evaluation Matrix</div>
            <h2 className="text-xl font-bold text-white">Comprehensive Risk Scorecard</h2>
            <p className="text-sm text-[#94a3b8]">Evaluated across 5 core dimensions for binary options signal and automated bot software.</p>
          </div>
          
          <div className="flex flex-wrap gap-1 bg-[#0a0c10] border border-[#1e293b] p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white border border-[#1e293b] shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDimensions.map((dim) => {
            const badgeStyle = getScoreColor(dim.score, dim.category);
            return (
              <div key={dim.id} className="bg-[#0a0c10] border border-[#1e293b] rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#111827] border border-[#1e293b] text-slate-300">
                      {getCategoryIcon(dim.category)}
                      <span>{dim.category}</span>
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border font-mono ${badgeStyle}`}>
                      Score: {dim.score} / 10
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{dim.name}</h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">{dim.rationale}</p>
                </div>

                <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs text-[#64748b] font-mono">
                  <span>Rating Scale 1–10</span>
                  <span className="font-medium text-slate-300">
                    {dim.category === 'Vendor' && dim.score >= 7 ? 'High Risk Exposure' : dim.score <= 4 ? 'Critical Shortcoming' : 'Acceptable'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Signal Funnel Analysis Card */}
      <div className="bg-[#111827] border border-[#1e293b] text-white p-6 rounded-xl shadow-md">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-xl bg-[#0a0c10] border border-[#1e293b] text-sky-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">Funnel Vector Analysis</div>
            <h3 className="text-lg font-bold text-white">Social Media Ad Funnel & Bridge Domain Analysis</h3>
            <p className="text-xs text-[#94a3b8]">Evaluating third-party redirect links (e.g., advx.site) and Telegram signal groups.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-[#0a0c10] border border-[#1e293b] p-4 rounded-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">1. Bridge Domain Routing</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Third-party domains (<code className="text-slate-300">advx.site</code>) bypass platform ad safety checks and track conversion metrics before redirecting users to private messaging channels or unregulated broker web apps.
            </p>
          </div>

          <div className="bg-[#0a0c10] border border-[#1e293b] p-4 rounded-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">2. Affiliate Incentive Alignment</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Vendors often require users to register a new trading account via an affiliate referral link, earning commissions on trade volume regardless of whether user accounts profit or deplete.
            </p>
          </div>

          <div className="bg-[#0a0c10] border border-[#1e293b] p-4 rounded-xl">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2">3. Guaranteed Vendor Upside</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Software creators capture guaranteed subscription or referral fees while the end user absorbs 100% of the market risk in high-friction short-term instruments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
