# 易經 · I Ching Oracle

A clean, meditative I Ching divination app built with React, TypeScript, and Vite. Cast a hexagram using the traditional yarrow-stalk probability system, identify the primary and relating hexagrams across all 64 of the King Wen sequence, and read the changing lines.

---

## Features

- **Two casting modes** — yarrow-stalk (traditional weighted probabilities) and three-coin toss
- **Full King Wen sequence** — all 64 hexagrams with verified binary keys, Chinese characters, pinyin, and English titles
- **Changing lines** — moving lines (Old Yang / Old Yin) are identified and the relating hexagram is automatically derived
- **Trigram display** — lower and upper trigrams shown with glyph renderings for both the primary and relating hexagrams
- **Responsive layout** — casting arena and line list side-by-side; reading output flows beneath

---

## Tech Stack

| | |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build tool | Vite 8 |
| Styling | CSS Modules |
| Linting | ESLint + typescript-eslint |
| Hosting | GitHub Pages (via Actions) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run locally

```bash
git clone https://github.com/khala-code/iching-oracle.git
cd iching-oracle
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the build locally:

```bash
npm run preview
```

---

## Project Structure

```
iching-oracle/
├── src/
│   ├── components/       # React components (Arena, LineList, HexagramDisplay, …)
│   ├── data/
│   │   ├── hexagrams.ts  # All 64 hexagrams — verified King Wen binary keys
│   │   └── trigrams.ts   # 8 trigram definitions
│   ├── hooks/            # Casting logic, state
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
└── package.json
```

---

## Hexagram Data

All 64 hexagrams are keyed by a 6-character binary string representing the line pattern bottom-to-top (`1` = yang, `0` = yin). For example:

| Key | # | Chinese | Pinyin | English |
|---|---|---|---|---|
| `111111` | 1 | 乾 | Qián | The Creative |
| `000000` | 2 | 坤 | Kūn | The Receptive |
| `011111` | 44 | 姤 | Gòu | Coming to Meet |

The lower trigram is `key[0..2]` and the upper trigram is `key[3..5]`. Several hexagram pairs share the same trigram combination (e.g. #28 and #61 are both Wind/Lake) — their keys are distinguished by the actual line order, not just the trigram pair.

---

## Deployment

The app is deployed automatically to **GitHub Pages** on every push to `main` via the workflow at `.github/workflows/deploy.yml`.

Live site: **https://khala-code.github.io/iching-oracle/**

To deploy manually:

```bash
npm run build
# then push the dist/ folder to the gh-pages branch, or let the Action handle it
```

---

## Casting Probabilities

The yarrow-stalk method produces the classical weighted line probabilities:

| Line type | Symbol | Yang/Yin | Probability |
|---|---|---|---|
| Old Yin (moving) | — × — | Yin → Yang | 1/16 |
| Young Yang | ——— | Yang | 5/16 |
| Young Yin | — — | Yin | 7/16 |
| Old Yang (moving) | —●— | Yang → Yin | 3/16 |

---

## License

MIT
