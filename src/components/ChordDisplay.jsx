import { transposeChord } from '../utils/chordpro';
import ChordDiagram from './ChordDiagram';
import PianoDiagram from './PianoDiagram';
import UkuleleDiagram from './UkuleleDiagram';

function frettedShapeChord(chord, capo) {
  if (!capo) return chord;
  return transposeChord(chord, -capo, true);
}

function FrettedHint({ shapeChord, chord, capo, compact }) {
  if (capo <= 0 || compact) return null;
  return (
    <span className="chord-shape-hint">Forma: {shapeChord} (suena {chord})</span>
  );
}

export default function ChordDisplay({
  chord,
  instrument = 'both',
  compact = false,
  capo = 0,
}) {
  const shapeChord = frettedShapeChord(chord, capo);

  if (instrument === 'guitar') {
    return (
      <div className="chord-display-single">
        <FrettedHint shapeChord={shapeChord} chord={chord} capo={capo} compact={compact} />
        <ChordDiagram chord={shapeChord} compact={compact} />
      </div>
    );
  }

  if (instrument === 'ukulele') {
    return (
      <div className="chord-display-single">
        <FrettedHint shapeChord={shapeChord} chord={chord} capo={capo} compact={compact} />
        <UkuleleDiagram chord={shapeChord} compact={compact} />
      </div>
    );
  }

  if (instrument === 'piano') {
    return <PianoDiagram chord={chord} compact={compact} />;
  }

  if (instrument === 'all') {
    return (
      <div className={`chord-display-dual ${compact ? 'compact' : ''}`}>
        <div className="chord-display-item">
          <span className="chord-display-inst-label">Guitarra{capo > 0 ? ` (cejilla ${capo})` : ''}</span>
          <ChordDiagram chord={shapeChord} compact={compact} />
        </div>
        <div className="chord-display-item">
          <span className="chord-display-inst-label">Ukelele{capo > 0 ? ` (cejilla ${capo})` : ''}</span>
          <UkuleleDiagram chord={shapeChord} compact={compact} />
        </div>
        <div className="chord-display-item">
          <span className="chord-display-inst-label">Piano</span>
          <PianoDiagram chord={chord} compact={compact} />
        </div>
      </div>
    );
  }

  return (
    <div className={`chord-display-dual ${compact ? 'compact' : ''}`}>
      <div className="chord-display-item">
        <span className="chord-display-inst-label">Guitarra{capo > 0 ? ` (cejilla ${capo})` : ''}</span>
        <ChordDiagram chord={shapeChord} compact={compact} />
      </div>
      <div className="chord-display-item">
        <span className="chord-display-inst-label">Piano</span>
        <PianoDiagram chord={chord} compact={compact} />
      </div>
    </div>
  );
}
