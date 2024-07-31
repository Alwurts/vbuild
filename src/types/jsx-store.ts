import type { TNodesAbstract, TNodeTree } from "./jsx";

export interface ComposerStore {
	nodes: TNodesAbstract;
	tree: TNodeTree;
	react: React.ReactNode;
	headNodeKey: string;
	moveNode: (key: string, newParentKey: string, newIndex: number) => void;
	selectedNodeKey: string | null;
	setSelectedNodeKey: (key: string | null) => void;
}
