import {
  ROOT_COMPONENT_ABSTRACT_DEFAULT,
  ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
} from "@/components/element-composer/defaultJSX";
import type { ComposerStore } from "@/types/composer-store";
import type { UpdateShadowState } from "@/types/shadow-composer-store";
import { createRef } from "react";
import { create } from "zustand";

export const useComposerStore = create<ComposerStore>((set, get) => ({
  iframeRef: createRef(),
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
      canvasHighlightKey,
      dropItem,
      sendUpdateToShadow,
    } = get();
    sendUpdateToShadow({
      nodes,
      headNodeKey,
      canvasHighlightKey,
      dropItem,
    });
  },
  receiveUpdateFromShadow: (update) => {
    set((state) => ({
      nodes: update.nodes ?? state.nodes,
      headNodeKey: update.headNodeKey ?? state.headNodeKey,
      canvasHighlightKey:
        update.canvasHighlightKey !== undefined
          ? update.canvasHighlightKey
          : state.canvasHighlightKey,
      dropItem:
        update.dropItem !== undefined ? update.dropItem : state.dropItem,
    }));
  },
  nodes: ROOT_COMPONENT_ABSTRACT_DEFAULT,
  headNodeKey: ROOT_COMPONENT_ABSTRACT_DEFAULT_HEAD_KEY,
  selectedNodeKey: null,
  setSelectedNodeKey: (key) => set({ selectedNodeKey: key }),
  canvasHighlightKey: null,
  setCanvasHighlightKey: (key) => {
    set({ canvasHighlightKey: key });
    const { sendUpdateToShadow } = get();
    sendUpdateToShadow({
      canvasHighlightKey: key,
    });
  },
  dropItem: null,
  setDraggableDropItem: (dropItem) => set({ dropItem }),
  setDropDropItem: (drop) =>
    set((state) => {
      if (!state.dropItem) {
        return state;
      }
      return {
        ...state,
        dropItem: {
          ...state.dropItem,
          drop,
        },
      };
    }),
  moveNode: (draggedNode) => {
    set((state) => {
      if (!draggedNode || !draggedNode.drop) return state;

      const { draggedNodeKey, drop } = draggedNode;
      const { dropNodeKey, type, index } = drop;
      const nodeToMove = state.nodes[draggedNodeKey];

      if (typeof nodeToMove !== "object" || nodeToMove.type === "Root") {
        return state;
      }

      const oldParentKey = nodeToMove.parent;
      const oldParent = state.nodes[oldParentKey];
      const dropNode = state.nodes[dropNodeKey];

      if (!dropNode || typeof dropNode !== "object") {
        return state;
      }

      // Determine the new parent based on the drop type
      const newParentKey = dropNodeKey;
      const newParent = state.nodes[newParentKey];

      if (
        typeof oldParent !== "object" ||
        !oldParent.children ||
        typeof newParent !== "object" ||
        !newParent.children
      ) {
        throw Error("Parent node not found or children null");
      }

      const newNodes = { ...state.nodes };

      // Remove from old parent
      newNodes[oldParentKey] = {
        ...oldParent,
        children: oldParent.children.filter((key) => key !== draggedNodeKey),
      };

      // Add to new parent
      let newIndex = index;
      if (type === "after") {
        newIndex += 1;
      }

      if (oldParentKey === newParentKey) {
        // If same parent, just reorder
        const children = [...newParent.children];
        children.splice(children.indexOf(draggedNodeKey), 1);
        children.splice(newIndex, 0, draggedNodeKey);
        newNodes[newParentKey] = { ...newParent, children };
      } else {
        newNodes[newParentKey] = {
          ...newParent,
          children: [
            ...newParent.children.slice(0, newIndex),
            draggedNodeKey,
            ...newParent.children.slice(newIndex),
          ],
        };
      }

      // Update moved node
      newNodes[draggedNodeKey] = { ...nodeToMove, parent: newParentKey };

      get().sendUpdateToShadow({
        nodes: newNodes,
      });

      return {
        ...state,
        nodes: newNodes,
      };
    });
  },
}));
