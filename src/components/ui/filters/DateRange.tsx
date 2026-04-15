import { useEffect, useMemo, useState } from "react";
import { DateInput } from "./DateInput";
import { useDataStore } from "@/store/useDataStore";
import { Button } from "../button";
import { useLocation } from "react-router-dom";

function isValidDate(date: string) {
  return !isNaN(new Date(date).getTime());
}

export function DateRange() {
  const start = useDataStore((state) => state.start);
  const end = useDataStore((state) => state.end);
  const setStart = useDataStore((state) => state.setStart);
  const setEnd = useDataStore((state) => state.setEnd);

  const [localStart, setLocalStart] = useState(start);
  const [localEnd, setLocalEnd] = useState(end);

  const { pathname } = useLocation();
  const isResumo = pathname === "/";

  useEffect(() => {
    setLocalStart(start);
    setLocalEnd(end);
  }, [start, end]);

  const error = useMemo(() => {
    if (!localStart || !localEnd) return null;

    if (!isValidDate(localStart) || !isValidDate(localEnd)) {
      return "Data inválida";
    }

    if (new Date(localStart) > new Date(localEnd)) {
      return "Data inicial não pode ser maior que a final";
    }

    return null;
  }, [localStart, localEnd]);

  const isValid = !error && localStart && localEnd;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setStart(localStart);
    setEnd(localEnd);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col justify-end min-h-14 w-full lg:w-auto"
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:flex-nowrap">
        <DateInput
          id="start"
          label="Start"
          value={localStart}
          onChange={({ target }) => setLocalStart(target.value)}
          className="w-full lg:w-40 h-10 cursor-pointer border-[#eceadd]! focus:ring-2! focus:ring-[#e8e2b8]!"
        />

        <DateInput
          id="end"
          label="End"
          value={localEnd}
          onChange={({ target }) => setLocalEnd(target.value)}
          className="w-full lg:w-40 h-10 cursor-pointer border-[#eceadd]! focus:ring-2! focus:ring-[#e8e2b8]!"
        />

        <Button
          type="submit"
          disabled={!isValid}
          className={`h-10 px-3 text-sm rounded-lg flex items-center justify-center whitespace-nowrap
          ${isResumo ? "w-28" : ""}
          ${
            isValid
              ? "bg-[#eceadd] text-[#66593c] hover:bg-[#e8e2b8] hover:text-[#463220] cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Aplicar
        </Button>
      </div>

      <span className="absolute top-full left-0 text-xs text-red-500 mt-1 whitespace-nowrap">
        {error ?? ""}
      </span>
    </form>
  );
}
