import { PlusIcon, Boxes } from "lucide-react";
import { Button } from "../ui-editor/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui-editor/dropdown-menu";
import type { GenericComponentName } from "@/types/elements/elements";
import { Registry } from "../elements/Registry";
import { cloneElement, isValidElement } from "react";

export default function AddChildrenMenu() {
  const availableComponents: GenericComponentName[][] = [
    ["div", "span"],
    ["Button"],
    [
      "Card",
      "CardContent",
      "CardHeader",
      "CardFooter",
      "CardTitle",
      "CardDescription",
    ],
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseOver={(e) => e.stopPropagation()}
          variant="ghost"
          size="icon"
          className="h-4 w-4 pointer-events-auto bg-primary-editor hover:bg-primary-editor hover:text-primary-editor-foreground/50 text-primary-editor-foreground"
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48"
        onClick={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
      >
        <DropdownMenuLabel>Add Component</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {availableComponents.map((component, index) => (
          <>
            <DropdownMenuSeparator
              key={`${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }separator`}
            />
            <DropdownMenuGroup
              key={`${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }group`}
            >
              {component.map((component) => {
                const componentConfig = Registry[component];
                const nodeIcon = componentConfig.icon;
                return (
                  <DropdownMenuItem key={component}>
                    {nodeIcon &&
                      isValidElement(nodeIcon) &&
                      cloneElement(nodeIcon as React.ReactElement, {
                        className: "w-4 h-4 mr-2",
                      })}
                    <span>{component}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
