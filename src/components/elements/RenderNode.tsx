/* import type { TNodeTree } from "@/types/jsx";
import { Button } from "../ui-editor/button";
import { DivFlex } from "./Div";
import { ComponentOverlayWrapper } from "./ComponentOverlay";

export function renderReactNode(
  node: TNodeTree,
  children: React.ReactNode
): React.ReactNode {
  if (typeof node !== "object") {
    return String(node);
  }

  const renderWithOverlay = (component: React.ReactNode) => (
    <ComponentOverlayWrapper
      nodeKey={node.key}
      key={node.key}
      nodeType={node.type}
    >
      {component}
    </ComponentOverlayWrapper>
  );

  if (node.type === "Button") {
    const { props } = node;
    return renderWithOverlay(<Button {...props} key={node.key}>{children}</Button>);
  }

  if (node.type === "DivFlex") {
    const { props } = node;
    return renderWithOverlay(<DivFlex {...props} key={node.key}>{children}</DivFlex>);
  }

  if (node.type === "Root") {
    const { props } = node;
    return renderWithOverlay(<div {...props} key={node.key}>{children}</div>);
  }

  return null;
}
 */