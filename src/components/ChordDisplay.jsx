import { transposeChord } from '../utils/chordpro';
import ChordDiagram from './ChordDiagram';
import PianoDiagram from './PianoDiagram';

function guitarShapeChord(chord, capo) {
  if (!capo) return chord;
  return transposeChord(chord, -capo, true);
}

export default function ChordDisplay({
  chord,
  instrument = 'both',
  compact = false,
  capo = 0,
}) {
  const guitarChord = guitarShapeChord(chord, capo);

  if (instrument === 'guitar') {
    return (
      <div className="chord-display-single">
        {capo > 0 && !compact && (
          <span className="chord-shape-hint">Forma: {guitarChord} (suena {chord})</span>
        )}
        <ChordDiagram chord={guitarChord} compact={compact} />
      </div>
    );
  }

  if (instrument === 'piano') {
    return <PianoDiagram chord={chord} compact={compact} />;
  }

  return (
    <div className={`chord-display-dual ${compact ? 'compact' : ''}`}>
      <div className="chord-display-item">
        <span className="chord-display-inst-label">Guitarra{capo > 0 ? ` (cejilla ${capo})` : ''}</span>
        <ChordDiagram chord={guitarChord} compact={compact} />
      </div>
      <div className="chord-display-item">
        <span className="chord-display-inst-label">Piano</span>
        <PianoDiagram chord={chord} compact={compact} />
      </div>
    </div>
  );
}
