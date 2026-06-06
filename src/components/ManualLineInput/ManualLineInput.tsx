import { useState, useCallback } from 'react';
import type { CoinFace, TossResult, LineValue } from '../../types/iching';
import { LINE_LABELS } from '../../types/iching';
import styles from './ManualLineInput.module.css';

type CoinSlot = CoinFace | null;

function coinsToLineValue(coins: [CoinFace, CoinFace, CoinFace]): LineValue {
  return coins.reduce(
    (sum, f) => sum + (f === 'heads' ? 3 : 2),
    0,
  ) as LineValue;
}

const QUICK_VALUES: LineValue[] = [6, 7, 8, 9];

const QUICK_LABELS: Record<LineValue, string> = {
  6: '6  Old Yin',
  7: '7  Young Yang',
  8: '8  Young Yin',
  9: '9  Old Yang',
};

interface Props {
  onLine: (result: TossResult) => void;
  disabled?: boolean;
}

export function ManualLineInput({ onLine, disabled = false }: Props) {
  const [coins, setCoins] = useState<[CoinSlot, CoinSlot, CoinSlot]>([null, null, null]);

  const allSet = coins.every((c) => c !== null) as boolean;
  const lineValue = allSet
    ? coinsToLineValue(coins as [CoinFace, CoinFace, CoinFace])
    : null;

  const toggleCoin = useCallback((idx: 0 | 1 | 2) => {
    setCoins((prev) => {
      const next = [...prev] as [CoinSlot, CoinSlot, CoinSlot];
      if (next[idx] === null) next[idx] = 'heads';
      else if (next[idx] === 'heads') next[idx] = 'tails';
      else next[idx] = null;
      return next;
    });
  }, []);

  const submitCoins = useCallback(() => {
    if (!allSet || disabled) return;
    const lv = coinsToLineValue(coins as [CoinFace, CoinFace, CoinFace]);
    onLine({ coins: coins as CoinFace[], lineValue: lv, valid: true });
    setCoins([null, null, null]);
  }, [allSet, coins, disabled, onLine]);

  const submitQuick = useCallback((lv: LineValue) => {
    if (disabled) return;
    const faceMap: Record<LineValue, [CoinFace, CoinFace, CoinFace]> = {
      6: ['tails', 'tails', 'tails'],
      7: ['heads', 'tails', 'tails'],
      8: ['tails', 'heads', 'tails'],
      9: ['heads', 'heads', 'heads'],
    };
    onLine({ coins: faceMap[lv], lineValue: lv, valid: true });
    setCoins([null, null, null]);
  }, [disabled, onLine]);

  const reset = () => setCoins([null, null, null]);

  const coinLabel = (face: CoinSlot) => {
    if (face === null) return '—';
    return face === 'heads' ? '陽  Heads' : '陰  Tails';
  };

  // Live preview using split label
  const previewText = lineValue !== null
    ? `${LINE_LABELS[lineValue].name}  ${LINE_LABELS[lineValue].symbol}`
    : 'Set all three coins to compute the line';

  return (
    <div className={styles.root}>
      <div className={styles.coinsRow} role="group" aria-label="Enter three coin faces">
        {([0, 1, 2] as const).map((idx) => (
          <button
            key={idx}
            className={styles.coinBtn}
            onClick={() => toggleCoin(idx)}
            disabled={disabled}
            aria-pressed={coins[idx] !== null}
            data-face={coins[idx] ?? 'unset'}
            aria-label={
              `Coin ${idx + 1}: ${
                coins[idx] === null ? 'not set — click to set heads'
                : coins[idx] === 'heads' ? 'Heads — click for tails'
                : 'Tails — click to clear'
              }`
            }
          >
            <span className={styles.coinGlyph} aria-hidden="true">
              {coins[idx] === null ? idx + 1 : coins[idx] === 'heads' ? '☰' : '☷'}
            </span>
            <span className={styles.coinFaceLabel}>{coinLabel(coins[idx])}</span>
          </button>
        ))}
      </div>

      <p className={styles.preview} aria-live="polite">{previewText}</p>

      <div className={styles.actions}>
        <button
          className={styles.addBtn}
          onClick={submitCoins}
          disabled={!allSet || disabled}
          aria-label="Add this line to the hexagram"
        >
          Add line
        </button>
        <button
          className={styles.resetBtn}
          onClick={reset}
          disabled={disabled}
          aria-label="Clear coin selection"
        >
          Clear
        </button>
      </div>

      <div className={styles.quickRow}>
        <span className={styles.quickLabel}>Quick</span>
        {QUICK_VALUES.map((lv) => (
          <button
            key={lv}
            className={styles.quickBtn}
            onClick={() => submitQuick(lv)}
            disabled={disabled}
            aria-label={`Add line: ${QUICK_LABELS[lv]}`}
          >
            {QUICK_LABELS[lv]}
          </button>
        ))}
      </div>
    </div>
  );
}
