import type { OverlayStore } from "@/types/overlay-store";
import { create } from "zustand";

export const useOverlayStore = create<OverlayStore>((set) => ({
  overlaysAreActive: true,
  nodeKey: "",
  overlayContentRects: [],
  overlayPaddingRects: [],
  setOverlay: (nodeKey, type, overlayRects) => {
    if (type === "content") {
      set({ nodeKey, overlayContentRects: overlayRects });
    }
    if (type === "padding") {
      set({ nodeKey, overlayPaddingRects: overlayRects });
    }
  },
  clearOverlay: () =>
    set({ nodeKey: "", overlayContentRects: [], overlayPaddingRects: [] }),
}));
