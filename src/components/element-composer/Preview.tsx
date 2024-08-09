"use client";

import * as React from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent } from "@/components/ui-editor/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui-editor/resizable";
import {
  CircleArrowLeft,
  Code,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui-editor/toggle-group";
import { Button } from "../ui-editor/button";

export function Preview() {
  const [iframeIsLoading, setIframeIsLoading] = React.useState(true);
  const [viewerSize, setViewerSize] = React.useState("100");
  const viewerPanelRef = React.useRef<ImperativePanelHandle>(null);

  return (
    <div className="flex-1 relative py-3 pl-4 pr-1 bg-muted-editor flex flex-col gap-2">
      <div className="flex items-center justify-start gap-2">
        <ToggleGroup
          type="single"
          defaultValue="100"
          value={viewerSize}
          onValueChange={(value) => {
            if (viewerPanelRef.current) {
              viewerPanelRef.current.resize(Number.parseInt(value));
              setViewerSize(value);
            }
          }}
          className="items-center gap-1.5 rounded-md border p-1 shadow-sm flex bg-background-editor"
        >
          <ToggleGroupItem
            value="100"
            className="h-7 w-7 rounded-sm p-0"
          >
            <Monitor className="h-3.5 w-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="60"
            className="h-7 w-7 rounded-sm p-0"
          >
            <Tablet className="h-3.5 w-3.5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="30"
            className="h-7 w-7 rounded-sm p-0"
          >
            <Smartphone className="h-3.5 w-3.5" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Button size="sm" variant="default" className="flex items-center gap-1">
          Code
          <Code className="h-4 w-4" />
        </Button>
      </div>
      <ResizablePanelGroup direction="horizontal" className="relative z-10">
        <ResizablePanel
          ref={viewerPanelRef}
          order={1}
          className={cn(
            "relative rounded-lg border bg-background border-border"
          )}
          onResize={(size) => {
            setViewerSize(size.toString());
          }}
          minSize={30}
        >
          {iframeIsLoading ? (
            <div className="absolute inset-0 z-10 flex h-[--container-height] w-full items-center justify-center gap-2 bg-background-editor text-sm text-muted-editor-foreground">
              <CircleArrowLeft className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : null}
          <iframe
            title="block-preview"
            src={"https://alwurts.com/"}
            height={"100%"}
            className="relative z-20 w-full bg-background"
            onLoad={() => {
              setIframeIsLoading(false);
            }}
            allowTransparency
          />
        </ResizablePanel>
        <ResizableHandle
          className={cn(
            "relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border-editor after:transition-all after:hover:h-10 sm:block"
          )}
        />
        <ResizablePanel defaultSize={0} minSize={0} order={2} />
      </ResizablePanelGroup>
    </div>
  );
}
