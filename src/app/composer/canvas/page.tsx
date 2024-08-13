"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@/components/element-composer/Canvas";
import type { TNodesAbstract } from "@/types/elements/jsx";
import { LoaderCircle } from "lucide-react";
import { useShadowComposerStore } from "@/store/useShadowComposerStore";

export default function CanvasPage() {
  const { receiveUpdateFromComposer, nodes, headNodeKey } =
    useShadowComposerStore();

  useEffect(() => {
    console.log("useEffect CanvasPage");
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "UPDATE_STATE") {
        receiveUpdateFromComposer(event.data.update);
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "CANVAS_READY",
    });
    return () => window.removeEventListener("message", handleMessage);
  }, [receiveUpdateFromComposer]);

  if (!nodes || !headNodeKey) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-2 bg-background-editor text-sm text-muted-editor-foreground">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  return <Canvas />;
}
