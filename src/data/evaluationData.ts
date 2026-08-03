import { RiskDimension } from '../types';

export const INITIAL_RISK_DIMENSIONS: RiskDimension[] = [
  {
    id: 'predictive_accuracy',
    name: 'Predictive Accuracy',
    score: 3,
    rationale: 'Short timeframes (15s–1m) contain extremely high statistical noise, limiting predictive consistency from static visual data.',
    category: 'Technical'
  },
  {
    id: 'technical_feasibility',
    name: 'Technical Feasibility',
    score: 3,
    rationale: 'Static screenshots omit critical real-time variables such as order book depth, bid-ask spreads, latency, and volume profiles.',
    category: 'Technical'
  },
  {
    id: 'security_safety',
    name: 'Security & Safety',
    score: 3,
    rationale: 'Unverified third-party software, bridge domains (e.g., advx.site), and external communication channels introduce credential and security vulnerabilities.',
    category: 'Security'
  },
  {
    id: 'financial_utility',
    name: 'Expected Financial Utility',
    score: 3,
    rationale: 'Asymmetric broker payouts (e.g., 70-85% win vs 100% loss) require sustained win rates >55-60% to break even.',
    category: 'Financial'
  },
  {
    id: 'vendor_risk_exposure',
    name: 'Vendor Risk Factor',
    score: 7,
    rationale: 'Vendor incentives prioritize subscription fees, VIP channel upsells, and affiliate broker sign-ups over actual user trading performance.',
    category: 'Vendor'
  }
];

export const SAMPLE_CHART_SCENARIOS = [
  {
    id: 'otc_binary',
    name: 'OTC Binary Options 1-Min Chart',
    broker: 'Quotex / PocketOption Style',
    description: 'High-frequency over-the-counter synthetic asset chart with high spread and simulated tick noise.',
    missingVariables: [
      'Real-time order book depth & DOM',
      'Actual exchange execution latency',
      'True institutional volume profile',
      'Underlying liquidity provider spreads'
    ],
    riskLevel: 'Critical'
  },
  {
    id: 'regulated_forex',
    name: 'Regulated Interbank Forex Chart',
    broker: 'ECN / STP Broker (e.g., EUR/USD)',
    description: 'Standard multi-timeframe spot currency chart backed by global liquidity pools.',
    missingVariables: [
      'Central bank macroeconomic calendar impact',
      'Interbank order flow imbalances'
    ],
    riskLevel: 'Moderate'
  }
];
