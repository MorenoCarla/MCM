import { useState } from 'react';
import PlacementsEditor from './PlacementsEditor';
import { SONG_KEYS } from '../utils/chordpro';
import {
  createEmptyPlacement,
  getPlacements,
  validatePlacements,
} from '../utils/placements';

export default function SongEditor({
  song,
  defaultCategoryId,
  defaultMomentId,
  onCancel,
  onSave,
}) {
  const isEditing = Boolean(song);
  const [placements, setPlacements] = useState(() => {
    if (song) return getPlacements(song);
    return [createEmptyPlacement(defaultCategoryId || 'otros', defaultMomentId || '')];
  });
  const [placementError, setPlacementError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const error = validatePlacements(placements);
    if (error) {
      setPlacementError(error);
      return;
    }

    const data = {
      title: form.title.value.trim(),
      key: form.key.value,
      artist: form.artist.value.trim(),
      body: form.body.value.trim(),
      placements,
      categoryId: placements[0].categoryId,
      momentId: placements[0].momentId || '',
    };

    if (!data.title) {
      form.title.focus();
      return;
    }

    setPlacementError('');
    onSave(data);
  }

  return (
    <section className="view-section">
      <div className="song-toolbar">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          ← Cancelar
        </button>
        <button type="submit" form="editor-form" className="btn btn-accent">
          Guardar
        </button>
      </div>

      <h2 className="view-title">{isEditing ? 'Editar canción' : 'Nueva canción'}</h2>

      <form id="editor-form" className="editor-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">Título *</label>
          <input
            id="title"
            name="title"
            defaultValue={song?.title || ''}
            placeholder="Nombre de la canción"
            required
          />
        </div>

        <PlacementsEditor
          placements={placements}
          onChange={(next) => {
            setPlacements(next);
            setPlacementError('');
          }}
          error={placementError}
        />

        <div className="form-row form-row-split">
          <div>
            <label htmlFor="key">Tonalidad</label>
            <select id="key" name="key" defaultValue={song?.key || ''}>
              {SONG_KEYS.map((k) => (
                <option key={k.value || 'none'} value={k.value}>{k.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="artist">Autor / Fuente</label>
            <input
              id="artist"
              name="artist"
              defaultValue={song?.artist || ''}
              placeholder="Opcional"
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="body">Letra (acordes opcionales)</label>
          <textarea
            id="body"
            name="body"
            rows={16}
            defaultValue={song?.body || ''}
            placeholder={`Formato Cifra Club (recomendado — sin corchetes):

G        Em
Ven Espíritu Santo
C              D
Llena mi corazón

Ven Espíritu Santo
Llena mi corazón

(las líneas sin acordes repiten los de arriba)

O solo letra, sin acordes.`}
          />
          <p className="form-hint">
            <strong>No hace falta usar corchetes.</strong> Copiá como en Cifra Club: una línea de acordes y abajo el verso.
            Si un verso no tiene acordes arriba, usa los mismos del bloque anterior.
          </p>
        </div>
      </form>
    </section>
  );
}
