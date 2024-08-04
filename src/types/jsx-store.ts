import type { TNodesAbstract } from "./jsx";

export interface ComposerStore {
	nodes: TNodesAbstract;
	headNodeKey: string;
	moveNode: (key: string, newParentKey: string, newIndex: number) => void;
	selectedNodeKey: string | null;
	setSelectedNodeKey: (key: string | null) => void;
}
