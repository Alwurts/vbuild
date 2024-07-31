"use client";

import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui-editor/button";
import { Card } from "@/components/ui-editor/card";
import { Input } from "@/components/ui-editor/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-editor/select";
import { Separator } from "@/components/ui-editor/separator";
import { TreeView } from "../../components/element-composer/Explorer";

import { ROOT_COMPONENT_DEFAULT, renderReactNode } from "@/lib/jsx";
import type { TNodeTree } from "@/types/jsx";

/* const Canvas = ({ jsxTree }: { jsxTree: TRootComponent }) => {
  const renderJSXTree = (tree: TReactNode): React.ReactNode => {
    if (tree === null) {
      return null;
    }

    if (typeof tree !== "object") {
      return renderReactNode(tree, null);
    }

    let children: React.ReactNode = null;
    if (tree.props.children) {
      if (Array.isArray(tree.props.children)) {
        children = tree.props.children.map((child) => renderJSXTree(child));
      } else if (typeof tree.props.children === "object") {
        children = renderJSXTree(tree.props.children);
      } else {
        children = renderJSXTree(tree.props.children);
      }
    }

    const renderedNode = renderReactNode(tree, children);

    return renderedNode;
  };

  return (
    <div className="bg-red-400 h-screen w-full">{renderJSXTree(jsxTree)}</div>
  );
}; */

export default function Editor() {
  const [jsxTree, setJsxTree] = useState<TNodeTree>();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !jsxTree) {
    return null;
  }

  return (
    <div className="flex w-screen h-screen">
      <TreeView tree={jsxTree} />
      {/* <Canvas jsxTree={jsxTree} /> */}
    </div>
  );
}
