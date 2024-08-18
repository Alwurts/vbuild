import type React from "react";
import { useMemo, useCallback } from "react";
import { useComposerStore } from "@/store/useComposerStore";
import { Separator } from "@/components/ui-editor/separator";
import { Registry } from "../../elements/Registry";
import { CircleSlash, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import SizeGroup from "./SizeGroup";
import LayoutGroup from "./LayoutGroup";

export default function NodeEditor() {
  const { selectedNode: selectedNodeKey, nodes } = useComposerStore();

  const selectedNode = useMemo(
    () => (selectedNodeKey ? nodes[selectedNodeKey.nodeKey] : null),
    [selectedNodeKey, nodes]
  );

  const Layout = useCallback(
    ({
      children,
      className,
    }: {
      children: React.ReactNode;
      className?: string;
    }) => {
      return (
        <div className="border-l p-2 w-[250px] flex flex-col items-stretch justify-start">
          <div className="px-2 pb-2 pt-1 flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            <h3 className="text-sm font-medium">Settings Panel</h3>
          </div>
          <Separator />
          <div
            className={cn(
              "flex-1 flex flex-col items-stretch justify-start",
              className
            )}
          >
            {children}
          </div>
        </div>
      );
    },
    []
  );

  const noNodeSelectedContent = useMemo(
    () => (
      <Layout className="items-center justify-center gap-2 text-muted-editor-foreground">
        <CircleSlash className="w-8 h-8" />
        <span>No node selected</span>
      </Layout>
    ),
    [Layout]
  );

  if (!selectedNode || typeof selectedNode !== "object") {
    return noNodeSelectedContent;
  }

  const { classNameGroups } = Registry[selectedNode.type];

  return (
    <Layout>
      {classNameGroups.Size && <SizeGroup node={selectedNode} />}
      {classNameGroups.Layout && <LayoutGroup node={selectedNode} />}
    </Layout>
  );
}
