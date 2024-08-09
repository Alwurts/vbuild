import { useRef, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui-editor/button";
import { useComposerStore } from "@/store/useComposerStore";
import { cn } from "@/lib/utils";
import { checkIfDraggable, checkIfDroppable } from "@/lib/jsx/draggable";

interface TreeNodeProps {
  nodeKey: string;
  depth?: number;
  dropClassName?: string;
}

// TreeNode component
const TreeNode = ({ nodeKey, depth = 0, dropClassName }: TreeNodeProps) => {
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
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
      if (childrenIndex === 0 && e.clientY < childrenRect.top) {
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
      if (e.clientY > childrenRect.top && e.clientY < childrenRect.bottom) {
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
        nodeIsDropping &&
          dropItem?.drop?.type === "inside" &&
          "border-4 rounded-md border-purple-500",
        dropClassName
      )}
    >
      <div
        className={cn("flex justify-stretch")}
        draggable={isDraggable}
        onDragStart={handleDragStart}
        onMouseEnter={() => setCanvashighlightKey(node.key)}
        onMouseLeave={() => setCanvashighlightKey(null)}
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
};

// TreeView component
export const TreeView = () => {
  const { headNodeKey } = useComposerStore();
  return (
    <div className="border-r p-2 w-[200px]">
      <TreeNode key={headNodeKey} nodeKey={headNodeKey} />
    </div>
  );
};
