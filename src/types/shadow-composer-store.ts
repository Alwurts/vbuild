import type { ComposerStore } from "./composer-store";

export type UpdateShadowStateMessage = {
	type: "UPDATE_SHADOW_STATE";
	update: UpdateShadowState;
};

export type CanvasReadyMessage = {
	type: "CANVAS_READY";
};

export type CanvasFunctionCallMessage = {
	type: "FUNCTION_CALL";
	function: ComposerFunctionCall;
};

export type CanvasMessage =
	| UpdateShadowStateMessage
	| CanvasReadyMessage
	| CanvasFunctionCallMessage;

export type CanvasMessageEvent = MessageEvent<CanvasMessage>;

type InferComposerFunctionCall<
	TName extends keyof ComposerStore,
	TComposerStore extends ComposerStore,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
> = TComposerStore[TName] extends (...args: any[]) => any
	? {
			name: TName;
			args: Parameters<TComposerStore[TName]>;
		}
	: never;

export type ComposerFunctionCall = {
	[K in keyof ComposerStore]: InferComposerFunctionCall<K, ComposerStore>;
}[keyof ComposerStore];

type TSetSelectedNode = InferComposerFunctionCall<
	"setSelectedNode",
	ComposerStore
>;

type TSetCanvasHighlight = InferComposerFunctionCall<
	"setCanvasHighlight",
	ComposerStore
>;

type TSetContentEditable = InferComposerFunctionCall<
	"setContentEditable",
	ComposerStore
>;

type TSetChildrenMenuKey = InferComposerFunctionCall<
	"setChildrenMenuKey",
	ComposerStore
>;

export type UpdateShadowState = Partial<
	Pick<
		ShadowComposerStore,
		"nodes" | "headNodeKey" | "canvasHighlight" | "selectedNode"
	>
>;
export interface ShadowComposerStore {
	// Shadowed variables
	nodes: ComposerStore["nodes"] | null;
	headNodeKey: ComposerStore["headNodeKey"] | null;
	canvasHighlight: ComposerStore["canvasHighlight"] | null;
	selectedNode: ComposerStore["selectedNode"] | null;
	// RPC
	setCanvasHighlight: (...args: TSetCanvasHighlight["args"]) => void;
	setSelectedNode: (...args: TSetSelectedNode["args"]) => void;
	setContentEditable: (...args: TSetContentEditable["args"]) => void;
	setChildrenMenuKey: (...args: TSetChildrenMenuKey["args"]) => void;
	// Communication with the parent canvas
	handleMessageFromCanvasParent: (message: CanvasMessageEvent) => void;
	sendMessageToCanvasParent: (message: CanvasMessage) => void;
	receiveUpdateFromCanvasParent: (updatedState: UpdateShadowState) => void;
}
