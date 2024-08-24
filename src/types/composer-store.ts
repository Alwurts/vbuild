import type { TNodesAbstract } from "./elements/jsx";
import type {
	TailwindClassNamesGroups,
	TailwindStylePropertyName,
} from "./tailwind/tailwind";
import type {
	CanvasMessage,
	CanvasMessageEvent,
} from "./shadow-composer-store";
import type { GenericComponentName } from "./elements/elements";
import type { CSSVariableNames } from "./style";

export interface ComposerStore {
	iframeRef: React.MutableRefObject<HTMLIFrameElement | null>;
	nodes: TNodesAbstract;
	headNodeKey: string;
	history: Array<{
		nodes: TNodesAbstract;
		cssVariables: { [K in CSSVariableNames]: string };
	}>;
	historyIndex: number;
	updateState: (
		newNodes?: TNodesAbstract,
		newCssVariables?: Partial<{ [K in CSSVariableNames]: string }>
	) => void;
	undo: () => void;
	redo: () => void;
	setContentEditable: (nodeKey: string, content: string) => void;
	setClassNameGroup: (
		nodeKey: string,
		group: keyof TailwindClassNamesGroups,
		value: TailwindClassNamesGroups[keyof TailwindClassNamesGroups],
	) => void;
	moveNode: (
		nodeToMoveKey: string,
		newParentKey: string,
		newParentIndex: number,
		indexBeforeOrAfter: "before" | "after",
	) => void;
	deleteNode: (nodeKey: string) => void;
	childrenMenuKey: string | null;
	setChildrenMenuKey: (nodeKey: string | null) => void;
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
	addElementAsChild: (
		parentKey: string,
		elementType: GenericComponentName,
	) => void;
	openNodes: Record<string, boolean>;
	setMultipleNodesOpen: (updates: Record<string, boolean>) => void;
	cssVariables: { [K in CSSVariableNames]: string };
	updateCSSVariable: (name: CSSVariableNames, value: string) => void;
}