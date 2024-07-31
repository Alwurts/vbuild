import {
  nodesAbstractToTreeAndReact,
  ROOT_COMPONENT_ABSTRACT_DEFAULT,
  ROOT_COMPONENT_TREE_AND_REACT_DEFAULT,
  rootUuid,
} from "@/lib/jsx";
import type { ComposerStore } from "@/types/jsx-store";
import { create } from "zustand";

export const useComposerStore = create<ComposerStore>((set) => ({
  nodes: ROOT_COMPONENT_ABSTRACT_DEFAULT,
  headNodeKey: rootUuid,
  tree: ROOT_COMPONENT_TREE_AND_REACT_DEFAULT.tree,
  react: ROOT_COMPONENT_TREE_AND_REACT_DEFAULT.react,
  selectedNodeKey: null,
  setSelectedNodeKey: (key) => set({ selectedNodeKey: key }),
  moveNode: (key, newParentKey, newIndex) => {
    set((state) => {
      const nodeToMove = state.nodes[key];
      if (typeof nodeToMove !== "object") {
        return state;
      }
      if (nodeToMove.type === "Root") {
        throw Error("Root node cannot be moved");
      }
      const nodeToMoveParent = state.nodes[nodeToMove.parent];
      if (typeof nodeToMoveParent !== "object" || !nodeToMoveParent.children) {
        throw Error("Parent node not found or children null");
      }
      const nodeToMoveParentChildren = nodeToMoveParent.children;

      const newNodeToMoveParent = {
        ...nodeToMoveParent,
        children: nodeToMoveParentChildren.filter((nodeKey) => nodeKey !== key),
      };

      const newParent = state.nodes[newParentKey];
      if (typeof newParent !== "object" || !newParent.children) {
        throw Error("New parent node not found or children null");
      }
      const newParentChildren = newParent.children;
      const newNodeToMove = {
        ...nodeToMove,
        parent: newParentKey,
        index: newIndex,
      };
      const newNodes = {
        ...state.nodes,
        [key]: newNodeToMove,
        [nodeToMove.parent]: newNodeToMoveParent,
        [newParentKey]: {
          ...newParent,
          children: [...newParentChildren, newNodeToMove.key],
        },
      };
      const newTreeAndReact = nodesAbstractToTreeAndReact(newNodes, state.headNodeKey);
      return {
        ...state,
        nodes: newNodes,
        tree: newTreeAndReact.tree,
        react: newTreeAndReact.react,
      };
    });
  },
}));
