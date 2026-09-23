const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const ENHARMONIC = {
  Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#',
};

const CHORD_ROOT = /^([A-G](?:#|b)?)(.*)$/;

export function noteIndex(note) {
  const normalized = ENHARMONIC[note] || note;
  const idx = NOTES_SHARP.indexOf(normalized);
  return idx >= 0 ? idx : NOTES_FLAT.indexOf(note);
}

export function transposeNote(note, semitones, preferFlats = false) {
  const idx = noteIndex(note);
  if (idx < 0) return note;
  const next = (idx + semitones + 120) % 12;
  return preferFlats ? NOTES_FLAT[next] : NOTES_SHARP[next];
}

export function transposeChord(chord, semitones, preferFlats = false) {
  const match = chord.match(CHORD_ROOT);
  if (!match) return chord;
  const root = transposeNote(match[1], semitones, preferFlats);
  return root + match[2];
}
