import { checkIfDraggable, checkIfDroppable } from "@/lib/jsx/draggable";
import { useComposerStore } from "@/store/useComposerStore";
import React, { useState } from "react";
import { RenderNode } from "@/components/elements/RenderNode";
import { Preview } from "./Preview";
import type { TNodesAbstract } from "@/types/elements/jsx";
import { useShadowComposerStore } from "@/store/useShadowComposerStore";

function CanvasNode({ nodeKey }: { nodeKey: string }) {
  const { canvasHighlightKey, nodes, setCanvasHighlightKey: setCanvashighlightKey } =
    useShadowComposerStore();

  if (!nodes) {
    return null;
  }

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
      onDragOver={(e) => {
        console.log("Dragging over", nodeKey);
        e.preventDefault();
        e.stopPropagation();
        /* setCanvashighlightKey(nodeKey); */
      }}
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
  const { nodes, headNodeKey } = useShadowComposerStore();

  if (!nodes || !headNodeKey) {
    return null;
  }

  return <CanvasNode key={headNodeKey} nodeKey={headNodeKey} />;
};
