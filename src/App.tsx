/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { EVCalculator } from './components/EVCalculator';
import { RiskAssessment } from './components/RiskAssessment';
import { ScreenshotSimulator } from './components/ScreenshotSimulator';
import { AlternativePlanner } from './components/AlternativePlanner';
import { EducationalGuide } from './components/EducationalGuide';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('ev');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'ev' && <EVCalculator />}
            {activeTab === 'risk' && <RiskAssessment />}
            {activeTab === 'screenshot' && <ScreenshotSimulator />}
            {activeTab === 'allocation' && <AlternativePlanner />}
            {activeTab === 'guide' && <EducationalGuide />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Trading Risk & EV Analyzer. Objective Financial & Microstructure Assessment Platform.</p>
          <div className="flex space-x-6 text-slate-400">
            <span>Expected Value Analysis</span>
            <span>•</span>
            <span>Market Microstructure</span>
            <span>•</span>
            <span>Capital Preservation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

