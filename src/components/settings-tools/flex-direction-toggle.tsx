import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Columns3,
  EyeOff,
  Grid2X2,
  MoveHorizontal,
  MoveVertical,
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

export default function FlexDirectionToggle({
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
    { label: "Row", value: "flex-row", icon: <MoveHorizontal /> },
    { label: "Column", value: "flex-col", icon: <MoveVertical /> },
  ];

  return (
    <>
      <ToggleGroup
        id={id}
        type="single"
        variant="outline"
        size="sm"
        className={cn("gap-2 col-span-2", className)}
        value={value.replace("-reverse", "")}
        onValueChange={(newValue) => {
          if (value.includes("-reverse")) {
            onValueChange(`${newValue}-reverse`);
          } else {
            onValueChange(newValue);
          }
        }}
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
      <div className="col-span-1" />
      <div className="col-span-2 pt-1 pb-2 px-3 w-full flex items-center gap-2">
        <Checkbox
          id="reverse"
          checked={value === "flex-row-reverse" || value === "flex-col-reverse"}
          onCheckedChange={(newChecked) => {
            if (newChecked) {
              if (!value.includes("-reverse")) {
                onValueChange(`${value}-reverse`);
              }
            } else {
              if (value.includes("-reverse")) {
                onValueChange(value.replace("-reverse", ""));
              }
            }
          }}
        />
        <Label htmlFor={id}>Reverse</Label>
      </div>
    </>
  );
}
