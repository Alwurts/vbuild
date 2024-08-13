import { useComposerStore } from "@/store/useComposerStore";
import { Separator } from "@/components/ui-editor/separator";
import { Registry } from "../elements/Registry";
import { cloneElement, isValidElement } from "react";

export default function NodeEditor() {
  const { selectedNodeKey, nodes } = useComposerStore();

  const selectedNode = selectedNodeKey ? nodes[selectedNodeKey] : null;

  if (!selectedNode || typeof selectedNode !== "object") {
    return (
      <div className="border-l p-2 w-[200px]">
        <div>Select a node to edit</div>
      </div>
    );
  }

  const nodeIcon = Registry[selectedNode.type].icon;

  return (
    <div className="border-l p-2 w-[200px]">
      <div className="px-2 pb-2 pt-1 flex items-center gap-2">
        {nodeIcon &&
          isValidElement(nodeIcon) &&
          cloneElement(nodeIcon as React.ReactElement, {
            className: "w-4 h-4",
          })}
        <h3 className="text-sm font-medium">Node Editor</h3>
      </div>
      <Separator />
      <h2>Node Properties</h2>
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
    </div>
  );
}
