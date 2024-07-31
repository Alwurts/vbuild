"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { TreeView } from "../../components/element-composer/Explorer";

import { ROOT_COMPONENT_TREE_AND_REACT_DEFAULT } from "@/lib/jsx";
import type { TNodeTree } from "@/types/jsx";
import { Canvas } from "@/components/element-composer/Canvas";

export default function Editor() {
  const [componentTreeAndReact, setComponentTreeAndReact] = useState<{
    tree: TNodeTree;
    react: React.ReactNode;
  }>(ROOT_COMPONENT_TREE_AND_REACT_DEFAULT);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !componentTreeAndReact) {
    return null;
  }

  return (
    <div className="flex w-screen h-screen">
      <TreeView tree={componentTreeAndReact.tree} />
      <Canvas jsxTree={componentTreeAndReact.react} />
    </div>
  );
}
