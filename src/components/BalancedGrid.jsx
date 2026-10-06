import { useLayoutEffect, useRef, useState } from 'react';

const MIN_CARD = 293;
const MAX_COLS = 4;

// Keeps rows as even as possible (4 cards / 3 fit -> 2 + 2, 9 / 4 -> 3 + 3 + 3); a lone card takes half the row
export function balancedColumns(count, fit) {
  if (fit <= 1 || count <= 1) return Math.min(fit, 2);
  const rows = Math.ceil(count / fit);
  return Math.ceil(count / rows);
}

export default function BalancedGrid({ className, count, children }) {
  const ref = useRef(null);
  const [fit, setFit] = useState(MAX_COLS);

  useLayoutEffect(() => {
    const el = ref.current;
    const measure = () => {
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const cols = Math.floor((el.clientWidth + gap) / (MIN_CARD + gap));
      setFit(Math.max(1, Math.min(MAX_COLS, cols)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ '--cols': balancedColumns(count, fit) }}>
      {children}
    </div>
  );
}
