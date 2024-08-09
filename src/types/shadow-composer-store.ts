import type { ComposerStore } from "./composer-store";

export type UpdateShadowState = Partial<
	Omit<
		ShadowComposerStore,
		| "receiveUpdateFromComposer"
		| "setCanvasHighlightKey"
		| "sendUpdateToComposer"
	>
>;

export interface ShadowComposerStore {
	nodes: ComposerStore["nodes"] | null;
	headNodeKey: ComposerStore["headNodeKey"] | null;
	canvasHighlightKey: ComposerStore["canvasHighlightKey"] | null;
	dropItem: ComposerStore["dropItem"] | null;
	setCanvasHighlightKey: ComposerStore["setCanvasHighlightKey"];
	sendUpdateToComposer: (update: UpdateShadowState) => void;
	receiveUpdateFromComposer: (updatedState: UpdateShadowState) => void;
}
