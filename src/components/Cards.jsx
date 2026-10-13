import { useState } from 'react';
import { BENEFITS } from '../data.js';
import { WINDOW_DAYS } from '../dates.js';
import {
  ArrowRightIcon, CheckCircleIcon, BlockedIcon, FlameIcon, StarOutlineSmallIcon, DetailsChevronIcon, FileDownloadIcon,
  CartIcon, RenewIcon,
} from './Icons.jsx';

const TAGS = {
  active: { className: 'tag-green', Icon: CheckCircleIcon, label: 'Active' },
  open: { className: 'tag-green', Icon: CheckCircleIcon },
  closed: { className: 'tag-grey', Icon: BlockedIcon, label: `Reopens in ${WINDOW_DAYS}d` },
  popular: { className: 'tag-blue', Icon: FlameIcon, label: 'Popular' },
  new: { className: 'tag-blue', Icon: StarOutlineSmallIcon, label: 'New benefit' },
  basket: { className: 'tag-red', Icon: CartIcon, label: 'In basket' },
  auto: { className: 'tag-amber', Icon: RenewIcon, label: 'Auto-renews' },
  expires: { className: 'tag-red', Icon: BlockedIcon },
};

// Held insurance either renews by itself or lapses at the end of the period
function RenewalTag({ order }) {
  if (order.renewal === 'auto') return <Tag kind="auto" />;
  if (order.renewal === 'expires') return <Tag kind="expires" label={`Expires ${order.endDate}`} />;
  return null;
}

export function Tag({ kind, label }) {
  const t = TAGS[kind];
  return (
    <span className={`tag ${t.className}`}>
      <t.Icon color="currentColor" />
      {label || t.label}
    </span>
  );
}

function RichText({ parts }) {
  return parts.map((p, i) => (typeof p === 'string' ? <span key={i}>{p}</span> : <strong key={i}>{p.b}</strong>));
}

// "Benefits you are eligible for" card (image, title, saving, CTA).
// The image carries one badge at most; In basket takes priority over New, Popular and Open.
export function BenefitCard({ id, tag, closed = false, inBasket = false }) {
  const b = BENEFITS[id];
  const tagKind = closed ? 'closed' : inBasket ? 'basket' : tag?.kind || b.tag;
  const description = closed && b.closedDescription ? b.closedDescription : b.description;
  const Wrapper = closed ? 'div' : 'a';
  return (
    <Wrapper className={`benefit-card${closed ? ' is-closed' : ''}`} {...(closed ? { 'aria-disabled': true } : { href: '#' })}>
      <div className="benefit-card-image">
        <img src={b.image} alt="" loading="lazy" />
        {tagKind && <Tag kind={tagKind} label={tagKind === tag?.kind ? tag.label : undefined} />}
      </div>
      <div className="benefit-card-content">
        <h3 className="benefit-card-title">{b.title}</h3>
        <p className="benefit-card-desc">
          <RichText parts={description} />
          <span className="asterisk">*</span>
        </p>
        <span className="text-link">
          {b.cta}
          <ArrowRightIcon color={closed ? '#A1D0B7' : '#018940'} />
        </span>
      </div>
    </Wrapper>
  );
}

function Money({ value, hidden }) {
  if (!hidden || !/£/.test(value)) return value;
  return <span className="masked" aria-label="hidden">£••••</span>;
}

// Active benefit (order) card — compact layout used in a row of up to four
export function OrderCard({ order, hideSensitive }) {
  const [open, setOpen] = useState(false);
  const detailsId = `${order.ref}-details`;
  return (
    <article className={`order-card${open ? ' is-expanded' : ''}`}>
      <div className="order-card-head">
        <h3 className="order-title">{order.title}</h3>
        <div className="order-meta">
          <span className="order-ref">{order.ref}</span>
          <Tag kind={order.status} />
          <RenewalTag order={order} />
        </div>
        <p className="order-date">{order.date}</p>
      </div>
      {open ? (
        <div className="order-details" id={detailsId}>
          <h4 className="order-details-title">Order summary</h4>
          <dl className="order-summary">
            {order.summary.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd><Money value={v} hidden={hideSensitive} /></dd>
              </div>
            ))}
          </dl>
          <h4 className="order-details-title">Documents</h4>
          <ul className="order-documents">
            {order.documents.map((d) => (
              <li key={d}>
                <a href="#" className="ghost-button" onClick={(e) => e.preventDefault()}>
                  <FileDownloadIcon />
                  {d}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <dl className="order-fields">
          {order.fields.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd><Money value={v} hidden={hideSensitive} /></dd>
            </div>
          ))}
        </dl>
      )}
      <div className="order-footer">
        <button type="button" className="ghost-button" aria-expanded={open} aria-controls={detailsId} onClick={() => setOpen(!open)}>
          Details
          <DetailsChevronIcon className={open ? 'rotated' : ''} />
        </button>
        <button type="button" className="secondary-button" disabled={order.action.disabled}>
          {order.action.label}
        </button>
      </div>
    </article>
  );
}

// Full-width variant used when the user has a single active benefit
export function WideOrderCard({ order, hideSensitive }) {
  return (
    <article className="order-card order-card-wide">
      <div className="order-wide-head">
        <div className="order-wide-title">
          <h3 className="order-title">{order.title}</h3>
          <span className="order-ref">{order.ref}</span>
          <Tag kind={order.status} />
          <RenewalTag order={order} />
        </div>
        <p className="order-date">{order.date}</p>
      </div>
      <div className="order-wide-body">
        <dl className="order-fields order-fields-wide">
          {order.wideFields.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd><Money value={v} hidden={hideSensitive} /></dd>
            </div>
          ))}
        </dl>
        <button type="button" className="secondary-button">
          Benefit page
          <ArrowRightIcon />
        </button>
      </div>
    </article>
  );
}

export function Kpi({ kpi, hideSensitive }) {
  return (
    <div className="kpi">
      <p className="kpi-label">{kpi.label}</p>
      <p className={`kpi-value${kpi.positive ? ' is-positive' : ''}`}>
        <Money value={kpi.value} hidden={hideSensitive} />
      </p>
      {kpi.progress != null && (
        <div className="progress" role="progressbar" aria-valuenow={kpi.progress} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${kpi.progress}%` }} />
        </div>
      )}
      <p className="kpi-note">{kpi.note}</p>
    </div>
  );
}
