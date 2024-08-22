import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui-editor/toggle-group";
import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

export default function TextAlignToggle({
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
  const textAlignOptions = [
    { label: "Left", value: "text-left", icon: <AlignLeft /> },
    { label: "Center", value: "text-center", icon: <AlignCenter /> },
    { label: "Right", value: "text-right", icon: <AlignRight /> },
    { label: "Justify", value: "text-justify", icon: <AlignJustify /> },
  ];
  return (
    <ToggleGroup
      id={id}
      type="single"
      variant="outline"
      size="sm"
      className={cn("gap-2 px-1", className)}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {textAlignOptions.map(({ label, value, icon }) => (
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
