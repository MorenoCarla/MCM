export default function CapoPicker({ capo, onChange }) {
  return (
    <div className="capo-picker">
      <span className="capo-label">Cejilla (capo)</span>
      <div className="capo-buttons">
        {Array.from({ length: 8 }).map((_, fret) => (
          <button
            key={fret}
            type="button"
            className={`capo-btn ${capo === fret ? 'active' : ''}`}
            onClick={() => onChange(fret)}
          >
            {fret === 0 ? 'Sin' : fret}
          </button>
        ))}
      </div>
      {capo > 0 && (
        <p className="capo-hint">
          Cejilla en traste {capo} — los acordes mostrados son las formas que tocás
        </p>
      )}
    </div>
  );
}
