import React, { useState } from 'react';
import { SAMPLE_CHART_SCENARIOS } from '../data/evaluationData';
import { FileSearch, Upload, AlertCircle, CheckCircle2, Cpu, BarChart2, Layers } from 'lucide-react';

export const ScreenshotSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(SAMPLE_CHART_SCENARIOS[0]);
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImageName(e.target.files[0].name);
      setIsAnalyzing(true);
      setAnalysisComplete(false);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 1200);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] p-6 rounded-xl border border-[#1e293b] shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-[#0a0c10] border border-[#1e293b] text-sky-400">
            <FileSearch className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">Microstructure Scanner</div>
            <h2 className="text-xl font-bold text-white">Chart Signal Inspector & Microstructure Analyzer</h2>
            <p className="text-sm text-[#94a3b8]">Examine what static chart screenshots omit during automated signal processing.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scenario Selector & Upload */}
          <div className="space-y-5 bg-[#0a0c10] p-5 rounded-xl border border-[#1e293b]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#64748b]">Select Chart Profile</h3>

            <div className="space-y-3">
              {SAMPLE_CHART_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => {
                    setSelectedScenario(scen);
                    setAnalysisComplete(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedScenario.id === scen.id
                      ? 'bg-slate-800 text-white border-[#1e293b] shadow-sm'
                      : 'bg-[#111827] text-slate-300 border-[#1e293b] hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{scen.name}</div>
                  <div className={`text-xs font-mono ${selectedScenario.id === scen.id ? 'text-sky-400' : 'text-[#64748b]'}`}>
                    {scen.broker}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1e293b]">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#64748b] mb-2">Upload Custom Chart Screenshot</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#1e293b] rounded-xl p-4 bg-[#111827] hover:bg-[#161f33] cursor-pointer transition-all">
                <Upload className="w-5 h-5 text-sky-400 mb-1" />
                <span className="text-xs font-medium text-slate-300">Browse or drop chart image</span>
                <input type="file" accept="image/*" onChange={handleSimulateUpload} className="hidden" />
              </label>
              {uploadedImageName && (
                <p className="text-xs text-emerald-400 mt-2 font-mono truncate">Loaded: {uploadedImageName}</p>
              )}
            </div>
          </div>

          {/* Analysis Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0a0c10] border border-[#1e293b] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-amber-950/40 text-amber-400 border border-amber-900/40 rounded-lg">
                    Risk Level: {selectedScenario.riskLevel}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{selectedScenario.name}</h3>
                  <p className="text-sm text-[#94a3b8] mt-1">{selectedScenario.description}</p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748b]">Critical Market Variables Missing in Static Image</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedScenario.missingVariables.map((variable, idx) => (
                    <div key={idx} className="bg-red-950/20 border border-red-900/30 p-3 rounded-lg flex items-start space-x-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-red-300">{variable}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#111827] border border-[#1e293b] rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-white">Why Screenshot AI Signals Cannot Overcome Noise</h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  A candlestick chart is a 2D historical rendering of past price points. Short-term price fluctuations over 15-second to 1-minute intervals are governed by stochastic market noise, broker spread widening, and algorithmic spoofing. Relying on image pattern recognition without live order flow data creates a high probability of false signals.
                </p>
              </div>

              {isAnalyzing && (
                <div className="mt-4 p-4 bg-sky-950/30 border border-sky-900/40 rounded-xl flex items-center space-x-3 text-sky-300">
                  <Cpu className="w-5 h-5 animate-spin text-sky-400" />
                  <span className="text-sm font-medium">Processing chart image and scanning microstructure...</span>
                </div>
              )}

              {analysisComplete && (
                <div className="mt-4 p-4 bg-emerald-950/30 border border-emerald-900/40 rounded-xl flex items-center space-x-3 text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium">Scan complete: Confirmed static image input lacks execution-adjusted order book telemetry.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
