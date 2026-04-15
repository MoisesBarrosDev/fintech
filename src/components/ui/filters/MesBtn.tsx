import { useDataStore } from "@/store/useDataStore";
import { Button } from "../button";

function nomeMes(n: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + n);
  const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date);
  return mes[0].toUpperCase() + mes.slice(1);
}

function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

function setMes(n: number) {
  const { setStart, setEnd, setPage } = useDataStore.getState();

  const date = new Date();
  date.setMonth(date.getMonth() + n);

  const fristDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  setStart(formatDate(fristDay));
  setEnd(formatDate(lastDay));
  setPage(1);
}

export function MesBtn({
  n,
  selectedMonth,
  onSelect,
}: {
  n: number;
  selectedMonth: number;
  onSelect: (n: number) => void;
}) {
  return (
    <Button
      onClick={() => {
        setMes(n);
        onSelect(n);
      }}
      className={`py-5 px-2.5 rounded-xl font-semibold transition-colors 
          ${
            n === selectedMonth
              ? "bg-[#fff4ac] text-[#463220] hover:bg-[#fff4ac] hover:text-[#463220] border border-[#eceadd] ring-2 ring-[#e8e2b8]"
              : "bg-[#eceadd] text-[#66593c] hover:bg-gray-300 hover:text-[#463220]"
          }`}
    >
      {nomeMes(n)}
    </Button>
  );
}
