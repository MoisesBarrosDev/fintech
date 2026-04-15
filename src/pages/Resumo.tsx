import { GraficoVendas } from "@/components/ui/filters/GraficoVendas";
import { useSales } from "@/hooks/useSales";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function Resumo() {
  const { data, isLoading, error } = useSales();

  if (error) return <p>Erro ao carregar</p>;

  if (!data && !isLoading) return <>Nenhum Dado encontrado</>;

  const resumo = data?.reduce(
    (acc, item) => {
      if (item.status !== "falha") acc.vendas += item.preco;
      if (item.status === "pago") acc.recebido += item.preco;
      if (item.status === "processando") acc.processando += item.preco;
      if (item.status === "falha") acc.falha += item.preco;
      return acc;
    },
    { vendas: 0, recebido: 0, processando: 0, falha: 0 },
  );

  return (
    <>
      <div className="layout-row mb font-semibold text-2xl overflow-x-auto">
        {isLoading || !resumo ? (
          <Resumo.Loading />
        ) : (
          <>
            <div className="box min-w-50">
              <h2 className="text-2xl mb text-[#463220]">Vendas</h2>
              <span>{formatCurrency(resumo.vendas)}</span>
            </div>

            <div className="box min-w-50">
              <h2 className="text-2xl mb text-[#463220]">Recebido</h2>
              <span>{formatCurrency(resumo.recebido)}</span>
            </div>

            <div className="box min-w-50">
              <h2 className="text-2xl mb text-[#463220]">Processando</h2>
              <span>{formatCurrency(resumo.processando)}</span>
            </div>

            <div className="box min-w-50">
              <h2 className="text-2xl mb text-[#463220]">Falhas</h2>
              <span>{formatCurrency(resumo.falha)}</span>
            </div>
          </>
        )}
      </div>

      <div className="box w-full h-75 md:h-100 lg:h-112.5 overflow-hidden">
        <GraficoVendas />
      </div>
    </>
  );
}

Resumo.Loading = () => {
  return (
    <>
      <div className="box">
        <h2 className="text-2xl mb text-[#463220]">Vendas</h2>
        <div className="h-7 w-40 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div className="box">
        <h2 className="text-2xl mb text-[#463220]">Recebido</h2>
        <div className="h-7 w-40 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div className="box">
        <h2 className="text-2xl mb text-[#463220]">Processando</h2>
        <div className="h-7 w-40 bg-gray-300 rounded animate-pulse"></div>
      </div>

      <div className="box">
        <h2 className="text-2xl mb text-[#463220]">Falhas</h2>
        <div className="h-7 w-40 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </>
  );
};
