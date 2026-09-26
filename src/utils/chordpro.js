const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

const KEY_LABELS = {
  C: 'Do (C)',
  'C#': 'Do# (C#)',
  Db: 'Reb (Db)',
  D: 'Re (D)',
  'D#': 'Re# (D#)',
  Eb: 'Mib (Eb)',
  E: 'Mi (E)',
  F: 'Fa (F)',
  'F#': 'Fa# (F#)',
  Gb: 'Solb (Gb)',
  G: 'Sol (G)',
  'G#': 'Sol# (G#)',
  Ab: 'Lab (Ab)',
  A: 'La (A)',
  'A#': 'La# (A#)',
  Bb: 'Sib (Bb)',
  B: 'Si (B)',
  Am: 'Lam (Am)',
  Bm: 'Sim (Bm)',
  Cm: 'Dom (Cm)',
  Dm: 'Rem (Dm)',
  Em: 'Mim (Em)',
  Fm: 'Fam (Fm)',
  'F#m': 'Fa#m (F#m)',
  Gm: 'Solm (Gm)',
};

/** Opciones del selector en el editor */
export const SONG_KEYS = [
  { value: '', label: 'Sin tonalidad' },
  ...['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].map((value) => ({
    value,
    label: KEY_LABELS[value],
  })),
  ...['Am', 'Bm', 'Cm', 'Dm', 'Em', 'Fm', 'F#m', 'Gm'].map((value) => ({
    value,
    label: KEY_LABELS[value],
  })),
];

function parseKey(key) {
  if (!key) return { root: null, minor: false };
  const match = key.match(/^([A-G](?:#|b)?)(m)?$/);
  if (!match) return { root: key, minor: false };
  return { root: match[1], minor: Boolean(match[2]) };
}

function formatParsedKey({ root, minor }) {
  if (!root) return null;
  return minor ? `${root}m` : root;
}

const ENHARMONIC = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#',
};

import {
  isChordLine,
  normalizeChordLine,
  transposeChordLine,
} from './cifraClub';
import { chordToSolfege } from './chordNotation';
import { noteIndex, transposeChord, transposeNote } from './chordMath';

const CHORD_REGEX = /^([A-G](?:#|b)?)(.*)$/;
const HAS_BRACKET_CHORDS = /\[([^\]]+)\]/;

export function formatKeyLabel(key, notation = 'letters') {
  if (!key) return '';
  if (notation === 'solfege') return chordToSolfege(key);
  return KEY_LABELS[key] || key;
}

export { noteIndex, transposeChord, transposeNote };

export function parseLine(line) {
  const segments = [];
  const regex = /\[([^\]]+)\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'lyric', text: line.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'chord', text: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    segments.push({ type: 'lyric', text: line.slice(lastIndex) });
  }

  if (segments.length === 0 && line.length > 0) {
    segments.push({ type: 'lyric', text: line });
  }

  return segments;
}

export function lineHasChords(segments) {
  return segments.some((s) => s.type === 'chord');
}

export function getLineSegments(segments, semitones = 0) {
  const preferFlats = semitones < 0;
  return segments.map((segment) => {
    if (segment.type === 'chord') {
      return {
        type: 'chord',
        text: semitones
          ? transposeChord(segment.text, semitones, preferFlats)
          : segment.text,
      };
    }
    return { type: 'lyric', text: segment.text };
  });
}

function parseBracketBodyLine(line, lineIndex, semitones) {
  const segments = parseLine(line);
  const hasChords = lineHasChords(segments);
  return {
    key: lineIndex,
    display: 'inline',
    className: hasChords ? 'song-line with-chords' : 'song-line',
    segments: getLineSegments(segments, semitones),
  };
}

/** Soporta formato Cifra Club (acordes arriba) y corchetes [G] */
export function parseBodyLines(body, semitones = 0) {
  if (!body) return [];

  const rawLines = body.split('\n');
  const result = [];
  let lastChordLine = null;
  let index = 0;

  for (const line of rawLines) {
    if (HAS_BRACKET_CHORDS.test(line)) {
      result.push(parseBracketBodyLine(line, index++, semitones));
      continue;
    }

    if (isChordLine(line)) {
      lastChordLine = transposeChordLine(normalizeChordLine(line), semitones);
      continue;
    }

    if (!line.trim()) {
      result.push({
        key: index++,
        display: 'blank',
        className: 'song-line blank-line',
        segments: [{ type: 'lyric', text: '' }],
      });
      continue;
    }

    if (lastChordLine) {
      result.push({
        key: index++,
        display: 'above',
        className: 'song-block with-chords-above',
        chordLine: lastChordLine,
        lyricLine: line,
      });
    } else {
      result.push({
        key: index++,
        display: 'lyric-only',
        className: 'song-line',
        segments: [{ type: 'lyric', text: line }],
      });
    }
  }

  if (lastChordLine && result.length === 0) {
    result.push({
      key: index,
      display: 'chords-only',
      className: 'song-block with-chords-above',
      chordLine: lastChordLine,
      lyricLine: '',
    });
  }

  return result;
}

export function bodyHasChords(body) {
  if (!body) return false;
  if (HAS_BRACKET_CHORDS.test(body)) return true;
  return body.split('\n').some((line) => isChordLine(line));
}

export const KEY_BUTTONS = [
  { value: 'C', label: 'Do' },
  { value: 'C#', label: 'Do#' },
  { value: 'D', label: 'Re' },
  { value: 'Eb', label: 'Mib' },
  { value: 'E', label: 'Mi' },
  { value: 'F', label: 'Fa' },
  { value: 'F#', label: 'Fa#' },
  { value: 'G', label: 'Sol' },
  { value: 'Ab', label: 'Lab' },
  { value: 'A', label: 'La' },
  { value: 'Bb', label: 'Sib' },
  { value: 'B', label: 'Si' },
];

export function getShortKeyLabel(key) {
  const btn = KEY_BUTTONS.find((k) => k.value === key);
  if (btn) return btn.label;
  return KEY_LABELS[key] || key;
}

export function getSemitonesBetween(fromKey, toKey) {
  const from = parseKey(fromKey);
  const to = parseKey(toKey);
  if (!from.root || !to.root) return 0;
  return noteIndex(to.root) - noteIndex(from.root);
}

export function getKeyAfterTranspose(originalKey, semitones) {
  const parsed = parseKey(originalKey);
  if (!parsed.root) return null;
  const root = transposeNote(parsed.root, semitones);
  return formatParsedKey({ root, minor: parsed.minor });
}
