import type { GenericComponentName } from "@/types/elements/elements";
import {
  PanelsTopLeft,
  SquareSlash,
  SquareGanttChartIcon,
  SquareMousePointer,
} from "lucide-react";
import { Component } from "react";

export function ElementNodeIcon({
  type,
  className,
}: {
  type: GenericComponentName;
  className: string;
}) {
  switch (type) {
    case "Root":
      return <PanelsTopLeft className={className} />;
    case "Card":
      return <SquareSlash className={className} />;
    case "CardContent":
      return <SquareSlash className={className} />;
    case "CardHeader":
      return <SquareSlash className={className} />;
    case "CardFooter":
      return <SquareSlash className={className} />;
    case "CardTitle":
      return <SquareSlash className={className} />;
    case "CardDescription":
      return <SquareSlash className={className} />;
    case "Div":
      return <SquareGanttChartIcon className={className} />;
    case "Button":
      return <SquareMousePointer className={className} />;
    default:
      return <Component className={className} />;
  }
}
