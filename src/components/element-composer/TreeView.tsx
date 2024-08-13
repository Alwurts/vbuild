import { cloneElement, isValidElement, useRef, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  GitBranch,
  EllipsisVertical,
  TrashIcon,
  Boxes,
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

interface TreeNodeProps {
  nodeKey: string;
  depth?: number;
}

// TreeNode component
function TreeNode({ nodeKey, depth = 0 }: TreeNodeProps) {
  const {
    moveNode,
    nodes,
    setSelectedNodeKey,
    setCanvasHighlight,
    canvasHighlight,
    dropItem,
    setDraggableDropItem,
    setDropDropItem,
  } = useComposerStore();

  const node = nodes[nodeKey];

  const [isOpen, setIsOpen] = useState(true);

  if (typeof node !== "object") {
    return (
      <span
        style={{
          paddingLeft: `${depth * 16}px`,
        }}
        className="text-sm h-7 px-3 cursor-default"
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

  const nodeIsDropping =
    droppable &&
    dropItem?.drop?.dropNodeKey === node.key &&
    dropItem?.draggedStartedOn === "TreeView";

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!draggable) return;
    setDraggableDropItem({
      draggedStartedOn: "TreeView",
      draggedNodeKey: node.key,
      drop: null,
    });
    e.dataTransfer.setData("text/plain", node.key);
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    console.log("drag over");
    e.preventDefault();
    e.stopPropagation();

    if (!droppable || node.key === dropItem?.draggedNodeKey) return;

    if (node.type === "Root") {
      setDropDropItem({
        dropNodeKey: node.key,
        type: "inside",
        index: 0,
      });
      return;
    }

    console.log(e.clientY);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    console.log(rect);
    const height = rect.height;
    const middleThreshold = height / 2;
    const sidesThreshold = (height - middleThreshold) / 2;
    if (e.clientY < rect.top + sidesThreshold) {
      setDropDropItem({
        dropNodeKey: node.key,
        type: "before",
        index: 0,
      });
    } else if (e.clientY > rect.bottom - sidesThreshold) {
      setDropDropItem({
        dropNodeKey: node.key,
        type: "after",
        index: 0,
      });
    } else {
      setDropDropItem({
        dropNodeKey: node.key,
        type: "inside",
        index: 0,
      });
    }
  };

  const handleDragLeave = () => {
    if (!nodeIsDropping) return;
    setDropDropItem(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    console.log("drop");
    e.preventDefault();
    e.stopPropagation();
    if (!nodeIsDropping) {
      setDraggableDropItem(null);
      return;
    }

    setDraggableDropItem(null);
    moveNode(dropItem, node.key);
  };

  return (
    <div className={cn("relative")}>
      {nodeIsDropping && dropItem?.drop?.type === "before" && (
        <TreeNodePlaceholder depth={depth} type="before" />
      )}
      <div className="relative h-7">
        {node.children && (
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
          onDragOver={droppable ? handleDragOver : undefined}
          onDragLeave={droppable ? handleDragLeave : undefined}
          onDrop={droppable ? handleDrop : undefined}
          onMouseEnter={(e) =>
            setCanvasHighlight({
              nodeKey: node.key,
            })
          }
          onMouseLeave={() => setCanvasHighlight(null)}
          variant="ghost"
          size="sm"
          style={{
            paddingLeft: `${22 + depth * 16}px`,
          }}
          className={cn(
            "absolute border-2 border-transparent inset-0 flex gap-1 w-full items-center justify-start h-7 pr-6 box-border",
            canvasHighlight?.nodeKey === node.key && "border-yellow-500",
            draggable && "cursor-move",
            nodeIsDropping &&
              dropItem?.drop?.type === "inside" &&
              "border-purple-500"
          )}
          onClick={() => {
            setSelectedNodeKey(node.key);
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
              <DropdownMenuItem>
                <Boxes className="mr-2 h-4 w-4" />
                <span>Add child</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrashIcon className="mr-2 h-4 w-4" />
                <span>Delete</span>
                <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map((childNode, index) => {
            return (
              <TreeNode key={childNode} nodeKey={childNode} depth={depth + 1} />
            );
          })}
        </div>
      )}
      {nodeIsDropping && dropItem?.drop?.type === "after" && (
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
        "z-30 absolute left-0 pr-0 w-full h-fit flex items-center justify-stretch",
        type === "before" && "-top-1.5",
        type === "after" && "-bottom-1.5"
      )}
      style={{
        paddingLeft: `${0 + depth * 16}px`,
      }}
    >
      <div className="w-3 h-3 relative rounded-full bg-purple-600">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" />
      </div>
      <div className="w-full h-0.5 bg-purple-500" />
    </div>
  );
}

// TreeView component
export const TreeView = () => {
  const { headNodeKey } = useComposerStore();
  return (
    <div className="border-r p-2 w-[240px]">
      <div className="px-2 pb-2 pt-1 flex items-center gap-2">
        <GitBranch className="w-4 h-4" />
        <h3 className="text-sm font-medium">Tree View</h3>
      </div>
      <Separator />
      <div className="py-2 px-1">
        <TreeNode key={headNodeKey} nodeKey={headNodeKey} />
      </div>
    </div>
  );
};
