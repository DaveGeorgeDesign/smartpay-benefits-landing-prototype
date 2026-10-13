// Version A / Version B switch, pinned to the bottom corner. Not part of the design.
// Each version shows one state; the other settings are only set by the URL (?window, ?basket, ?held, ?pot=show).
export default function PrototypeControls({ view, onView }) {
  return (
    <div className="proto-controls">
      <div className="proto-seg" role="group" aria-label="Homepage version">
        {[['current', 'Version A'], ['new', 'Version B']].map(([v, text]) => (
          <button type="button" key={v} className={view === v ? 'is-active' : ''} aria-pressed={view === v} onClick={() => onView(v)}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
