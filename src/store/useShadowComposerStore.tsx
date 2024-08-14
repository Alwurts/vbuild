import type {
  ShadowComposerStore,
  UpdateShadowState,
} from "@/types/shadow-composer-store";
import { create } from "zustand";

export const useShadowComposerStore = create<ShadowComposerStore>(
  (set, get) => ({
    nodes: null,
    headNodeKey: null,
    selectedNode: null,
    canvasHighlight: null,
    dropItem: null,
    setContentEditable: (nodeKey, content) => {
      set((state) => {
        const newNodes = { ...state.nodes };
        const node = newNodes?.[nodeKey];

        if (typeof node !== "object") return state;

        const childNodeKey = node?.children?.[0];

        if (!childNodeKey) return state;
        if (typeof newNodes[childNodeKey] === "object") return state;

        newNodes[childNodeKey] = content;

        get().sendUpdateToComposer({ nodes: newNodes });

        return {
          nodes: newNodes,
        };
      });
    },
    setCanvasHighlight: (key) => {
      set({ canvasHighlight: key });
      get().sendUpdateToComposer({ canvasHighlight: key });
    },
    setSelectedNode: (node) => {
      set({ selectedNode: node });
      get().sendUpdateToComposer({ selectedNode: node });
    },
    sendUpdateToComposer: (update) => {
      window.parent.postMessage({
        type: "UPDATE_STATE_FROM_SHADOW",
        update,
      });
    },
    receiveUpdateFromComposer: (updatedState) => {
      set((state) => ({
        nodes: updatedState.nodes ?? state.nodes,
        headNodeKey: updatedState.headNodeKey ?? state.headNodeKey,
        canvasHighlight:
          updatedState.canvasHighlight !== undefined
            ? updatedState.canvasHighlight
            : state.canvasHighlight,
        selectedNode:
          updatedState.selectedNode !== undefined
            ? updatedState.selectedNode
            : state.selectedNode,
        dropItem:
          updatedState.dropItem !== undefined
            ? updatedState.dropItem
            : state.dropItem,
      }));
    },
  })
);
