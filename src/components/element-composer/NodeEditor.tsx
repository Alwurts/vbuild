import { useComposerStore } from "@/store/useComposerStore";
import { Separator } from "../ui-editor/separator";

export const NodeEditor = () => {
  const { selectedNodeKey, nodes } = useComposerStore();

  const selectedNode = selectedNodeKey ? nodes[selectedNodeKey] : null;

  const Content = () => {
    if (!selectedNode) {
      return <div>Select a node to edit</div>;
    }

    if (typeof selectedNode !== "object") {
      return <div>Select a object node</div>;
    }

    return (
      <>
        <h1>Node Editor</h1>
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
      </>
    );
  };

  return (
    <div className="border-l p-2 w-[200px] h-screen ml-auto">
      <Content />
    </div>
  );
};
