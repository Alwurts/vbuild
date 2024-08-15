import { cloneElement, isValidElement, useEffect, useRef } from "react";
import { useShadowComposerStore } from "@/store/useShadowComposerStore";
import {
  Boxes,
  EllipsisVertical,
  LoaderCircle,
  MousePointer,
  PlusIcon,
} from "lucide-react";
import { Registry } from "../elements/Registry";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import type { CanvasMessageEvent } from "@/types/shadow-composer-store";
import { Button } from "../ui-editor/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui-editor/dropdown-menu";

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
          className: Object.values(node.className)
            .map((group) => Object.values(group).join(" "))
            .join(" "),
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
      {selectedNode?.nodeKey === nodeKey && selectedNode.domRect
        ? createPortal(
            <CanvasHighlight
              domRect={selectedNode.domRect}
              showActionButtons
            />,
            document.body
          )
        : canvasHighlight?.nodeKey === nodeKey &&
          canvasHighlight.domRect &&
          createPortal(
            <CanvasHighlight domRect={canvasHighlight.domRect} />,
            document.body
          )}
    </>
  );
}

function CanvasHighlight({
  domRect,
  showActionButtons = false,
}: {
  domRect: DOMRect;
  showActionButtons?: boolean;
}) {
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onMouseOver={(e) => e.stopPropagation()}
                variant="ghost"
                size="icon"
                className="h-4 w-4 pointer-events-auto bg-primary-editor hover:bg-primary-editor hover:text-primary-editor-foreground/50 text-primary-editor-foreground"
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuLabel>Add child</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Boxes className="mr-2 h-4 w-4" />
                  <span>Add child</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Selecting");
            }}
            onMouseOver={(e) => e.stopPropagation()}
            variant="ghost"
            size="icon"
            className="h-4 w-4 pointer-events-auto bg-primary-editor hover:bg-primary-editor hover:text-primary-editor-foreground/50 text-primary-editor-foreground"
          >
            <EllipsisVertical className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Canvas() {
  const {
    nodes,
    headNodeKey,
    sendMessageToCanvasParent,
    handleMessageFromCanvasParent,
  } = useShadowComposerStore();

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
