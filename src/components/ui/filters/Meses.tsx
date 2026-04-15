import { useDataStore } from "@/store/useDataStore";
import { MesBtn } from "./MesBtn";

function getMonthOffset(start: string) {
  const today = new Date();
  today.setDate(1);

  const [year, month] = start.split("-").map(Number);
  const selected = new Date(year, month - 1, 1);

  return (
    selected.getMonth() -
    today.getMonth() +
    (selected.getFullYear() - today.getFullYear()) * 12
  );
}
export function Meses() {
  const start = useDataStore((state) => state.start);

  const selectedMonth = getMonthOffset(start);

  return (
    <div className="flex gap-2 flex-wrap">
      {[-3, -2, -1, 0].map((n) => (
        <MesBtn
          key={n}
          n={n}
          selectedMonth={selectedMonth}
          onSelect={() => {}}
        />
      ))}
    </div>
  );
}
