import { useComposerStore } from "@/store/useComposerStore";
import { Separator } from "@/components/ui-editor/separator";
import { Registry } from "../elements/Registry";
import { cloneElement, isValidElement } from "react";
import { CircleSlash, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NodeEditor() {
  const { selectedNode: selectedNodeKey, nodes } = useComposerStore();

  const selectedNode = selectedNodeKey ? nodes[selectedNodeKey] : null;

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

  const nodeIcon = Registry[selectedNode.type].icon;

  return (
    <Layout className="text-sm">
      <div>
        <h3>Node Type</h3>
        <p>{selectedNode.type}</p>
      </div>
      <div>
        <h3>Node Key</h3>
        <p>{selectedNode.key}</p>
      </div>
      <div>
        <h3>Props</h3>
        {Object.entries(selectedNode.props).map(([key, value]) => (
          <div key={key}>
            <h4>{key}</h4>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
