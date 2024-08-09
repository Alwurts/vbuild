import type {
  ShadowComposerStore,
  UpdateShadowState,
} from "@/types/shadow-composer-store";
import { create } from "zustand";

export const useShadowComposerStore = create<ShadowComposerStore>(
  (set, get) => ({
    nodes: null,
    headNodeKey: null,
    selectedNodeKey: null,
    canvasHighlightKey: null,
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
    setCanvasHighlightKey: (key) => {
      set({ canvasHighlightKey: key });
      get().sendUpdateToComposer({ canvasHighlightKey: key });
    },
    setSelectedNodeKey: (key) => {
      set({ selectedNodeKey: key });
      get().sendUpdateToComposer({ selectedNodeKey: key });
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
        canvasHighlightKey:
          updatedState.canvasHighlightKey !== undefined
            ? updatedState.canvasHighlightKey
            : state.canvasHighlightKey,
        selectedNodeKey:
          updatedState.selectedNodeKey !== undefined
            ? updatedState.selectedNodeKey
            : state.selectedNodeKey,
        dropItem:
          updatedState.dropItem !== undefined
            ? updatedState.dropItem
            : state.dropItem,
      }));
    },
  })
);
