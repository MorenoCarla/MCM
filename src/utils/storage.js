import { DEFAULT_SONGS } from '../data/defaultSongs';
import { migrateSong } from './placements';

const STORAGE_KEY = 'mcm-cancionero-v4';
const REPERTOIRE_VERSION_KEY = 'mcm-cancionero-repertoire-version';
const REPERTOIRE_VERSION = 2;

const DEFAULT_IDS = new Set(DEFAULT_SONGS.map((s) => s.id));

/** Actualiza canciones oficiales del repo y conserva las agregadas a mano */
function syncOfficialRepertoire(stored) {
  const version = parseInt(localStorage.getItem(REPERTOIRE_VERSION_KEY) || '0', 10);
  const custom = stored.filter((s) => !DEFAULT_IDS.has(s.id)).map(migrateSong);
  const official = DEFAULT_SONGS.map(migrateSong);

  if (version >= REPERTOIRE_VERSION && stored.length > 0) {
    const ids = new Set(stored.map((s) => s.id));
    const missing = DEFAULT_SONGS.filter((s) => !ids.has(s.id));
    if (missing.length === 0) return stored.map(migrateSong);
    const merged = [...stored, ...missing.map(migrateSong)].map(migrateSong);
    saveSongs(merged);
    return merged;
  }

  const merged = [...official, ...custom];
  localStorage.setItem(REPERTOIRE_VERSION_KEY, String(REPERTOIRE_VERSION));
  saveSongs(merged);
  return merged;
}

export function loadSongs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const songs = DEFAULT_SONGS.map(migrateSong);
      saveSongs(songs);
      return songs;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return DEFAULT_SONGS.map(migrateSong);
    }
    return syncOfficialRepertoire(parsed);
  } catch {
    return DEFAULT_SONGS.map(migrateSong);
  }
}

export function saveSongs(songs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs.map(migrateSong)));
}

export function createId() {
  return `song-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Restaurar el repertorio oficial del repo */
export function resetToDefaultSongs() {
  const songs = DEFAULT_SONGS.map(migrateSong);
  saveSongs(songs);
  return songs;
}
