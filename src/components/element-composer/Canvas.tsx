import { checkIfDraggable, checkIfDroppable } from "@/lib/jsx/draggable";
import { useComposerStore } from "@/store/useComposerStore";
import React from "react";

function CanvasNode({ nodeKey }: { nodeKey: string }) {
  const { nodes, canvasHighlightKey, setCanvashighlightKey } =
    useComposerStore();
  const node = nodes[nodeKey];

  const isDraggable = checkIfDraggable;

  const isDroppable = checkIfDroppable(node);

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

  return (
    <div
      className="relative inline"
      onMouseEnter={() => {
        setCanvashighlightKey(nodeKey);
      }}
      onMouseLeave={() => {
        setCanvashighlightKey(null);
      }}
    >
      {reactNodeWithChildren}
      {canvasHighlightKey === nodeKey && (
        <div className="pointer-events-none absolute inset-0 w-full h-full bg-transparent border-2 border-yellow-500 box-border" />
      )}
    </div>
  );
}

export const Canvas = () => {
  const { headNodeKey } = useComposerStore();

  return (
    <div className="w-full h-full flex-1">
      <CanvasNode nodeKey={headNodeKey} />
    </div>
  );
};
