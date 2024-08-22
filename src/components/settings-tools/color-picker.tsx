import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui-editor/popover";
import { Button } from "@/components/ui-editor/button";
import { BACKGROUND_COLOR_CLASSNAMES_SWATCHES } from "@/lib/tailwindClasses";
import { Separator } from "@/components/ui-editor/separator";
import { Label } from "@/components/ui-editor/label";
import { cn } from "@/lib/utils";

export const ColorPicker = ({
  id,
  label,
  value, // Can be bg- or text- or border-
  onChange,
  isDisabled,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (color: string) => void;
  isDisabled?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const type = value.startsWith("border-")
    ? "border"
    : value.startsWith("text-")
    ? "text"
    : "bg";

  let bgParsedValue = value;

  // From bg- or text- or border- to bg-
  if (type === "bg") {
    bgParsedValue = value;
  } else if (type === "text") {
    bgParsedValue = value.replace("text-", "bg-");
  } else if (type === "border") {
    bgParsedValue = value.replace("border-", "bg-");
  }

  const bgToType = (color: string) => {
    if (type === "text") {
      return color.replace("bg-", "text-");
    }
    if (type === "border") {
      return color.replace("bg-", "border-");
    }
    return color;
  };

  // From bg- to desired value bg- or text- or border-
  const handleColorChange = (color: string) => {
    onChange(bgToType(color));
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          title={value}
          aria-label={label}
          variant="outline"
          size="sm"
          className={cn("space-x-2 px-3 flex justify-between", className)}
          disabled={isDisabled}
        >
          <span className="text-sm font-normal truncate">{value}</span>
          <div
            className={`w-6 h-6 flex-shrink-0 rounded-md border ${bgParsedValue}`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 h-96 p-2 space-y-2 overflow-y-auto">
        <p className="text-sm text-stone-500">{label}</p>
        <Separator />
        <div className="flex flex-col gap-1 ">
          {BACKGROUND_COLOR_CLASSNAMES_SWATCHES.map((colorGroup) => (
            <div key={colorGroup[0]} className="flex flex-row gap-1">
              {colorGroup.map((color) => (
                <button
                  type="button"
                  title={bgToType(color)}
                  key={color}
                  className={`w-4 h-4 rounded-sm ${color} border border-stone-300`}
                  onClick={() => {
                    handleColorChange(color);
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
