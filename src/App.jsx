import { useEffect, useState } from 'react';
import { STATES, ORDERS } from './data.js';
import Header from './components/Header.jsx';
import { BenefitCard, OrderCard, WideOrderCard, Kpi } from './components/Cards.jsx';
import { Breadcrumbs, SensitiveToggle, BasketBanner, Faq, Footer } from './components/Sections.jsx';
import PrototypeControls from './components/PrototypeControls.jsx';

const DEFAULT_STATE = 'four';

function readState() {
  const id = new URLSearchParams(window.location.search).get('state');
  return STATES.some((s) => s.id === id) ? id : DEFAULT_STATE;
}

export default function App() {
  const [stateId, setStateId] = useState(readState);
  const [hideSensitive, setHideSensitive] = useState(false);
  const page = STATES.find((s) => s.id === stateId);

  useEffect(() => {
    const onPop = () => setStateId(readState());
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

  const orders = (page.orders || []).map((k) => ORDERS[k]);
  const hasOrders = orders.length > 0;

  return (
    <>
      <Header />
      <main className="content">
        <div className="content-inner">
          <Breadcrumbs />

          <div className="page-title">
            <h1>Welcome to your benefits</h1>
            <div className="page-title-row">
              <p className="intro">{page.intro}</p>
              <SensitiveToggle on={hideSensitive} onChange={setHideSensitive} />
            </div>
          </div>

          {page.basket && <BasketBanner count={page.basket.count} />}

          {page.kpis && (
            <div className={`kpis kpis-${page.kpis.length}`}>
              {page.kpis.map((k) => <Kpi key={k.key} kpi={k} hideSensitive={hideSensitive} />)}
            </div>
          )}

          {hasOrders && (
            <section className="section">
              <h2 className="section-title">Your active benefits ({orders.length})</h2>
              {orders.length === 1 ? (
                <WideOrderCard order={orders[0]} hideSensitive={hideSensitive} />
              ) : (
                <div className="order-grid">
                  {orders.map((o) => <OrderCard key={o.ref} order={o} hideSensitive={hideSensitive} />)}
                </div>
              )}
            </section>
          )}

          <section className="section">
            <h2 className="section-title">
              {hasOrders ? 'Add more benefits' : 'Available to you now'} ({page.available.length})
            </h2>
            <div className="card-grid">
              {page.available.map((c) => <BenefitCard key={c.key} id={c.key} tag={c.tag} />)}
            </div>
          </section>

          {page.election && (
            <section className="section">
              <div className="section-heading">
                <h2 className="section-title">Available during the next Election Window - reopens in 30 days</h2>
                <p className="section-subtitle">
                  Some benefits are only available to apply for during set periods called Election Windows. The next one opens 30/9/2026.
                </p>
              </div>
              <div className="card-grid">
                {page.election.map((c) => <BenefitCard key={c.key} id={c.key} closed />)}
              </div>
            </section>
          )}

          <p className="disclaimer">
            *These are estimated savings based on the information we currently hold about you and your circumstances, provided by you and/or your employer. The figure shown may differ from the estimate you receive when you start an application - for example, if you give us further information at that point that materially affects your situation. Estimates are illustrative and aren’t financial advice.
          </p>
        </div>
      </main>
      <Faq />
      <Footer />
      <PrototypeControls current={stateId} onSelect={selectState} />
    </>
  );
}
