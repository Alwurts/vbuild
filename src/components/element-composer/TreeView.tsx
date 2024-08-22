import { cloneElement, isValidElement, useRef, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  GitBranch,
  EllipsisVertical,
  TrashIcon,
  Boxes,
  CopyIcon,
  PointerIcon,
} from "lucide-react";
import { Button } from "@/components/ui-editor/button";
import { useComposerStore } from "@/store/useComposerStore";
import { cn } from "@/lib/utils";
import { Separator } from "../ui-editor/separator";
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
import { Registry } from "../elements/Registry";
import { Card } from "../ui-editor/card";
import { Logo } from "../icons/Logo";
import { useShallow } from "zustand/react/shallow";
import { ScrollArea } from "../ui-editor/scroll-area";

interface TreeNodeProps {
  nodeKey: string;
  depth?: number;
}

// TreeNode component
function TreeNode({ nodeKey, depth = 0 }: TreeNodeProps) {
  const nodes = useComposerStore((state) => state.nodes);
  const { selectedNode, setSelectedNode } = useComposerStore(
    useShallow((state) => ({
      selectedNode: state.selectedNode,
      setSelectedNode: state.setSelectedNode,
    }))
  );
  const { canvasHighlight, setCanvasHighlight } = useComposerStore(
    useShallow((state) => ({
      canvasHighlight: state.canvasHighlight,
      setCanvasHighlight: state.setCanvasHighlight,
    }))
  );
  const {
    dragAndDropTreeNode,
    setDraggingTreeNode,
    setTreeNodeDropZone,
    resetDragAndDropTreeNode,
  } = useComposerStore(
    useShallow((state) => ({
      dragAndDropTreeNode: state.dragAndDropTreeNode,
      setDraggingTreeNode: state.setDraggingTreeNode,
      setTreeNodeDropZone: state.setTreeNodeDropZone,
      resetDragAndDropTreeNode: state.resetDragAndDropTreeNode,
    }))
  );
  const { copyNodeKey, setCopyNodeKey, copyNode } = useComposerStore(
    useShallow((state) => ({
      copyNodeKey: state.copyNodeKey,
      setCopyNodeKey: state.setCopyNodeKey,
      copyNode: state.copyNode,
    }))
  );

  const { moveNode, deleteNode } = useComposerStore(
    useShallow((state) => ({
      moveNode: state.moveNode,
      deleteNode: state.deleteNode,
    }))
  );

  const setChildrenMenuKey = useComposerStore(
    (state) => state.setChildrenMenuKey
  );

  const parentRef = useRef<HTMLDivElement>(null);

  const node = nodes[nodeKey];

  const [isOpen, setIsOpen] = useState(false);

  if (typeof node !== "object") {
    return (
      <span
        style={{
          paddingLeft: `${depth * 16}px`,
        }}
        className="text-sm h-8 px-3 cursor-default"
      >
        {typeof node === "string"
          ? "TextNode"
          : typeof node === "number"
          ? "NumberNode"
          : typeof node === "boolean" && "BooleanNode"}
      </span>
    );
  }

  const { draggable, droppable, icon: nodeIcon } = Registry[node.type];

  const nodeIsCurrentlyDropZone =
    dragAndDropTreeNode?.startedOn === "TreeView" &&
    dragAndDropTreeNode?.dropZone?.nodeKey === node.key;

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!draggable || !parentRef.current) return;
    setDraggingTreeNode({
      nodeKey: node.key,
      domRect: parentRef.current.getBoundingClientRect(),
    });
    e.dataTransfer.setData("text/plain", node.key);
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !dragAndDropTreeNode ||
      node.key === dragAndDropTreeNode?.draggingItem.nodeKey
    )
      return;

    if (node.type === "Root") {
      setTreeNodeDropZone({
        nodeKey: node.key,
        type: "inside",
      });
      return;
    }

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const height = rect.height;

    if (
      e.clientY > dragAndDropTreeNode.draggingItem.domRect.top &&
      e.clientY < dragAndDropTreeNode.draggingItem.domRect.bottom
    ) {
      return;
    }

    if (!droppable) {
      const middle = rect.top + height / 2;
      if (e.clientY < middle) {
        setTreeNodeDropZone({
          nodeKey: node.key,
          type: "before",
        });
        return;
      }
      if (e.clientY >= middle) {
        setTreeNodeDropZone({
          nodeKey: node.key,
          type: "after",
        });
        return;
      }
      return;
    }

    const sidesThreshold = (height - height / 2) / 2; // 1/4 of the node's height for sides

    if (e.clientY < rect.top + sidesThreshold) {
      setTreeNodeDropZone({
        nodeKey: node.key,
        type: "before",
      });
      return;
    }

    if (e.clientY > rect.bottom - sidesThreshold) {
      setTreeNodeDropZone({
        nodeKey: node.key,
        type: "after",
      });
      return;
    }

    setTreeNodeDropZone({
      nodeKey: node.key,
      type: "inside",
    });
  };

  const handleDragLeave = () => {
    if (!nodeIsCurrentlyDropZone) return;
    setTreeNodeDropZone(null);
  };

  const handleDragEnd = () => {
    resetDragAndDropTreeNode();
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    resetDragAndDropTreeNode();

    if (
      !dragAndDropTreeNode?.dropZone ||
      dragAndDropTreeNode?.startedOn !== "TreeView"
    ) {
      return;
    }

    if (dragAndDropTreeNode.dropZone.type === "inside") {
      moveNode(
        dragAndDropTreeNode.draggingItem.nodeKey,
        dragAndDropTreeNode.dropZone.nodeKey,
        0,
        "before"
      );
      return;
    }

    if (node.type === "Root") {
      throw new Error("Cannot drop after or before root node");
    }

    const newParentNode = nodes[node.parent];

    if (typeof newParentNode !== "object" || !newParentNode.children) {
      throw new Error("Parent node is not a valid object");
    }

    const index = newParentNode.children.indexOf(node.key);

    if (index === -1) {
      throw new Error("Node not found in parent");
    }

    moveNode(
      dragAndDropTreeNode.draggingItem.nodeKey,
      newParentNode.key,
      index,
      dragAndDropTreeNode.dropZone.type
    );
  };

  return (
    <div
      className={cn("relative", {
        "opacity-50": dragAndDropTreeNode?.draggingItem?.nodeKey === node.key,
        "bg-muted-editor": selectedNode?.nodeKey === node.key,
      })}
      ref={parentRef}
    >
      {nodeIsCurrentlyDropZone &&
        dragAndDropTreeNode?.dropZone?.type === "before" && (
          <TreeNodePlaceholder depth={depth} type="before" />
        )}
      <div className="relative h-8">
        {node.children && node.children.length > 0 && (
          <Button
            style={{
              left: `${3 + depth * 16}px`,
            }}
            variant="ghost"
            size="sm"
            className={cn(
              "p-0 h-4 z-10 absolute left-0 top-1/2 -translate-y-1/2"
            )}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 shrink-0" />
            )}
          </Button>
        )}
        <Button
          draggable={draggable}
          onDragStart={draggable ? handleDragStart : undefined}
          onDragEnd={draggable ? handleDragEnd : undefined}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onMouseEnter={(e) =>
            setCanvasHighlight({
              nodeKey: node.key,
            })
          }
          onMouseLeave={() => setCanvasHighlight(null)}
          variant={selectedNode?.nodeKey === node.key ? "default" : "ghost"}
          size="sm"
          style={{
            paddingLeft: `${22 + depth * 16}px`,
          }}
          className={cn(
            "absolute border-2 border-transparent inset-0 flex gap-1 w-full items-center justify-start h-8 pr-6 box-border",
            draggable && "cursor-move",
            canvasHighlight?.nodeKey === node.key &&
              selectedNode?.nodeKey !== node.key &&
              dragAndDropTreeNode?.draggingItem?.nodeKey !== node.key &&
              "border-primary-editor",
            selectedNode?.nodeKey === node.key && "text-foreground-editor",
            nodeIsCurrentlyDropZone &&
              dragAndDropTreeNode?.dropZone?.type === "inside" &&
              "border-primary-editor bg-primary-editor/80"
          )}
          onClick={() => {
            setSelectedNode({
              nodeKey: node.key,
            });
          }}
        >
          {nodeIcon &&
            isValidElement(nodeIcon) &&
            cloneElement(nodeIcon as React.ReactElement, {
              className: "w-4 h-4 shrink-0",
            })}
          <span className="truncate font-normal">{node.type}</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-0 h-4 z-10 absolute right-1.5 top-1/2 -translate-y-1/2"
              )}
            >
              <EllipsisVertical className="w-4 h-4 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>{node.type}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setChildrenMenuKey(node.key)}>
                <Boxes className="mr-2 h-4 w-4" />
                <span>Add child</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              {node.type !== "Root" && (
                <DropdownMenuItem onClick={() => setCopyNodeKey(node.key)}>
                  <CopyIcon className="mr-2 h-4 w-4" />
                  <span>Copy</span>
                  <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                disabled={!copyNodeKey}
                onClick={() => {
                  if (copyNodeKey) {
                    copyNode(copyNodeKey, node.key, 0, "before");
                  }
                }}
              >
                <PointerIcon className="mr-2 h-4 w-4" />
                <span>Paste</span>
                <DropdownMenuShortcut>⇧⌘V</DropdownMenuShortcut>
              </DropdownMenuItem>
              {node.type !== "Root" && (
                <DropdownMenuItem onClick={() => deleteNode(node.key)}>
                  <TrashIcon className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                  <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpen && node.children && (
        <div className="relative">
          <div
            style={{
              left: `${10 + depth * 16}px`,
            }}
            className="absolute z-30 top-0 w-[1px] rounded-full h-full bg-foreground-editor/20"
          />
          {node.children.map((childNode, index) => {
            return (
              <TreeNode key={childNode} nodeKey={childNode} depth={depth + 1} />
            );
          })}
        </div>
      )}
      {nodeIsCurrentlyDropZone &&
        dragAndDropTreeNode?.dropZone?.type === "after" && (
          <TreeNodePlaceholder depth={depth} type="after" />
        )}
    </div>
  );
}

function TreeNodePlaceholder({
  depth,
  type,
}: {
  depth: number;
  type: "before" | "after" | "inside";
}) {
  return (
    <div
      className={cn(
        "z-40 absolute left-0 pr-0 w-full h-fit flex items-center justify-stretch",
        type === "before" && "-top-1.5",
        type === "after" && "-bottom-1.5"
      )}
      style={{
        paddingLeft: `${5 + depth * 16}px`,
      }}
    >
      <div className="w-3 h-3 relative rounded-full bg-primary-editor">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />
      </div>
      <div className="w-full h-0.5 bg-primary-editor" />
    </div>
  );
}

// TreeView component
export default function TreeView() {
  const headNodeKey = useComposerStore((state) => state.headNodeKey);
  return (
    <div className="border-r py-2 w-[240px] flex flex-col justify-start items-stretch">
      <Card className="p-2 mx-2 flex items-center justify-center gap-2">
        <Logo className="w-5 h-5" />
        <h2 className="text-base font-bold">VBuild</h2>
      </Card>
      <div className="px-2 pt-3 pb-2 mx-2 flex items-center gap-2">
        <GitBranch className="w-4 h-4" />
        <h3 className="text-sm font-medium">Tree View</h3>
      </div>
      <Separator />
      <ScrollArea className="py-2 px-2 flex-1">
        <TreeNode key={headNodeKey} nodeKey={headNodeKey} />
      </ScrollArea>
    </div>
  );
}
