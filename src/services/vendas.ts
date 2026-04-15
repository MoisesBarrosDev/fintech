export interface Sales {
  readonly id: string;
  nome: string;
  preco: number;
  status: "pago" | "processando" | "falha";
  pagamento: "pix" | "cartao" | "boleto";
  parcelas: number | null;
  data: string;
}

export async function searchSales(
  start: string,
  end: string,
): Promise<Sales[]> {
  const response = await fetch(
    `https://data.origamid.dev/vendas/?inicio=${start}&final=${end}`,
  );
  if (!response.ok) throw new Error("O fetch falhou!");
  return await response.json();
}
