import { DivFlex } from "@/components/elements/DivFlex";
import { Button } from "@/components/ui-editor/button";
import type { TNodesAbstract, TNodeTree } from "@/types/jsx";

import { v4 as uuidv4 } from "uuid";

const rootUuid = uuidv4();
const divFlexUuid = uuidv4();
const buttonUuid = uuidv4();
const buttonTextUuid = uuidv4();

const ROOT_COMPONENT_DEFAULT: TNodesAbstract = {
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
    props: {},
    children: [buttonTextUuid],
  },
  [buttonTextUuid]: "Click me",
};

export const renderReactNode = (
  node: TNodeTree
): React.ReactNode => {
  if (typeof node !== "object") {
    return String(node);
  }

  if (node.type === "Button") {
    const {
      props,
    } = node;
    return (
      <Button {...props} key={node.key}>
        {node.children}
      </Button>
    );
  }

  if (node.type === "DivFlex") {
    const {
      props,
    } = node;
    return (
      <DivFlex {...props} key={node.key}>
        {node.children}
      </DivFlex>
    );
  }

  if (node.type === "Root") {
    const {
      props,
    } = node;
    return (
      <div {...props} key={node.key}>
        {node.children}
      </div>
    );
  }

  return null;
};

export { ROOT_COMPONENT_DEFAULT };
