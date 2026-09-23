import {
  KEY_BUTTONS,
  getKeyAfterTranspose,
  getShortKeyLabel,
  getSemitonesBetween,
} from '../utils/chordpro';

export default function KeyPicker({ originalKey, transpose, onChange }) {
  const currentKey = originalKey
    ? getKeyAfterTranspose(originalKey, transpose)
    : null;

  function selectKey(targetKey) {
    if (!originalKey) return;
    onChange(getSemitonesBetween(originalKey, targetKey));
  }

  function shift(delta) {
    onChange(transpose + delta);
  }

  return (
    <div className="key-picker">
      <div className="key-picker-header">
        <span className="key-picker-label">Tonalidad</span>
        {currentKey ? (
          <span className="key-picker-current">
            {getShortKeyLabel(currentKey)}
            {transpose !== 0 && originalKey && (
              <span className="key-picker-original">
                {' '}(original: {getShortKeyLabel(originalKey)})
              </span>
            )}
          </span>
        ) : (
          <span className="key-picker-current key-picker-hint">
            Sin tonalidad — usá +/− para subir o bajar
          </span>
        )}
      </div>

      {originalKey ? (
        <div className="key-buttons">
          {KEY_BUTTONS.map((key) => {
            const isOriginal = key.value === originalKey && transpose === 0;
            const isActive = key.value === currentKey;
            return (
              <button
                key={key.value}
                type="button"
                className={`key-btn ${isActive ? 'active' : ''} ${isOriginal ? 'original' : ''}`}
                onClick={() => selectKey(key.value)}
                title={`Tocar en ${key.label}`}
              >
                {key.label}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="key-shift-only">
          <button type="button" className="key-shift-btn" onClick={() => shift(-1)} aria-label="Bajar medio tono">
            −
          </button>
          <span className="key-shift-value">
            {transpose > 0 ? `+${transpose}` : transpose}
          </span>
          <button type="button" className="key-shift-btn" onClick={() => shift(1)} aria-label="Subir medio tono">
            +
          </button>
          {transpose !== 0 && (
            <button type="button" className="key-reset-btn" onClick={() => onChange(0)}>
              Original
            </button>
          )}
        </div>
      )}

      {originalKey && (
        <div className="key-picker-footer key-picker-footer--with-keys">
          <button type="button" className="key-shift-btn" onClick={() => shift(-1)} aria-label="Bajar medio tono">
            −
          </button>
          <button
            type="button"
            className="key-reset-btn"
            onClick={() => onChange(0)}
            disabled={transpose === 0}
          >
            Original ({getShortKeyLabel(originalKey)})
          </button>
          <button type="button" className="key-shift-btn" onClick={() => shift(1)} aria-label="Subir medio tono">
            +
          </button>
        </div>
      )}
    </div>
  );
}
