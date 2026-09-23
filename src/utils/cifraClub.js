import { transposeChord } from './chordMath';

/** G, Em, D2, E/G#, F#m7(11), Bb, A#... */
const CHORD_SUFFIX = '(?:maj7|maj|M7|min7|m7|min|m|M|dim7|dim|aug|sus4|sus2|sus|add\\d+|\\d+|7|6|9|11|13|\\(\\d+\\))*';
const SINGLE_CHORD = new RegExp(`^[A-G](?:#|b)?${CHORD_SUFFIX}(?:\\/[A-G](?:#|b)?)?$`, 'i');

export const CHORD_IN_TEXT = new RegExp(
  `([A-G](?:#|b)?${CHORD_SUFFIX}(?:\\/[A-G](?:#|b)?)?)`,
  'gi'
);

export function isChordToken(token) {
  const t = token.trim().replace(/[.,;]+$/, '');
  return SINGLE_CHORD.test(t);
}

function cleanLineForChordCheck(line) {
  let trimmed = line.trim();
  if (/^\([^)]+\)$/.test(trimmed)) {
    trimmed = trimmed.slice(1, -1).trim();
  }
  return trimmed
    .replace(/^\[[^\]]+\]\s*/, '')
    .replace(/^\([^)]*\)\s*/, '');
}

function tokenizeChords(line) {
  return cleanLineForChordCheck(line)
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[.,;]+$/, ''));
}

/** Línea solo con acordes separados por espacios (formato Cifra Club) */
export function isChordLine(line) {
  const tokens = tokenizeChords(line);
  if (tokens.length === 0) return false;
  return tokens.every((t) => isChordToken(t));
}

export function normalizeChordLine(line) {
  if (!isChordLine(line)) return line;
  const prefix = line.match(/^(\s*(?:\[[^\]]+\]|\([^)]*\))\s*)/)?.[1] || '';
  const tokens = tokenizeChords(line);
  return prefix + tokens.join('    ');
}

export function transposeChordLine(line, semitones) {
  if (!semitones) return line;
  const preferFlats = semitones < 0;
  return line.replace(CHORD_IN_TEXT, (match) =>
    transposeChord(match, semitones, preferFlats)
  );
}

export function extractChordsFromText(text, semitones = 0) {
  const found = new Set();
  const preferFlats = semitones < 0;
  const regex = new RegExp(CHORD_IN_TEXT.source, 'gi');
  let match;

  while ((match = regex.exec(text || '')) !== null) {
    const chord = semitones
      ? transposeChord(match[1], semitones, preferFlats)
      : match[1];
    found.add(chord);
  }

  return [...found];
}

export function splitChordLine(chordLine) {
  const parts = [];
  const regex = new RegExp(CHORD_IN_TEXT.source, 'gi');
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(chordLine)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'space', text: chordLine.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'chord', text: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < chordLine.length) {
    parts.push({ type: 'space', text: chordLine.slice(lastIndex) });
  }

  return parts;
}
