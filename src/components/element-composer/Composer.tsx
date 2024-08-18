"use client";

import type React from "react";
import TreeView from "@/components/element-composer/TreeView";
import Preview from "@/components/element-composer/Preview";
import NodeEditor from "@/components/element-composer/node-editor/NodeEditor";

export default function Composer() {
  return (
    <div className="flex w-screen h-screen items-stretch justify-start">
      <TreeView />
      <Preview />
      <NodeEditor />
    </div>
  );
}
