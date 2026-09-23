const NOTE_INDEX = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
  'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
};

const NOTE_NAMES = ['Do', 'Do#', 'Re', 'Mib', 'Mi', 'Fa', 'Fa#', 'Sol', 'Lab', 'La', 'Sib', 'Si'];

const CHORD_REGEX = /^([A-G](?:#|b)?)(.*)$/i;

const INTERVALS = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  '7': [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  m7: [0, 3, 7, 10],
  dim7: [0, 3, 6, 9],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  '6': [0, 4, 7, 9],
  m6: [0, 3, 7, 9],
  '9': [0, 4, 7, 10, 14],
  m9: [0, 3, 7, 10, 14],
};

function normalizeRoot(root) {
  const r = root.charAt(0).toUpperCase() + root.slice(1);
  if (r.length === 2 && r[1] === 'b') {
    const flatMap = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' };
    return flatMap[r] || r;
  }
  return r;
}

function detectQuality(suffix) {
  const s = (suffix || '').toLowerCase();
  if (!s || s === 'maj') return 'major';
  if (s.startsWith('maj7') || s === 'ma7') return 'maj7';
  if (s.startsWith('m7') || s.startsWith('min7')) return 'm7';
  if (s.startsWith('dim7')) return 'dim7';
  if (s.startsWith('dim')) return 'dim';
  if (s.startsWith('aug') || s.includes('+')) return 'aug';
  if (s.startsWith('sus2')) return 'sus2';
  if (s.startsWith('sus4') || s.startsWith('sus')) return 'sus4';
  if (s.startsWith('m6') || s.startsWith('min6')) return 'm6';
  if (s === '6') return '6';
  if (s.startsWith('m9') || s.startsWith('min9')) return 'm9';
  if (s.startsWith('9')) return '9';
  if (s.startsWith('m') || s.startsWith('min')) return 'minor';
  if (s === '7' || s.startsWith('dom7')) return '7';
  return 'major';
}

export function parsePianoChord(chord) {
  const match = chord.trim().match(CHORD_REGEX);
  if (!match) return null;

  const root = normalizeRoot(match[1]);
  const rootIndex = NOTE_INDEX[root];
  if (rootIndex === undefined) return null;

  const quality = detectQuality(match[2]);
  const intervals = INTERVALS[quality] || INTERVALS.major;

  const semitones = intervals.map((i) => (rootIndex + i) % 12);
  const noteNames = semitones.map((st) => NOTE_NAMES[st]);

  return {
    name: chord,
    root,
    quality,
    semitones,
    noteNames,
    label: noteNames.join(' – '),
  };
}

/** Teclas activas en un teclado de 2 octavas empezando en Do (0–23) */
export function getPianoKeys(chord) {
  const parsed = parsePianoChord(chord);
  if (!parsed) return { keys: [], parsed: null };

  const rootIndex = NOTE_INDEX[parsed.root];
  const quality = parsed.quality;
  const intervals = INTERVALS[quality] || INTERVALS.major;

  const keys = new Set();
  intervals.forEach((interval) => {
    const abs = rootIndex + interval;
    if (abs <= 23) keys.add(abs);
    if (abs + 12 <= 23) keys.add(abs + 12);
  });

  return { keys: [...keys].sort((a, b) => a - b), parsed };
}
