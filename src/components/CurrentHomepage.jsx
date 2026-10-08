import { useState } from 'react';
import { BENEFITS, ORDERS } from '../data.js';
import BalancedGrid from './BalancedGrid.jsx';
import {
  CheckCircleIcon, BlockedIcon, RenewIcon, StarOutlineSmallIcon, EyeIcon, HomeIcon, ChevronForwardIcon,
  DetailsChevronIcon, FileDownloadIcon, BasketIllustration,
} from './Icons.jsx';

// The existing benefits homepage, rebuilt from the Figma "Benefits Landing Page - Benefit Pots"
// frame (node 48:8967) and the live Edenred Redux / Boom RG captures (nodes 19:6270, 444:11491),
// shown in the same eight states as the new design so the two can be compared.

const img = (name) => `${import.meta.env.BASE_URL}images/${name}`;

// Benefits paid for through salary only, so never Benefit Pot eligible
const NOT_POT_ELIGIBLE = ['payrollGiving', 'mortgage'];
const WINDOW_DATE = '30/09/2026';

// Per-state differences that the new design expresses through KPIs and tags
const CURRENT = {
  closed: { window: 'closed' },
  open: { window: 'open' },
  'closes-soon': { window: 'closing' },
  basket: { window: 'open', basket: ['pmi', 'pension'] },
  pot: { window: 'open', pot: { remaining: '£1,000', spent: '£200', total: '£1,200', pct: 83 } },
  one: { window: 'closed', pot: { remaining: '£1,000', spent: '£200', total: '£1,200', pct: 83 } },
  two: { window: 'closed', pot: { remaining: '£1,000', spent: '£200', total: '£1,200', pct: 83 } },
  four: { window: 'closed', pot: { remaining: '£860', spent: '£340', total: '£1,200', pct: 72 } },
};

function Money({ value, hidden }) {
  if (!hidden || !/£/.test(value)) return value;
  return '£XXXX';
}

function Breadcrumbs({ privacy, onPrivacy }) {
  return (
    <div className="cur-crumb-row">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="#" aria-label="Home"><HomeIcon size={16} color="#056BCC" /></a>
        <ChevronForwardIcon />
        <span className="crumb-current" aria-current="page">Benefits</span>
      </nav>
      <button type="button" className="cur-privacy" role="switch" aria-checked={privacy} onClick={() => onPrivacy(!privacy)}>
        <EyeIcon />
        <span>Privacy Mode</span>
        <span className={`switch${privacy ? ' is-on' : ''}`}><span className="knob" /></span>
        <span className="cur-privacy-state">{privacy ? 'On' : 'Off'}</span>
      </button>
    </div>
  );
}

function Hero() {
  return (
    <section className="cur-hero">
      <div className="cur-column">
        <h1>Your benefits</h1>
        <p>Create a benefits package to suit you and your needs</p>
        <a href="#eligible" className="cur-button cur-button-primary cur-button-lg">Explore benefits</a>
      </div>
    </section>
  );
}

function PotWidget({ pot, hidden }) {
  const rag = pot.pct <= 10 ? 'red' : pot.pct <= 40 ? 'amber' : 'green';
  return (
    <section className="cur-pot" aria-label="Your Benefit Pot">
      <div className="cur-pot-label">
        <img src={img('benefit-pot.svg')} width="48" height="48" alt="" />
        <div>
          <p className="cur-pot-title">Your Benefit Pot</p>
          <p className="cur-small">Employer benefit</p>
        </div>
      </div>
      <span className="cur-divider" />
      <div className="cur-pot-balance">
        <p className="cur-pot-amount">
          <strong><Money value={pot.remaining} hidden={hidden} /></strong> remaining
        </p>
        <div className={`cur-progress is-${rag}`} role="progressbar" aria-valuenow={pot.pct} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${pot.pct}%` }} />
        </div>
        <p className="cur-pot-sub cur-small">
          <span><Money value={pot.spent} hidden={hidden} /> spent this year</span>
          <span><Money value={pot.total} hidden={hidden} /> total</span>
        </p>
      </div>
      <span className="cur-divider" />
      <div className="cur-pot-renewal">
        <span className="cur-badge"><RenewIcon />Renews in 245 days</span>
        <p className="cur-small cur-muted">5 February 2027</p>
      </div>
    </section>
  );
}

function ActiveBenefit({ order, hidden }) {
  const [open, setOpen] = useState(false);
  const detailsId = `cur-${order.ref}`;
  return (
    <article className="cur-panel cur-active">
      {order.status === 'closed' ? (
        <span className="cur-chip cur-chip-grey"><BlockedIcon size={12} color="currentColor" />Closed</span>
      ) : (
        <span className="cur-chip cur-chip-green"><CheckCircleIcon size={12} color="currentColor" />Active</span>
      )}
      <h3 className="cur-active-title">{order.title}</h3>
      <dl className="cur-active-fields">
        {order.fields.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd><Money value={v} hidden={hidden} /></dd>
          </div>
        ))}
        <div>
          <dt>{order.date.replace(/ \d.*$/, '')}</dt>
          <dd>{order.date.match(/\d.*$/)[0]}</dd>
        </div>
      </dl>
      <button type="button" className="cur-link" aria-expanded={open} aria-controls={detailsId} onClick={() => setOpen(!open)}>
        {open ? 'Hide Details' : 'View Details'}
        <DetailsChevronIcon size={14} color="#056BCC" className={open ? 'rotated' : ''} />
      </button>
      {open && (
        <div className="cur-active-details" id={detailsId}>
          <dl>
            <div><dt>Reference</dt><dd>{order.ref}</dd></div>
            {order.summary.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd><Money value={v} hidden={hidden} /></dd>
              </div>
            ))}
          </dl>
          <ul>
            {order.documents.map((d) => (
              <li key={d}>
                <a href="#" onClick={(e) => e.preventDefault()}><FileDownloadIcon />{d}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="cur-actions">
        <a href="#" className="cur-button cur-button-secondary">Benefit Page</a>
      </div>
    </article>
  );
}

function BasketPanel({ items }) {
  const names = items.map((k) => BENEFITS[k].title);
  return (
    <section className="cur-panel cur-basket">
      <div className="cur-basket-text">
        <h2 className="cur-panel-title">Submit your Benefits Basket</h2>
        <p>If you’ve finished browsing the benefit options, then review your choices and submit your selection from the basket.</p>
        <p>
          You have <strong>{names[0]}</strong>
          {names.slice(1).map((n) => <span key={n}> and <strong>{n}</strong></span>)} in your basket.
        </p>
        <div className="cur-actions">
          <a href="#" className="cur-button cur-button-primary">Checkout</a>
        </div>
      </div>
      <div className="cur-basket-art">
        <BasketIllustration size={80} />
        <span className="cur-basket-count">{items.length}</span>
      </div>
    </section>
  );
}

function Status({ Icon, tone, children }) {
  return (
    <span className={`cur-status cur-status-${tone}`}>
      <Icon size={14} color="currentColor" />
      {children}
    </span>
  );
}

function BenefitCard({ id, cfg, inBasket, showPot }) {
  const b = BENEFITS[id];
  const windowBenefit = b.electionWindow;
  const notOpen = windowBenefit && cfg.window === 'closed';
  return (
    <article className="cur-card">
      <div className="cur-card-media">
        <img src={b.image} alt="" loading="lazy" />
        {(inBasket || b.tag === 'new') && (
          <div className="cur-card-badges">
            {inBasket && <span className="tag tag-red"><CheckCircleIcon color="currentColor" />In basket</span>}
            {b.tag === 'new' && <span className="tag tag-blue"><StarOutlineSmallIcon color="currentColor" />New Benefit</span>}
          </div>
        )}
      </div>
      <div className="cur-card-content">
        <h3 className="cur-card-title">{b.title}</h3>
        <div className="cur-card-status">
          {!windowBenefit && <Status Icon={CheckCircleIcon} tone="green">Always Open</Status>}
          {windowBenefit && cfg.window === 'open' && <Status Icon={CheckCircleIcon} tone="green">Open until {WINDOW_DATE}</Status>}
          {windowBenefit && cfg.window === 'closing' && <Status Icon={RenewIcon} tone="amber">Closes in 3 days</Status>}
          {notOpen && <Status Icon={BlockedIcon} tone="red">Not Open</Status>}
          {showPot && !notOpen && !NOT_POT_ELIGIBLE.includes(id) && <Status Icon={CheckCircleIcon} tone="green">Benefit Pot</Status>}
        </div>
        {notOpen && <p className="cur-card-note">The next window for this benefit opens on {WINDOW_DATE}.</p>}
        <div className="cur-actions">
          {!notOpen && (
            <a href="#" className="cur-button cur-button-primary">{inBasket ? 'Checkout' : 'Apply'}</a>
          )}
          <a href="#" className="cur-button cur-button-secondary">Benefit Page</a>
        </div>
      </div>
    </article>
  );
}

function FaqBanner() {
  return (
    <section className="cur-panel cur-faq">
      <img src={img('faq-icon.svg')} width="64" height="64" alt="" />
      <div className="cur-faq-text">
        <h2 className="cur-panel-title">Frequently Asked Questions</h2>
        <p>Want to know more? Take a look at our frequently asked questions.</p>
      </div>
      <a href="#" className="cur-button cur-button-secondary cur-button-lg">See FAQs</a>
    </section>
  );
}

export default function CurrentHomepage({ page, showPot = true }) {
  const [privacy, setPrivacy] = useState(false);
  const cfg = CURRENT[page.id];
  const pot = showPot ? cfg.pot : null;
  const orders = (page.orders || []).map((k) => ORDERS[k]);
  const basket = cfg.basket || [];
  // Same benefits as the new design's state, always in catalogue order: unlike the new design,
  // the current site doesn't move closed window-only benefits to the end
  const order = Object.keys(BENEFITS);
  const benefits = [...page.available, ...(page.election || [])]
    .map((c) => c.key)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b));

  return (
    <div className="current">
      <Hero />
      <main className="cur-content">
        <div className="cur-column">
          <Breadcrumbs privacy={privacy} onPrivacy={setPrivacy} />
          {pot && <PotWidget pot={pot} hidden={privacy} />}

          {orders.length > 0 && (
            <section className="cur-section">
              <h2 className="cur-section-title">Active Benefits</h2>
              <div className="cur-active-list">
                {orders.map((o) => <ActiveBenefit key={o.ref} order={o} hidden={privacy} />)}
              </div>
            </section>
          )}

          {basket.length > 0 && <BasketPanel items={basket} />}

          <section className="cur-section" id="eligible">
            <div>
              <h2 className="cur-section-title">Benefits you are eligible for</h2>
              <p className="cur-section-intro">
                Browse all the benefits available to you below. Apply to make your selection and create a benefits package that suits you and your lifestyle.
              </p>
            </div>
            <BalancedGrid className="cur-grid" count={benefits.length}>
              {benefits.map((k) => (
                <BenefitCard key={k} id={k} cfg={cfg} inBasket={basket.includes(k)} showPot={Boolean(pot)} />
              ))}
            </BalancedGrid>
          </section>

          <FaqBanner />
        </div>
      </main>
    </div>
  );
}
