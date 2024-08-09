import { useRef, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  PanelsTopLeft,
  Component,
  SquareSlash,
  SquareMousePointer,
  SquareGanttChartIcon,
  GitBranch,
  EllipsisVertical,
  CreditCard,
  Keyboard,
  Settings,
  User,
  TrashIcon,
  Boxes,
} from "lucide-react";
import { Button } from "@/components/ui-editor/button";
import { useComposerStore } from "@/store/useComposerStore";
import { cn } from "@/lib/utils";
import { checkIfDraggable, checkIfDroppable } from "@/lib/jsx/draggable";
import { Separator } from "../ui-editor/separator";
import type { GenericComponentName } from "@/types/elements/elements";
import { ElementNodeIcon } from "./ElementNodeIcon";
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

interface TreeNodeProps {
  nodeKey: string;
  depth?: number;
  dropClassName?: string;
}

// TreeNode component
function TreeNode({ nodeKey, depth = 0, dropClassName }: TreeNodeProps) {
  const {
    moveNode,
    nodes,
    setSelectedNodeKey,
    setCanvashighlightKey,
    dropItem,
    setDraggableDropItem,
    setDropDropItem,
  } = useComposerStore();

  const node = nodes[nodeKey];

  const chidlrenContainerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const isDraggable = checkIfDraggable(node);

  const isDroppable = checkIfDroppable(node);

  const nodeIsDropping =
    isDroppable &&
    typeof node === "object" &&
    dropItem?.drop?.dropNodeKey === node.key &&
    dropItem?.draggedStartedOn === "TreeView";

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isDraggable) return;
    setDraggableDropItem({
      draggedStartedOn: "TreeView",
      draggedNodeKey: node.key,
      drop: null,
    });
    e.dataTransfer.setData("text/plain", node.key);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDroppable) return;

    const childrenContainer = chidlrenContainerRef.current;

    if (!childrenContainer) {
      setDropDropItem({
        dropNodeKey: node.key,
        type: "inside",
        index: 0,
      });
      return;
    }

    const childrenContainerChildren = childrenContainer.children;

    const childrenElements = Array.from(childrenContainerChildren);

    if (!childrenElements.length || !isOpen) {
      setDropDropItem({
        dropNodeKey: node.key,
        type: "inside",
        index: 0,
      });
      return;
    }

    const childrenElementsRects = childrenElements.map((child) =>
      child.getBoundingClientRect()
    );

    for (
      let childrenIndex = 0;
      childrenIndex < childrenElementsRects.length;
      childrenIndex++
    ) {
      const childrenRect = childrenElementsRects[childrenIndex];
      let childrenTop = childrenRect.top;
      let childrenBottom = childrenRect.bottom;

      if (childrenIndex === 0 && e.clientY < childrenTop) {
        setDropDropItem({
          dropNodeKey: node.key,
          type: "before",
          index: 0,
        });
        console.log("OUTSIDE", {
          dropNodeKey: node.key,
          name: node.type,
          type: "before",
          index: 0,
        });
        return;
      }
      if (
        childrenIndex === childrenElementsRects.length - 1 &&
        e.clientY > childrenBottom
      ) {
        setDropDropItem({
          dropNodeKey: node.key,
          type: "after",
          index: childrenIndex,
        });
        return;
      }
      if (childrenIndex > 0) {
        const previousChildrenRect = childrenElementsRects[childrenIndex - 1];
        childrenTop =
          childrenTop - (childrenTop - previousChildrenRect.bottom) / 2;
      }
      if (childrenIndex < childrenElementsRects.length - 1) {
        const nextChildrenRect = childrenElementsRects[childrenIndex + 1];
        childrenBottom =
          childrenBottom + (nextChildrenRect.top - childrenBottom) / 2;
      }
      if (e.clientY > childrenTop && e.clientY < childrenBottom) {
        const childrenMiddle = childrenRect.top + childrenRect.height / 2;

        if (e.clientY < childrenMiddle) {
          setDropDropItem({
            dropNodeKey: node.key,
            type: "before",
            index: childrenIndex,
          });
          console.log("before", {
            dropNodeKey: node.key,
            name: node.type,
            type: "before",
            index: childrenIndex,
          });
          return;
        }
        if (e.clientY > childrenMiddle) {
          setDropDropItem({
            dropNodeKey: node.key,
            type: "after",
            index: childrenIndex,
          });
          console.log("after", {
            dropNodeKey: node.key,
            name: node.type,
            type: "after",
            index: childrenIndex,
          });
          return;
        }
      }
    }

    setDropDropItem({
      dropNodeKey: node.key,
      type: "inside",
      index: 0,
    });
  };

  const handleDragLeave = () => {
    if (!nodeIsDropping) return;
    setDropDropItem(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!nodeIsDropping) {
      setDraggableDropItem(null);
      return;
    }

    setDraggableDropItem(null);
    moveNode(dropItem, node.key);
  };

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

  return (
    <div
      onDragOver={isDroppable ? handleDragOver : undefined}
      onDragLeave={isDroppable ? handleDragLeave : undefined}
      onDrop={isDroppable ? handleDrop : undefined}
      className={cn(
        "relative",
        nodeIsDropping &&
          dropItem?.drop?.type === "inside" &&
          "border-4 rounded-md border-purple-500",
        dropClassName
        /* {
          "bg-red-500": node.type === "Root",
          "bg-green-500": node.type === "Card",
          "bg-blue-500": node.type === "CardContent",
          "bg-yellow-500": node.type === "CardHeader",
          "bg-purple-500": node.type === "CardFooter",
          "bg-pink-500": node.type === "CardTitle",
          "bg-orange-500": node.type === "CardDescription",
          "bg-gray-500": node.type === "Div",
          "bg-cyan-500": node.type === "Button",
        } */
      )}
    >
      <div className="relative h-7">
        {node.children && (
          <Button
            style={{
              marginLeft: `${depth * 16}px`,
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
          draggable={isDraggable}
          onDragStart={handleDragStart}
          onMouseEnter={() => setCanvashighlightKey(node.key)}
          onMouseLeave={() => setCanvashighlightKey(null)}
          variant="ghost"
          size="sm"
          style={{
            paddingLeft: `${(depth + 1) * 17}px`,
          }}
          className={cn(
            "absolute inset-0 flex gap-1 w-full items-center justify-start h-7",
            isDraggable && "cursor-move"
          )}
          onClick={() => {
            setSelectedNodeKey(node.key);
          }}
        >
          <ElementNodeIcon type={node.type} className="w-4 h-4 shrink-0" />
          <span className="truncate font-normal">{node.type}</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              style={{
                marginLeft: `${depth * 16}px`,
              }}
              variant="ghost"
              size="sm"
              className={cn(
                "p-0 h-4 z-10 absolute right-0 top-1/2 -translate-y-1/2"
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
        <div ref={chidlrenContainerRef} className={cn("space-y-1.5 py-1.5")}>
          {node.children.map((childNode, index) => {
            return (
              <TreeNode
                dropClassName={cn(
                  nodeIsDropping &&
                    dropItem?.drop?.index === index &&
                    dropItem.drop.type === "before" &&
                    "border-t-4 border-purple-500",
                  nodeIsDropping &&
                    dropItem?.drop?.index === index &&
                    dropItem.drop.type === "after" &&
                    "border-b-4 border-purple-500"
                )}
                key={childNode}
                nodeKey={childNode}
                depth={depth + 1}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// TreeView component
export const TreeView = () => {
  const { headNodeKey } = useComposerStore();
  return (
    <div className="border-r p-2 w-[200px]">
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
