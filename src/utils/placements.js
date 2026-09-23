import { CATEGORIES, getCategoryById, getMomentById } from '../data/categories';

/** @typedef {{ categoryId: string, momentId?: string }} Placement */

export function normalizePlacement(placement) {
  return {
    categoryId: placement.categoryId || 'otros',
    momentId: placement.momentId || '',
  };
}

/** Convierte canciones viejas (una sola categoría) al nuevo formato */
export function getPlacements(song) {
  if (Array.isArray(song.placements) && song.placements.length > 0) {
    return song.placements.map(normalizePlacement);
  }
  if (song.categoryId) {
    return [normalizePlacement({
      categoryId: song.categoryId,
      momentId: song.momentId || '',
    })];
  }
  return [{ categoryId: 'otros', momentId: '' }];
}

export function migrateSong(song) {
  const placements = getPlacements(song);
  const primary = placements[0];
  return {
    ...song,
    placements,
    categoryId: primary.categoryId,
    momentId: primary.momentId,
  };
}

export function songInCategory(song, categoryId) {
  return getPlacements(song).some((p) => p.categoryId === categoryId);
}

export function songInMoment(song, categoryId, momentId) {
  return getPlacements(song).some(
    (p) => p.categoryId === categoryId && p.momentId === momentId
  );
}

export function countInCategory(songs, categoryId) {
  return songs.filter((s) => songInCategory(s, categoryId)).length;
}

export function countInMoment(songs, categoryId, momentId) {
  return songs.filter((s) => songInMoment(s, categoryId, momentId)).length;
}

export function formatPlacement(p) {
  const cat = getCategoryById(p.categoryId);
  if (!cat) return p.categoryId;
  if (p.categoryId === 'misa' && p.momentId) {
    const moment = getMomentById(p.momentId);
    return moment ? `${cat.name} · ${moment.name}` : cat.name;
  }
  return cat.name;
}

export function formatAllPlacements(song) {
  return getPlacements(song).map(formatPlacement);
}

/** Ubicaciones distintas a la vista actual (para "También en:" en listas) */
export function getOtherPlacements(song, currentCategoryId, currentMomentId = '') {
  return getPlacements(song).filter((p) => {
    if (currentMomentId) {
      return !(p.categoryId === currentCategoryId && p.momentId === currentMomentId);
    }
    return p.categoryId !== currentCategoryId;
  });
}

export function formatOtherPlacements(song, currentCategoryId, currentMomentId = '') {
  return getOtherPlacements(song, currentCategoryId, currentMomentId).map(formatPlacement);
}

export function validatePlacements(placements) {
  if (!placements.length) return 'Agregá al menos una categoría';

  for (const p of placements) {
    if (!p.categoryId) return 'Elegí una categoría en cada fila';
    if (p.categoryId === 'misa' && !p.momentId) {
      return 'Las canciones de Misa necesitan un momento (Entrada, Comunión, etc.)';
    }
  }

  return null;
}

export function createEmptyPlacement(defaultCategoryId = 'otros', defaultMomentId = '') {
  return {
    categoryId: defaultCategoryId,
    momentId: defaultCategoryId === 'misa' ? defaultMomentId : '',
  };
}

export { CATEGORIES };
