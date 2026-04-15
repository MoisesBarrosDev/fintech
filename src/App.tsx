import { Header } from "./components/ui/layout/Header";
import { SideNav } from "./components/ui/layout/SideNav";

import { Contato } from "./pages/Contato";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ui/error/ErrorFallback";

const Section = lazy(() => import("./components/ui/layout/Section"));
const Vendas = lazy(() => import("./pages/Vendas"));
const Venda = lazy(() => import("./pages/Venda"));

function LazyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500">Carregando página...</p>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          window.location.reload();
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[240px_auto] grid-rows-[auto_1fr] gap-4 lg:gap-6">
          <div className="hidden lg:block row-span-2 sticky top-6 h-screen overflow-y-auto overflow-x-hidden px-4">
            <SideNav />
          </div>

          <Header />

          <main className="row-start-2 col-start-1 lg:col-start-2 p-4 w-full overflow-x-hidden">
            <Routes>
              <Route
                path="/"
                element={
                  <LazyWrapper>
                    <Section />
                  </LazyWrapper>
                }
              />

              <Route
                path="/vendas"
                element={
                  <LazyWrapper>
                    <Vendas />
                  </LazyWrapper>
                }
              />

              <Route
                path="/vendas/:id"
                element={
                  <LazyWrapper>
                    <Venda />
                  </LazyWrapper>
                }
              />

              <Route path="/contato" element={<Contato />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
