import { checkIfDraggable, checkIfDroppable } from "@/lib/jsx/draggable";
import { useComposerStore } from "@/store/useComposerStore";
import React, { useState } from "react";
import { RenderNode } from "@/components/element-composer/RenderNode";
import { Preview } from "./Preview";
import type { TNodesAbstract } from "@/types/elements/jsx";
import { useShadowComposerStore } from "@/store/useShadowComposerStore";
import { Button } from "../ui-editor/button";
import { MousePointer } from "lucide-react";

function CanvasNode({ nodeKey }: { nodeKey: string }) {
  const {
    canvasHighlightKey,
    nodes,
    setCanvasHighlightKey,
    setSelectedNodeKey,
  } = useShadowComposerStore();

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
        setCanvasHighlightKey(nodeKey);
      }}
      onMouseLeave={() => {
        setCanvasHighlightKey(null);
      }}
    >
      <RenderNode key={nodeKey} node={node} {...node.props}>
        {nodeChildren}
      </RenderNode>
      {canvasHighlightKey === nodeKey && (
        <div className="pointer-events-none absolute inset-0 w-full h-full bg-transparent border-2 border-yellow-500 box-border flex justify-start items-start">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Selecting:", nodeKey);
              setSelectedNodeKey(nodeKey);
            }}
            variant="ghost"
            size="icon"
            className="h-4 w-4 pointer-events-auto bg-yellow-500 hover:bg-yellow-500 hover:text-primary-editor-foreground/50 rounded-none rounded-br-md text-primary-editor-foreground"
          >
            <MousePointer className="w-4 h-4" />
          </Button>
        </div>
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
