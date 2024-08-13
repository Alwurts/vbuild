import type { TNodesAbstract } from "./elements/jsx";
import type { UpdateShadowState } from "./shadow-composer-store";

export interface ComposerStore {
	iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
	nodes: TNodesAbstract;
	headNodeKey: string;
	moveNode: (
		draggedNode: ComposerStore["dropItem"],
		newParentKey: string,
	) => void;
	selectedNodeKey: string | null;
	setSelectedNodeKey: (key: string | null) => void;
	canvasHighlight: {
		nodeKey: string;
		domRect?: DOMRect;
	} | null;
	setCanvasHighlight: (highlight: ComposerStore["canvasHighlight"]) => void;
	// Drag and drop
	dropItem: {
		draggedStartedOn: "TreeView" | "Canvas";
		draggedNodeKey: string;
		drop: {
			dropNodeKey: string;
			type: "before" | "after" | "inside";
			index: number;
		} | null;
	} | null;
	setDraggableDropItem: (dropItem: ComposerStore["dropItem"]) => void;
	setDropDropItem: (
		drop: {
			dropNodeKey: string;
			type: "before" | "after" | "inside";
			index: number;
		} | null,
	) => void;
	// Shadow Composer stuff
	sendUpdateOfWholeStateToShadow: () => void;
	sendUpdateToShadow: (update: UpdateShadowState) => void;
	receiveUpdateFromShadow: (update: UpdateShadowState) => void;
}
