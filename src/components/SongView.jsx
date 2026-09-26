import { useEffect, useMemo, useRef, useState } from 'react';
import {
  bodyHasChords,
  formatKeyLabel,
  getKeyAfterTranspose,
  parseBodyLines,
} from '../utils/chordpro';
import { extractChordsFromBody } from '../utils/chordDiagrams';
import {
  getInitialChordNotation,
  saveChordNotation,
  formatChordDisplay,
} from '../utils/chordNotation';
import { formatAllPlacements } from '../utils/placements';
import ChordNotationToggle from './ChordNotationToggle';
import KeyPicker from './KeyPicker';
import CapoPicker from './CapoPicker';
import ChordStrip from './ChordStrip';
import ChordDisplay from './ChordDisplay';
import InstrumentSelector from './InstrumentSelector';
import PlayerControls from './PlayerControls';
import ChordRowAbove from './ChordRowAbove';

export default function SongView({
  song,
  onBack,
  onEdit,
  onDelete,
}) {
  const hasChords = bodyHasChords(song.body);
  const [showChords, setShowChords] = useState(hasChords);
  const [transpose, setTranspose] = useState(0);
  const [capo, setCapo] = useState(song.defaultCapo || 0);
  const [activeChord, setActiveChord] = useState(null);
  const [inlineChord, setInlineChord] = useState(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(3);
  const [presentationMode, setPresentationMode] = useState(false);
  const [instrument, setInstrument] = useState('both');
  const [chordNotation, setChordNotation] = useState(getInitialChordNotation);
  const lyricsScrollRef = useRef(null);

  function handleChordNotationChange(next) {
    setChordNotation(saveChordNotation(next));
  }

  const lines = parseBodyLines(song.body, transpose);
  const displayKey = song.key ? getKeyAfterTranspose(song.key, transpose) : null;

  const uniqueChords = useMemo(
    () => extractChordsFromBody(song.body, transpose),
    [song.body, transpose]
  );

  const meta = formatAllPlacements(song);
  if (displayKey) meta.push(formatKeyLabel(displayKey, chordNotation));
  else if (song.key) meta.push(formatKeyLabel(song.key, chordNotation));
  if (capo > 0) meta.push(`Cejilla traste ${capo}`);
  if (song.artist) meta.push(song.artist);

  useEffect(() => {
    document.body.classList.toggle('presentation-mode', presentationMode);
    return () => document.body.classList.remove('presentation-mode');
  }, [presentationMode]);

  useEffect(() => {
    if (!autoScroll) return undefined;

    const panel = lyricsScrollRef.current;
    if (!panel) return undefined;

    const interval = setInterval(() => {
      panel.scrollBy({ top: scrollSpeed * 0.5, behavior: 'auto' });
    }, 50);

    return () => clearInterval(interval);
  }, [autoScroll, scrollSpeed]);

  useEffect(() => {
    setCapo(song.defaultCapo || 0);
    setTranspose(0);
    setActiveChord(null);
    setInlineChord(null);
    setAutoScroll(false);
    if (lyricsScrollRef.current) {
      lyricsScrollRef.current.scrollTop = 0;
    }
  }, [song.id, song.defaultCapo]);

  function handleDelete() {
    if (window.confirm(`¿Eliminar "${song.title}"?`)) {
      onDelete(song.id);
    }
  }

  function handleInlineChordClick(chord) {
    setInlineChord((prev) => (prev === chord ? null : chord));
  }

  return (
    <section className={`view-section song-view ${presentationMode ? 'is-presentation' : ''}`}>
      <div className="song-toolbar">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          ← Volver
        </button>
        <div className="toolbar-actions">
          {hasChords && (
            <>
              <label className="toggle-chords">
                <input
                  type="checkbox"
                  checked={showChords}
                  onChange={(e) => setShowChords(e.target.checked)}
                />
                <span>Acordes</span>
              </label>
              <ChordNotationToggle
                value={chordNotation}
                onChange={handleChordNotationChange}
              />
            </>
          )}
          {!presentationMode && (
            <>
              <button type="button" className="btn btn-secondary" onClick={() => onEdit(song.id)}>
                Editar
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>

      <PlayerControls
        autoScroll={autoScroll}
        scrollSpeed={scrollSpeed}
        presentationMode={presentationMode}
        onToggleScroll={() => setAutoScroll((v) => !v)}
        onScrollSpeedChange={setScrollSpeed}
        onTogglePresentation={() => setPresentationMode((v) => !v)}
      />

      <article className="song-display">
        <h2 className="song-title">{song.title}</h2>
        {meta.length > 0 && <p className="song-meta">{meta.join(' · ')}</p>}

        {hasChords && showChords && (
          <>
            <InstrumentSelector value={instrument} onChange={setInstrument} />
            <KeyPicker
              originalKey={song.key}
              transpose={transpose}
              onChange={setTranspose}
            />
            {(instrument === 'guitar' || instrument === 'ukulele' || instrument === 'both' || instrument === 'all') && (
              <CapoPicker capo={capo} onChange={setCapo} />
            )}
            <ChordStrip
              chords={uniqueChords}
              activeChord={activeChord}
              onSelectChord={setActiveChord}
              instrument={instrument}
              capo={capo}
              chordNotation={chordNotation}
            />
          </>
        )}

        {inlineChord && showChords && (
          <div className="inline-chord-popup">
            <ChordDisplay chord={inlineChord} instrument={instrument} capo={capo} chordNotation={chordNotation} />
            <button type="button" className="inline-chord-close" onClick={() => setInlineChord(null)}>
              Cerrar
            </button>
          </div>
        )}

        <div
          ref={lyricsScrollRef}
          className={`song-lyrics-scroll ${presentationMode ? 'is-presentation' : ''}`}
        >
          <div className={`song-content ${showChords ? '' : 'no-chords'} ${presentationMode ? 'presentation' : ''}`}>
          {lines.map((line) => {
            if (line.display === 'above' || line.display === 'chords-only') {
              return (
                <div key={line.key} className={line.className}>
                  <ChordRowAbove
                    chordLine={line.chordLine}
                    onChordClick={handleInlineChordClick}
                    chordNotation={chordNotation}
                  />
                  {line.lyricLine && (
                    <div className="lyric-row-below">{line.lyricLine}</div>
                  )}
                </div>
              );
            }

            return (
              <div key={line.key} className={line.className}>
                {line.segments?.map((segment, i) =>
                  segment.type === 'chord' ? (
                    <button
                      key={i}
                      type="button"
                      className="chord-mark chord-mark-btn"
                      onClick={() => handleInlineChordClick(segment.text)}
                      title="Ver diagrama"
                    >
                      {formatChordDisplay(segment.text, chordNotation)}
                    </button>
                  ) : (
                    <span key={i} className="lyric-chunk">{segment.text}</span>
                  )
                )}
              </div>
            );
          })}
          </div>
        </div>
      </article>
    </section>
  );
}
