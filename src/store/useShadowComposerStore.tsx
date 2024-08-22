import type {
  CanvasMessage,
  CanvasReadyMessage,
  ShadowComposerStore,
  UpdateShadowStateMessage,
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
      get().sendMessageToCanvasParent({
        type: "FUNCTION_CALL",
        function: {
          name: "setContentEditable",
          args: [nodeKey, content],
        },
      });
    },
    setCanvasHighlight: (key) => {
      get().sendMessageToCanvasParent({
        type: "FUNCTION_CALL",
        function: {
          name: "setCanvasHighlight",
          args: [key],
        },
      });
    },
    setSelectedNode: (node) => {
      get().sendMessageToCanvasParent({
        type: "FUNCTION_CALL",
        function: {
          name: "setSelectedNode",
          args: [node],
        },
      });
    },
    setChildrenMenuKey: (nodeKey) => {
      get().sendMessageToCanvasParent({
        type: "FUNCTION_CALL",
        function: {
          name: "setChildrenMenuKey",
          args: [nodeKey],
        },
      });
    },
    // Communication with the canvas
    handleMessageFromCanvasParent: (message) => {
      if (message.origin !== window.location.origin) {
        return;
      }
      switch (message.data.type) {
        case "UPDATE_SHADOW_STATE":
          get().receiveUpdateFromCanvasParent(message.data.update);
          break;
      }
    },
    sendMessageToCanvasParent: (message) => {
      window.parent.postMessage(message);
    },
    receiveUpdateFromCanvasParent: (updatedState) => {
      set(updatedState);
    },
  })
);
