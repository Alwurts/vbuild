import type React from "react";
import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  TReactElement,
  TReactElementRoot,
  TReactNode,
} from "../../types/jsx";

interface TreeNodeProps {
  node: TReactNode;
  depth?: number;
}

// TreeNode component
const TreeNode = ({ node, depth = 0 }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (node === null) {
    return null;
  }

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

  if ("type" in node) {
    const { type, props } = node;

    return (
      <div className="">
        <div className="flex justify-stretch">
          {props.children ? (
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
              <span className="font-mono">{type}</span>
            </Button>
          ) : (
            <span className="font-mono font-extralight">{type}</span>
          )}
        </div>
        {isOpen && props.children && (
          <div className="">
            {Array.isArray(props.children)
              ? props.children.map((childNode) => {
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
              : props.children && (
                  <TreeNode node={props.children} depth={depth + 1} />
                )}
          </div>
        )}
      </div>
    );
  }
};

interface TreeViewProps {
  tree: TReactElementRoot;
}

// TreeView component
export const TreeView = ({ tree }: TreeViewProps) => {
  return (
    <div className="border p-2 w-[200px] h-screen">
      <TreeNode node={tree} />
    </div>
  );
};
