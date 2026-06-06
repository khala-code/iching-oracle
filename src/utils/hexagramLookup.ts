import type { LineValue } from '../types/iching';
import { TRIGRAMS } from '../data/trigrams';
import { HEXAGRAMS } from '../data/hexagrams';
import type { Trigram } from '../data/trigrams';
import type { HexagramData } from '../data/hexagrams';

// Convert a LineValue to a binary digit: yang (7,9) = '1', yin (6,8) = '0'
function lineToYinYang(v: LineValue): '0' | '1' {
  return v === 7 || v === 9 ? '1' : '0';
}

// Convert a moving line to its changed counterpart: 6→7, 9→8
function movingToChanged(v: LineValue): LineValue {
  if (v === 6) return 7;
  if (v === 9) return 8;
  return v;
}

// Build trigram key from 3 lines (bottom-to-top order)
function trigramKey(lines: [LineValue, LineValue, LineValue]): string {
  return lines.map(lineToYinYang).join('');
}

export interface ReadingResult {
  lower: Trigram;
  upper: Trigram;
  hexagram: HexagramData | null;
  changingLines: number[];          // 1-indexed positions of moving lines
  relating: {
    lower: Trigram;
    upper: Trigram;
    hexagram: HexagramData | null;
  } | null;                         // null if no moving lines
}

export function interpretReading(lines: LineValue[]): ReadingResult {
  const lower = TRIGRAMS[trigramKey(lines.slice(0, 3) as [LineValue, LineValue, LineValue])];
  const upper = TRIGRAMS[trigramKey(lines.slice(3, 6) as [LineValue, LineValue, LineValue])];
  const hexKey = lines.map(lineToYinYang).join('');
  const hexagram = HEXAGRAMS[hexKey] ?? null;

  const changingLines = lines
    .map((v, i) => (v === 6 || v === 9 ? i + 1 : null))
    .filter((v): v is number => v !== null);

  let relating: ReadingResult['relating'] = null;

  if (changingLines.length > 0) {
    const changed = lines.map(movingToChanged) as LineValue[];
    const rLower = TRIGRAMS[trigramKey(changed.slice(0, 3) as [LineValue, LineValue, LineValue])];
    const rUpper = TRIGRAMS[trigramKey(changed.slice(3, 6) as [LineValue, LineValue, LineValue])];
    const rKey = changed.map(lineToYinYang).join('');
    relating = {
      lower: rLower,
      upper: rUpper,
      hexagram: HEXAGRAMS[rKey] ?? null,
    };
  }

  return { lower, upper, hexagram, changingLines, relating };
}
