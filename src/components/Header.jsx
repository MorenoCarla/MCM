import { useState } from 'react';

const base = import.meta.env.BASE_URL;
const LOGO_FILES = ['png', 'jpg', 'webp', 'svg'].map((ext) => `${base}logo-mcm.${ext}`);

function HeaderLogo() {
  const [index, setIndex] = useState(0);

  function handleError() {
    setIndex((i) => (i + 1 < LOGO_FILES.length ? i + 1 : i));
  }

  return (
    <img
      src={LOGO_FILES[index]}
      alt="MCM"
      className="header-logo"
      onError={handleError}
    />
  );
}

export default function Header({ onHome, onNewSong, theme, onToggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <header className="header">
      <div className="header-inner">
        <button type="button" className="header-brand" onClick={onHome}>
          <HeaderLogo />
          <div className="header-text">
            <h1>Cancionero MCM</h1>
            <p className="subtitle">Movimiento Consolación para el Mundo</p>
          </div>
        </button>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-theme"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
          >
            {isDark ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
          <button type="button" className="btn btn-accent" onClick={onNewSong}>
            + Nueva canción
          </button>
        </div>
      </div>
    </header>
  );
}
