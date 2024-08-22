import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui-editor/select";

export function SelectList({
  id,
  className,
  itemClassName,
  value,
  onValueChange,
  options,
  label,
  disabled,
}: {
  id: string;
  className?: string;
  itemClassName?: (value: string) => string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  label: string;
  disabled?: boolean;
}) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger id={id} className={cn("h-9 text-start", className)}>
        <SelectValue placeholder="None" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              value={option}
              key={option}
              className={itemClassName ? itemClassName(option) : ""}
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
