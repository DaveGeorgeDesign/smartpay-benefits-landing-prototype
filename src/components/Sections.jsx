import { useState } from 'react';
import { FAQS, FOOTER_LINKS } from '../data.js';
import { ChevronDownIcon, ChevronForwardIcon, HomeIcon, BasketIllustration, TailArrowIcon } from './Icons.jsx';

const FOOTER_LOGO = `${import.meta.env.BASE_URL}images/reward-gateway-edenred.png`;

export function Breadcrumbs() {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="#" aria-label="Home"><HomeIcon size={16} color="#056BCC" /></a>
      <ChevronForwardIcon />
      <a href="#" className="crumb-link">Home</a>
      <ChevronForwardIcon />
      <span className="crumb-current" aria-current="page">Benefits</span>
    </nav>
  );
}

export function SensitiveToggle({ on, onChange }) {
  return (
    <button type="button" className="sensitive-toggle" role="switch" aria-checked={on} onClick={() => onChange(!on)}>
      <span className="sensitive-label">Hide sensitive info</span>
      <span className="switch-row">
        <span>Off</span>
        <span className={`switch${on ? ' is-on' : ''}`}><span className="knob" /></span>
        <span>On</span>
      </span>
    </button>
  );
}

export function BasketBanner({ count }) {
  return (
    <div className="basket-banner">
      <BasketIllustration />
      <div className="basket-text">
        <p className="basket-title">You’ve got {count} items in your Benefits Basket</p>
        <p className="basket-body">You’ll need to complete your order before you can enjoy your benefits. Complete your order now.</p>
      </div>
      <a href="#" className="primary-button">
        Complete my order
        <TailArrowIcon />
      </a>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="faq-inner">
        <h2 id="faq-title" className="section-title">Frequently asked questions</h2>
        <div className="accordion">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`accordion-item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="accordion-header"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <ChevronDownIcon className="accordion-chevron" />
                </button>
                {isOpen && <p className="accordion-body">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-links" aria-label="Footer">
        {FOOTER_LINKS.map((l) => (
          <a href="#" key={l}>{l}</a>
        ))}
      </nav>
      <img src={FOOTER_LOGO} width="230" height="50" alt="Reward Gateway | Edenred" />
    </footer>
  );
}
