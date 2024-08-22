import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Columns3,
  EyeOff,
  Grid2X2,
  Square,
} from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui-editor/toggle-group";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";
import { Label } from "../ui-editor/label";
import { Checkbox } from "../ui-editor/checkbox";

export default function DisplayToggle({
  id,
  className,
  value,
  onValueChange,
  disabled,
}: {
  id: string;
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}) {
  const displayOptions = [
    { label: "Block", value: "block", icon: <Square /> },
    { label: "Flex", value: "flex", icon: <Columns3 /> },
    { label: "Grid", value: "grid", icon: <Grid2X2 /> },
    { label: "Hidden", value: "hidden", icon: <EyeOff /> },
  ];
  return (
    <ToggleGroup
      id={id}
      type="single"
      variant="outline"
      size="sm"
      className={cn("gap-2", className)}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {displayOptions.map(({ label, value, icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label}
          title={label}
          className="w-full"
        >
          {icon &&
            isValidElement(icon) &&
            cloneElement(icon as React.ReactElement, {
              className: "w-4 h-4",
            })}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
