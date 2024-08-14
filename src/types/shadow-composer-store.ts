import type { ComposerStore } from "./composer-store";

export type UpdateShadowState = Partial<
	Omit<
		ShadowComposerStore,
		| "receiveUpdateFromComposer"
		| "setCanvasHighlight"
		| "sendUpdateToComposer"
		| "setSelectedNode"
		| "setContentEditable"
	>
>;

export interface ShadowComposerStore {
	nodes: ComposerStore["nodes"] | null;
	headNodeKey: ComposerStore["headNodeKey"] | null;
	canvasHighlight: ComposerStore["canvasHighlight"] | null;
	selectedNode: ComposerStore["selectedNode"] | null;
	dropItem: ComposerStore["dragAndDropTreeNode"] | null;
	setCanvasHighlight: ComposerStore["setCanvasHighlight"];
	setSelectedNode: ComposerStore["setSelectedNode"];
	setContentEditable: (nodeKey: string, content: string) => void;
	sendUpdateToComposer: (update: UpdateShadowState) => void;
	receiveUpdateFromComposer: (updatedState: UpdateShadowState) => void;
}
