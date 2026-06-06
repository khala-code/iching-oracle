// ─── Line values ────────────────────────────────────────────────────────────
// Sum of three coins (heads=3, tails=2)
export type LineValue = 6 | 7 | 8 | 9;

export interface LineLabel {
  name: string;
  symbol: string;
}

export const LINE_LABELS: Record<LineValue, LineLabel> = {
  6: { name: 'Old Yin (moving)',  symbol: '— × —' },
  7: { name: 'Young Yang',        symbol: '———'    },
  8: { name: 'Young Yin',         symbol: '— —'    },
  9: { name: 'Old Yang (moving)', symbol: '—●—'    },
};

// ─── Toss result ────────────────────────────────────────────────────────────
export type CoinFace = 'heads' | 'tails';

export interface CoinState {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  face: CoinFace | null;
  settled: boolean;
  insideBoundary: boolean;
}

export interface TossResult {
  coins: CoinFace[];
  lineValue: LineValue;
  valid: boolean;
}
