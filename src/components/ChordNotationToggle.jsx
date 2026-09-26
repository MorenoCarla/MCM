export default function ChordNotationToggle({ value, onChange }) {
  const isSolfege = value === 'solfege';

  return (
    <label className="toggle-chords chord-notation-toggle" title="Cómo se muestran los acordes en pantalla">
      <input
        type="checkbox"
        checked={isSolfege}
        onChange={(e) => onChange(e.target.checked ? 'solfege' : 'letters')}
      />
      <span>{isSolfege ? 'Do, Re, Mi' : 'C, G, Am'}</span>
    </label>
  );
}
