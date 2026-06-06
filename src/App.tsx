import { useState } from 'react';
import { CoinTossArena } from './components/CoinTossArena';
import { ManualLineInput } from './components/ManualLineInput';
import { ModeSwitch } from './components/ModeSwitch';
import type { InputMode } from './components/ModeSwitch';
import type { TossResult } from './types/iching';
import { LINE_LABELS } from './types/iching';
import './App.css';

const ghostBtn: React.CSSProperties = {
  padding: '0.4rem 1rem',
  background: 'transparent',
  border: '1px solid rgba(255,220,100,0.2)',
  borderRadius: '2px',
  color: 'rgba(255,220,100,0.45)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '0.8rem',
  letterSpacing: '0.06em',
};

const primaryBtn: React.CSSProperties = {
  padding: '0.5rem 1.5rem',
  background: 'transparent',
  border: '1px solid rgba(255,220,100,0.3)',
  borderRadius: '2px',
  color: 'rgba(255,220,100,0.8)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  letterSpacing: '0.04em',
};

function App() {
  const [lines, setLines] = useState<TossResult[]>([]);
  const [mode, setMode] = useState<InputMode>('simulated');

  function handleToss(result: TossResult) {
    if (!result.valid) return;
    setLines((prev) => (prev.length < 6 ? [...prev, result] : prev));
  }

  function reset() {
    setLines([]);
  }

  function undoLast() {
    setLines((prev) => prev.slice(0, -1));
  }

  const done = lines.length === 6;

  return (
    <main style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem',
      gap: '1.5rem',
    }}>
      <h1 style={{
        fontFamily: 'serif',
        letterSpacing: '0.1em',
        color: 'rgba(255,220,100,0.85)',
        margin: 0,
      }}>
        易經 · I Ching Oracle
      </h1>

      {/* Hexagram lines — built bottom-up */}
      {lines.length > 0 && (
        <section aria-label="Hexagram lines cast so far">
          <ol style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: '0.35rem',
          }}>
            {lines.map((r, i) => {
              const label = LINE_LABELS[r.lineValue];
              return (
                <li
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    columnGap: '1.5rem',
                    alignItems: 'baseline',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    color: 'rgba(255,220,100,0.7)',
                    letterSpacing: '0.06em',
                    minWidth: '260px',
                  }}
                >
                  <span style={{ textAlign: 'left' }}>
                    Line {i + 1} · {label.name}
                  </span>
                  <span style={{ textAlign: 'right', opacity: 0.85 }}>
                    {label.symbol}
                  </span>
                </li>
              );
            })}
          </ol>

          <div style={{
            display: 'flex',
            gap: '0.6rem',
            justifyContent: 'center',
            marginTop: '1rem',
          }}>
            <button style={ghostBtn} onClick={undoLast} aria-label="Remove last line">
              ↩ Undo last
            </button>
            <button style={ghostBtn} onClick={reset} aria-label="Reset the entire reading">
              ✕ Reset reading
            </button>
          </div>
        </section>
      )}

      {!done && (
        <>
          <p style={{ color: 'rgba(255,220,100,0.5)', fontSize: '0.85rem', margin: 0 }}>
            Line {lines.length + 1} of 6
          </p>

          <ModeSwitch mode={mode} onChange={setMode} />

          {mode === 'simulated'
            ? <CoinTossArena onToss={handleToss} />
            : <ManualLineInput onLine={handleToss} />}
        </>
      )}

      {done && (
        <section style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <p style={{
            color: 'rgba(255,220,100,0.75)',
            fontFamily: 'serif',
            fontSize: '1.1rem',
          }}>
            Hexagram complete — reading coming in Phase 1.
          </p>
          <button style={primaryBtn} onClick={reset}>
            Consult again
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
