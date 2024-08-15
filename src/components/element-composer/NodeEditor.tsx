import { useComposerStore } from "@/store/useComposerStore";
import { Separator } from "@/components/ui-editor/separator";
import { Registry } from "../elements/Registry";
import { cloneElement, isValidElement } from "react";
import { CircleSlash, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TailwindGroupName } from "@/types/elements/tailwind";
import { TAILWIND_GROUPS } from "@/lib/jsx/tailwind";

export default function NodeEditor() {
  const { selectedNode: selectedNodeKey, nodes } = useComposerStore();

  const selectedNode = selectedNodeKey ? nodes[selectedNodeKey.nodeKey] : null;

  const Layout = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className="border-l p-2 w-[200px] flex flex-col items-stretch justify-start">
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

  if (!selectedNode || typeof selectedNode !== "object") {
    return (
      <Layout className="items-center justify-center gap-2 text-muted-editor-foreground">
        <CircleSlash className="w-8 h-8" />
        <span>No node selected</span>
      </Layout>
    );
  }

  const { classNameGroups } = Registry[selectedNode.type];

  return (
    <Layout>
      {classNameGroups.map((groupName) => (
        <GroupSection key={groupName} groupName={groupName} />
      ))}
    </Layout>
  );
}

function GroupSection({ groupName }: { groupName: TailwindGroupName }) {
  const tailwindTypes = TAILWIND_GROUPS[groupName];
  return (
    <div>
      <div className="p-2">
        <h4 className="text-sm font-medium">{groupName}</h4>
        <div>
          {tailwindTypes.map((tailwindType) => (
            <div key={tailwindType}>
              <h5>{tailwindType}</h5>
            </div>
          ))}
        </div>
      </div>
      <Separator />
    </div>
  );
}
