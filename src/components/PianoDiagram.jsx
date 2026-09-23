import { getPianoKeys } from '../utils/pianoChords';

const WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23];
const BLACK_KEYS = [
  { semitone: 1, afterWhite: 0 },
  { semitone: 3, afterWhite: 1 },
  { semitone: 6, afterWhite: 3 },
  { semitone: 8, afterWhite: 4 },
  { semitone: 10, afterWhite: 5 },
  { semitone: 13, afterWhite: 7 },
  { semitone: 15, afterWhite: 8 },
  { semitone: 18, afterWhite: 10 },
  { semitone: 20, afterWhite: 11 },
  { semitone: 22, afterWhite: 12 },
];

const WHITE_W = 14;
const WHITE_H = 52;
const BLACK_W = 10;
const BLACK_H = 32;
const W = WHITE_KEYS.length * WHITE_W;
const H = WHITE_H + 14;

export default function PianoDiagram({ chord, compact = false }) {
  const { keys, parsed } = getPianoKeys(chord);
  const activeSet = new Set(keys);
  const scale = compact ? 0.65 : 1;

  if (!parsed) {
    return (
      <div className={`piano-diagram ${compact ? 'compact' : ''} unknown`}>
        <span className="chord-diagram-name">{chord}</span>
        <span className="chord-diagram-fallback">Sin diagrama</span>
      </div>
    );
  }

  return (
    <div className={`piano-diagram ${compact ? 'compact' : ''}`}>
      <span className="chord-diagram-name">{chord}</span>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W * scale}
        height={H * scale}
        className="piano-diagram-svg"
        aria-hidden="true"
      >
        {WHITE_KEYS.map((st, i) => {
          const active = activeSet.has(st);
          return (
            <rect
              key={`w-${st}`}
              x={i * WHITE_W}
              y={0}
              width={WHITE_W - 1}
              height={WHITE_H}
              rx={1}
              className={active ? 'piano-key white active' : 'piano-key white'}
            />
          );
        })}

        {BLACK_KEYS.map(({ semitone, afterWhite }) => {
          const active = activeSet.has(semitone);
          const x = (afterWhite + 1) * WHITE_W - BLACK_W / 2;
          return (
            <rect
              key={`b-${semitone}`}
              x={x}
              y={0}
              width={BLACK_W}
              height={BLACK_H}
              rx={1}
              className={active ? 'piano-key black active' : 'piano-key black'}
            />
          );
        })}
      </svg>
      {!compact && (
        <span className="piano-notes-label">{parsed.label}</span>
      )}
    </div>
  );
}
