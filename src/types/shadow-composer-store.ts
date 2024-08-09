import type { ComposerStore } from "./composer-store";

export type UpdateShadowState = Partial<
	Omit<
		ShadowComposerStore,
		| "receiveUpdateFromComposer"
		| "setCanvasHighlightKey"
		| "sendUpdateToComposer"
		| "setSelectedNodeKey"
		| "setContentEditable"
	>
>;

export interface ShadowComposerStore {
	nodes: ComposerStore["nodes"] | null;
	headNodeKey: ComposerStore["headNodeKey"] | null;
	canvasHighlightKey: ComposerStore["canvasHighlightKey"] | null;
	selectedNodeKey: ComposerStore["selectedNodeKey"] | null;
	dropItem: ComposerStore["dropItem"] | null;
	setCanvasHighlightKey: ComposerStore["setCanvasHighlightKey"];
	setSelectedNodeKey: ComposerStore["setSelectedNodeKey"];
	setContentEditable: (nodeKey: string, content: string) => void;
	sendUpdateToComposer: (update: UpdateShadowState) => void;
	receiveUpdateFromComposer: (updatedState: UpdateShadowState) => void;
}
