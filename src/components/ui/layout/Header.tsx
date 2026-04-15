import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filters } from "../filters/Filters";
import { MobileMenu } from "../filters/MobileMenu";

export function Header() {
  const location = useLocation();

  const routesTitles: Record<string, string> = {
    "/": "Resumo",
    "/vendas": "Vendas",
    "/contato": "Contato",
  };

  const title =
    Object.entries(routesTitles)
      .filter(([path]) => path !== "/")
      .find(([path]) => location.pathname.startsWith(path))?.[1] ||
    routesTitles[location.pathname] ||
    "Página";

  useEffect(() => {
    document.title = `Fintech | ${title}`;
  }, [title]);

  const hideFiltersRoutes = [
    "/webhooks",
    "/configuracoes",
    "/contato",
    "/sair",
  ];

  const isVendaDetalhe = /^\/vendas\/[^/]+$/.test(location.pathname);

  const shouldHideFilters =
    isVendaDetalhe ||
    hideFiltersRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <header className="flex flex-col gap-3 lg:gap-4 p-3 lg:p-4">
      <div className="flex items-center gap-3">
        <MobileMenu />
        <h1 className="flex-1 p-3 lg:p-4 mt-2 lg:mt-4 rounded-4xl bg-[#e8e2b8] text-lg lg:text-2xl">
          {title}
        </h1>
      </div>

      {!shouldHideFilters && <Filters />}
    </header>
  );
}
