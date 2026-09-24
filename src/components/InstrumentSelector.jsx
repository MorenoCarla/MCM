const INSTRUMENTS = [
  { id: 'guitar', label: 'Guitarra' },
  { id: 'ukulele', label: 'Ukelele' },
  { id: 'piano', label: 'Piano' },
  { id: 'both', label: 'Guitarra + Piano' },
  { id: 'all', label: 'Todos' },
];

export default function InstrumentSelector({ value, onChange }) {
  return (
    <div className="instrument-selector">
      <span className="instrument-label">Instrumento</span>
      <div className="instrument-buttons">
        {INSTRUMENTS.map((inst) => (
          <button
            key={inst.id}
            type="button"
            className={`instrument-btn ${value === inst.id ? 'active' : ''}`}
            onClick={() => onChange(inst.id)}
          >
            {inst.label}
          </button>
        ))}
      </div>
      <p className="instrument-hint">
        Elegí el instrumento para ver su diagrama. Guitarra y ukelele usan la misma cejilla si la activás.
      </p>
    </div>
  );
}
