// ─── Line values ────────────────────────────────────────────────────────────
// Sum of three coins (heads=3, tails=2)
export type LineValue = 6 | 7 | 8 | 9;

export interface LineLabel {
  name: string;
}

export const LINE_LABELS: Record<LineValue, LineLabel> = {
  6: { name: 'Old Yin (moving)'  },
  7: { name: 'Young Yang'        },
  8: { name: 'Young Yin'         },
  9: { name: 'Old Yang (moving)' },
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
