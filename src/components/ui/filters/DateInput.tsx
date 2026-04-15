import { Input } from "../input";
import { Label } from "../label";

interface InputProps extends React.ComponentProps<typeof Input> {
  label: string;
  id: string;
}

export function DateInput({ id, label, ...props }: InputProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-0.5 cursor-pointer">
        {label}
      </Label>
      <Input
        id={id}
        type="date"
        className="border-none font-medium
       color-2 bg-4 py-2.5 px-3 text-base rounded-md cursor-pointer"
        {...props}
      />
    </div>
  );
}
