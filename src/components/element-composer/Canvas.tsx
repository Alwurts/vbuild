import { checkIfDraggable, checkIfDroppable } from "@/lib/jsx/draggable";
import { useComposerStore } from "@/store/useComposerStore";
import React from "react";
import { RenderNode } from "@/components/elements/RenderNode";
import { Preview } from "./Preview";

function CanvasNode({ nodeKey }: { nodeKey: string }) {
  const { nodes, canvasHighlightKey, setCanvashighlightKey } =
    useComposerStore();
  const node = nodes[nodeKey];

  const isDraggable = checkIfDraggable;

  const isDroppable = checkIfDroppable(node);

  if (typeof node !== "object") {
    return node;
  }

  const nodeChildren = node.children?.map((childKey) => (
    <CanvasNode key={childKey} nodeKey={childKey} />
  ));

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
      <RenderNode key={nodeKey} node={node} {...node.props}>
        {nodeChildren}
      </RenderNode>
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
      <Preview />
    </div>
  );
};
