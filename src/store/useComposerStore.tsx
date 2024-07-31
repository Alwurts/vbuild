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
      const oldParentKey = nodeToMove.parent;
      const oldParent = state.nodes[oldParentKey];
      const newParent = state.nodes[newParentKey];

      if (typeof oldParent !== "object" || !oldParent.children ||
          typeof newParent !== "object" || !newParent.children) {
        throw Error("Parent node not found or children null");
      }

      const newNodes = { ...state.nodes };

      // Remove from old parent
      newNodes[oldParentKey] = {
        ...oldParent,
        children: oldParent.children.filter((nodeKey) => nodeKey !== key),
      };

      // Add to new parent
      if (oldParentKey === newParentKey) {
        // If same parent, just reorder
        const children = [...newParent.children];
        children.splice(children.indexOf(key), 1);
        children.splice(newIndex, 0, key);
        newNodes[newParentKey] = { ...newParent, children };
      } else {
        newNodes[newParentKey] = {
          ...newParent,
          children: [...newParent.children.slice(0, newIndex), key, ...newParent.children.slice(newIndex)],
        };
      }

      // Update moved node
      newNodes[key] = { ...nodeToMove, parent: newParentKey };

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