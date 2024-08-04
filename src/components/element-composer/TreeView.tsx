import { useRef, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useComposerStore } from "@/store/useComposerStore";
import { cn } from "@/lib/utils";
import type { TNodeAbstract } from "@/types/jsx";

interface TreeNodeProps {
  nodeKey: string;
  depth?: number;
  dropClassName?: string;
}

// TreeNode component
const TreeNode = ({ nodeKey, depth = 0, dropClassName }: TreeNodeProps) => {
  const { moveNode, nodes, setSelectedNodeKey } = useComposerStore();

  const node = nodes[nodeKey];

  const chidlrenContainerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(true);

  const [dropPosition, setDropPosition] = useState<{
    type: "before" | "after" | "inside";
    index: number;
  } | null>(null);

  const isDraggable = typeof node === "object" && node.type !== "Root";

  const isDroppable =
    typeof node === "object" && (node.type === "Div" || node.type === "Root");

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isDraggable) return;
    e.dataTransfer.setData("text/plain", node.key);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDroppable) return;

    const childrenContainer = chidlrenContainerRef.current;

    if (!childrenContainer) {
      setDropPosition({ type: "inside", index: 0 });
      return;
    }

    const childrenContainerRect = childrenContainer.getBoundingClientRect();

    const childrenContainerChildren = childrenContainer.children;

    const childrenElements = Array.from(childrenContainerChildren);

    if (!childrenElements.length || !isOpen) {
      setDropPosition({ type: "inside", index: 0 });
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
      if (childrenIndex === 0 && e.clientY < childrenRect.top) {
        setDropPosition({ type: "before", index: 0 });
        console.log("OUTSIDE", {
          type: "before",
          index: 0,
        });
        return;
      }
      if (e.clientY > childrenRect.top && e.clientY < childrenRect.bottom) {
        const childrenMiddle = childrenRect.top + childrenRect.height / 2;

        if (e.clientY < childrenMiddle) {
          setDropPosition({ type: "before", index: childrenIndex });
          console.log("before", {
            type: "before",
            index: childrenIndex,
          });
          return;
        }
        if (e.clientY > childrenMiddle) {
          setDropPosition({ type: "after", index: childrenIndex });
          console.log("after", {
            type: "after",
            index: childrenIndex,
          });
          return;
        }
      }
    }

    setDropPosition({ type: "inside", index: 0 });
    console.log("Default Inside setDropPosition", {
      type: "inside",
      index: 0,
    });
  };

  const handleDragLeave = () => {
    setDropPosition(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDroppable) {
      setDropPosition(null);
      return;
    }
    const draggedNodeKey = e.dataTransfer.getData("text/plain");

    if (draggedNodeKey !== node.key && dropPosition) {
      let targetKey = node.key;
      let index = 0;

      if (node.children) {
        if (dropPosition.type === "before") {
          targetKey = node.key;
          index = node.children.indexOf(node.key);
        } else if (dropPosition.type === "after") {
          targetKey = node.key;
          index = node.children.indexOf(node.key);
        } else if (dropPosition.type === "inside") {
          index = node.children.length;
        }
      }

      moveNode(draggedNodeKey, targetKey, index);
    }
    setDropPosition(null);
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
        dropPosition?.type === "inside" &&
          "border-4 rounded-md border-purple-500",
        dropClassName
      )}
    >
      <div
        className={cn("flex justify-stretch")}
        draggable={isDraggable}
        onDragStart={handleDragStart}
      >
        {node.children ? (
          <Button
            variant="ghost"
            size="sm"
            style={{
              paddingLeft: `${depth * 16}px`,
            }}
            className={cn(
              "flex gap-1 w-full justify-start h-7 px-3",
              isDraggable && "cursor-move"
            )}
            onClick={() => {
              setIsOpen(!isOpen);
              setSelectedNodeKey(node.key);
            }}
          >
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <span className="font-mono">{node.type}</span>
          </Button>
        ) : (
          <span className="font-mono font-extralight">{node.type}</span>
        )}
      </div>
      {isOpen && node.children && (
        <div ref={chidlrenContainerRef}>
          {node.children.map((childNode, index) => {
            return (
              <TreeNode
                dropClassName={cn(
                  dropPosition?.index === index &&
                    dropPosition.type === "before" &&
                    "border-t-4 border-purple-500",
                  dropPosition?.index === index &&
                    dropPosition.type === "after" &&
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
};

// TreeView component
export const TreeView = () => {
  const { headNodeKey } = useComposerStore();
  return (
    <div className="border-r p-2 w-[200px] h-screen">
      <TreeNode key={headNodeKey} nodeKey={headNodeKey} />
    </div>
  );
};
