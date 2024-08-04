import { useComposerStore } from "@/store/useComposerStore";
import React from "react";

function CanvasNode({ nodeKey }: { nodeKey: string }) {
  const { nodes } = useComposerStore();
  const node = nodes[nodeKey];

  const isDraggable = typeof node === "object" && node.type !== "Root";

  const isDroppable =
    typeof node === "object" && (node.type === "Div" || node.type === "Root");

  if (typeof node !== "object") {
    return node;
  }

  const nodeReactNode = node.reactNode;

  if (!React.isValidElement(nodeReactNode)) {
    throw new Error("Invalid react node");
  }

  const reactNodeClone = React.cloneElement(
    nodeReactNode
  ) as React.ReactElement;

  const nodeChildren = node.children?.map((childKey) => (
    <CanvasNode key={childKey} nodeKey={childKey} />
  ));

  const reactNodeWithChildren = React.cloneElement(reactNodeClone, {
    children: nodeChildren,
  });

  return reactNodeWithChildren;
}

export const Canvas = () => {
  const { headNodeKey } = useComposerStore();

  return <CanvasNode nodeKey={headNodeKey} />;
};
