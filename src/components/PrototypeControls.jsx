import { useEffect, useRef, useState } from 'react';
import { STATES } from '../data.js';

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

// Cog button that opens the prototype settings (version, Benefit Pot, page state).
// Not part of the design; the choices are kept in the URL (?view, ?pot, ?state).
export default function PrototypeControls({ current, onSelect, view, onView, showPot, onShowPot }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const groups = [...new Set(STATES.map((s) => s.group))];

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
          <div className="proto-group proto-settings">
            <Segmented label="Homepage version" options={[['current', 'Current'], ['new', 'New']]} value={view} onChange={onView} />
            <Segmented label="Benefit Pot" options={[[true, 'Show'], [false, 'Hide']]} value={showPot} onChange={onShowPot} />
          </div>
          {groups.map((g) => (
            <div key={g} className="proto-group">
              <p className="proto-group-title">{g}</p>
              {STATES.filter((s) => s.group === g).map((s) => (
                <button
                  type="button"
                  key={s.id}
                  className={`proto-option${s.id === current ? ' is-active' : ''}`}
                  onClick={() => { onSelect(s.id); setOpen(false); }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          ))}
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
