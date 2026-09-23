import ChordDisplay from './ChordDisplay';

export default function ChordStrip({
  chords,
  activeChord,
  onSelectChord,
  instrument = 'both',
  capo = 0,
}) {
  if (!chords.length) return null;

  return (
    <div className="chord-strip">
      <p className="chord-strip-label">Acordes de la canción — tocá para ver el diagrama</p>
      <div className="chord-strip-scroll">
        {chords.map((chord) => (
          <button
            key={chord}
            type="button"
            className={`chord-strip-item ${activeChord === chord ? 'active' : ''}`}
            onClick={() => onSelectChord(activeChord === chord ? null : chord)}
          >
            <ChordDisplay chord={chord} instrument={instrument} compact capo={capo} />
          </button>
        ))}
      </div>
      {activeChord && (
        <div className="chord-strip-expanded">
          <ChordDisplay chord={activeChord} instrument={instrument} capo={capo} />
        </div>
      )}
    </div>
  );
}
