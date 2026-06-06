import type { LineValue } from '../../types/iching';

interface Props {
  value: LineValue;
  width?: number;
  height?: number;
  color?: string;
}

// SVG dimensions
const W = 56;   // total width
const H = 10;   // total height
const Y = H / 2; // vertical centre
const SW = 2.5; // stroke width
const GAP = 10; // gap between yin dashes (each side)
const SEG = (W - GAP * 2) / 2; // segment length for broken lines

export function LineSymbol({ value, width = W, height = H, color = 'currentColor' }: Props) {
  const scale = width / W;

  return (
    <svg
      width={width}
      height={height * scale}
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {value === 7 && (
        // Young Yang — single solid bar
        <line x1={0} y1={Y} x2={W} y2={Y} stroke={color} strokeWidth={SW} strokeLinecap="round" />
      )}

      {value === 8 && (
        // Young Yin — two bars with gap
        <>
          <line x1={0}           y1={Y} x2={SEG}      y2={Y} stroke={color} strokeWidth={SW} strokeLinecap="round" />
          <line x1={SEG + GAP*2} y1={Y} x2={W}        y2={Y} stroke={color} strokeWidth={SW} strokeLinecap="round" />
        </>
      )}

      {value === 9 && (
        // Old Yang — solid bar with circle marker at centre
        <>
          <line x1={0} y1={Y} x2={W} y2={Y} stroke={color} strokeWidth={SW} strokeLinecap="round" />
          <circle cx={W / 2} cy={Y} r={SW * 1.4} fill={color} />
        </>
      )}

      {value === 6 && (
        // Old Yin — two bars with × marker at centre
        <>
          <line x1={0}           y1={Y} x2={SEG}      y2={Y} stroke={color} strokeWidth={SW} strokeLinecap="round" />
          <line x1={SEG + GAP*2} y1={Y} x2={W}        y2={Y} stroke={color} strokeWidth={SW} strokeLinecap="round" />
          {/* × mark */}
          <line
            x1={W/2 - SW*1.5} y1={Y - SW*1.5}
            x2={W/2 + SW*1.5} y2={Y + SW*1.5}
            stroke={color} strokeWidth={SW * 0.9} strokeLinecap="round"
          />
          <line
            x1={W/2 + SW*1.5} y1={Y - SW*1.5}
            x2={W/2 - SW*1.5} y2={Y + SW*1.5}
            stroke={color} strokeWidth={SW * 0.9} strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
