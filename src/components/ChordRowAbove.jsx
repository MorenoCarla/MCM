import { splitChordLine } from '../utils/cifraClub';
import { formatChordDisplay } from '../utils/chordNotation';

export default function ChordRowAbove({ chordLine, onChordClick, chordNotation = 'letters' }) {
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
            {formatChordDisplay(part.text, chordNotation)}
          </button>
        ) : (
          <span key={i} className="chord-spacer">{part.text}</span>
        )
      )}
    </div>
  );
}
