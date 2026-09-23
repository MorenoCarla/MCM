import { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { bodyHasChords, formatKeyLabel } from '../utils/chordpro';
import { countInCategory, formatAllPlacements } from '../utils/placements';

export default function CategoryView({ songs, onSelectCategory, onSelectSong }) {
  const [query, setQuery] = useState('');

  const searchResults = query.trim()
    ? songs
        .filter((s) => {
          const q = query.trim().toLowerCase();
          return (
            s.title.toLowerCase().includes(q) ||
            (s.artist || '').toLowerCase().includes(q)
          );
        })
        .sort((a, b) => a.title.localeCompare(b.title, 'es'))
    : [];

  return (
    <section className="view-section">
      <h2 className="view-title">HOLA! Miembro del Coro COM</h2>
      <p className="view-desc">Elegí una categoría o buscá una canción directo</p>

      <div className="search-bar home-search">
        <input
          type="search"
          placeholder="Buscar canción en todo el cancionero..."
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query.trim() && (
        <div className="home-search-results">
          {searchResults.length === 0 ? (
            <p className="empty-state">No encontramos ninguna canción con ese nombre.</p>
          ) : (
            <ul className="song-list">
              {searchResults.map((song) => {
                const placements = formatAllPlacements(song);
                const meta = [];
                if (song.key) meta.push(formatKeyLabel(song.key));
                meta.push(bodyHasChords(song.body) ? 'Con acordes' : 'Solo letra');
                if (placements.length) meta.push(placements.join(', '));

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
        </div>
      )}

      <div className="category-grid">
        {CATEGORIES.map((cat) => {
          const count = countInCategory(songs, cat.id);
          return (
            <button
              key={cat.id}
              type="button"
              className="category-card"
              style={{ '--cat-color': cat.color }}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-desc">{cat.description}</span>
              <span className="category-count">
                {count} {count === 1 ? 'canción' : 'canciones'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
