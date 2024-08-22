import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useShadowComposerStore } from "@/store/useShadowComposerStore";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { Registry } from "../elements/Registry";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import AddChildrenMenu from "./AddChildrenMenu";
import type { TailwindClassNamesGroups } from "@/types/tailwind/tailwind";
import { useShallow } from "zustand/react/shallow";
import { parseClassNameGroupsIntoString } from "@/lib/tailwind/tailwind";
import { Button } from "../ui-editor/button";

function CanvasNode({ nodeKey }: { nodeKey: string }) {
  const nodeRef = useRef<HTMLElement>(null);
  const nodes = useShadowComposerStore((state) => state.nodes);
  const { canvasHighlight, setCanvasHighlight } = useShadowComposerStore(
    useShallow((state) => ({
      canvasHighlight: state.canvasHighlight,
      setCanvasHighlight: state.setCanvasHighlight,
    }))
  );
  const { selectedNode, setSelectedNode, setContentEditable } =
    useShadowComposerStore(
      useShallow((state) => ({
        selectedNode: state.selectedNode,
        setSelectedNode: state.setSelectedNode,
        setContentEditable: state.setContentEditable,
      }))
    );

  const [nodeDomRect, setNodeDomRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (
      nodeRef.current &&
      nodes &&
      (canvasHighlight?.nodeKey === nodeKey ||
        selectedNode?.nodeKey === nodeKey)
    ) {
      const rect = nodeRef.current.getBoundingClientRect();
      setNodeDomRect(rect);
    }
  }, [canvasHighlight, selectedNode, nodeKey, nodes]);

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
    droppable,
  } = Registry[node.type];

  const nodeChildren = node.children?.map((childKey) => (
    <CanvasNode key={childKey} nodeKey={childKey} />
  ));

  const onMouseOver = (e: React.MouseEvent<HTMLElement>, type: string) => {
    e.stopPropagation();
    setCanvasHighlight({ nodeKey: nodeKey });
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>, type: string) => {
    e.stopPropagation();
    setCanvasHighlight(null);
  };

  const nodeClassName = parseClassNameGroupsIntoString(node.className);

  const clonedNodeComponent =
    nodeComponent && isValidElement(nodeComponent)
      ? cloneElement(nodeComponent as React.ReactElement, {
          ...node.props,
          key: nodeKey,
          className: nodeClassName,
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
            setSelectedNode({
              nodeKey: nodeKey,
            });
          },
          suppressContentEditableWarning: isEditable,
        })
      : null;

  return (
    <>
      {clonedNodeComponent}
      {selectedNode?.nodeKey === nodeKey && nodeDomRect
        ? createPortal(
            <CanvasHighlight
              nodeKey={nodeKey}
              domRect={nodeDomRect}
              showActionButtons={droppable}
            />,
            document.body
          )
        : canvasHighlight?.nodeKey === nodeKey &&
          nodeDomRect &&
          createPortal(
            <CanvasHighlight
              nodeKey={nodeKey}
              domRect={nodeDomRect}
            />,
            document.body
          )}
    </>
  );
}

function CanvasHighlight({
  nodeKey,
  domRect,
  showActionButtons = false,
}: {
  nodeKey: string;
  domRect: DOMRect;
  showActionButtons?: boolean;
}) {
  const setChildrenMenuKey = useShadowComposerStore(
    (state) => state.setChildrenMenuKey
  );
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
    >
      {showActionButtons && (
        <div className="absolute -top-5 rounded-t-sm -left-0.5 py-0.5 px-1 flex items-center gap-1 bg-primary-editor">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setChildrenMenuKey(nodeKey);
            }}
            onMouseOver={(e) => e.stopPropagation()}
            variant="ghost"
            size="icon"
            className="h-4 w-4 pointer-events-auto bg-primary-editor hover:bg-primary-editor hover:text-primary-editor-foreground/50 text-primary-editor-foreground"
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Canvas() {
  const { nodes, headNodeKey } = useShadowComposerStore(
    useShallow((state) => ({
      nodes: state.nodes,
      headNodeKey: state.headNodeKey,
    }))
  );
  const { sendMessageToCanvasParent, handleMessageFromCanvasParent } =
    useShadowComposerStore(
      useShallow((state) => ({
        sendMessageToCanvasParent: state.sendMessageToCanvasParent,
        handleMessageFromCanvasParent: state.handleMessageFromCanvasParent,
      }))
    );

  useEffect(() => {
    window.addEventListener("message", handleMessageFromCanvasParent);
    sendMessageToCanvasParent({ type: "CANVAS_READY" });
    return () =>
      window.removeEventListener("message", handleMessageFromCanvasParent);
  }, [handleMessageFromCanvasParent, sendMessageToCanvasParent]);

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
