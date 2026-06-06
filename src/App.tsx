import { useState, useMemo } from 'react';
import { CoinTossArena } from './components/CoinTossArena';
import { ManualLineInput } from './components/ManualLineInput';
import { ModeSwitch } from './components/ModeSwitch';
import { LineSymbol } from './components/LineSymbol';
import type { InputMode } from './components/ModeSwitch';
import type { TossResult, LineValue } from './types/iching';
import { LINE_LABELS } from './types/iching';
import { interpretReading } from './utils/hexagramLookup';
import './App.css';

const gold      = 'rgba(255,220,100,0.85)';
const goldMid   = 'rgba(255,220,100,0.65)';
const goldDim   = 'rgba(255,220,100,0.4)';
const goldFaint = 'rgba(255,220,100,0.25)';

const ghostBtn: React.CSSProperties = {
  padding: '0.4rem 1rem',
  background: 'transparent',
  border: `1px solid ${goldFaint}`,
  borderRadius: '2px',
  color: goldDim,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '0.8rem',
  letterSpacing: '0.06em',
};

const primaryBtn: React.CSSProperties = {
  padding: '0.5rem 1.5rem',
  background: 'transparent',
  border: `1px solid rgba(255,220,100,0.3)`,
  borderRadius: '2px',
  color: gold,
  cursor: 'pointer',
  fontFamily: 'inherit',
  letterSpacing: '0.04em',
};

function TrigramDisplay({ lines, label }: { lines: LineValue[]; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
      <span style={{ color: goldDim, fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
        {label}
      </span>
      {[...lines].reverse().map((v, i) => (
        <LineSymbol key={i} value={v} width={48} color={goldMid} />
      ))}
    </div>
  );
}

function App() {
  const [lines, setLines] = useState<TossResult[]>([]);
  const [mode, setMode] = useState<InputMode>('simulated');

  function handleToss(result: TossResult) {
    if (!result.valid) return;
    setLines((prev) => (prev.length < 6 ? [...prev, result] : prev));
  }

  function reset() { setLines([]); }
  function undoLast() { setLines((prev) => prev.slice(0, -1)); }

  const done = lines.length === 6;

  const reading = useMemo(
    () => done ? interpretReading(lines.map((r) => r.lineValue)) : null,
    [done, lines],
  );

  return (
    <main style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 1rem',
      gap: '1.5rem',
    }}>
      <h1 style={{ fontFamily: 'serif', letterSpacing: '0.1em', color: gold, margin: 0 }}>
        易經 · I Ching Oracle
      </h1>

      {/* ── Top section: arena (left) + line list (right) side-by-side ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2rem',
        width: '100%',
        maxWidth: '780px',
      }}>
        {/* Arena column — always visible, never moves */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          {!done && (
            <p style={{ color: goldDim, fontSize: '0.85rem', margin: 0 }}>
              Line {lines.length + 1} of 6
            </p>
          )}
          <ModeSwitch mode={mode} onChange={setMode} />
          {mode === 'simulated'
            ? <CoinTossArena onToss={handleToss} />
            : <ManualLineInput onLine={handleToss} />}
        </div>

        {/* Line list column — grows as lines are added */}
        {lines.length > 0 && (
          <section aria-label="Hexagram lines cast so far" style={{ paddingTop: '2rem' }}>
            <ol style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'flex', flexDirection: 'column-reverse', gap: '0.35rem',
            }}>
              {lines.map((r, i) => (
                <li key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  columnGap: '1.5rem',
                  alignItems: 'center',
                  fontSize: '0.9rem',
                  color: r.lineValue === 6 || r.lineValue === 9 ? gold : goldMid,
                  letterSpacing: '0.06em',
                  minWidth: '260px',
                }}>
                  <span style={{ textAlign: 'left', fontFamily: 'monospace' }}>
                    Line {i + 1} · {LINE_LABELS[r.lineValue].name}
                    {(r.lineValue === 6 || r.lineValue === 9) && (
                      <span style={{ color: goldDim, marginLeft: '0.4rem', fontSize: '0.75rem' }}>●</span>
                    )}
                  </span>
                  <LineSymbol value={r.lineValue} width={56} color="currentColor" />
                </li>
              ))}
            </ol>

            {!done && (
              <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '1rem' }}>
                <button style={ghostBtn} onClick={undoLast} aria-label="Remove last line">↩ Undo last</button>
                <button style={ghostBtn} onClick={reset} aria-label="Reset the entire reading">✕ Reset reading</button>
              </div>
            )}
          </section>
        )}
      </div>

      {/* ── Reading result — appears below the arena row once done ── */}
      {done && reading && (
        <section style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '1.5rem', maxWidth: '360px', width: '100%',
          borderTop: `1px solid ${goldFaint}`, paddingTop: '1.5rem',
        }}>
          {/* Trigrams */}
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
            <TrigramDisplay
              lines={lines.slice(0, 3).map((r) => r.lineValue)}
              label={`LOWER · ${reading.lower.english.toUpperCase()}`}
            />
            <TrigramDisplay
              lines={lines.slice(3, 6).map((r) => r.lineValue)}
              label={`UPPER · ${reading.upper.english.toUpperCase()}`}
            />
          </div>

          {/* Hexagram identity */}
          <div style={{ textAlign: 'center', borderTop: `1px solid ${goldFaint}`, paddingTop: '1.25rem', width: '100%' }}>
            {reading.hexagram ? (
              <>
                <div style={{ fontSize: '2.5rem', color: gold, lineHeight: 1, marginBottom: '0.4rem' }}>
                  {reading.hexagram.chinese}
                </div>
                <div style={{ color: goldMid, fontFamily: 'serif', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                  {reading.hexagram.pinyin}
                </div>
                <div style={{ color: goldDim, fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                  Hexagram {reading.hexagram.number} · {reading.hexagram.english}
                </div>
              </>
            ) : (
              <div style={{ color: goldDim, fontSize: '0.85rem' }}>Hexagram not found</div>
            )}
          </div>

          {/* Changing lines */}
          {reading.changingLines.length > 0 && (
            <div style={{
              fontSize: '0.8rem', color: goldDim, letterSpacing: '0.06em',
              borderTop: `1px solid ${goldFaint}`, paddingTop: '0.75rem',
              width: '100%', textAlign: 'center',
            }}>
              Changing lines: {reading.changingLines.join(', ')}
            </div>
          )}

          {/* Relating hexagram */}
          {reading.relating && (
            <div style={{
              textAlign: 'center', borderTop: `1px solid ${goldFaint}`,
              paddingTop: '1.25rem', width: '100%',
            }}>
              <div style={{ color: goldDim, fontSize: '0.7rem', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>
                RELATING HEXAGRAM
              </div>
              <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <TrigramDisplay
                  lines={lines.slice(0, 3).map((r) =>
                    r.lineValue === 6 ? 7 : r.lineValue === 9 ? 8 : r.lineValue
                  )}
                  label={`LOWER · ${reading.relating.lower.english.toUpperCase()}`}
                />
                <TrigramDisplay
                  lines={lines.slice(3, 6).map((r) =>
                    r.lineValue === 6 ? 7 : r.lineValue === 9 ? 8 : r.lineValue
                  )}
                  label={`UPPER · ${reading.relating.upper.english.toUpperCase()}`}
                />
              </div>
              {reading.relating.hexagram ? (
                <>
                  <div style={{ fontSize: '2rem', color: goldMid, lineHeight: 1, marginBottom: '0.3rem' }}>
                    {reading.relating.hexagram.chinese}
                  </div>
                  <div style={{ color: goldDim, fontFamily: 'serif', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                    {reading.relating.hexagram.pinyin}
                  </div>
                  <div style={{ color: goldFaint, fontSize: '0.8rem', letterSpacing: '0.08em' }}>
                    Hexagram {reading.relating.hexagram.number} · {reading.relating.hexagram.english}
                  </div>
                </>
              ) : (
                <div style={{ color: goldDim, fontSize: '0.8rem' }}>Hexagram not found</div>
              )}
            </div>
          )}

          <button style={primaryBtn} onClick={reset}>Consult again</button>
        </section>
      )}
    </main>
  );
}

export default App;
