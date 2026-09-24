import { normalizeChordName } from './chordDiagrams';

/**
 * Ukelele en afinación GCEA — cuerdas de la 4 (G) a la 1 (A).
 * -1 = silenciada, 0 = al aire, 1+ = traste
 */
const UKULELE_DIAGRAMS = {
  C: { frets: [0, 0, 0, 3], fingers: [null, null, null, 3], baseFret: 1 },
  G: { frets: [0, 2, 3, 2], fingers: [null, 1, 3, 2], baseFret: 1 },
  Am: { frets: [2, 0, 0, 0], fingers: [2, null, null, null], baseFret: 1 },
  F: { frets: [2, 0, 1, 0], fingers: [2, null, 1, null], baseFret: 1 },
  Dm: { frets: [2, 2, 1, 0], fingers: [2, 3, 1, null], baseFret: 1 },
  Em: { frets: [0, 4, 3, 2], fingers: [null, 4, 3, 2], baseFret: 1 },
  D: { frets: [2, 2, 2, 0], fingers: [2, 3, 4, null], baseFret: 1 },
  A: { frets: [2, 1, 0, 0], fingers: [2, 1, null, null], baseFret: 1 },
  E: { frets: [1, 4, 0, 2], fingers: [1, 4, null, 2], baseFret: 1 },
  Bm: { frets: [4, 2, 2, 2], fingers: [4, 1, 1, 1], barre: { fret: 2, from: 2, to: 4 }, baseFret: 1 },
  B: { frets: [4, 3, 2, 2], fingers: [4, 3, 1, 1], baseFret: 1 },
  B7: { frets: [2, 3, 2, 2], fingers: [1, 3, 2, 1], baseFret: 1 },
  A7: { frets: [0, 1, 0, 0], fingers: [null, 1, null, null], baseFret: 1 },
  D7: { frets: [2, 2, 2, 3], fingers: [1, 1, 1, 3], baseFret: 1 },
  E7: { frets: [1, 2, 0, 2], fingers: [1, 2, null, 3], baseFret: 1 },
  G7: { frets: [0, 2, 1, 2], fingers: [null, 2, 1, 3], baseFret: 1 },
  C7: { frets: [0, 0, 0, 1], fingers: [null, null, null, 1], baseFret: 1 },
  Fm: { frets: [1, 0, 1, 3], fingers: [1, null, 2, 3], baseFret: 1 },
  Gm: { frets: [0, 2, 3, 1], fingers: [null, 1, 3, 1], baseFret: 1 },
  'F#m': { frets: [1, 3, 2, 1], fingers: [1, 4, 2, 1], baseFret: 1 },
  'C#m': { frets: [4, 5, 4, 4], fingers: [1, 3, 2, 1], baseFret: 4 },
  'G#m': { frets: [4, 4, 4, 1], fingers: [2, 3, 4, 1], baseFret: 1 },
  Bb: { frets: [3, 2, 1, 1], fingers: [3, 2, 1, 1], baseFret: 1 },
  Bbm: { frets: [3, 2, 1, 1], fingers: [3, 2, 1, 1], baseFret: 1 },
  Eb: { frets: [0, 3, 3, 1], fingers: [null, 2, 3, 1], baseFret: 1 },
  Ebm: { frets: [3, 3, 3, 1], fingers: [3, 3, 3, 1], baseFret: 1 },
  Ab: { frets: [5, 3, 4, 3], fingers: [4, 1, 2, 1], baseFret: 3 },
  Db: { frets: [1, 4, 4, 3], fingers: [1, 3, 4, 2], baseFret: 1 },
  'F#': { frets: [3, 1, 2, 1], fingers: [3, 1, 2, 1], baseFret: 1 },
  Gb: { frets: [3, 1, 2, 1], fingers: [3, 1, 2, 1], baseFret: 1 },
  'A#': { frets: [3, 2, 1, 1], fingers: [3, 2, 1, 1], baseFret: 1 },
  Asus2: { frets: [2, 0, 0, 2], fingers: [1, null, null, 2], baseFret: 1 },
  Dsus4: { frets: [2, 2, 3, 0], fingers: [1, 1, 3, null], baseFret: 1 },
};

const CHORD_REGEX = /^([A-G](?:#|b)?)(.*)$/;

export function getUkuleleDiagram(chord) {
  const normalized = normalizeChordName(chord);
  if (UKULELE_DIAGRAMS[normalized]) {
    return { ...UKULELE_DIAGRAMS[normalized], name: normalized };
  }

  const match = normalized.match(CHORD_REGEX);
  if (!match) return null;

  const root = match[1];
  const suffix = match[2] || '';

  if (suffix.startsWith('m') && suffix !== 'maj7') {
    const minor = `${root}m`;
    if (UKULELE_DIAGRAMS[minor]) return { ...UKULELE_DIAGRAMS[minor], name: normalized };
  }

  if (UKULELE_DIAGRAMS[root]) {
    return { ...UKULELE_DIAGRAMS[root], name: normalized, simplified: true };
  }

  return null;
}
