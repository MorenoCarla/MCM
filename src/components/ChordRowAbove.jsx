import { splitChordLine } from '../utils/cifraClub';

export default function ChordRowAbove({ chordLine, onChordClick }) {
  const parts = splitChordLine(chordLine);

  return (
    <div className="chord-row-above" aria-hidden={false}>
      {parts.map((part, i) =>
        part.type === 'chord' ? (
          <button
            key={i}
            type="button"
            className="chord-mark chord-mark-btn chord-above"
            onClick={() => onChordClick(part.text)}
            title="Ver diagrama"
          >
            {part.text}
          </button>
        ) : (
          <span key={i} className="chord-spacer">{part.text}</span>
        )
      )}
    </div>
  );
}
