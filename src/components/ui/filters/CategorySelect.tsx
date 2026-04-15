import { useDataStore } from "@/store/useDataStore";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface SelectProps extends React.ComponentProps<typeof Select> {
  className: string;
}

export function CategorySelect({ className, ...props }: SelectProps) {
  const { status, setStatus } = useDataStore();

  return (
    <div>
      <Label className="cursor-pointer block">
        Escolha o Status
        <Select
          {...props}
          key={status ?? "empty"}
          value={status ?? undefined}
          onValueChange={(value) => setStatus(value === "all" ? null : value)}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>

          <SelectContent position="popper" side="bottom">
            <SelectItem value="falha">Falha</SelectItem>
            <SelectItem value="pago">Pago</SelectItem>
            <SelectItem value="processando">Processando</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </div>
  );
}
