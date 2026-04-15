import { Loading } from "@/components/ui/filters/Loading";
import { useSales } from "@/hooks/useSales";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Venda() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSales();

  if (isLoading) return <Loading />;
  if (error) return <p>Erro, tente novamente!</p>;
  if (!data) return null;

  const venda = data.find((item) => item.id === id);
  if (!venda) return <p>Venda não encontrada</p>;

  const [dataStr, horaStr] = venda.data.split(" ");

  return (
    <div>
      <div className="box mb">Nome: {venda.nome}</div>

      <div className="box mb">
        Preço:{" "}
        {venda.preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </div>

      <div className="box mb">
        Status: {venda.status.charAt(0).toUpperCase() + venda.status.slice(1)}
      </div>

      <div className="box mb">
        Pagamento:{" "}
        {venda.pagamento.charAt(0).toUpperCase() + venda.pagamento.slice(1)}
      </div>

      <div className="box mb">Data: {dataStr}</div>
      <div className="box mb">Hora: {horaStr}</div>

      <div className="mt-6 flex justify-center">
        <Button
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/vendas");
            }
          }}
          className="rounded-lg bg-[#eceadd] text-[#66593c] hover:bg-[#e8e2b8]"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
}
