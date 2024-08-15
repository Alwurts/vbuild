import type { TNodesAbstract } from "./elements/jsx";
import type {
	CanvasMessage,
	CanvasMessageEvent,
	CanvasReadyMessage,
	UpdateShadowState,
	UpdateShadowStateMessage,
} from "./shadow-composer-store";

export interface ComposerStore {
	iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
	nodes: TNodesAbstract;
	headNodeKey: string;
	setContentEditable: (nodeKey: string, content: string) => void;
	moveNode: (
		nodeToMoveKey: string,
		newParentKey: string,
		newParentIndex: number,
		indexBeforeOrAfter: "before" | "after",
	) => void;
	deleteNode: (nodeKey: string) => void;
	copyNodeKey: string | null;
	setCopyNodeKey: (nodeKey: string | null) => void;
	copyNode: (
		nodeToCopyKey: string,
		newParentKey: string,
		newParentIndex: number,
		indexBeforeOrAfter: "before" | "after",
	) => void;
	selectedNode: {
		nodeKey: string;
		domRect?: DOMRect;
	} | null;
	setSelectedNode: (node: ComposerStore["selectedNode"]) => void;
	canvasHighlight: {
		nodeKey: string;
		domRect?: DOMRect;
	} | null;
	setCanvasHighlight: (highlight: ComposerStore["canvasHighlight"]) => void;
	// Drag and drop
	dragAndDropTreeNode: {
		startedOn: "TreeView" | "Canvas";
		draggingItem: {
			nodeKey: string;
			domRect: DOMRect;
		};
		dropZone: {
			nodeKey: string;
			type: "before" | "after" | "inside";
		} | null;
	} | null;
	resetDragAndDropTreeNode: () => void;
	setDraggingTreeNode: (
		draggingItem: NonNullable<
			ComposerStore["dragAndDropTreeNode"]
		>["draggingItem"],
	) => void;
	setTreeNodeDropZone: (
		dropZone: NonNullable<ComposerStore["dragAndDropTreeNode"]>["dropZone"],
	) => void;
	// Shadow Composer stuff
	sendUpdateOfWholeStateToCanvas: () => void;
	handleMessageFromCanvas: (message: CanvasMessageEvent) => void;
	sendMessageToCanvas: (message: CanvasMessage) => void;
}
