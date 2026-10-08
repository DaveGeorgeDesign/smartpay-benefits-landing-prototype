// Benefit catalogue and the eight page states from the Figma file
// "DGD - SmartPay - Benefits Landing Page" (Landing Page section, node 2214:16713).

const img = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`;

// Card copy. `closed` overrides apply when the card sits in the
// "Available during the next Election Window" section.
export const BENEFITS = {
  pmi: {
    title: 'Private Medical Insurance',
    image: img('private-medical-insurance'),
    description: [{ b: 'Save up to £300' }, ' a year versus individual cover.'],
    cta: 'Get peace of mind for your health',
    electionWindow: true,
  },
  pension: {
    title: 'Pension',
    image: img('pension'),
    description: [{ b: 'Save up to £480' }, ' a year in tax and NI on pension top-ups.'],
    closedDescription: ['Save up to £320 a year in tax and NI.'],
    cta: 'Tax back & top-ups for your pension',
    electionWindow: true,
  },
  cycle: {
    title: 'Cycle To Work',
    image: img('cycle-to-work'),
    description: [{ b: 'Save up to £320' }, ' in tax and NI on a new bike.'],
    cta: 'Get a new bike tax free',
    tag: 'popular',
  },
  householdTech: {
    title: 'Household & Tech',
    image: img('household-and-tech'),
    description: [{ b: 'Spread up to £2,000' }, ' of tech interest-free.'],
    cta: 'Get the latest tech interest free',
  },
  ev: {
    title: 'EV Car Benefit',
    image: img('ev-car-benefit'),
    description: [{ b: 'Save up to £4,200' }, ' a year on a brand-new electric car.'],
    cta: 'Save big on a new EV',
  },
  healthCash: {
    title: 'Health Cash Plan',
    image: img('health-cash-plan'),
    description: [{ b: 'Claim back up to £600' }, ' a year on everyday healthcare.'],
    cta: 'Get money back on medical costs',
    tag: 'new',
  },
  seasonTicket: {
    title: 'Season Ticket Loan',
    image: img('season-ticket-loan'),
    description: [{ b: 'Spread up to £4,000' }, ' interest-free across the year.'],
    cta: 'Get an interest-free train ticket loan',
  },
  virtualGp: {
    title: 'Virtual GP',
    image: img('virtual-gp'),
    description: [{ b: 'Save around £180' }, ' a year versus private GP visits.'],
    cta: 'Get GP access on demand',
    tag: 'new',
  },
  payrollGiving: {
    title: 'Hands on Payroll Giving',
    image: img('payroll-giving'),
    description: ['Give £10 a month to charity at ', { b: 'a net cost of just £8' }, '.'],
    cta: 'Get a lot from giving a little',
  },
  willWriting: {
    title: 'Will Writing',
    image: img('will-writing'),
    description: [{ b: 'Save around £150' }, ' on a professional will.'],
    cta: 'Secure your family’s future',
  },
  mortgage: {
    title: 'Mortgage Advice',
    image: img('mortgage-advice'),
    description: [{ b: 'Save up to £2,000' }, ' over your mortgage term.'],
    cta: 'Get the best mortgage deals',
  },
  gymflex: {
    title: 'GymFlex',
    image: img('gymflex'),
    description: [{ b: 'Save up to £250' }, ' a year on gym membership.'],
    cta: 'Get a gym plan to suit your lifestyle',
  },
};

// Active benefit (order) cards
export const ORDERS = {
  householdTech: {
    title: 'Household & Tech',
    ref: 'HT-2026-01847',
    status: 'active',
    date: 'Last repayment 31 Jul 2027',
    fields: [
      ['Total cost', '£1,000.00'],
      ['Monthly repayment', '£83.33'],
    ],
    action: { label: 'Order again' },
    summary: [
      ['Card value', '£1,200.00'],
      ['Benefit Pot contribution', '-£200.00'],
      ['Total cost', '£1,000.00'],
      ['Repayment term', '12 months'],
      ['Monthly repayment', '£83.33'],
    ],
    documents: ['Order confirmation (PDF)'],
    // Wide layout used when it is the only active benefit
    wideFields: [
      ['Card value', '£1,200.00'],
      ['Benefit Pot', '-£200.00'],
      ['Total cost', '£1,000.00'],
      ['Repayment term', '12 months'],
      ['Monthly repayment', '£83.33'],
    ],
  },
  cycle: {
    title: 'Cycle to Work',
    ref: 'C2W-2026-04815',
    status: 'active',
    date: 'Last repayment 31 Jul 2027',
    fields: [
      ['Total cost', '£890.00'],
      ['Monthly deduction', '£74.16'],
    ],
    action: { label: 'Benefit page' },
    summary: [
      ['Voucher value', '£890.00'],
      ['Monthly deduction', '£74.16'],
      ['Number of instalments', '12'],
      ['Repayment term', '12 months'],
      ['You’ll save', '£295.93'],
    ],
    documents: ['Hire agreement (PDF)', 'Letter of Collection (PDF)'],
  },
  pmi: {
    title: 'Private Medical Insurance',
    ref: 'PMI-2026-04620',
    status: 'closed',
    date: 'Policy renews 01 Aug 2027',
    fields: [
      ['Total cost', '£240.00'],
      ['Monthly premium', '£20.00'],
    ],
    action: { label: 'Make changes', disabled: true },
    summary: [
      ['Cover', 'Self & Family'],
      ['Premium total', '£240.00'],
      ['Monthly premium', '£20.00'],
      ['Policy term', '12 months'],
      ['Renewal', '31 Jul 2027'],
    ],
    documents: ['Policy schedule (PDF)', 'Membership handbook (PDF)'],
  },
  pai: {
    title: 'Personal Accident Insurance',
    ref: 'PAI-2026-00915',
    status: 'active',
    date: 'Policy renews 01 Aug 2027',
    fields: [['Benefit amount', '£50,000']],
    action: { label: 'Benefit page' },
    summary: [
      ['Cover level', 'Family'],
      ['Benefit amount', '£50,000'],
      ['Monthly premium', '£8.50'],
      ['Policy start', '01 Aug 2026'],
      ['Renewal', '31 Jul 2027'],
    ],
    documents: ['Policy schedule (PDF)', 'Key facts document (PDF)'],
  },
};

const NEW_USER_INTRO = 'Start saving on tax, National Insurances, fees and interest - choose your first benefit now!';
const ENGAGED_INTRO = 'Your benefits are really paying off - but there’s so much more available!';

const ALL_OPEN = ['pmi', 'pension', 'cycle', 'householdTech', 'ev', 'healthCash', 'seasonTicket', 'virtualGp', 'payrollGiving', 'willWriting', 'mortgage', 'gymflex'];
const ALWAYS_ON = ALL_OPEN.filter((k) => !BENEFITS[k].electionWindow);

const OPEN_TAG = { kind: 'open', label: 'Open now - closes in 30d' };

const kpis = ({ total, tax, active, monthly, pot, potPct, tech, techPct }) => [
  { key: 'total', label: '🌟 Total benefits value', value: total, note: 'value of benefits held' },
  { key: 'tax', label: '🏛️ Tax & NI savings', value: tax, note: 'saved so far', positive: true },
  { key: 'active', label: '⚡ Active benefits', value: String(active), note: 'of 12 available', progress: Math.round((active / 12) * 100), sensitive: false },
  { key: 'monthly', label: '🗓️ Monthly deductions', value: monthly, note: 'from your salary' },
  { key: 'pot', label: '💰 Benefit Pot', value: pot, note: 'of £1,200 left to spend', progress: potPct },
  { key: 'tech', label: '💻 Household & Tech', value: tech, note: 'of £2,000 loan available', progress: techPct },
];

// The page is built from the prototype settings: election window, basket and how many benefits are held.
// Figma draws 1, 2 and 4 benefits with the window closed; other combinations reuse the same pieces.
export const WINDOWS = [['open', 'Open'], ['closing', 'Closes soon'], ['closed', 'Closed']];
export const HELD = [0, 1, 2, 4];

const HELD_ORDERS = { 0: [], 1: ['householdTech'], 2: ['householdTech', 'pmi'], 4: ['householdTech', 'cycle', 'pmi', 'pai'] };
const HELD_KPIS = {
  1: kpis({ total: '£1,240', tax: '£318', active: 1, monthly: '£103.33', pot: '£1,000', potPct: 83, tech: '£1,000', techPct: 50 }),
  2: kpis({ total: '£1,240', tax: '£318', active: 2, monthly: '£103.33', pot: '£1,000', potPct: 83, tech: '£1,000', techPct: 50 }),
  4: kpis({ total: '£2,232', tax: '£570', active: 4, monthly: '£185.99', pot: '£860', potPct: 72, tech: '£1,000', techPct: 50 }),
};
// New users only see the Benefit Pot module KPIs, so these show only when pots are shown
const POT_MODULE_KPIS = [
  { key: 'pot', label: '💰 Benefit Pot', value: '£1,000', note: 'of £1,200 left to spend', progress: 83 },
  { key: 'tech', label: '💻 Household & Tech', value: '£1,000', note: 'of £2,000 loan available', progress: 50 },
];
// Window benefits a new basket is filled from, skipping any already held
const BASKET_CANDIDATES = ['pmi', 'pension', 'ev', 'healthCash'];

export function buildPage({ window, basket, held }) {
  const orders = HELD_ORDERS[held];
  const notHeld = (k) => !orders.includes(k);
  const closed = window === 'closed';
  const basketItems = basket && !closed ? BASKET_CANDIDATES.filter(notHeld).slice(0, 2) : [];
  return {
    window,
    held,
    intro: held ? ENGAGED_INTRO : NEW_USER_INTRO,
    kpis: held ? HELD_KPIS[held] : POT_MODULE_KPIS,
    orders,
    basket: basketItems.length ? { count: basketItems.length, items: basketItems } : undefined,
    available: (closed ? ALWAYS_ON : ALL_OPEN).filter(notHeld).map((k) => ({
      key: k,
      tag: window === 'open' && BENEFITS[k].electionWindow ? OPEN_TAG : undefined,
    })),
    election: closed ? ['pmi', 'pension'].filter(notHeld).map((k) => ({ key: k })) : [],
  };
}

// Old ?state= links, mapped to their settings
export const LEGACY_STATES = {
  closed: { window: 'closed', basket: false, held: 0 },
  open: { window: 'open', basket: false, held: 0 },
  'closes-soon': { window: 'closing', basket: false, held: 0 },
  basket: { window: 'open', basket: true, held: 0 },
  pot: { window: 'open', basket: false, held: 0, pot: true },
  one: { window: 'closed', basket: false, held: 1 },
  two: { window: 'closed', basket: false, held: 2 },
  four: { window: 'closed', basket: false, held: 4 },
};

export const FAQS = [
  {
    q: 'What is the Election window and when does it close?',
    a: 'The Election window is the period when you can apply for or change certain benefits, such as Holiday Trading and Payroll Giving. It is open now and closes at 23:59 on 30 September. Outside this window these benefits stay locked until the next one opens.',
  },
  // Answers 2–7 are placeholders pending real copy (per the Figma component notes)
  { q: 'How does salary sacrifice save me money?', a: 'Answer copy to follow.' },
  { q: 'Which benefits can I apply for at any time?', a: 'Answer copy to follow.' },
  { q: 'Can I change or cancel a benefit after applying?', a: 'Answer copy to follow.' },
  { q: 'What happens to my benefits if I leave?', a: 'Answer copy to follow.' },
  { q: 'Are these benefits taxable?', a: 'Answer copy to follow.' },
  { q: 'Who do I contact if I need help?', a: 'Answer copy to follow.' },
];

export const NAV_ITEMS = [
  { title: 'Discounts', subtitle: 'Saving you money everyday' },
  { title: 'Benefits', subtitle: 'List of our UK benefits' },
  { title: 'Household & Tech', subtitle: 'Instant tech through your salary' },
  { title: 'Wellbeing Center', subtitle: 'Your wellbeing matters' },
];

export const FOOTER_LINKS = ['Home', 'Privacy', 'Cookie Policy', 'Site Map', 'Terms & Conditions', 'Accessibility', 'Support', 'Logout'];
