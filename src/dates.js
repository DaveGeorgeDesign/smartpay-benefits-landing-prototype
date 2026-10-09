// Dates shown in the prototype, counted from the day it's viewed so they never fall in the past.
// The election window closes (when open) or reopens (when closed) in 30 days, matching the "30d" / "30 days" copy.

const DAY = 24 * 60 * 60 * 1000;
const today = new Date();
today.setHours(0, 0, 0, 0);

const addDays = (n) => new Date(today.getTime() + n * DAY);

export const WINDOW_DAYS = 30;
export const WINDOW_DATE = addDays(WINDOW_DAYS);
// New benefits start on the first of the month after the window closes
export const EFFECTIVE_DATE = new Date(WINDOW_DATE.getFullYear(), WINDOW_DATE.getMonth() + 1, 1);
export const POT_RENEWAL_DAYS = 120;
export const POT_RENEWAL_DATE = addDays(POT_RENEWAL_DAYS);

const pad = (n) => String(n).padStart(2, '0');

// 30/09/2026
export const ddmmyyyy = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
// 30/9/2026
export const dmyyyy = (d) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
// 30 September
export const dayMonth = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
// 5 February 2027
export const longDate = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
