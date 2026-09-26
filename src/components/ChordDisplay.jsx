import { transposeChord } from '../utils/chordpro';
import { formatChordDisplay } from '../utils/chordNotation';
import ChordDiagram from './ChordDiagram';
import PianoDiagram from './PianoDiagram';
import UkuleleDiagram from './UkuleleDiagram';

function frettedShapeChord(chord, capo) {
  if (!capo) return chord;
  return transposeChord(chord, -capo, true);
}

function FrettedHint({ shapeChord, chord, capo, compact, chordNotation }) {
  if (capo <= 0 || compact) return null;
  return (
    <span className="chord-shape-hint">
      Forma: {formatChordDisplay(shapeChord, chordNotation)} (suena {formatChordDisplay(chord, chordNotation)})
    </span>
  );
}

export default function ChordDisplay({
  chord,
  instrument = 'both',
  compact = false,
  capo = 0,
  chordNotation = 'letters',
}) {
  const shapeChord = frettedShapeChord(chord, capo);
  const displayChord = formatChordDisplay(chord, chordNotation);
  const displayShape = formatChordDisplay(shapeChord, chordNotation);

  if (instrument === 'guitar') {
    return (
      <div className="chord-display-single">
        <FrettedHint shapeChord={shapeChord} chord={chord} capo={capo} compact={compact} chordNotation={chordNotation} />
        <ChordDiagram chord={shapeChord} displayName={displayShape} compact={compact} />
      </div>
    );
  }

  if (instrument === 'ukulele') {
    return (
      <div className="chord-display-single">
        <FrettedHint shapeChord={shapeChord} chord={chord} capo={capo} compact={compact} chordNotation={chordNotation} />
        <UkuleleDiagram chord={shapeChord} displayName={displayShape} compact={compact} />
      </div>
    );
  }

  if (instrument === 'piano') {
    return <PianoDiagram chord={chord} displayName={displayChord} compact={compact} />;
  }

  if (instrument === 'all') {
    return (
      <div className={`chord-display-dual ${compact ? 'compact' : ''}`}>
        <div className="chord-display-item">
          <span className="chord-display-inst-label">Guitarra{capo > 0 ? ` (cejilla ${capo})` : ''}</span>
          <ChordDiagram chord={shapeChord} displayName={displayShape} compact={compact} />
        </div>
        <div className="chord-display-item">
          <span className="chord-display-inst-label">Ukelele{capo > 0 ? ` (cejilla ${capo})` : ''}</span>
          <UkuleleDiagram chord={shapeChord} displayName={displayShape} compact={compact} />
        </div>
        <div className="chord-display-item">
          <span className="chord-display-inst-label">Piano</span>
          <PianoDiagram chord={chord} displayName={displayChord} compact={compact} />
        </div>
      </div>
    );
  }

  return (
    <div className={`chord-display-dual ${compact ? 'compact' : ''}`}>
      <div className="chord-display-item">
        <span className="chord-display-inst-label">Guitarra{capo > 0 ? ` (cejilla ${capo})` : ''}</span>
        <ChordDiagram chord={shapeChord} displayName={displayShape} compact={compact} />
      </div>
      <div className="chord-display-item">
        <span className="chord-display-inst-label">Piano</span>
        <PianoDiagram chord={chord} displayName={displayChord} compact={compact} />
      </div>
    </div>
  );
}
