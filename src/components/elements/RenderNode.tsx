import type { TNodeTree } from "@/types/jsx";
import { Button } from "../ui-editor/button";
import { DivFlex } from "./DivFlex";

export function renderReactNode(
  node: TNodeTree,
  children: React.ReactNode
): React.ReactNode {
  if (typeof node !== "object") {
    return String(node);
  }

  if (node.type === "Button") {
    const { props } = node;
    return (
      <Button {...props} key={node.key}>
        {children}
      </Button>
    );
  }

  if (node.type === "DivFlex") {
    const { props } = node;
    return (
      <DivFlex {...props} key={node.key}>
        {children}
      </DivFlex>
    );
  }

  if (node.type === "Root") {
    const { props } = node;
    return (
      <div {...props} key={node.key}>
        {children}
      </div>
    );
  }

  return null;
}
