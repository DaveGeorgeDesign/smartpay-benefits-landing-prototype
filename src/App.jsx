import { useEffect, useState } from 'react';
import { STATES, ORDERS } from './data.js';
import Header from './components/Header.jsx';
import { BenefitCard, OrderCard, WideOrderCard, Kpi } from './components/Cards.jsx';
import { Breadcrumbs, SensitiveToggle, BasketBanner, Faq, Footer } from './components/Sections.jsx';
import PrototypeControls from './components/PrototypeControls.jsx';
import BalancedGrid from './components/BalancedGrid.jsx';
import CurrentHomepage from './components/CurrentHomepage.jsx';

const DEFAULT_STATE = 'four';

function readState() {
  const id = new URLSearchParams(window.location.search).get('state');
  return STATES.some((s) => s.id === id) ? id : DEFAULT_STATE;
}

// ?view=current shows the existing homepage in the same state, for comparison
function readView() {
  return new URLSearchParams(window.location.search).get('view') === 'current' ? 'current' : 'new';
}

// Benefit Pots aren't offered yet, so they're hidden in both views unless ?pot=show
function readShowPot() {
  return new URLSearchParams(window.location.search).get('pot') === 'show';
}

// Drops the Benefit Pot rows from an order, plus Card value, which would then just repeat Total cost
function withoutPot(order) {
  const strip = (rows) => rows && rows.filter(([k]) => !/Benefit Pot|Card value/.test(k));
  return { ...order, summary: strip(order.summary), wideFields: strip(order.wideFields) };
}

export default function App() {
  const [stateId, setStateId] = useState(readState);
  const [view, setView] = useState(readView);
  const [showPot, setShowPot] = useState(readShowPot);
  const [hideSensitive, setHideSensitive] = useState(false);
  const page = STATES.find((s) => s.id === stateId);

  useEffect(() => {
    const onPop = () => {
      setStateId(readState());
      setView(readView());
      setShowPot(readShowPot());
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const selectState = (id) => {
    const url = new URL(window.location.href);
    url.searchParams.set('state', id);
    window.history.pushState({}, '', url);
    setStateId(id);
    window.scrollTo({ top: 0 });
  };

  const selectView = (v) => {
    const url = new URL(window.location.href);
    if (v === 'current') url.searchParams.set('view', v);
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
      current={stateId}
      onSelect={selectState}
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
        <CurrentHomepage key={stateId} page={page} showPot={showPot} />
        <Footer />
        {controls}
      </>
    );
  }

  const orders = (page.orders || []).map((k) => (showPot ? ORDERS[k] : withoutPot(ORDERS[k])));
  const hasOrders = orders.length > 0;
  const kpiList = page.kpis && page.kpis.filter((k) => showPot || k.key !== 'pot');

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

          {page.basket && <BasketBanner count={page.basket.count} />}

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

          {page.election && (
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
