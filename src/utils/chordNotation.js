import { CHORD_IN_TEXT } from './cifraClub';

const STORAGE_KEY = 'mcm-chord-notation';

/** Notas en letra → solfeo (Do, Re, Mi…) */
const ROOT_TO_SOLFEGE = {
  C: 'Do',
  'C#': 'Do#',
  Db: 'Reb',
  D: 'Re',
  'D#': 'Re#',
  Eb: 'Mib',
  E: 'Mi',
  F: 'Fa',
  'F#': 'Fa#',
  Gb: 'Solb',
  G: 'Sol',
  'G#': 'Sol#',
  Ab: 'Lab',
  A: 'La',
  'A#': 'La#',
  Bb: 'Sib',
  B: 'Si',
};

export function getInitialChordNotation() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'solfege' ? 'solfege' : 'letters';
  } catch {
    return 'letters';
  }
}

export function saveChordNotation(notation) {
  const next = notation === 'solfege' ? 'solfege' : 'letters';
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  return next;
}

function normalizeRoot(root) {
  if (!root) return root;
  return root.charAt(0).toUpperCase() + root.slice(1);
}

/** Convierte un acorde C/G/Am → Do/Sol/Lam (solo visual) */
export function chordToSolfege(chord) {
  if (!chord) return chord;

  const trimmed = chord.trim();
  const match = trimmed.match(/^([A-G](?:#|b)?)(.*)$/i);
  if (!match) return chord;

  const root = normalizeRoot(match[1]);
  let suffix = match[2] || '';

  let bass = null;
  const bassMatch = suffix.match(/^(.*?)\/([A-G](?:#|b)?)$/i);
  if (bassMatch) {
    suffix = bassMatch[1];
    bass = normalizeRoot(bassMatch[2]);
  }

  const solRoot = ROOT_TO_SOLFEGE[root] || root;
  let result = solRoot + suffix;
  if (bass) {
    result += `/${ROOT_TO_SOLFEGE[bass] || bass}`;
  }
  return result;
}

export function formatChordDisplay(chord, notation = 'letters') {
  if (!chord || notation !== 'solfege') return chord;
  return chordToSolfege(chord);
}

export function formatChordLineDisplay(line, notation = 'letters') {
  if (!line || notation !== 'solfege') return line;
  return line.replace(new RegExp(CHORD_IN_TEXT.source, 'gi'), (match) => chordToSolfege(match));
}
