import { transposeChord } from './chordMath';
import { extractChordsFromText, isChordLine } from './cifraClub';

/**
 * Diagramas de guitarra — cuerdas de la 6 (grave) a la 1 (aguda).
 * -1 = silenciada, 0 = al aire, 1+ = traste
 */
const DIAGRAMS = {
  A: { frets: [-1, 0, 2, 2, 2, 0], fingers: [null, null, 2, 3, 1, null], baseFret: 1 },
  Am: { frets: [-1, 0, 2, 2, 1, 0], fingers: [null, null, 2, 3, 1, null], baseFret: 1 },
  A7: { frets: [-1, 0, 2, 0, 2, 0], fingers: [null, null, 2, null, 1, null], baseFret: 1 },
  Am7: { frets: [-1, 0, 2, 0, 1, 0], fingers: [null, null, 2, null, 1, null], baseFret: 1 },
  B: { frets: [-1, 2, 4, 4, 4, 2], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 2, from: 1, to: 5 }, baseFret: 1 },
  Bm: { frets: [-1, 2, 4, 4, 3, 2], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 2, from: 1, to: 5 }, baseFret: 1 },
  B7: { frets: [-1, 2, 4, 2, 4, 2], fingers: [null, 1, 3, 1, 4, 1], barre: { fret: 2, from: 1, to: 5 }, baseFret: 1 },
  C: { frets: [-1, 3, 2, 0, 1, 0], fingers: [null, 3, 2, null, 1, null], baseFret: 1 },
  C7: { frets: [-1, 3, 2, 3, 1, 0], fingers: [null, 3, 2, 4, 1, null], baseFret: 1 },
  D: { frets: [-1, -1, 0, 2, 3, 2], fingers: [null, null, null, 1, 3, 2], baseFret: 1 },
  Dm: { frets: [-1, -1, 0, 2, 3, 1], fingers: [null, null, null, 2, 3, 1], baseFret: 1 },
  D7: { frets: [-1, -1, 0, 2, 1, 2], fingers: [null, null, null, 2, 1, 3], baseFret: 1 },
  Dm7: { frets: [-1, -1, 0, 2, 1, 1], fingers: [null, null, null, 2, 1, 1], baseFret: 1 },
  E: { frets: [0, 2, 2, 1, 0, 0], fingers: [null, 2, 3, 1, null, null], baseFret: 1 },
  Em: { frets: [0, 2, 2, 0, 0, 0], fingers: [null, 2, 3, null, null, null], baseFret: 1 },
  E7: { frets: [0, 2, 0, 1, 0, 0], fingers: [null, 2, null, 1, null, null], baseFret: 1 },
  Em7: { frets: [0, 2, 0, 0, 0, 0], fingers: [null, 2, null, null, null, null], baseFret: 1 },
  F: { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barre: { fret: 1, from: 1, to: 6 }, baseFret: 1 },
  Fm: { frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barre: { fret: 1, from: 1, to: 6 }, baseFret: 1 },
  G: { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, null, null, null, 3], baseFret: 1 },
  G7: { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, null, null, null, 1], baseFret: 1 },
  Gm: { frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barre: { fret: 3, from: 1, to: 6 }, baseFret: 1 },
  'F#m': { frets: [2, 4, 4, 2, 2, 2], fingers: [1, 3, 4, 1, 1, 1], barre: { fret: 2, from: 1, to: 6 }, baseFret: 1 },
  'C#m': { frets: [-1, 4, 6, 6, 5, 4], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 4, from: 1, to: 5 }, baseFret: 1 },
  'G#m': { frets: [4, 6, 6, 4, 4, 4], fingers: [1, 3, 4, 1, 1, 1], barre: { fret: 4, from: 1, to: 6 }, baseFret: 1 },
  'A#': { frets: [-1, 1, 3, 3, 3, 1], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 1, from: 1, to: 5 }, baseFret: 1 },
  Bb: { frets: [-1, 1, 3, 3, 3, 1], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 1, from: 1, to: 5 }, baseFret: 1 },
  Bbm: { frets: [-1, 1, 3, 3, 2, 1], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 1, from: 1, to: 5 }, baseFret: 1 },
  Eb: { frets: [-1, 6, 8, 8, 8, 6], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 6, from: 1, to: 5 }, baseFret: 6 },
  Ebm: { frets: [-1, 6, 8, 8, 7, 6], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 6, from: 1, to: 5 }, baseFret: 6 },
  Ab: { frets: [4, 6, 6, 5, 4, 4], fingers: [1, 3, 4, 2, 1, 1], barre: { fret: 4, from: 1, to: 6 }, baseFret: 4 },
  Db: { frets: [-1, 4, 6, 6, 6, 4], fingers: [null, 1, 3, 4, 2, 1], barre: { fret: 4, from: 1, to: 5 }, baseFret: 4 },
  'F#': { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barre: { fret: 2, from: 1, to: 6 }, baseFret: 2 },
  Gb: { frets: [2, 4, 4, 3, 2, 2], fingers: [1, 3, 4, 2, 1, 1], barre: { fret: 2, from: 1, to: 6 }, baseFret: 2 },
  Asus2: { frets: [-1, 0, 2, 2, 0, 0], fingers: [null, null, 2, 3, null, null], baseFret: 1 },
  Asus4: { frets: [-1, 0, 2, 2, 3, 0], fingers: [null, null, 2, 3, 4, null], baseFret: 1 },
  Csus2: { frets: [-1, 3, 0, 0, 1, 3], fingers: [null, 2, null, null, 1, 3], baseFret: 1 },
  Dsus4: { frets: [-1, -1, 0, 2, 3, 3], fingers: [null, null, null, 1, 2, 3], baseFret: 1 },
  Esus4: { frets: [0, 2, 2, 2, 0, 0], fingers: [null, 2, 3, 4, null, null], baseFret: 1 },
};

const CHORD_REGEX = /^([A-G](?:#|b)?)(.*)$/;

export function normalizeChordName(chord) {
  if (!chord) return '';
  const trimmed = chord.trim();
  const match = trimmed.match(CHORD_REGEX);
  if (!match) return trimmed;

  let root = match[1];
  let suffix = match[2] || '';

  if (root.includes('b')) {
    const flatMap = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' };
    root = flatMap[root] || root;
  }

  suffix = suffix
    .replace(/maj7/i, 'maj7')
    .replace(/min/i, 'm')
    .replace(/minor/i, 'm')
    .replace(/major/i, '')
    .replace(/dim/i, 'dim')
    .replace(/aug/i, 'aug');

  if (suffix === '' || suffix === 'M') suffix = '';
  if (suffix.startsWith('m') && !suffix.startsWith('maj')) {
    return root + 'm' + suffix.slice(1).replace(/^m/, '');
  }

  return root + suffix;
}

export function getChordDiagram(chord) {
  const normalized = normalizeChordName(chord);
  if (DIAGRAMS[normalized]) return { ...DIAGRAMS[normalized], name: normalized };

  const match = normalized.match(CHORD_REGEX);
  if (!match) return null;

  const root = match[1];
  const suffix = match[2] || '';

  if (suffix.startsWith('m') && suffix !== 'maj7') {
    const minor = root + 'm';
    if (DIAGRAMS[minor]) return { ...DIAGRAMS[minor], name: normalized };
  }

  if (DIAGRAMS[root]) return { ...DIAGRAMS[root], name: normalized, simplified: true };

  return null;
}

export function extractChordsFromBody(body, semitones = 0) {
  const found = new Set();

  for (const line of (body || '').split('\n')) {
    if (isChordLine(line)) {
      extractChordsFromText(line, semitones).forEach((c) => found.add(c));
      continue;
    }
    const regex = /\[([^\]]+)\]/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const chord = semitones
        ? transposeChord(match[1], semitones, semitones < 0)
        : match[1];
      found.add(chord);
    }
  }

  return [...found];
}
