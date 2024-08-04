import type { TNodesAbstract } from "./jsx";

export interface ComposerStore {
	nodes: TNodesAbstract;
	headNodeKey: string;
	moveNode: (
		draggedNode: ComposerStore["dropItem"],
		newParentKey: string,
	) => void;
	selectedNodeKey: string | null;
	setSelectedNodeKey: (key: string | null) => void;
	canvasHighlightKey: string | null;
	setCanvashighlightKey: (key: string | null) => void;
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
	setDropDropItem: (drop: {
		dropNodeKey: string;
		type: "before" | "after" | "inside";
		index: number;
	} | null) => void;
}
