import { VendaItem } from "@/components/ui/filters/VendaItem";
import { VendaItemSkeleton } from "@/components/ui/filters/VendaItemSkeleton";
import { useSales } from "@/hooks/useSales";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/store/useDataStore";
import { CardErrorVenda } from "@/components/ui/error/CardErrorVenda";

function getVisiblePages(current: number, total: number) {
  const pages: (number | string)[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (current > 4) {
    pages.push("...");
  }

  for (let i = current - 2; i <= current + 2; i++) {
    if (i > 1 && i < total) {
      pages.push(i);
    }
  }

  if (current < total - 3) {
    pages.push("...");
  }

  pages.push(total);

  return pages;
}

export default function Vendas() {
  const { data, isLoading, error, refetch } = useSales();
  const { status, paymentMethod, search } = useDataStore();

  const page = useDataStore((state) => state.page);
  const setPage = useDataStore((state) => state.setPage);
  const pageSize = 15;

  const safeData = data ?? [];

  const filteredData = safeData.filter((item) => {
    if (status && item.status !== status) return false;
    if (paymentMethod && item.pagamento !== paymentMethod) return false;

    if (search) {
      const searchLower = search.toLowerCase();

      const matchNome = item.nome.toLowerCase().startsWith(searchLower);
      const matchId = item.id.toLowerCase().startsWith(searchLower);

      if (!matchNome && !matchId) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const visiblePages = getVisiblePages(page, totalPages || 1);

  const isEmpty = paginatedData.length === 0;

  if (isLoading) {
    return (
      <div className="box overflow-auto">
        <table className="w-full min-w-175 table-fixed border-separate border-spacing-0">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Valor</th>
              <th className="text-left p-3">Pagamento</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <VendaItemSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return <CardErrorVenda onRetry={refetch} />;
  }

  return (
    <div className="box overflow-x-auto">
      <table className="w-full min-w-175 table-fixed border-separate border-spacing-0">
        <caption className="text-left font-bold mb-2">Dados das Vendas</caption>

        <thead>
          <tr className="border-b bg-gray-100">
            <th className="text-left p-3 w-37.5 rounded-tl-xl">ID</th>
            <th className="text-left p-3 w-62.5">Cliente</th>
            <th className="text-left p-3 w-45">Status</th>
            <th className="text-left p-3 w-50">Valor</th>
            <th className="text-left p-3 w-45 rounded-tr-xl">
              Método de pagamento
            </th>
          </tr>
        </thead>

        <tbody>
          {isEmpty ? (
            <tr>
              <td colSpan={5}>
                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                  <p className="text-lg font-medium">
                    Nenhuma venda encontrada
                  </p>

                  <p className="text-sm">
                    Tente ajustar os filtros ou a busca.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            paginatedData.map(({ id, nome, preco, status, pagamento }) => (
              <VendaItem
                key={id}
                id={id}
                nome={nome}
                status={status}
                preco={preco}
                pagamento={pagamento}
              />
            ))
          )}
        </tbody>
      </table>

      {!isEmpty && (
        <div className="flex items-center justify-center lg:justify-end gap-2 mt-4 flex-wrap">
          <Button
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-500 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            Anterior
          </Button>

          {visiblePages.map((p, index) =>
            p === "..." ? (
              <span key={index} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={p}
                onClick={() => typeof p === "number" && setPage(p)}
                className={`px-3 py-1 rounded-lg border transition ${
                  p === page ? "bg-[#222222]" : "bg-[#3f3f3f]"
                }`}
              >
                {p}
              </Button>
            ),
          )}

          <Button
            onClick={() => setPage(Math.min(page + 1, totalPages || 1))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-500 rounded-lg disabled:opacity-50 hover:bg-gray-300"
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  );
}
