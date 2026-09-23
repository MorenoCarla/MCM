const INSTRUMENTS = [
  { id: 'guitar', label: 'Guitarra' },
  { id: 'piano', label: 'Piano' },
  { id: 'both', label: 'Ambos' },
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
        Los mismos acordes sirven para guitarra y piano — cambiá el instrumento para ver cada diagrama.
      </p>
    </div>
  );
}
