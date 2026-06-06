import React, { Suspense } from "react";
import Header from "../components/Header";
import RemoteErrorBoundary from "../components/RemoteErrorBoundary";

const Cardapio = React.lazy(() => import("cardapio/Cardapio"));
const Pedido = React.lazy(() => import("pedido/Pedido"));

export default function Home() {
  return (
    <div className="app-shell">
      <Header />

      <main className="delivery-layout">
        <section className="delivery-layout__menu" aria-label="Cardápio">
          <RemoteErrorBoundary title="Micro Cardápio indisponível">
            <Suspense fallback={<div className="remote-state">Carregando cardápio...</div>}>
              <Cardapio />
            </Suspense>
          </RemoteErrorBoundary>
        </section>

        <aside className="delivery-layout__order" aria-label="Pedido atual">
          <RemoteErrorBoundary title="Micro Pedido indisponível">
            <Suspense fallback={<div className="remote-state">Carregando pedido...</div>}>
              <Pedido />
            </Suspense>
          </RemoteErrorBoundary>
        </aside>
      </main>
    </div>
  );
}
