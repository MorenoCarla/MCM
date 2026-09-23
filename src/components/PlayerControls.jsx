export default function PlayerControls({
  autoScroll,
  scrollSpeed,
  presentationMode,
  onToggleScroll,
  onScrollSpeedChange,
  onTogglePresentation,
}) {
  return (
    <div className="player-controls">
      <div className="player-controls-row">
        <button
          type="button"
          className={`player-btn ${autoScroll ? 'active' : ''}`}
          onClick={onToggleScroll}
        >
          {autoScroll ? '⏸ Pausar scroll' : '▶ Scroll automático'}
        </button>
        <button
          type="button"
          className={`player-btn ${presentationMode ? 'active' : ''}`}
          onClick={onTogglePresentation}
        >
          {presentationMode ? '✕ Salir presentación' : '⛶ Modo presentación'}
        </button>
      </div>

      {autoScroll && (
        <div className="scroll-speed-control">
          <label htmlFor="scroll-speed">
            Velocidad: <strong>{scrollSpeed}</strong>
          </label>
          <input
            id="scroll-speed"
            type="range"
            min={1}
            max={10}
            value={scrollSpeed}
            onChange={(e) => onScrollSpeedChange(Number(e.target.value))}
          />
        </div>
      )}
    </div>
  );
}
