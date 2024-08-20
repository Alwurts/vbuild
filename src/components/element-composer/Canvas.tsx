import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useShadowComposerStore } from "@/store/useShadowComposerStore";
import { LoaderCircle } from "lucide-react";
import { Registry } from "../elements/Registry";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import AddChildrenMenu from "./AddChildrenMenu";
import {
  schemaLayoutGroup,
  schemaSizeGroup,
  type TailwindGroupName,
  type tailwindClassNamesGroups,
  type TailwindClassName,
} from "@/types/tailwind/tailwind";
import { parseTailwindClassNameIntoGroups } from "@/lib/tailwind/tailwind";

function CanvasNode({ nodeKey }: { nodeKey: string }) {
  const nodeRef = useRef<HTMLElement>(null);
  const {
    canvasHighlight,
    nodes,
    selectedNode,
    setCanvasHighlight,
    setSelectedNode,
    setContentEditable,
  } = useShadowComposerStore();

  const [nodeDomRect, setNodeDomRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (
      nodeRef.current &&
      nodes &&
      (canvasHighlight?.nodeKey === nodeKey ||
        selectedNode?.nodeKey === nodeKey)
    ) {
      const rect = nodeRef.current.getBoundingClientRect();
      setNodeDomRect(rect);
    }
  }, [canvasHighlight, selectedNode, nodeKey, nodes]);

  if (!nodes) {
    return null;
  }

  const node = nodes[nodeKey];

  if (typeof node !== "object") {
    return node;
  }

  const {
    component: nodeComponent,
    editable: isEditable,
    draggable,
    classNameGroups,
  } = Registry[node.type];

  const nodeChildren = node.children?.map((childKey) => (
    <CanvasNode key={childKey} nodeKey={childKey} />
  ));

  const onMouseOver = (e: React.MouseEvent<HTMLElement>, type: string) => {
    e.stopPropagation();
    setCanvasHighlight({ nodeKey: nodeKey });
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>, type: string) => {
    e.stopPropagation();
    setCanvasHighlight(null);
  };

  const parseClassNameGroupsIntoString = (className: TailwindClassName) => {
    const parsedGroups = parseTailwindClassNameIntoGroups(
      className,
      classNameGroups
    );
    let classNameString = "";
    for (const group of Object.values(parsedGroups)) {
      for (const propertyValue of Object.values(group)) {
        classNameString += `${propertyValue} `;
      }
    }
    return classNameString;
  };

  const nodeClassName = parseClassNameGroupsIntoString(node.className);

  const clonedNodeComponent =
    nodeComponent && isValidElement(nodeComponent)
      ? cloneElement(nodeComponent as React.ReactElement, {
          ...node.props,
          key: nodeKey,
          className: nodeClassName,
          draggable: draggable,
          ref: nodeRef,
          children: nodeChildren,
          contentEditable: isEditable,
          onBlur: isEditable
            ? (e: React.FocusEvent<HTMLElement>) => {
                const newContent = e.target.innerHTML;
                if (typeof node !== "object") return;
                setContentEditable(node.key, newContent);
              }
            : undefined,
          onMouseOver: (e: React.MouseEvent<HTMLElement>) =>
            onMouseOver(e, node.type),
          onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
            onMouseLeave(e, node.type),
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            setSelectedNode({
              nodeKey: nodeKey,
            });
          },
          suppressContentEditableWarning: isEditable, 
        })
      : null;

  return (
    <>
      {clonedNodeComponent}
      {selectedNode?.nodeKey === nodeKey && nodeDomRect
        ? createPortal(
            <CanvasHighlight domRect={nodeDomRect} showActionButtons />,
            document.body
          )
        : canvasHighlight?.nodeKey === nodeKey &&
          nodeDomRect &&
          createPortal(
            <CanvasHighlight domRect={nodeDomRect} />,
            document.body
          )}
    </>
  );
}

function CanvasHighlight({
  domRect,
  showActionButtons = false,
}: {
  domRect: DOMRect;
  showActionButtons?: boolean;
}) {
  return (
    <div
      style={{
        top: domRect.top,
        left: domRect.left,
        width: domRect.width,
        height: domRect.height,
      }}
      className={cn(
        "pointer-events-none rounded-sm fixed z-30 bg-transparent border-[3px] border-primary-editor flex justify-start items-start"
      )}
    >
      {showActionButtons && (
        <div className="absolute -top-5 rounded-t-sm -left-0.5 py-0.5 px-1 flex items-center gap-1 bg-primary-editor">
          <AddChildrenMenu />
        </div>
      )}
    </div>
  );
}

export default function Canvas() {
  const {
    nodes,
    headNodeKey,
    sendMessageToCanvasParent,
    handleMessageFromCanvasParent,
  } = useShadowComposerStore();

  useEffect(() => {
    window.addEventListener("message", handleMessageFromCanvasParent);
    sendMessageToCanvasParent({ type: "CANVAS_READY" });
    return () =>
      window.removeEventListener("message", handleMessageFromCanvasParent);
  }, [handleMessageFromCanvasParent, sendMessageToCanvasParent]);

  if (!nodes || !headNodeKey) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-2 bg-background-editor text-sm text-muted-editor-foreground">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        Loading...
      </div>
    );
  }

  return <CanvasNode key={headNodeKey} nodeKey={headNodeKey} />;
}
