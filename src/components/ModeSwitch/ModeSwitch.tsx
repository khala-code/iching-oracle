import styles from './ModeSwitch.module.css';

export type InputMode = 'simulated' | 'manual';

interface Props {
  mode: InputMode;
  onChange: (mode: InputMode) => void;
}

export function ModeSwitch({ mode, onChange }: Props) {
  return (
    <div className={styles.root} role="group" aria-label="Toss method">
      {(['simulated', 'manual'] as InputMode[]).map((m) => (
        <button
          key={m}
          className={styles.option}
          onClick={() => onChange(m)}
          aria-pressed={mode === m}
          data-active={mode === m}
        >
          {m === 'simulated' ? 'Simulated toss' : 'Physical throw'}
        </button>
      ))}
    </div>
  );
}
