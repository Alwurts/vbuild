import type React from "react";
import { useMemo } from "react";
import { useComposerStore } from "@/store/useComposerStore";
import { Separator } from "@/components/ui-editor/separator";
import { CircleSlash, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import SizeGroup from "./SizeGroup";
import { parseTailwindClassNameIntoGroups } from "@/lib/tailwind/tailwind";
import type { TGenericComponentsAbstract } from "@/types/elements/jsx";
import LayoutGroup from "./LayoutGroup";
import { Registry } from "@/components/elements/Registry";

export default function NodeEditor() {
  const { selectedNode: selectedNodeKey, nodes } = useComposerStore();

  const selectedNode = useMemo(
    () => (selectedNodeKey ? nodes[selectedNodeKey.nodeKey] : null),
    [selectedNodeKey, nodes]
  );

  if (!selectedNode || typeof selectedNode !== "object") {
    return (
      <Layout className="items-center justify-center gap-2 text-muted-editor-foreground">
        <CircleSlash className="w-8 h-8" />
        <span>No node selected</span>
      </Layout>
    );
  }

  return <NodeEditorContent nodeAbstract={selectedNode} />;
}

const Layout = ({
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
};

function NodeEditorContent({
  nodeAbstract,
}: {
  nodeAbstract: TGenericComponentsAbstract;
}) {
  const { classNameGroups } = Registry[nodeAbstract.type];
  const parsedGroups = useMemo(() => {
    return parseTailwindClassNameIntoGroups(
      nodeAbstract.className,
      classNameGroups
    );
  }, [nodeAbstract, classNameGroups]);
  return (
    <Layout>
      {parsedGroups.size && (
        <SizeGroup
          sizeGroup={parsedGroups.size}
          nodeKey={nodeAbstract.key}
          disabled={classNameGroups.size?.disabled}
        />
      )}
      {parsedGroups.layout && (
        <LayoutGroup
          layoutGroup={parsedGroups.layout}
          nodeKey={nodeAbstract.key}
        />
      )}
    </Layout>
  );
}
