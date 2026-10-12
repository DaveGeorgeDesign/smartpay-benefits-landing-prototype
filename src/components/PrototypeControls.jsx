import { useEffect, useRef, useState } from 'react';

function CogIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div className="proto-setting">
      <span className="proto-group-title">{label}</span>
      <div className="proto-seg" role="group" aria-label={label}>
        {options.map(([v, text]) => (
          <button type="button" key={text} className={value === v ? 'is-active' : ''} aria-pressed={value === v} onClick={() => onChange(v)}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

// Cog button that switches between Version A and Version B. Not part of the design.
// Each version shows one state; the other settings are only set by the URL (?window, ?basket, ?held, ?pot=show).
export default function PrototypeControls({ view, onView }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className={`proto-controls${open ? ' is-open' : ''}`}>
      {open && (
        <div className="proto-panel" role="dialog" aria-label="Prototype settings">
          <Segmented label="Homepage version" options={[['current', 'Version A'], ['new', 'Version B']]} value={view} onChange={onView} />
        </div>
      )}
      <button
        type="button"
        className="proto-fab"
        aria-label="Prototype settings"
        aria-expanded={open}
        title="Prototype settings"
        onClick={() => setOpen(!open)}
      >
        <CogIcon />
      </button>
    </div>
  );
}
