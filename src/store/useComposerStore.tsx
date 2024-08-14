import {
  ROOT_COMPONENT_ABSTRACT_DEFAULT,
  ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
} from "@/components/element-composer/defaultJSX";
import type { ComposerStore } from "@/types/composer-store";
import type { TNodeAbstract } from "@/types/elements/jsx";
import { v4 as uuidv4 } from "uuid";

import { createRef } from "react";
import { create } from "zustand";

export const useComposerStore = create<ComposerStore>((set, get) => ({
  iframeRef: createRef(),
  nodes: ROOT_COMPONENT_ABSTRACT_DEFAULT,
  headNodeKey: ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
  selectedNodeKey: null,
  setSelectedNodeKey: (key) => {
    const { sendUpdateToShadow } = get();
    sendUpdateToShadow({
      selectedNodeKey: key,
    });
    return set({ selectedNodeKey: key });
  },
  canvasHighlight: null,
  setCanvasHighlight: (highlight) => {
    set({ canvasHighlight: highlight });
    const { sendUpdateToShadow } = get();
    sendUpdateToShadow({
      canvasHighlight: highlight,
    });
  },
  deleteNode: (nodeKey) => {
    set((state) => {
      const newNodes = { ...state.nodes };
      const nodeToDelete = newNodes[nodeKey];
      if (!nodeToDelete) return state;

      if (typeof nodeToDelete !== "object") {
        throw Error("Cannot delete non object node");
      }

      if (nodeToDelete.type === "Root") {
        throw Error("Cannot delete root node");
      }

      const parentKey = nodeToDelete.parent;
      const parent = newNodes[parentKey];
      if (!parent) return state;

      if (typeof parent !== "object" || !parent.children) {
        throw Error("Parent node not found or children null");
      }

      // Remove the node from its parent's children
      parent.children = parent.children.filter(
        (childKey) => childKey !== nodeKey
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

      get().sendUpdateToShadow({ nodes: newNodes });
      return { nodes: newNodes };
    });
  },
  copyNodeKey: null,
  setCopyNodeKey: (nodeKey) => set({ copyNodeKey: nodeKey }),
  copyNode: (
    nodeToCopyKey,
    newParentKey,
    newParentIndex,
    indexBeforeOrAfter
  ) => {
    set((state) => {
      const newNodes = { ...state.nodes };
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
        copiedNodeNewParentKey: string
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

      get().sendUpdateToShadow({ nodes: newNodes });
      return { nodes: newNodes, copyNodeKey: null };
    });
  },
  moveNode: (
    nodeToMoveKey,
    newParentKey,
    newParentIndex,
    indexBeforOrAfter
  ) => {
    set((state) => {
      let nodeToMove = state.nodes[nodeToMoveKey];

      if (typeof nodeToMove !== "object") {
        throw Error("Cannot move non object node");
      }

      if (nodeToMove.type === "Root") {
        throw Error("Cannot move root node");
      }

      const newNodes = { ...state.nodes };

      const oldParentKey = nodeToMove.parent;
      let oldParent = state.nodes[oldParentKey];

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

        let newParent = state.nodes[newParentKey];

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

      get().sendUpdateToShadow({
        nodes: newNodes,
      });

      return {
        nodes: newNodes,
      };
    });
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
  sendUpdateToShadow: (update) => {
    const { iframeRef } = get();
    if (iframeRef.current?.contentWindow) {
      const targetOrigin = window.location.origin;
      iframeRef.current.contentWindow.postMessage(
        {
          type: "UPDATE_STATE",
          update,
        },
        targetOrigin
      );
    }
  },
  sendUpdateOfWholeStateToShadow: () => {
    const {
      nodes,
      headNodeKey,
      canvasHighlight: canvasHighlightKey,
      selectedNodeKey,
      dragAndDropTreeNode: dropItem,
      sendUpdateToShadow,
    } = get();
    sendUpdateToShadow({
      nodes,
      headNodeKey,
      canvasHighlight: canvasHighlightKey,
      selectedNodeKey,
      dropItem,
    });
  },
  receiveUpdateFromShadow: (update) => {
    set((state) => ({
      nodes: update.nodes ?? state.nodes,
      headNodeKey: update.headNodeKey ?? state.headNodeKey,
      canvasHighlight:
        update.canvasHighlight !== undefined
          ? update.canvasHighlight
          : state.canvasHighlight,
      selectedNodeKey:
        update.selectedNodeKey !== undefined
          ? update.selectedNodeKey
          : state.selectedNodeKey,
      dragAndDropTreeNode:
        update.dropItem !== undefined
          ? update.dropItem
          : state.dragAndDropTreeNode,
    }));
  },
}));
