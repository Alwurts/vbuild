"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { TreeView } from "../../components/element-composer/Explorer";

import { ROOT_COMPONENT_TREE_AND_REACT_DEFAULT } from "@/lib/jsx";
import type { TNodeTree } from "@/types/jsx";
import { Canvas } from "@/components/element-composer/Canvas";
import { useComposerStore } from "@/store/useComposerStore";

export default function Editor() {
  const { tree, react } = useComposerStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !tree || !react) {
    return null;
  }

  return (
    <div className="flex w-screen h-screen">
      <TreeView tree={tree} />
      <Canvas jsxTree={react} />
    </div>
  );
}
