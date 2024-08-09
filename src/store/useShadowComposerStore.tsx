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
    setCanvasHighlightKey: (key) => {
      set({ canvasHighlightKey: key });
      get().sendUpdateToComposer({ canvasHighlightKey: key });
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
        dropItem:
          updatedState.dropItem !== undefined
            ? updatedState.dropItem
            : state.dropItem,
      }));
    },
  })
);
