import {
	ROOT_COMPONENT_ABSTRACT_DEFAULT,
	ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
} from "@/components/element-composer/defaultJSX";
import type { ComposerStore } from "@/types/composer-store";
import type { TNodeAbstract } from "@/types/elements/jsx";
import { v4 as uuidv4 } from "uuid";

import { createRef } from "react";
import { create } from "zustand";
import { createNodeAbstract } from "@/lib/jsx/createNodeAbstract";
import { Registry } from "@/components/elements/Registry";

export const useComposerStore = create<ComposerStore>((set, get) => ({
	iframeRef: createRef(),
	nodes: ROOT_COMPONENT_ABSTRACT_DEFAULT,
	headNodeKey: ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
	selectedNode: null,
	setSelectedNode: (node) => {
		const { sendMessageToCanvas, nodes, setMultipleNodesOpen } = get();
		sendMessageToCanvas({
			type: "UPDATE_SHADOW_STATE",
			update: {
				selectedNode: node,
			},
		});

		// Open all parent nodes when a node is selected
		if (node) {
			const nodesToOpen: Record<string, boolean> = {};
			let currentNode = nodes[node.nodeKey];
			while (currentNode) {
				if (typeof currentNode !== "object") break;
				nodesToOpen[currentNode.key] = true;
				if (!("parent" in currentNode)) break;
				currentNode = nodes[currentNode.parent];
			}
			setMultipleNodesOpen(nodesToOpen);
		}

		return set({ selectedNode: node });
	},
	canvasHighlight: null,
	setCanvasHighlight: (highlight) => {
		set({ canvasHighlight: highlight });
		const { sendMessageToCanvas } = get();
		sendMessageToCanvas({
			type: "UPDATE_SHADOW_STATE",
			update: {
				canvasHighlight: highlight,
			},
		});
	},
	history: [ROOT_COMPONENT_ABSTRACT_DEFAULT],
	historyIndex: 0,

	updateNodes: (newNodes) => {
		const { history, historyIndex } = get();
		const newHistory = [...history.slice(0, historyIndex + 1), newNodes].slice(
			-5,
		);
		const newHistoryIndex = newHistory.length - 1;

		set({
			nodes: newNodes,
			history: newHistory,
			historyIndex: newHistoryIndex,
		});

		get().sendMessageToCanvas({
			type: "UPDATE_SHADOW_STATE",
			update: {
				nodes: newNodes,
			},
		});
	},

	undo: () => {
		const { history, historyIndex } = get();
		if (historyIndex > 0) {
			const newIndex = historyIndex - 1;
			const previousNodes = history[newIndex];
			set({
				nodes: previousNodes,
				historyIndex: newIndex,
			});
			get().sendMessageToCanvas({
				type: "UPDATE_SHADOW_STATE",
				update: {
					nodes: previousNodes,
				},
			});
		}
	},

	redo: () => {
		const { history, historyIndex } = get();
		if (historyIndex < history.length - 1) {
			const newIndex = historyIndex + 1;
			const nextNodes = history[newIndex];
			set({
				nodes: nextNodes,
				historyIndex: newIndex,
			});
			get().sendMessageToCanvas({
				type: "UPDATE_SHADOW_STATE",
				update: {
					nodes: nextNodes,
				},
			});
		}
	},

	setClassNameGroup: (nodeKey, group, value) => {
		const { nodes } = get();
		const newNodes = { ...nodes };
		const node = newNodes[nodeKey];
		if (!node || typeof node !== "object") return;
		const newNode = {
			...node,
			className: {
				...node.className,
				[group]: value,
			},
		};
		newNodes[nodeKey] = newNode;
		get().updateNodes(newNodes);
	},

	deleteNode: (nodeKey) => {
		const { nodes } = get();
		const newNodes = { ...nodes };
		const nodeToDelete = newNodes[nodeKey];
		if (!nodeToDelete) return;

		if (typeof nodeToDelete !== "object") {
			throw Error("Cannot delete non object node");
		}

		if (nodeToDelete.type === "Root") {
			throw Error("Cannot delete root node");
		}

		const parentKey = nodeToDelete.parent;
		const parent = newNodes[parentKey];
		if (!parent) return;

		if (typeof parent !== "object" || !parent.children) {
			throw Error("Parent node not found or children null");
		}

		// Remove the node from its parent's children
		parent.children = parent.children.filter(
			(childKey) => childKey !== nodeKey,
		);

		// Delete the node and its descendants
		const deleteRecursively = (key: string) => {
			const node = newNodes[key];

			if (typeof node !== "object") {
				delete newNodes[key];
				return;
			}

			if (node.children) {
				node.children.forEach(deleteRecursively);
			}

			delete newNodes[key];
		};
		deleteRecursively(nodeKey);

		get().updateNodes(newNodes);
	},

	childrenMenuKey: null,
	setChildrenMenuKey: (nodeKey) => set({ childrenMenuKey: nodeKey }),
	copyNodeKey: null,
	setCopyNodeKey: (nodeKey) => set({ copyNodeKey: nodeKey }),
	copyNode: (
		nodeToCopyKey,
		newParentKey,
		newParentIndex,
		indexBeforeOrAfter,
	) => {
		const { nodes } = get();
		const newNodes = { ...nodes };
		const nodeToCopy = newNodes[nodeToCopyKey];

		if (!nodeToCopy) {
			throw Error("Node to copy not found");
		}
		if (typeof nodeToCopy !== "object") {
			throw Error("Cannot copy non object node");
		}
		if (nodeToCopy.type === "Root") {
			throw Error("Cannot copy root node");
		}

		const newParent = newNodes[newParentKey];
		if (!newParent || typeof newParent !== "object" || !newParent.children) {
			throw Error("New parent node not found or children null");
		}

		// Helper function to deep copy a node and its children
		const deepCopyNode = (
			node: TNodeAbstract,
			copiedNodeNewParentKey: string,
		): { copiedNode: TNodeAbstract; newKey: string } => {
			const newKey = uuidv4();
			if (typeof node !== "object") {
				newNodes[newKey] = node;
				return { copiedNode: node, newKey };
			}
			const copiedNode = {
				...node,
				key: newKey,
				parent: copiedNodeNewParentKey,
			};

			if (copiedNode.children) {
				copiedNode.children = copiedNode.children.map((childKey) => {
					const childCopy = deepCopyNode(newNodes[childKey], newKey);
					newNodes[childCopy.newKey] = childCopy.copiedNode;
					return childCopy.newKey;
				});
			}

			newNodes[newKey] = copiedNode;

			return { copiedNode, newKey };
		};

		const { newKey } = deepCopyNode(nodeToCopy, newParentKey);

		// Insert the copied node into the new parent's children
		const insertIndex =
			indexBeforeOrAfter === "before" ? newParentIndex : newParentIndex + 1;
		newParent.children.splice(insertIndex, 0, newKey);

		get().updateNodes(newNodes);
		set({ copyNodeKey: null });
	},

	moveNode: (
		nodeToMoveKey,
		newParentKey,
		newParentIndex,
		indexBeforOrAfter,
	) => {
		const { nodes } = get();
		const newNodes = { ...nodes };
		let nodeToMove = newNodes[nodeToMoveKey];

		if (typeof nodeToMove !== "object") {
			throw Error("Cannot move non object node");
		}

		if (nodeToMove.type === "Root") {
			throw Error("Cannot move root node");
		}

		const oldParentKey = nodeToMove.parent;
		let oldParent = newNodes[oldParentKey];

		if (!oldParent || typeof oldParent !== "object" || !oldParent.children) {
			throw Error("Parent node not found or children null");
		}

		if (oldParentKey === newParentKey) {
			// Just moving the node within the same parent
			const currentIndex = oldParent.children.indexOf(nodeToMoveKey);
			let newIndex =
				indexBeforOrAfter === "before" ? newParentIndex : newParentIndex + 1;

			// Adjust the new index if we're moving the node forward
			if (currentIndex < newIndex) {
				newIndex--;
			}

			const newChildren = [...oldParent.children];
			newChildren.splice(currentIndex, 1);
			newChildren.splice(newIndex, 0, nodeToMoveKey);

			newNodes[oldParent.key] = {
				...oldParent,
				children: newChildren,
			};
		} else {
			oldParent = {
				...oldParent,
				children: oldParent.children.filter((key) => key !== nodeToMoveKey),
			};

			let newParent = newNodes[newParentKey];

			if (!newParent || typeof newParent !== "object") {
				throw Error("Drop zone node not found or not an object");
			}

			const parsedIndex =
				indexBeforOrAfter === "before" ? newParentIndex : newParentIndex + 1;

			newParent = {
				...newParent,
				children: newParent.children
					? [
							...newParent.children.slice(0, parsedIndex),
							nodeToMoveKey,
							...newParent.children.slice(parsedIndex),
						]
					: [nodeToMoveKey],
			};

			nodeToMove = {
				...nodeToMove,
				parent: newParent.key,
			};

			newNodes[oldParent.key] = oldParent;
			newNodes[nodeToMove.key] = nodeToMove;
			newNodes[newParent.key] = newParent;
		}

		get().updateNodes(newNodes);
	},

	setContentEditable: (nodeKey, content) => {
		const { nodes } = get();
		const newNodes = { ...nodes };
		const node = newNodes?.[nodeKey];

		if (typeof node !== "object") return;

		const childNodeKey = node?.children?.[0];

		if (!childNodeKey) return;
		if (typeof newNodes[childNodeKey] === "object") return;

		newNodes[childNodeKey] = content;

		console.log("contentEditable", newNodes[childNodeKey]);

		get().updateNodes(newNodes);
	},

	// Drag and Drop Tree Node
	dragAndDropTreeNode: null,
	resetDragAndDropTreeNode: () => set({ dragAndDropTreeNode: null }),
	setDraggingTreeNode: (dropItem) =>
		set({
			dragAndDropTreeNode: {
				startedOn: "TreeView",
				draggingItem: dropItem,
				dropZone: null,
			},
		}),
	setTreeNodeDropZone: (dropZone) =>
		set((state) => {
			if (!state.dragAndDropTreeNode) {
				return state;
			}
			return {
				dragAndDropTreeNode: {
					...state.dragAndDropTreeNode,
					dropZone,
				},
			};
		}),

	// Shadow Composer stuff
	handleMessageFromCanvas: (messageEvent) => {
		if (messageEvent.origin !== window.location.origin) {
			return;
		}
		switch (messageEvent.data.type) {
			case "CANVAS_READY":
				get().sendUpdateOfWholeStateToCanvas();
				break;
			case "FUNCTION_CALL": {
				const { function: fn } = messageEvent.data;
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(get()[fn.name] as (...args: any[]) => void)(...fn.args);
				break;
			}
		}
	},

	sendMessageToCanvas: (message) => {
		const { iframeRef } = get();
		if (iframeRef.current?.contentWindow) {
			const targetOrigin = window.location.origin;
			iframeRef.current.contentWindow.postMessage(message, targetOrigin);
		}
	},

	sendUpdateOfWholeStateToCanvas: () => {
		const {
			nodes,
			headNodeKey,
			canvasHighlight,
			selectedNode,
			sendMessageToCanvas,
		} = get();
		sendMessageToCanvas({
			type: "UPDATE_SHADOW_STATE",
			update: {
				nodes,
				headNodeKey,
				canvasHighlight,
				selectedNode,
			},
		});
	},

	addElementAsChild: (parentKey, elementType) => {
		const { nodes } = get();
		const newNodes = { ...nodes };
		const parentNode = newNodes[parentKey];

		if (!parentNode || typeof parentNode !== "object") {
			throw Error("Parent node not found or not droppable");
		}

		const { editable } = Registry[elementType];

		const childrenKeys: string[] = [];
		if (editable) {
			const contentKey = uuidv4();
			childrenKeys.push(contentKey);
			newNodes[contentKey] = "Lorem ipsum";
		}

		const newKey = uuidv4();
		const newNode = createNodeAbstract(
			newKey,
			elementType,
			{},
			childrenKeys,
			undefined,
			parentKey,
		);

		newNodes[newKey] = newNode;
		if (!parentNode.children) {
			parentNode.children = [];
		}
		parentNode.children.push(newKey);

		get().updateNodes(newNodes);
	},

	openNodes: {},
	setMultipleNodesOpen: (updates: Record<string, boolean>) =>
		set((state) => ({
			openNodes: { ...state.openNodes, ...updates },
		})),
}));
