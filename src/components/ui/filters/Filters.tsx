import { DateRange } from "./DateRange";
import { Meses } from "./Meses";
import { CategorySelect } from "./CategorySelect";
import { HandleCustomerSearch } from "./handleCustomerSearch";
import { PaymentMethodSelect } from "./PaymentMethodSelect";
import { Button } from "../button";
import { useDataStore } from "@/store/useDataStore";
import { Trash2 } from "lucide-react";
import { useLocation } from "react-router-dom";

export function Filters() {
  const resetFilters = useDataStore((state) => state.resetFilters);
  const hasActiveFilters = useDataStore((state) => state.hasActiveFilters());

  const { pathname } = useLocation();
  const isResumo = pathname === "/";

  return (
    <div className="bg-white p-5 rounded-4xl flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>Filtros</h2>

        {hasActiveFilters && (
          <Button
            onClick={resetFilters}
            className="gap-2 rounded-lg bg-[#eceadd] text-[#66593c] hover:bg-[#e8e2b8] hover:text-[#463220]"
          >
            Apagar filtros
            <Trash2 className="text-red-500" />
          </Button>
        )}
      </div>

      {!isResumo ? (
        <>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:flex-wrap">
            <HandleCustomerSearch />

            <CategorySelect
              className="h-10 w-full lg:w-56 cursor-pointer rounded-md
              border-[#eceadd] focus:ring-2 focus:ring-[#e8e2b8]"
            />

            <PaymentMethodSelect
              className="h-10 w-full lg:w-56 cursor-pointer rounded-md
             border-[#eceadd] focus:ring-2 focus:ring-[#e8e2b8]"
            />

            <DateRange />
          </div>

          <Meses />
        </>
      ) : (
        <>
          <DateRange />
          <Meses />
        </>
      )}
    </div>
  );
}
