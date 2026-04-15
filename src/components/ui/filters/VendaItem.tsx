import { NavLink } from "react-router-dom";

interface VendaItemProps {
  id: string;
  nome: string;
  preco: number;
  status: string;
  pagamento: string;
}

export function VendaItem({
  id,
  nome,
  preco,
  status,
  pagamento,
}: VendaItemProps) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="p-3 w-37.5 font-mono whitespace-nowrap">
        <NavLink
          to={`/vendas/${id}`}
          className="no-underline #66593c hover:text-gray-600 active:text-red-500 transition-colors"
        >
          {id.slice(0, 8)}
        </NavLink>
      </td>

      <td className="p-3 w-62.5">{nome}</td>

      <td className="p-3 w-45">
        <span
          className={`px-2 py-1 rounded-2xl text-sm font-mono
            ${status === "pago" ? "bg-green-100 text-green-700" : ""}
            ${status === "processando" ? "bg-yellow-100 text-yellow-700" : ""}
            ${status === "falha" ? "bg-red-100 text-red-700" : ""}
          `}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>

      <td className="p-3 w-50">
        {preco.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </td>

      <td className="p-3">
        <span
          className={`px-2 py-1 rounded-2xl text-sm font-mono
            ${status === "pago" ? "bg-green-100 text-green-700" : ""}
            ${status === "processando" ? "bg-yellow-100 text-yellow-700" : ""}
            ${status === "falha" ? "bg-red-100 text-red-700" : ""}
          `}
        >
          {pagamento.charAt(0).toUpperCase() + pagamento.slice(1)}
        </span>
      </td>
    </tr>
  );
}
