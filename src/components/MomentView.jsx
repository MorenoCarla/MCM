import { getCategoryById, getMomentsForCategory } from '../data/categories';
import { countInMoment } from '../utils/placements';

export default function MomentView({ categoryId, songs, onBack, onSelectMoment }) {
  const category = getCategoryById(categoryId);
  const moments = getMomentsForCategory(categoryId);

  return (
    <section className="view-section">
      <button type="button" className="btn btn-ghost back-btn" onClick={onBack}>
        ← Categorías
      </button>

      <h2 className="view-title">{category?.name}</h2>
      <p className="view-desc">Elegí el momento de la misa</p>

      <ul className="moment-list">
        {moments.map((moment) => {
          const count = countInMoment(songs, categoryId, moment.id);
          return (
            <li key={moment.id}>
              <button
                type="button"
                className="moment-card"
                onClick={() => onSelectMoment(moment.id)}
              >
                <div className="moment-info">
                  <span className="moment-name">{moment.name}</span>
                  <span className="moment-desc">{moment.description}</span>
                </div>
                <span className="moment-count">
                  {count} {count === 1 ? 'opción' : 'opciones'}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
