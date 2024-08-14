import { cloneElement, isValidElement, useEffect, useRef } from "react";
import { useShadowComposerStore } from "@/store/useShadowComposerStore";
import { LoaderCircle } from "lucide-react";
import { Registry } from "../elements/Registry";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

function CanvasNode({ nodeKey }: { nodeKey: string }) {
  const nodeRef = useRef<HTMLElement>(null);
  const {
    canvasHighlight,
    nodes,
    selectedNode,
    setCanvasHighlight,
    setSelectedNode,
    setContentEditable,
  } = useShadowComposerStore();

  useEffect(() => {
    if (
      canvasHighlight?.nodeKey === nodeKey &&
      !canvasHighlight.domRect &&
      nodeRef.current
    ) {
      const rect = nodeRef.current.getBoundingClientRect();
      setCanvasHighlight({
        nodeKey: nodeKey,
        domRect: rect,
      });
    }
  }, [canvasHighlight, nodeKey, setCanvasHighlight]);

  useEffect(() => {
    if (
      selectedNode?.nodeKey === nodeKey &&
      !selectedNode.domRect &&
      nodeRef.current
    ) {
      const rect = nodeRef.current.getBoundingClientRect();
      setSelectedNode({
        nodeKey: nodeKey,
        domRect: rect,
      });
    }
  }, [selectedNode, nodeKey, setSelectedNode]);

  if (!nodes) {
    return null;
  }

  const node = nodes[nodeKey];

  if (typeof node !== "object") {
    return node;
  }

  const {
    component: nodeComponent,
    editable: isEditable,
    draggable,
  } = Registry[node.type];

  const nodeChildren = node.children?.map((childKey) => (
    <CanvasNode key={childKey} nodeKey={childKey} />
  ));

  const onMouseOver = (e: React.MouseEvent<HTMLElement>, type: string) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    setCanvasHighlight({ nodeKey: nodeKey, domRect: rect });
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>, type: string) => {
    e.stopPropagation();
    setCanvasHighlight(null);
  };

  const clonedNodeComponent =
    nodeComponent && isValidElement(nodeComponent)
      ? cloneElement(nodeComponent as React.ReactElement, {
          ...node.props,
          key: nodeKey,
          draggable: draggable,
          ref: nodeRef,
          children: nodeChildren,
          contentEditable: isEditable,
          onBlur: isEditable
            ? (e: React.FocusEvent<HTMLElement>) => {
                const newContent = e.target.innerHTML;
                if (typeof node !== "object") return;
                setContentEditable(node.key, newContent);
              }
            : undefined,
          onMouseOver: (e: React.MouseEvent<HTMLElement>) =>
            onMouseOver(e, node.type),
          onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
            onMouseLeave(e, node.type),
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            const rect = nodeRef.current?.getBoundingClientRect();
            setSelectedNode({
              nodeKey: nodeKey,
              domRect: rect,
            });
          },
        })
      : null;

  return (
    <>
      {clonedNodeComponent}
      {canvasHighlight?.nodeKey === nodeKey &&
        canvasHighlight.domRect &&
        createPortal(
          <CanvasHighlight domRect={canvasHighlight.domRect} />,
          document.body
        )}
      {selectedNode?.nodeKey === nodeKey &&
        selectedNode.domRect &&
        createPortal(
          <CanvasHighlight domRect={selectedNode.domRect} />,
          document.body
        )}
    </>
  );
}

function CanvasHighlight({ domRect }: { domRect: DOMRect }) {
  return (
    <div
      style={{
        top: domRect.top,
        left: domRect.left,
        width: domRect.width,
        height: domRect.height,
      }}
      className={cn(
        "pointer-events-none rounded-sm fixed z-30 bg-transparent border-[3px] border-primary-editor flex justify-start items-start"
      )}
    />
  );
}

export default function Canvas() {
  const { nodes, headNodeKey, receiveUpdateFromComposer } =
    useShadowComposerStore();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "UPDATE_STATE") {
        receiveUpdateFromComposer(event.data.update);
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "CANVAS_READY",
    });
    return () => window.removeEventListener("message", handleMessage);
  }, [receiveUpdateFromComposer]);

  if (!nodes || !headNodeKey) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-2 bg-background-editor text-sm text-muted-editor-foreground">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  return <CanvasNode key={headNodeKey} nodeKey={headNodeKey} />;
}
