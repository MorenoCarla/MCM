import { getChordDiagram } from '../utils/chordDiagrams';

const STRING_COUNT = 6;
const FRET_COUNT = 4;
const W = 72;
const H = 88;
const PAD = 10;
const FRET_W = W - PAD * 2;
const FRET_H = (H - PAD * 2) / (FRET_COUNT + 0.5);

export default function ChordDiagram({ chord, displayName, compact = false }) {
  const data = getChordDiagram(chord);
  const size = compact ? 56 : W;

  if (!data) {
    return (
      <div className={`chord-diagram ${compact ? 'compact' : ''} unknown`}>
        <span className="chord-diagram-name">{displayName || chord}</span>
        <span className="chord-diagram-fallback">Sin diagrama</span>
      </div>
    );
  }

  const { frets, fingers, barre, baseFret = 1 } = data;
  const scale = compact ? size / W : 1;
  const svgW = W * scale;
  const svgH = H * scale;

  function xForString(stringIndex) {
    return PAD + (stringIndex * FRET_W) / (STRING_COUNT - 1);
  }

  function yForFret(fret) {
    if (fret === 0) return PAD - 2;
    const rel = fret - baseFret + 1;
    return PAD + (rel - 0.5) * FRET_H;
  }

  return (
    <div className={`chord-diagram ${compact ? 'compact' : ''}`}>
      <span className="chord-diagram-name">{displayName || chord}</span>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={svgW}
        height={svgH}
        className="chord-diagram-svg"
        aria-hidden="true"
      >
        {baseFret > 1 && (
          <text x={2} y={PAD + FRET_H * 0.7} className="chord-diagram-base">
            {baseFret}
          </text>
        )}

        {baseFret === 1 && (
          <line
            x1={PAD}
            y1={PAD - 1}
            x2={W - PAD}
            y2={PAD - 1}
            className="chord-diagram-nut"
          />
        )}

        {Array.from({ length: FRET_COUNT + 1 }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={PAD}
            y1={PAD + i * FRET_H}
            x2={W - PAD}
            y2={PAD + i * FRET_H}
            className="chord-diagram-fret"
          />
        ))}

        {Array.from({ length: STRING_COUNT }).map((_, i) => (
          <line
            key={`string-${i}`}
            x1={xForString(i)}
            y1={PAD}
            x2={xForString(i)}
            y2={PAD + FRET_COUNT * FRET_H}
            className="chord-diagram-string"
          />
        ))}

        {barre && (
          <rect
            x={xForString(barre.from - 1) - 5}
            y={yForFret(barre.fret) - 5}
            width={xForString(barre.to - 1) - xForString(barre.from - 1) + 10}
            height={10}
            rx={5}
            className="chord-diagram-barre"
          />
        )}

        {frets.map((fret, stringIndex) => {
          if (fret === -1) {
            return (
              <text
                key={`muted-${stringIndex}`}
                x={xForString(stringIndex)}
                y={PAD - 4}
                className="chord-diagram-muted"
                textAnchor="middle"
              >
                ×
              </text>
            );
          }
          if (fret === 0) {
            return (
              <circle
                key={`open-${stringIndex}`}
                cx={xForString(stringIndex)}
                cy={PAD - 4}
                r={3}
                className="chord-diagram-open"
              />
            );
          }
          const isBarreFinger = barre && fret === barre.fret;
          if (isBarreFinger) return null;

          return (
            <g key={`finger-${stringIndex}`}>
              <circle
                cx={xForString(stringIndex)}
                cy={yForFret(fret)}
                r={5}
                className="chord-diagram-dot"
              />
              {fingers?.[stringIndex] && !compact && (
                <text
                  x={xForString(stringIndex)}
                  y={yForFret(fret) + 3}
                  className="chord-diagram-finger-num"
                  textAnchor="middle"
                >
                  {fingers[stringIndex]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
