import type { TNodeTree } from "@/types/jsx";
import { Button } from "../ui-editor/button";
import { DivFlex } from "./DivFlex";
import { ComponentOverlayWrapper } from "./ComponentOverlay";

export function renderReactNode(
  node: TNodeTree,
  children: React.ReactNode
): React.ReactNode {
  if (typeof node !== "object") {
    return String(node);
  }

  const renderWithOverlay = (component: React.ReactNode) => (
    <ComponentOverlayWrapper nodeKey={node.key} nodeType={node.type}>
      {component}
    </ComponentOverlayWrapper>
  );

  if (node.type === "Button") {
    const { props } = node;
    return renderWithOverlay(<Button {...props}>{children}</Button>);
  }

  if (node.type === "DivFlex") {
    const { props } = node;
    return renderWithOverlay(<DivFlex {...props}>{children}</DivFlex>);
  }

  if (node.type === "Root") {
    const { props } = node;
    return renderWithOverlay(<div {...props}>{children}</div>);
  }

  return null;
}
