import React from 'react';
import { ShieldAlert, Calculator, FileSearch, TrendingUp, BookOpen, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'ev', label: 'EV & Win Rate Calculator', icon: Calculator },
    { id: 'risk', label: 'Risk Scorecard', icon: ShieldAlert },
    { id: 'screenshot', label: 'Chart Signal Inspector', icon: FileSearch },
    { id: 'allocation', label: 'Capital Allocation', icon: TrendingUp },
    { id: 'guide', label: 'Economic Framework', icon: BookOpen },
  ];

  return (
    <header className="bg-[#111827] border-b border-[#1e293b] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a0c10] border border-[#1e293b] flex items-center justify-center text-white font-bold shadow-sm">
              <Activity className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-[0.2em]">Internal Risk Analysis Report</div>
              <h1 className="text-base font-bold text-white tracking-tight">TeamQTX AI Signal Software</h1>
            </div>
          </div>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white border border-[#1e293b] shadow-sm'
                      : 'text-slate-400 hover:bg-[#1a2332] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-[#1e293b] scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-white border border-[#1e293b]'
                    : 'bg-[#0a0c10] text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

