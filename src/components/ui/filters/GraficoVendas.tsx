import { useSales } from "@/hooks/useSales";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Loading } from "./Loading";
import { type Sales } from "@/services/vendas";

interface VendaDia {
  data: string;
  pago: number;
  processando: number;
  falha: number;
}

function transformData(vendas: Sales[]): VendaDia[] {
  const mapaDias: Record<string, VendaDia> = {};

  vendas.forEach((item) => {
    const dia = item.data.split(" ")[0];
    if (!mapaDias[dia]) {
      mapaDias[dia] = { data: dia, pago: 0, processando: 0, falha: 0 };
    }
    mapaDias[dia][item.status] += item.preco;
  });

  return Object.values(mapaDias).map((dia) => ({
    ...dia,
    data: dia.data.substring(5),
  }));
}

export function GraficoVendas() {
  const { data, isLoading } = useSales();

  if (isLoading) return <Loading />;
  if (!data) return null;

  const transformedData = transformData(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={transformedData}
        margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
      >
        <XAxis dataKey="data" tickMargin={6} />
        <YAxis
          width={40}
          tickFormatter={(value) => `${value / 1000}k`}
          domain={[0, "dataMax + 5000"]}
        />
        <Tooltip />
        <Legend
          formatter={(value: string) =>
            value.charAt(0).toUpperCase() + value.slice(1)
          }
        />
        <Line type="monotone" dataKey="pago" stroke="#ff7300" strokeWidth={3} />
        <Line
          type="monotone"
          dataKey="processando"
          stroke="#FBCB21"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="falha"
          stroke="#000000"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
