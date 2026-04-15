import { useQuery } from "@tanstack/react-query";
import { searchSales, type Sales } from "../services/vendas";
import { useDataStore } from "@/store/useDataStore";

export function useSales() {
  const start = useDataStore((state) => state.start);
  const end = useDataStore((state) => state.end);

  const { data, error, isLoading, refetch } = useQuery<Sales[]>({
    queryKey: ["vendas", start, end],
    queryFn: () => searchSales(start, end),
    enabled: !!start && !!end,
  });

  return { data, error, isLoading, refetch };
}
