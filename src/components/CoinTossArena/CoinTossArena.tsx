import { useRef, useEffect, useCallback, useState } from 'react';
import type { CoinState, TossResult, LineValue } from '../../types/iching';
import { useCoinPhysics, COIN_RADIUS, ARENA_RADIUS_RATIO } from './useCoinPhysics';
import styles from './CoinTossArena.module.css';

// ─── Canvas drawing helpers ──────────────────────────────────────────────────

function drawArena(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  // Outer glow ring
  const grad = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r);
  grad.addColorStop(0, 'rgba(255,220,100,0.0)');
  grad.addColorStop(1, 'rgba(255,220,100,0.08)');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Boundary circle stroke
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,220,100,0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner circle hint
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,220,100,0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawCoin(ctx: CanvasRenderingContext2D, c: CoinState, dimmed: boolean) {
  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.rotate(c.angle);

  const alpha = dimmed ? 0.35 : 1;

  // Coin body
  ctx.beginPath();
  ctx.arc(0, 0, COIN_RADIUS, 0, Math.PI * 2);
  const coinGrad = ctx.createRadialGradient(-6, -6, 2, 0, 0, COIN_RADIUS);
  coinGrad.addColorStop(0, `rgba(255,228,100,${alpha})`);
  coinGrad.addColorStop(0.6, `rgba(210,170,50,${alpha})`);
  coinGrad.addColorStop(1, `rgba(160,120,20,${alpha})`);
  ctx.fillStyle = coinGrad;
  ctx.fill();

  // Rim
  ctx.beginPath();
  ctx.arc(0, 0, COIN_RADIUS, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(120,85,10,${alpha * 0.8})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  if (c.settled && c.face) {
    ctx.font = `bold ${Math.round(COIN_RADIUS * 0.85)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(80,50,5,${alpha})`;
    ctx.fillText(c.face === 'heads' ? '陽' : '陰', 0, 1);
  }

  ctx.restore();
}

function renderFrame(canvas: HTMLCanvasElement, coins: CoinState[]) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;
  const arenaR = width * ARENA_RADIUS_RATIO;

  drawArena(ctx, cx, cy, arenaR);

  for (const c of coins) {
    drawCoin(ctx, c, !c.insideBoundary && c.settled);
  }
}

// ─── Line-value calculation ──────────────────────────────────────────────────
function calcLineValue(coins: CoinState[]): LineValue {
  const sum = coins.reduce<number>((acc, c) => acc + (c.face === 'heads' ? 3 : 2), 0);
  return sum as LineValue;
}

// ─── Component ───────────────────────────────────────────────────────────────
interface Props {
  onToss: (result: TossResult) => void;
  disabled?: boolean;
}

export function CoinTossArena({ onToss, disabled = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chargeRef = useRef(0);
  const chargeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [charging, setCharging] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0); // 0–1 for UI display
  const [status, setStatus] = useState<'idle' | 'tossing' | 'invalid' | 'done'>('idle');
  const { launch, cancel } = useCoinPhysics();

  // Draw empty arena on mount / resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderFrame(canvas, []);
  }, []);

  const handleSettle = useCallback(
    (coins: CoinState[]) => {
      const allInside = coins.every((c) => c.insideBoundary);
      if (!allInside) {
        setStatus('invalid');
        return;
      }
      const lineValue = calcLineValue(coins);
      const result: TossResult = {
        coins: coins.map((c) => c.face!),
        lineValue,
        valid: true,
      };
      setStatus('done');
      onToss(result);
    },
    [onToss],
  );

  const startCharge = useCallback(() => {
    if (disabled || status === 'tossing') return;
    chargeRef.current = 0;
    setChargeLevel(0);
    setCharging(true);
    setStatus('idle');

    chargeIntervalRef.current = setInterval(() => {
      chargeRef.current = Math.min(1, chargeRef.current + 0.025);
      setChargeLevel(chargeRef.current);
    }, 30);
  }, [disabled, status]);

  const releaseCharge = useCallback(() => {
    if (!charging) return;
    if (chargeIntervalRef.current) clearInterval(chargeIntervalRef.current);
    setCharging(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    setStatus('tossing');
    launch(
      { canvasWidth: canvas.width, canvasHeight: canvas.height, charge: chargeRef.current },
      handleSettle,
      (coins) => renderFrame(canvas, coins),
    );
  }, [charging, launch, handleSettle]);

  // Keyboard support: Space / Enter
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        startCharge();
      }
    },
    [startCharge],
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        releaseCharge();
      }
    },
    [releaseCharge],
  );

  // Cancel animation on unmount
  useEffect(() => () => cancel(), [cancel]);

  const statusText = {
    idle: 'Hold to charge — release to cast',
    tossing: 'The coins are falling…',
    invalid: 'A coin left the circle — toss again',
    done: 'Line cast',
  }[status];

  const buttonLabel = charging ? `Charging… ${Math.round(chargeLevel * 100)}%` : 'Cast the coins';

  return (
    <div className={styles.arena}>
      <canvas
        ref={canvasRef}
        width={320}
        height={320}
        className={styles.canvas}
        aria-label="Coin toss arena"
        role="img"
      />

      {/* Charge bar */}
      <div className={styles.chargeBarTrack} aria-hidden="true">
        <div
          className={styles.chargeBarFill}
          style={{ width: `${chargeLevel * 100}%` }}
        />
      </div>

      <button
        className={styles.tossButton}
        onMouseDown={startCharge}
        onMouseUp={releaseCharge}
        onMouseLeave={releaseCharge}
        onTouchStart={(e) => { e.preventDefault(); startCharge(); }}
        onTouchEnd={(e) => { e.preventDefault(); releaseCharge(); }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        disabled={disabled || status === 'tossing'}
        aria-label={buttonLabel}
        aria-busy={status === 'tossing'}
        data-charging={charging}
        data-invalid={status === 'invalid'}
      >
        {buttonLabel}
      </button>

      <p className={styles.status} role="status" aria-live="polite">
        {statusText}
      </p>
    </div>
  );
}
