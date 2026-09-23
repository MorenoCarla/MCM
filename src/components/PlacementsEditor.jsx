import { MISA_MOMENTS } from '../data/categories';
import { CATEGORIES, createEmptyPlacement } from '../utils/placements';

export default function PlacementsEditor({ placements, onChange, error }) {
  function updateRow(index, field, value) {
    const next = placements.map((p, i) => {
      if (i !== index) return p;
      const updated = { ...p, [field]: value };
      if (field === 'categoryId' && value !== 'misa') {
        updated.momentId = '';
      }
      return updated;
    });
    onChange(next);
  }

  function addRow() {
    onChange([...placements, createEmptyPlacement()]);
  }

  function removeRow(index) {
    if (placements.length <= 1) return;
    onChange(placements.filter((_, i) => i !== index));
  }

  return (
    <div className="placements-editor">
      <label className="placements-label">¿Dónde se usa esta canción? *</label>
      <p className="form-hint placements-hint">
        Podés agregar varias categorías (ej. Misa Comunión + Adoración) sin duplicar la canción.
      </p>

      <ul className="placements-list">
        {placements.map((p, index) => (
          <li key={index} className="placement-row">
            <select
              value={p.categoryId}
              onChange={(e) => updateRow(index, 'categoryId', e.target.value)}
              aria-label={`Categoría ${index + 1}`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {p.categoryId === 'misa' ? (
              <select
                value={p.momentId}
                onChange={(e) => updateRow(index, 'momentId', e.target.value)}
                aria-label={`Momento ${index + 1}`}
              >
                <option value="">— Momento de misa —</option>
                {MISA_MOMENTS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            ) : (
              <span className="placement-no-moment">Sin momento</span>
            )}

            <button
              type="button"
              className="placement-remove"
              onClick={() => removeRow(index)}
              disabled={placements.length <= 1}
              aria-label="Quitar categoría"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="btn btn-ghost placement-add" onClick={addRow}>
        + Agregar otra categoría
      </button>

      {error && <p className="placement-error">{error}</p>}
    </div>
  );
}
