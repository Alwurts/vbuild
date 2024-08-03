import type React from "react";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TNodeTree } from "@/types/jsx";
import { useComposerStore } from "@/store/useComposerStore";
import { cn } from "@/lib/utils";

interface TreeNodeProps {
  node: TNodeTree;
  depth?: number;
  parentKey?: string;
}

// TreeNode component
const TreeNode = ({ node, depth = 0, parentKey }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { moveNode, nodes } = useComposerStore();
  const [dropPosition, setDropPosition] = useState<{
    type: "before" | "after" | "inside";
    index: number;
  } | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (typeof node === "object") {
      e.dataTransfer.setData("text/plain", node.key);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof node !== "object" || !node.children) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;

    if (y < rect.height / 3) {
      setDropPosition({ type: "before", index: 0 });
    } else if (y > (rect.height / 3) * 2) {
      setDropPosition({ type: "after", index: node.children.length });
    } else {
      setDropPosition({ type: "inside", index: node.children.length });
    }
  };

  const handleDragLeave = () => {
    setDropPosition(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const draggedNodeKey = e.dataTransfer.getData("text/plain");

    if (typeof node === "object" && draggedNodeKey !== node.key) {
      let targetKey = node.key;
      let index = 0;

      if (dropPosition?.type === "before") {
        targetKey = parentKey || node.key;
        index = nodes[targetKey].children.indexOf(node.key);
      } else if (dropPosition?.type === "after") {
        targetKey = parentKey || node.key;
        index = nodes[targetKey].children.indexOf(node.key) + 1;
      } else if (dropPosition?.type === "inside") {
        index = node.children?.length || 0;
      }

      moveNode(draggedNodeKey, targetKey, index);
    }
    setDropPosition(null);
  };

  if (typeof node !== "object") {
    return (
      <Button
        variant="ghost"
        size="sm"
        style={{
          paddingLeft: `${depth * 16}px`,
        }}
        className="flex gap-1 w-full justify-start h-7 px-3"
      >
        {typeof node === "string"
          ? "TextNode"
          : typeof node === "number"
          ? "NumberNode"
          : typeof node === "boolean" && "BooleanNode"}
      </Button>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative",
        dropPosition &&
          "before:absolute before:content-[''] before:z-10 before:pointer-events-none",
        dropPosition?.type === "before" &&
          "before:left-0 before:top-0 before:w-full before:h-1 before:bg-purple-500",
        dropPosition?.type === "after" &&
          "before:left-0 before:bottom-0 before:w-full before:h-1 before:bg-purple-500",
        dropPosition?.type === "inside" &&
          "before:inset-0 before:border-2 before:border-purple-500"
      )}
    >
      <div className="flex justify-stretch">
        {node.children ? (
          <Button
            variant="ghost"
            size="sm"
            style={{
              paddingLeft: `${depth * 16}px`,
            }}
            className="flex gap-1 w-full justify-start h-7 px-3"
            onClick={() => setIsOpen(!isOpen)}
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
        <div className="">
          {Array.isArray(node.children)
            ? node.children.map((childNode) => {
                if (childNode === null) {
                  return null;
                }
                return (
                  <TreeNode
                    key={
                      typeof childNode === "object"
                        ? childNode.key
                        : typeof childNode === "string"
                        ? childNode
                        : typeof childNode === "number"
                        ? childNode
                        : typeof childNode === "boolean"
                        ? childNode.toString()
                        : childNode
                    }
                    node={childNode}
                    depth={depth + 1}
                    parentKey={node.key}
                  />
                );
              })
            : node.children && (
                <TreeNode
                  node={node.children}
                  depth={depth + 1}
                  parentKey={node.key}
                />
              )}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  tree: TNodeTree;
}

// TreeView component
export const TreeView = ({ tree }: TreeViewProps) => {
  return (
    <div className="border p-2 w-[200px] h-screen">
      <TreeNode node={tree} />
    </div>
  );
};
