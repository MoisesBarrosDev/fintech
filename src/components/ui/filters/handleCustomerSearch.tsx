import { useDataStore } from "@/store/useDataStore";
import { Input } from "../input";
import { Label } from "../label";

export function HandleCustomerSearch() {
  const { search, setSearch } = useDataStore();
  return (
    <div>
      <Label htmlFor="search" className="mb-0.5 cursor-pointer">
        Procurar
      </Label>
      <Input
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Nome ou ID do cliente"
        className="h-10  w-full lg:w-56 border-[#eceadd]! focus:ring-2! focus:ring-[#e8e2b8]!"
      />
    </div>
  );
}
