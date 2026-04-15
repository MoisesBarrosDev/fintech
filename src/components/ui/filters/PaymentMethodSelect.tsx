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

export function PaymentMethodSelect({ className, ...props }: SelectProps) {
  const { paymentMethod, setPaymentMethod } = useDataStore();

  return (
    <div>
      <Label className="cursor-pointer block">
        Escolha o Método de Pagamento
        <Select
          {...props}
          key={paymentMethod ?? "empty"}
          value={paymentMethod ?? undefined}
          onValueChange={(value) =>
            setPaymentMethod(value === "all" ? null : value)
          }
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>

          <SelectContent position="popper" side="bottom">
            <SelectItem value="pix">Pix</SelectItem>
            <SelectItem value="cartao">Cartão</SelectItem>
            <SelectItem value="boleto">Boleto</SelectItem>
          </SelectContent>
        </Select>
      </Label>
    </div>
  );
}
