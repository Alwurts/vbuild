import type { TNodesAbstract } from "./elements/jsx";
import type { UpdateShadowState } from "./shadow-composer-store";

export interface ComposerStore {
	iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
	nodes: TNodesAbstract;
	headNodeKey: string;
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
	selectedNodeKey: string | null;
	setSelectedNodeKey: (key: string | null) => void;
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
	sendUpdateOfWholeStateToShadow: () => void;
	sendUpdateToShadow: (update: UpdateShadowState) => void;
	receiveUpdateFromShadow: (update: UpdateShadowState) => void;
}
