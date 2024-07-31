import { DivFlex } from "@/components/elements/DivFlex";
import { Button } from "@/components/ui-editor/button";
import type {
  TElementBasic,
  TElementComponent,
  TReactElementRoot,
  TReactNode,
} from "@/types/jsx";
import { v4 as uuidv4 } from "uuid";

const REACT_ELEMENT_ROOT_DEFAULT: TReactElementRoot = {
  type: "Root",
  key: "root",
  props: {
    children: null,
  },
};

export const renderReactNode = (
  node: TReactNode,
  children: React.ReactNode
): React.ReactNode => {
  if (node === null) return null;
  if (typeof node !== "object") {
    return String(node);
  }

  if (node.type === "Button") {
    const {
      props: { children: _, ...props },
    } = node;
    return (
      <Button {...props} key={node.key}>
        {children}
      </Button>
    );
  }

  if (node.type === "DivFlex") {
    const {
      props: { children: _, ...props },
    } = node;
    return (
      <DivFlex {...props} key={node.key}>
        {children}
      </DivFlex>
    );
  }

  if (node.type === "Root") {
    const {
      props: { children: _, ...props },
    } = node;
    return (
      <div {...props} key={node.key}>
        {children}
      </div>
    );
  }

  return null;
};

const appendChild = <T extends TElementComponent | TElementBasic>(
  parent: TElementComponent | TReactElementRoot,
  child: T
): T => {
  const newChild: TElementComponent | TElementBasic =
    typeof child === "object"
      ? {
          ...child,
          parent: parent,
          key: uuidv4(),
        }
      : child;

  if (parent.props.children === null) {
    parent.props.children = newChild;
  } else if (Array.isArray(parent.props.children)) {
    parent.props.children.push(newChild);
  } else {
    parent.props.children = [parent.props.children, newChild];
  }

  return newChild as T;
};

const divFlex = appendChild(REACT_ELEMENT_ROOT_DEFAULT, {
  type: "DivFlex",
  key: null,
  props: {
    children: null,
  },
});

const div3Flex = appendChild(REACT_ELEMENT_ROOT_DEFAULT, "Hey");

appendChild(divFlex, {
  type: "Button",
  key: null,
  props: {
    variant: "outline",
    children: "Click me",
  },
});

appendChild(divFlex, {
  type: "Button",
  key: null,
  props: {
    variant: "outline",
    children: "Hello",
  },
});

export { REACT_ELEMENT_ROOT_DEFAULT };
