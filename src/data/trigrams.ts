// ─── Trigrams ──────────────────────────────────────────────────────────
// Key: ternary string of line values bottom-to-top, yang=1 yin=0
// e.g. '111' = all yang = Heaven

export interface Trigram {
  key: string;    // '000'..'111'
  chinese: string;
  pinyin: string;
  english: string;
  symbol: string; // Unicode trigram glyph
  element: string;
}

export const TRIGRAMS: Record<string, Trigram> = {
  '111': { key: '111', chinese: '乾', pinyin: 'Qián', english: 'Heaven',  symbol: '☰', element: 'Heaven'  },
  '000': { key: '000', chinese: '坤', pinyin: 'Kūn',  english: 'Earth',   symbol: '☷', element: 'Earth'   },
  '100': { key: '100', chinese: '震', pinyin: 'Zhèn', english: 'Thunder', symbol: '☳', element: 'Thunder' },
  '010': { key: '010', chinese: '坎', pinyin: 'Kǎn',  english: 'Water',   symbol: '☵', element: 'Water'   },
  '001': { key: '001', chinese: '艮', pinyin: 'Gèn',  english: 'Mountain',symbol: '☶', element: 'Mountain'},
  '011': { key: '011', chinese: '巽', pinyin: 'Xùn',  english: 'Wind',    symbol: '☴', element: 'Wind'    },
  '101': { key: '101', chinese: '離', pinyin: 'Lí',   english: 'Fire',    symbol: '☲', element: 'Fire'    },
  '110': { key: '110', chinese: '兆', pinyin: 'Duì', english: 'Lake',    symbol: '☱', element: 'Lake'    },
};
