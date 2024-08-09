"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useComposerStore } from "@/store/useComposerStore";
import { TreeView } from "@/components/element-composer/TreeView";
import { Canvas } from "@/components/element-composer/Canvas";
import { NodeEditor } from "@/components/element-composer/NodeEditor";
import { Preview } from "@/components/element-composer/Preview";

export default function Editor() {
  /* const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  } */

  return (
    <div className="flex w-screen h-screen items-stretch justify-start">
      <TreeView />
      <Preview />
      <NodeEditor />
    </div>
  );
}