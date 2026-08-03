export interface RiskDimension {
  id: string;
  name: string;
  score: number; // 1-10
  rationale: string;
  category: 'Technical' | 'Financial' | 'Security' | 'Vendor';
}

export interface SimulationResult {
  tradeNumber: number;
  balance: number;
  cumulativeProfit: number;
}

export interface AlternativeComparison {
  months: number;
  speculativeStrategyValue: number;
  regulatedIndexValue: number;
  cashPreservationValue: number;
}
