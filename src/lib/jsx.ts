import { DivFlex } from "@/components/elements/DivFlex";
import { renderReactNode } from "@/components/elements/RenderNode";
import { Button } from "@/components/ui-editor/button";
import type { TNodesAbstract, TNodeTree } from "@/types/jsx";

import { v4 as uuidv4 } from "uuid";

const rootUuid = uuidv4();
const divFlexUuid = uuidv4();
const buttonUuid = uuidv4();
const buttonTextUuid = uuidv4();

const ROOT_COMPONENT_ABSTRACT_DEFAULT: TNodesAbstract = {
  [rootUuid]: {
    type: "Root",
    key: rootUuid,
    props: {},
    children: [divFlexUuid],
  },
  [divFlexUuid]: {
    parent: rootUuid,
    type: "DivFlex",
    key: divFlexUuid,
    props: {},
    children: [buttonUuid],
  },
  [buttonUuid]: {
    parent: divFlexUuid,
    type: "Button",
    key: buttonUuid,
    props: {
      onClick: () => {
        console.log("clickButton");
      },
    },
    children: [buttonTextUuid],
  },
  [buttonTextUuid]: "Click me",
};

export const ROOT_COMPONENT_TREE_AND_REACT_DEFAULT =
  nodesAbstractToTreeAndReact(ROOT_COMPONENT_ABSTRACT_DEFAULT, rootUuid);

export function nodesAbstractToTreeAndReact(
  nodesAbstract: TNodesAbstract,
  headNodeKey: string
): { tree: TNodeTree; react: React.ReactNode } {
  const headNodeAbstract = nodesAbstract[headNodeKey];

  if (
    typeof headNodeAbstract !== "object" ||
    headNodeAbstract.type !== "Root"
  ) {
    throw new Error("Head node must be Root");
  }

  const constructTree = (
    nodeAbstractKey: string
  ): { tree: TNodeTree; react: React.ReactNode } => {
    const nodeAbstract = nodesAbstract[nodeAbstractKey];

    if (typeof nodeAbstract !== "object") {
      return { tree: nodeAbstract, react: renderReactNode(nodeAbstract, null) };
    }

    const childrenTreeAndReact = nodeAbstract.children
      ? nodeAbstract.children.map((child) => constructTree(child))
      : null;

    const childrenTree = childrenTreeAndReact
      ? childrenTreeAndReact.map((child) => child.tree)
      : null;
    const childrenReactNode = childrenTreeAndReact
      ? childrenTreeAndReact.map((child) => child.react)
      : null;

    return {
      tree: {
        ...nodeAbstract,
        children: childrenTree,
      },
      react: renderReactNode(nodeAbstract, childrenReactNode),
    };
  };

  const tree = constructTree(headNodeAbstract.key);

  return tree;
}

export { ROOT_COMPONENT_ABSTRACT_DEFAULT as ROOT_COMPONENT_DEFAULT };
