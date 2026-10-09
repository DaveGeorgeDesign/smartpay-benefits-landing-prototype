import { useEffect, useState } from 'react';
import { ORDERS, WINDOWS, HELD, LEGACY_STATES, buildPage } from './data.js';
import Header from './components/Header.jsx';
import { BenefitCard, OrderCard, WideOrderCard, Kpi } from './components/Cards.jsx';
import { Breadcrumbs, SensitiveToggle, BasketBanner, Faq, Footer } from './components/Sections.jsx';
import PrototypeControls from './components/PrototypeControls.jsx';
import BalancedGrid from './components/BalancedGrid.jsx';
import CurrentHomepage from './components/CurrentHomepage.jsx';

const DEFAULT_SETTINGS = { window: 'closed', basket: false, held: 4 };

// Prototype settings live in the URL: ?window=open|closing|closed&basket=yes&held=0|1|2|4.
// Old ?state= links still work by mapping to their settings.
function readSettings() {
  const q = new URLSearchParams(window.location.search);
  const legacy = LEGACY_STATES[q.get('state')];
  const base = legacy || DEFAULT_SETTINGS;
  const win = WINDOWS.some(([id]) => id === q.get('window')) ? q.get('window') : base.window;
  const held = HELD.includes(Number(q.get('held'))) && q.has('held') ? Number(q.get('held')) : base.held;
  const basket = q.has('basket') ? q.get('basket') === 'yes' : base.basket;
  return { window: win, basket, held };
}

function writeSettings(url, { window: win, basket, held }) {
  url.searchParams.set('window', win);
  url.searchParams.set('held', String(held));
  if (basket) url.searchParams.set('basket', 'yes');
  else url.searchParams.delete('basket');
}

// ?view=a shows the existing homepage (Version A) with the same settings, for comparison.
// Neutral names so test participants can't tell which is the redesign; old ?view=current links still work.
function readView() {
  const v = new URLSearchParams(window.location.search).get('view');
  return v === 'a' || v === 'current' ? 'current' : 'new';
}

// Benefit Pots aren't offered yet, so they're hidden in both views unless ?pot=show
function readShowPot() {
  const q = new URLSearchParams(window.location.search);
  return q.get('pot') === 'show' || Boolean(LEGACY_STATES[q.get('state')]?.pot);
}

// Drops the Benefit Pot rows from an order, plus Card value, which would then just repeat Total cost
function withoutPot(order) {
  const strip = (rows) => rows && rows.filter(([k]) => !/Benefit Pot|Card value/.test(k));
  return { ...order, summary: strip(order.summary), wideFields: strip(order.wideFields) };
}

export default function App() {
  const [settings, setSettings] = useState(readSettings);
  const [view, setView] = useState(readView);
  const [showPot, setShowPot] = useState(readShowPot);
  const [hideSensitive, setHideSensitive] = useState(false);
  const page = buildPage(settings);

  useEffect(() => {
    const onPop = () => {
      setSettings(readSettings());
      setView(readView());
      setShowPot(readShowPot());
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Rewrites an old ?state= link as its settings, so later changes start from them
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('state')) return;
    url.searchParams.delete('state');
    writeSettings(url, settings);
    if (showPot) url.searchParams.set('pot', 'show');
    window.history.replaceState({}, '', url);
  }, []);

  const changeSettings = (change) => {
    const next = { ...settings, ...change };
    const url = new URL(window.location.href);
    writeSettings(url, next);
    window.history.pushState({}, '', url);
    setSettings(next);
  };

  const selectView = (v) => {
    const url = new URL(window.location.href);
    if (v === 'current') url.searchParams.set('view', 'a');
    else url.searchParams.delete('view');
    window.history.pushState({}, '', url);
    setView(v);
  };

  const selectShowPot = (on) => {
    const url = new URL(window.location.href);
    if (on) url.searchParams.set('pot', 'show');
    else url.searchParams.delete('pot');
    window.history.pushState({}, '', url);
    setShowPot(on);
  };

  // Keyed so the settings panel stays open when switching between the two views
  const controls = (
    <PrototypeControls
      key="prototype-controls"
      settings={settings}
      onChange={changeSettings}
      view={view}
      onView={selectView}
      showPot={showPot}
      onShowPot={selectShowPot}
    />
  );

  if (view === 'current') {
    return (
      <>
        <Header />
        <CurrentHomepage page={page} showPot={showPot} />
        <Footer />
        {controls}
      </>
    );
  }

  const orders = (page.orders || []).map((k) => (showPot ? ORDERS[k] : withoutPot(ORDERS[k])));
  const hasOrders = orders.length > 0;
  // New users only get the Benefit Pot module KPIs, so none show while pots are hidden
  const kpiList = showPot ? page.kpis : page.held ? page.kpis.filter((k) => k.key !== 'pot') : null;

  return (
    <>
      <Header />
      <main className="content">
        <div className="content-inner">
          <Breadcrumbs />

          <div className="page-title">
            <h1>Welcome to your benefits, Dave</h1>
            <div className="page-title-row">
              <p className="intro">{page.intro}</p>
              <SensitiveToggle on={hideSensitive} onChange={setHideSensitive} />
            </div>
          </div>

          {page.basket && <BasketBanner items={page.basket.items} />}

          {kpiList && (
            <div className={`kpis kpis-${kpiList.length}`}>
              {kpiList.map((k) => <Kpi key={k.key} kpi={k} hideSensitive={hideSensitive} />)}
            </div>
          )}

          {hasOrders && (
            <section className="section">
              <h2 className="section-title">Your active benefits ({orders.length})</h2>
              {orders.length === 1 ? (
                <WideOrderCard order={orders[0]} hideSensitive={hideSensitive} />
              ) : (
                <BalancedGrid className="order-grid" count={orders.length}>
                  {orders.map((o) => <OrderCard key={o.ref} order={o} hideSensitive={hideSensitive} />)}
                </BalancedGrid>
              )}
            </section>
          )}

          <section className="section">
            <h2 className="section-title">
              {hasOrders ? 'Add more benefits' : 'Available to you now'} ({page.available.length})
            </h2>
            <BalancedGrid className="card-grid" count={page.available.length}>
              {page.available.map((c) => <BenefitCard key={c.key} id={c.key} tag={c.tag} />)}
            </BalancedGrid>
          </section>

          {page.election.length > 0 && (
            <section className="section">
              <div className="section-heading">
                <h2 className="section-title">Available during the next Election Window - reopens in 30 days</h2>
                <p className="section-subtitle">
                  Some benefits are only available to apply for during set periods called Election Windows. The next one opens 30/9/2026.
                </p>
              </div>
              <BalancedGrid className="card-grid" count={page.election.length}>
                {page.election.map((c) => <BenefitCard key={c.key} id={c.key} closed />)}
              </BalancedGrid>
            </section>
          )}

          <p className="disclaimer">
            *These are estimated savings based on the information we currently hold about you and your circumstances, provided by you and/or your employer. The figure shown may differ from the estimate you receive when you start an application - for example, if you give us further information at that point that materially affects your situation. Estimates are illustrative and aren’t financial advice.
          </p>
        </div>
      </main>
      <Faq />
      <Footer />
      {controls}
    </>
  );
}
