// ─── Line values ────────────────────────────────────────────────────────────
// Sum of three coins (heads=3, tails=2)
export type LineValue = 6 | 7 | 8 | 9;

export const LINE_LABELS: Record<LineValue, string> = {
  6: 'Old Yin (moving)   ── x ──',
  7: 'Young Yang          ───────',
  8: 'Young Yin           ── ──',
  9: 'Old Yang (moving)  ───o───',
};

// ─── Toss result ────────────────────────────────────────────────────────────
export type CoinFace = 'heads' | 'tails';

export interface CoinState {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;       // current rotation in radians
  spin: number;        // radians per frame
  face: CoinFace | null; // null while still in motion
  settled: boolean;
  insideBoundary: boolean;
}

export interface TossResult {
  coins: CoinFace[];
  lineValue: LineValue;
  valid: boolean; // false if any coin landed outside the boundary circle
}
