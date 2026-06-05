# 易經占卜 · I Ching Oracle

A web-based I Ching consultation tool. Cast three coins, build a hexagram line by line, and receive a prewritten reading for the hexagram revealed.

> *Phase 1 — The Oracle Answers*

---

## What It Does

- **Coin toss physics** — hold and release a button to throw three coins; a canvas circle acts as the throw boundary, discarding tosses that land outside it so every result is a fair, unforced cast
- **Hexagram builder** — six lines are built from the bottom up, each determined by the sum of the three coins (heads = 3, tails = 2); moving lines are flagged
- **Oracle reading** — on completion, the app looks up the resulting hexagram (1–64) and displays a prewritten summary of its classical meaning
- **All 64 hexagrams** covered with base summaries in Phase 1

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Physics / canvas | Custom canvas 2D (no engine dependency) |
| Styling | CSS Modules / TBD |
| Data | Static JSON — hexagram definitions |

---

## Project Structure

```
iching-oracle/
├── public/
├── src/
│   ├── components/
│   │   ├── CoinTossArena/     # Canvas circle + coin physics
│   │   ├── HexagramDisplay/   # Six-line builder UI
│   │   └── OracleReading/     # Reading panel
│   ├── data/
│   │   └── hexagrams.ts       # All 64 hexagram summaries
│   ├── hooks/
│   │   └── useCoinToss.ts     # Toss logic + line-value calculation
│   ├── types/
│   │   └── iching.ts          # Line, Hexagram, TossResult types
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

---

## How a Reading Works

The classical three-coin method assigns values to each coin:

| Face | Value |
|---|---|
| Heads (Yang) | 3 |
| Tails (Yin) | 2 |

The three coins are summed to score a line:

| Sum | Line type | Symbol |
|---|---|---|
| 6 | Old Yin (moving) | `-- x --` |
| 7 | Young Yang | `———` |
| 8 | Young Yin | `-- --` |
| 9 | Old Yang (moving) | `———o` |

Six lines are cast from the **bottom up** to form the hexagram. Moving lines indicate a second hexagram (the relating hexagram) — tracked for Phase 2.

---

## Coin Toss UI

- A **circular arena** is drawn on canvas; coins that land outside the boundary are ignored and the toss is re-prompted — no invalid throws enter the reading
- The **throw button** is held to charge the toss and released to cast; timing/pressure is fed as a seed offset to the physics sim so no two tosses are identical
- Coins animate with **canvas 2D physics** — velocity, spin, and bounce — before settling to heads or tails

---

## Roadmap

### Phase 1 — The Oracle Answers *(current)*
- [x] Project setup (React + TypeScript + Vite)
- [ ] Coin toss arena (canvas + boundary circle)
- [ ] Physics simulation (toss button, coin bounce/settle)
- [ ] Line-value calculation from toss result
- [ ] Hexagram builder (six-line display, bottom-up)
- [ ] All 64 hexagram summaries (static data)
- [ ] Oracle reading panel

### Phase 2 — Moving Lines
- [ ] Detect moving lines and derive the relating hexagram
- [ ] Display both primary and relating hexagram readings
- [ ] Per-line commentary for moving lines

### Phase 3 — Depth & Polish
- [ ] Expanded hexagram text (judgment, image, commentary)
- [ ] Session history / reading log
- [ ] Accessibility pass
- [ ] Mobile optimisation

---

## Contributing

Work is done on feature branches — do not push directly to `main`.

```
main          ← stable / deployed
develop       ← integration branch (optional)
feature/*     ← new features
docs/*        ← documentation only
fix/*         ← bug fixes
```

Open a PR into `main` when a phase is complete and all items in the roadmap checklist are ticked.

---

## Licence

MIT
