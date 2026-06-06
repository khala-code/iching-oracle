import { useRef, useCallback } from 'react';
import type { CoinState } from '../../types/iching';

const COIN_RADIUS = 22;
const FRICTION = 0.965;      // was 0.985 — decelerates noticeably faster
const SPIN_DECAY = 0.88;     // was 0.93 — spin dies out sooner
const BOUNCE_DAMPING = 0.45;
const SETTLE_SPEED = 0.234;  // px/frame below which coin is considered settled
const ARENA_RADIUS_RATIO = 0.42;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export interface PhysicsOptions {
  canvasWidth: number;
  canvasHeight: number;
  /** 0–1 charge level from the hold button */
  charge: number;
}

export function useCoinPhysics() {
  const coinsRef = useRef<CoinState[]>([]);
  const animFrameRef = useRef<number>(0);

  const launch = useCallback(
    (
      opts: PhysicsOptions,
      onSettle: (coins: CoinState[]) => void,
      drawFn: (coins: CoinState[]) => void,
    ) => {
      const { canvasWidth, canvasHeight, charge } = opts;
      const cx = canvasWidth / 2;
      const cy = canvasHeight / 2;
      const arenaR = canvasWidth * ARENA_RADIUS_RATIO;

      const speed = 3 + charge * 7;

      coinsRef.current = Array.from({ length: 3 }, (_, i) => {
        const angle = (i / 3) * Math.PI * 2 + Math.random() * 0.8;
        const mag = speed * randomBetween(0.6, 1.0);
        return {
          id: i,
          x: cx + randomBetween(-10, 10),
          y: cy + randomBetween(-10, 10),
          vx: Math.cos(angle) * mag,
          vy: Math.sin(angle) * mag,
          angle: Math.random() * Math.PI * 2,
          spin: randomBetween(-0.25, 0.25),
          face: null,
          settled: false,
          insideBoundary: true,
        } satisfies CoinState;
      });

      cancelAnimationFrame(animFrameRef.current);

      function step() {
        const coins = coinsRef.current;
        let allSettled = true;

        for (const c of coins) {
          if (c.settled) continue;
          allSettled = false;

          c.x += c.vx;
          c.y += c.vy;
          c.vx *= FRICTION;
          c.vy *= FRICTION;
          c.angle += c.spin;
          c.spin *= SPIN_DECAY;

          const dx = c.x - cx;
          const dy = c.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = arenaR - COIN_RADIUS;

          if (dist > maxDist) {
            const nx = dx / dist;
            const ny = dy / dist;
            const dot = c.vx * nx + c.vy * ny;
            c.vx = (c.vx - 2 * dot * nx) * BOUNCE_DAMPING;
            c.vy = (c.vy - 2 * dot * ny) * BOUNCE_DAMPING;
            c.x = cx + nx * (maxDist - 1);
            c.y = cy + ny * (maxDist - 1);
          }

          const speed = Math.sqrt(c.vx * c.vx + c.vy * c.vy);
          if (speed < SETTLE_SPEED && Math.abs(c.spin) < 0.01) {
            c.settled = true;
            c.vx = 0;
            c.vy = 0;
            c.spin = 0;
            const normalised = ((c.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
            c.face = (normalised < Math.PI ? Math.random() > 0.5 : Math.random() > 0.5)
              ? 'heads'
              : 'tails';
            const fdx = c.x - cx;
            const fdy = c.y - cy;
            c.insideBoundary = Math.sqrt(fdx * fdx + fdy * fdy) <= arenaR - COIN_RADIUS;
          }
        }

        drawFn([...coins]);

        if (allSettled) {
          onSettle([...coins]);
        } else {
          animFrameRef.current = requestAnimationFrame(step);
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    },
    [],
  );

  const cancel = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
  }, []);

  return { launch, cancel };
}

export { COIN_RADIUS, ARENA_RADIUS_RATIO };
