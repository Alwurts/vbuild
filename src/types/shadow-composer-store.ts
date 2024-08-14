import type { ComposerStore } from "./composer-store";

export type UpdateShadowState = Partial<
	Omit<
		ShadowComposerStore,
		| "receiveUpdateFromComposer"
		| "setCanvasHighlight"
		| "sendUpdateToComposer"
		| "setSelectedNodeKey"
		| "setContentEditable"
	>
>;

export interface ShadowComposerStore {
	nodes: ComposerStore["nodes"] | null;
	headNodeKey: ComposerStore["headNodeKey"] | null;
	canvasHighlight: ComposerStore["canvasHighlight"] | null;
	selectedNodeKey: ComposerStore["selectedNodeKey"] | null;
	dropItem: ComposerStore["dragAndDropTreeNode"] | null;
	setCanvasHighlight: ComposerStore["setCanvasHighlight"];
	setSelectedNodeKey: ComposerStore["setSelectedNodeKey"];
	setContentEditable: (nodeKey: string, content: string) => void;
	sendUpdateToComposer: (update: UpdateShadowState) => void;
	receiveUpdateFromComposer: (updatedState: UpdateShadowState) => void;
}
