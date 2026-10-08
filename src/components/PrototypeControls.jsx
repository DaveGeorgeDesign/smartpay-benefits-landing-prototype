import { useState } from 'react';
import { STATES } from '../data.js';

// Floating panel for switching between the page states drawn in Figma.
// Not part of the design; the selected state is kept in the URL (?state=…).
export default function PrototypeControls({ current, onSelect, view, onView, showPot, onShowPot }) {
  const [open, setOpen] = useState(false);
  const groups = [...new Set(STATES.map((s) => s.group))];
  const active = STATES.find((s) => s.id === current);

  return (
    <div className={`proto-controls${open ? ' is-open' : ''}`}>
      {open && (
        <div className="proto-panel" role="dialog" aria-label="Prototype states">
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
      <div className="proto-row">
        <div className="proto-view" role="group" aria-label="Homepage version">
          {[['current', 'Current'], ['new', 'New']].map(([id, label]) => (
            <button type="button" key={id} className={view === id ? 'is-active' : ''} aria-pressed={view === id} onClick={() => onView(id)}>
              {label}
            </button>
          ))}
        </div>
        {view === 'current' && (
          <div className="proto-view" role="group" aria-label="Benefit Pot">
            <span className="proto-view-label">Benefit Pot</span>
            {[[true, 'Show'], [false, 'Hide']].map(([on, label]) => (
              <button type="button" key={label} className={showPot === on ? 'is-active' : ''} aria-pressed={showPot === on} onClick={() => onShowPot(on)}>
                {label}
              </button>
            ))}
          </div>
        )}
        <button type="button" className="proto-pill" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span className="proto-dot" />
          Prototype state: <strong>{active?.name}</strong>
        </button>
      </div>
    </div>
  );
}
