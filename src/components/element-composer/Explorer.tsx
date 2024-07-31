import type React from "react";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TNodeTree } from "@/types/jsx";

interface TreeNodeProps {
  node: TNodeTree;
  depth?: number;
}

// TreeNode component
const TreeNode = ({ node, depth = 0 }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="">
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
                  />
                );
              })
            : node.children && (
                <TreeNode node={node.children} depth={depth + 1} />
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
