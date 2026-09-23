import { useState } from 'react';

const LOGO_FILES = [
  './logo-mcm.png',
  './logo-mcm.jpg',
  './logo-mcm.webp',
  './logo-mcm.svg',
];

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

export default function Header({ onHome, onNewSong }) {
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
        <button type="button" className="btn btn-accent" onClick={onNewSong}>
          + Nueva canción
        </button>
      </div>
    </header>
  );
}
