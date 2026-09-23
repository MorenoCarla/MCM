import { useState } from 'react';
import { bodyHasChords, formatKeyLabel } from '../utils/chordpro';
import { getCategoryById, getMomentById } from '../data/categories';
import { formatOtherPlacements, songInCategory, songInMoment } from '../utils/placements';

export default function SongListView({
  categoryId,
  momentId,
  songs,
  onBack,
  onSelectSong,
}) {
  const [query, setQuery] = useState('');
  const category = getCategoryById(categoryId);
  const moment = momentId ? getMomentById(momentId) : null;

  const filtered = songs
    .filter((s) => {
      if (momentId) return songInMoment(s, categoryId, momentId);
      return songInCategory(s, categoryId);
    })
    .filter((s) => {
      if (!query.trim()) return true;
      const q = query.trim().toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        (s.artist || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.title.localeCompare(b.title, 'es'));

  const title = moment ? moment.name : category?.name;

  return (
    <section className="view-section">
      <button type="button" className="btn btn-ghost back-btn" onClick={onBack}>
        ← Volver
      </button>

      <h2 className="view-title">{title}</h2>
      {moment && (
        <p className="view-desc">{moment.description}</p>
      )}

      <div className="search-bar">
        <input
          type="search"
          placeholder="Buscar en esta lista..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">
          Todavía no hay canciones acá. ¡Agregá la primera!
        </p>
      ) : (
        <ul className="song-list">
          {filtered.map((song) => {
            const otherPlacements = formatOtherPlacements(song, categoryId, momentId || '');
            const alsoElsewhere = otherPlacements.length > 0
              ? `También en: ${otherPlacements.join(', ')}`
              : null;

            const meta = [];
            if (song.key) meta.push(formatKeyLabel(song.key));
            meta.push(bodyHasChords(song.body) ? 'Con acordes' : 'Solo letra');
            if (alsoElsewhere) meta.push(alsoElsewhere);

            return (
              <li key={song.id} className="song-list-item">
                <button type="button" onClick={() => onSelectSong(song.id)}>
                  <div className="song-list-title">{song.title}</div>
                  <div className="song-list-meta">{meta.join(' · ')}</div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
