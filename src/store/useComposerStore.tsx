import {
  ROOT_COMPONENT_ABSTRACT_DEFAULT,
  ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
} from "@/components/element-composer/defaultJSX";
import type { ComposerStore } from "@/types/composer-store";
import { createRef } from "react";
import { create } from "zustand";

export const useComposerStore = create<ComposerStore>((set, get) => ({
  iframeRef: createRef(),
  nodes: ROOT_COMPONENT_ABSTRACT_DEFAULT,
  headNodeKey: ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
  selectedNodeKey: null,
  setSelectedNodeKey: (key) => set({ selectedNodeKey: key }),
  canvasHighlight: null,
  setCanvasHighlight: (highlight) => {
    set({ canvasHighlight: highlight });
    const { sendUpdateToShadow } = get();
    sendUpdateToShadow({
      canvasHighlight: highlight,
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
